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

    jasmineInstance.reporter = reporter;

    jasmineRunner.execute();

    expect(reporter.suiteInfoReady).toEqual(true);
    var specResults = reporter.getResultsForSpec(0);
    expect(specResults.result).toMatch('passed');
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
    jasmineInstance.reporter = reporter;

    jasmineRunner.execute();

    expect(reporter.suiteInfoReady).toEqual(true);
    var specResults = reporter.getResultsForSpec(0);

    expect(specResults.result).toMatch('failed');
  });
});