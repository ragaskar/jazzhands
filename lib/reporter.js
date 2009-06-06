var JazzHandsReporter = function (jasmineEnv) {
  this.jasmineEnv = jasmineEnv;
  this.specResults = {};
};

JazzHandsReporter.prototype.log = function (str) {

};

JazzHandsReporter.prototype.reportSpecResults = function (spec) {
  var result = spec.results;

  var messages = [];
  var expectationNumber = 1;
  for (var i = 0; i < result.getItems().length; i++) {
    if (result.getItems()[i].type == 'ExpectationResult') {
      messages.push("Expectation " + (expectationNumber++) + ": " + result.getItems()[i].message);
    } else if (result.getItems()[i].type == 'MessageResult') {
      messages.push(result.getItems()[i].text);
    }
  }
  messages.push(result.passedCount + ' passed, ' + result.failedCount + ' failed');

  this.specResults[spec.id] = {
    result: result.skipped ? 'pending' : result.passed() ? 'passed' : 'failed',
    messages: messages
  };
};


JazzHandsReporter.prototype.reportSuiteResults = function (results) {
};

JazzHandsReporter.prototype.getResultsForSpec = function(specId) {
  return this.specResults[specId];
};

JazzHandsReporter.prototype.getSuiteInfo = function() {
  var suites = this.jasmineEnv.currentRunner.suites;
  var suiteInfo = [];

  for (var i = 0; i < suites.length; i++) {
    var suite = suites[i];
    suiteInfo.push(this.infoFor(suite));
  }

  return suiteInfo;
};

JazzHandsReporter.prototype.infoFor = function(suiteOrSpec) {
  if (suiteOrSpec instanceof jasmine.Suite) { // suite
    //noinspection UnnecessaryLocalVariableJS
    var suite = suiteOrSpec;
    var children = [];

    for (var i = 0; i < suite.specs.length; i++) {
      children.push(this.infoFor(suite.specs[i]));
    }

    return {
      type: 'suite',
      name: suite.description,
      children: children
    };

  } else { // spec
    //noinspection UnnecessaryLocalVariableJS
    var spec = suiteOrSpec;
    return {
      id: spec.id,
      type: 'spec',
      name: spec.description
    };

  }
};

JazzHandsReporter.prototype.reportRunnerResults = function (runner) {
  this.suiteInfoReady = true;
};

