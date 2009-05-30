if (!File.exist?('spec/javascript'))
  Dir.mkdir('spec/javascript')
end
File.copy('vendor/plugins/jazzhands/templates/*', 'spec/javascript/')