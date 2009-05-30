desc 'Run Jasmine Project Tests'
task :javascript do
  sh "java -jar vendor/plugins/env-js/rhino/js.jar vendor/plugins/jazzhands/lib/run_tests.js #{get_suite_list.join(' ')}" do |ok, status|
    ok or fail "Jasmine Tests Failed"
  end
end

def get_suite_list
  (FileList["test/javascript/**/*.js"] + FileList["spec/javascript/**/*.js"]).entries
end
