require 'ftools'
Dir.mkdir('spec') unless File.exist?('spec')
Dir.mkdir('spec/javascript') unless File.exist?('spec/javascript')
File.copy('vendor/plugins/jazzhands/templates/jasmine_spec.rb', 'spec/javascript/')
File.copy('vendor/plugins/jazzhands/templates/example_test.js', 'spec/javascript/')
