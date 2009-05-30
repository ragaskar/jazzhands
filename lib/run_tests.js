load('vendor/plugins/jazzhands/lib/boot.js');

for (i = 0; i < arguments.length; i++) {
  var fileName = arguments[i];
  load(fileName);
}

var reporter = new JazzHandsReporter(jasmine.getEnv());
jasmine.getEnv().reporter = reporter;
jasmine.getEnv().execute();
