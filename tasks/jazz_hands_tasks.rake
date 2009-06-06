desc 'Run Jasmine Project Tests'
task :javascript do
  sh "java -jar vendor/plugins/env-js/rhino/js.jar vendor/plugins/jazzhands/lib/run_tests.js #{get_suite_list.join(' ')}" do |ok, status|
    ok or fail "Jasmine Tests Failed"
  end
end

require 'spec/rake/spectask'
namespace :spec do
  desc "Run the code examples in test/javascript"
  Spec::Rake::SpecTask.new(:javascript)  do |t|
    t.spec_opts = [
            '--options',
            File.expand_path(File.join(File.dirname(__FILE__), '..', '..', '..', '..', 'spec', 'spec.opts'))
    ]
    t.spec_files = FileList["test/javascript/**/*_spec.rb"] + FileList["spec/javascript/**/*_spec.rb"]
  end
end


def get_suite_list
  (FileList["test/javascript/**/*.js"] + FileList["spec/javascript/**/*.js"]).entries
end
