var runJazzHandsReporterTest = function () {
load('vendor/plugins/env-js/dist/env.rhino.js');
load('vendor/plugins/jasmine/lib/jasmine.js');
load('vendor/plugins/jazzhands/lib/json2.js');
load('vendor/plugins/jazzhands/lib/reporter.js');
load('vendor/plugins/jazzhands/test/lib/reporter-test.js');
jasmine.getEnv().reporter = new JazzHandsReporter();
jasmine.getEnv().execute();  
};

runJazzHandsReporterTest();
