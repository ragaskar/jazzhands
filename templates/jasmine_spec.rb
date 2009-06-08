require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')
require 'rubygems'

class RhinoConnection
  require 'socket'
  unless (defined? ActiveSupport::JSON)
    require 'json'
  end

  def json_parse(string)
    if (defined? ActiveSupport::JSON)
      return ActiveSupport::JSON.decode(string)
    else
      return JSON.parse(string)
    end
  end

  require 'open3'
  include Socket::Constants

  def initialize
    connect
  end

  def connect
    app_path = File.expand_path(File.join(File.dirname(__FILE__), '..', '..'))
    Dir.chdir(app_path)
    @stdin, @stdout, @stderr = Open3.popen3("java -jar vendor/plugins/env-js/rhino/js.jar vendor/plugins/jazzhands/lib/rhino_bridge.js")
    eval_ignore_result('load("vendor/plugins/jazzhands/lib/boot.js");')
  end

  def load_suites(suites)
    suites.each do |suite|
      eval_ignore_result("load('#{suite}');")
    end

  end

  def execute
    eval_ignore_result('var reporter = new JazzHandsReporter(jasmine.getEnv());')
    eval_ignore_result('jasmine.getEnv().reporter = reporter;')
    eval_ignore_result('jasmine.getEnv().execute();')
  end

  def eval_ignore_result(js)
    @stdin.puts(js)
    error = error_read
    if (!error.nil?)
      raise error
    end
    result = read
    status, result = result.split(' ')
    result = URI.unescape(result)
    raise result if status == 'error'
    result
  end

  def eval(js)
    result = eval_ignore_result(js)

    return true if result == 'true'
    return false if result == 'false'
    return nil if result == '"null"' || result == 'null' || result == '"undefined"' || result == 'undefined'
    result = json_parse(result)
    result
  end

  def read
    raw_str = nil
    while true do
      raw_str = @stdout.gets
      return nil unless raw_str
      puts raw_str[11..-1] if raw_str =~ /^!!!print!!!/
      return raw_str[11..-1] if raw_str =~ /^!!!magic!!!/
    end
  end

  def error_read
    error_message = '';
    while (@stderr.stat.blocks > 0)
        error_message += @stderr.gets
        return error_message if @stderr.stat.blocks == 0    
    end
  end

  def close
    @stdin.puts('exit')
  end
end

class RemoteResults
  attr_accessor :suites
  require 'open3'

  def initialize(run_server = true)
    if (run_server)
      # ENV['RAILS_ENV']='test'
      # @stdin, @stdout, @stderr = Open3.popen3("./script/server")
    end

    @rhino_connection = RhinoConnection.new
    @rhino_connection.load_suites(Dir.glob('spec/javascript/**/*.js'))
    @rhino_connection.execute
    load_suite_info
    @spec_results = {}
  end

  def load_suite_info
    @suites = eval('JSON.stringify(reporter.getSuiteInfo())')
  end

  def results_for(spec_id)
    spec_id = spec_id.to_s
    return @spec_results[spec_id] if @spec_results[spec_id]

    @spec_results[spec_id] = eval("JSON.stringify(reporter.getResultsForSpec(#{spec_id}))")
    while @spec_results[spec_id].nil? do
      sleep 0.1
      @spec_results[spec_id] = eval("JSON.stringify(reporter.getResultsForSpec(#{spec_id}))")
    end

    @spec_results[spec_id]
  end

  def declare_suites
    me = self
    suites.each do |suite|
      declare_suite(self, suite)
    end
  end

  def declare_suite(parent, suite)
    me = self
    parent.describe suite["name"] do
      suite["children"].each do |suite_or_spec|
        type = suite_or_spec["type"]
        if type == "suite"
          me.declare_suite(self, suite_or_spec)
        elsif type == "spec"
          me.declare_spec(self, suite_or_spec)
        else
          raise "unknown type #{type}"
        end
      end
    end
  end

  def declare_spec(parent, spec)
    me = self
    parent.it spec["name"] do
      me.report_spec(spec["id"])
    end
  end

  def report_spec(spec_id)
    spec_results = results_for(spec_id)

    spec_results['messages'].each do |message|
      puts message unless message =~ /^Expectation \d+|^\d+ passed, \d+ failed$/
    end
    Spec::Expectations.fail_with(spec_results['messages'].join("\n")) if (spec_results['result'] != 'passed')
  end

  private

  def eval(js)
    @rhino_connection.eval(js)
  end
end

remote_results = RemoteResults.new(true)
remote_results.declare_suites