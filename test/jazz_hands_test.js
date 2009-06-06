var runJazzHandsReporterTest = function () {
  load('../env-js/dist/env.rhino.js');
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
  for (specId in results) {
    totalCount++;
    var result = results[specId];
    if (result.result == 'failed') {
      failedCount++;
      fails.push(result.messages.join("\n"));
    } else {
      passedCount++;
    }
  }
  if (fails.length > 0) {
    print(fails.join("\n"));
  }
  print('JazzHandsReporter: '+ totalCount + ' tests: ' + passedCount + ' passed, ' + failedCount + ' failed');
};

runJazzHandsReporterTest();
