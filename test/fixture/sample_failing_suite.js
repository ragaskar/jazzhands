describe('Sample Suite', function() {
  it('has a passing test with one expectation and a really really really really really REALLY REALLY REALLY long spec name', function() {
     runs(function () {
       expect(true).toEqual(true);
     });
   });

   it('has a failing test with two expectations', function() {
     runs(function () {
       expect(false).toEqual(true);
       expect(true).toEqual(true);
     });
   });
  
});