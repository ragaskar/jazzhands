describe('JazzHandsReporter', function () {
  it('should output "All Tests Passed" if all tests passed', function () {
    var jasmineInstance = new jasmine.Env();
    var jasmineRunner = new jasmine.Runner(jasmineInstance);
    jasmineInstance.currentRunner = jasmineRunner;
    jasmineInstance.currentSuite = jasmineInstance.describe('Sample Passing Suite', function () {
    });
    jasmineInstance.it('has a passing test',
        function() {
          this.expect(true).toEqual(true);

        });

    var reporter = new JazzHandsReporter();

    jasmineRunner.finishCallback = function() {
      reporter.reportRunnerResults(jasmineRunner);
    };

    spyOn(reporter, 'output');
    jasmineRunner.execute();

    expect(reporter.output).wasCalled();
    var reporterOutput = reporter.output.mostRecentCall.args[0];


    expect(reporterOutput).toMatch('passed');
  });

  it('should output failure messages if any tests failed', function () {
    var jasmineInstance = new jasmine.Env();
    var jasmineRunner = new jasmine.Runner(jasmineInstance);
    jasmineInstance.currentRunner = jasmineRunner;

    jasmineInstance.currentSuite = jasmineInstance.describe('Sample Failing Suite', function () {
    });

    jasmineInstance.it('has a failing test',
        function() {
          this.expect(true).toEqual(false);
        });


    var reporter = new JazzHandsReporter();
    spyOn(reporter, 'output');

    jasmineRunner.finishCallback = function() {
      reporter.reportRunnerResults(jasmineRunner);
    };

    try {
    jasmineRunner.execute();
    }
    catch (e) {
      //this is here to suck up the failed exception thrown by the reporter
    }

    expect(reporter.output).wasCalled();
    var reporterSummaryOutput = reporter.output.argsForCall[0][0];

    expect(reporterSummaryOutput).toMatch('failed');

    var reporterFailureOutput = reporter.output.argsForCall[1][0];
    expect(reporterFailureOutput).toMatch('Sample Failing Suite has a failing test');
  });
});