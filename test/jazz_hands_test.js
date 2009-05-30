var runJazzHandsReporterTest = function () {
load('../env-js/dist/env.rhino.js');
load('../jasmine/lib/jasmine.js');
load('../jazzhands/lib/json2.js');
load('../jazzhands/lib/reporter.js');
load('../jazzhands/test/lib/reporter-test.js');
jasmine.getEnv().reporter = new JazzHandsReporter();
jasmine.getEnv().execute();  
};

runJazzHandsReporterTest();
