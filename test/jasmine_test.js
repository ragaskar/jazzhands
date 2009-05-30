var console = {
  log: function(string) {
    print(string);
  }
};

var runJasmineTests = function () {
  window.location = '../jasmine/test/bootstrap.html';
  jasmine.include = function(filename) {
    return eval(readFile('../jasmine/test/' + filename));
  };

  window.runTests();

  print(document.getElementById('results_summary').innerHTML);
  print(document.getElementById('fails').innerHTML);

};
load('../env-js/dist/env.rhino.js');
__env__.scriptTypes = {
  "text/javascript"   :true,
  "text/envjs"        :true
};

runJasmineTests();
