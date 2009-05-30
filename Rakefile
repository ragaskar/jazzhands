desc 'Run Tests of Jasmine'
task :jasmine do
  results = `java -jar ../env-js/rhino/js.jar -f test/jasmine_test.js`
  if results.include?(" 0 failed in")
    puts convert_html(results[/\<h2>Summary<\/h2><p>(.*)<\/p>/, 1])
    puts 'Jasmine tests passed'
  else
    puts convert_html(results[/\<div id='fail_messages'\s*\>(.*)\<\/div\>/, 1])
    raise "Jasmine tests failed"
  end
end

desc 'Run jasmine suites'
task :jasmine_suites do
  sh "java -jar ../env-js/rhino/js.jar -f lib/run_jasmine_tests.js #{get_jasmine_suites.join(' ')}" do |ok, status|
    ok or fail "Jasmine Tests Failed"
  end
end

desc 'Run jazz_hands_reporter'
task :jazzhands do
  sh "java -jar ../env-js/rhino/js.jar -f test/jazz_hands_test.js" do |ok, status|
    ok or fail "Jasmine Tests Failed"
  end

end


def get_jasmine_suites
  (FileList["../jasmine/test/**/*Test.js"]).entries
end

def convert_html(string)
  return if string.nil?
  string.gsub(/<[p|div]>(.*)<\/[p|div]>/) { |match| "\n\n" + $1 + "\n\n"}.gsub(/<br>/, "\n").gsub(/<[^>]+>/, '')
end
