describe('JazzHandsReporter', function () {
  var jasmineInstance, jasmineRunner, reporter;

  beforeEach(function () {
    jasmineInstance = new jasmine.Env();
    jasmineRunner = new jasmine.Runner(jasmineInstance);
    jasmineInstance.currentRunner = jasmineRunner;
    reporter = new JazzHandsReporter(jasmineInstance);
    jasmineInstance.reporter = reporter;
    jasmineInstance.currentSuite = jasmineInstance.describe('Stub Suite', function () {});

  });

  it('should output "All Tests Passed" if all tests passed', function () {
    jasmineInstance.it('has a passing test',
        function() {
          this.expect(true).toEqual(true);

        });

    jasmineRunner.execute();

    expect(reporter.suiteInfoReady).toEqual(true);
    var specResults = reporter.getResultsForSpec(0);
    expect(specResults.result).toMatch('passed');
  });

  it('should output failure messages if any tests failed', function () {
    jasmineInstance.it('has a failing test',
        function() {
          this.expect(true).toEqual(false);
        });

    jasmineRunner.execute();

    expect(reporter.suiteInfoReady).toEqual(true);
    var specResults = reporter.getResultsForSpec(0);

    expect(specResults.result).toMatch('failed');
  });

  it('should clean up HTML after each test', function () {

    jasmineInstance.it('sets some DOM',
        function() {
          var divEl = document.createElement('div');
          divEl.id = 'foo';
          divEl.innerHTML = 'bar';
          window.document.body.appendChild(divEl);
          var retrievedEl = window.document.getElementById('foo');
          this.expect(retrievedEl.id).toEqual('foo');
          this.expect(retrievedEl.innerHTML).toEqual('bar');
        });

    jasmineInstance.it('looks for some DOM',
        function() {
          var retrievedEl = window.document.getElementById('foo');
          this.expect(retrievedEl).toBeFalsy();
        });

    jasmineRunner.execute();

    var specResults = reporter.getResultsForSpec(0);
    expect(specResults.result).toMatch('passed');
    specResults = reporter.getResultsForSpec(1);
    expect(specResults.result).toMatch('passed');
  });
});