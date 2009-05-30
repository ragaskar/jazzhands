describe('TestSuite', function () {
  it('should pass', function () {
    expect(1).toEqual(1);
  });
});

describe('TestSuite2', function () {
  it('should pass', function () {
    expect(true).toEqual(true);
  });

  it('takes a while', function() {
    waits(1000);
    runs(function() {
      expect(true).toEqual(true);
    });
  });

});
