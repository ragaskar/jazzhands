var runJazzHandsReporterTest = function () {
  load('../env-js/dist/env.rhino.js');
  window.location = '../jazzhands/lib/blank.html';
  
  load('../jasmine/src/base.js');
  load('../jasmine/src/util.js');
  load('../jasmine/src/Env.js');
  load('../jasmine/src/ActionCollection.js');
  load('../jasmine/src/Matchers.js');
  load('../jasmine/src/NestedResults.js');
  load('../jasmine/src/PrettyPrinter.js');
  load('../jasmine/src/QueuedFunction.js');
  load('../jasmine/src/Reporters.js');
  load('../jasmine/src/Runner.js');
  load('../jasmine/src/Spec.js');
  load('../jasmine/src/Suite.js');
  load('../jasmine/test/mock-timeout.js');

  load('../jazzhands/lib/json2.js');
  load('../jazzhands/lib/reporter.js');
  load('../jazzhands/test/lib/reporter-test.js');

  jasmine.getEnv().reporter = new JazzHandsReporter(jasmine.getEnv());
  jasmine.getEnv().execute();
  var results = jasmine.getEnv().reporter.specResults;
  var fails = [];
  var totalCount = 0;
  var passedCount = 0;
  var failedCount = 0;
  var suiteInfo = jasmine.getEnv().reporter.getSuiteInfo();
  
  var collectMessages = function (suiteOrSpecs) {
    for (var j = 0; j < suiteOrSpecs.length; j++) {
      var suiteOrSpec = suiteOrSpecs[j];
      if (suiteOrSpec.type == 'spec') {
        totalCount++;
        var result = results[suiteOrSpec.id];
        if (result.result == 'failed') {
          failedCount++;
          fails.push(suiteOrSpec.name + " FAILED \n" + result.messages.join("\n"));
        } else {
          passedCount++;
        }
      }
      else {
        collectMessages(suiteOrSpec.children);
      }
    }
  };
  collectMessages(suiteInfo);

  if (fails.length > 0) {
    print("\n" + fails.join("\n\n")+"\n");
  }
  print('JazzHandsReporter: ' + totalCount + ' tests: ' + passedCount + ' passed, ' + failedCount + ' failed');
};

runJazzHandsReporterTest();
