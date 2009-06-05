var console = {
  log: function (str) {
    print('!!!print!!!' + str);
  },
  error: function (str) {
    print('!!!print!!!' + str);
  }
};

load('lib/env-js/dist/env.rhino.js');
load('lib/jasmine/src/base.js');
load('lib/jasmine/src/util.js');
load('lib/jasmine/src/Env.js');
load('lib/jasmine/src/ActionCollection.js');
load('lib/jasmine/src/Matchers.js');
load('lib/jasmine/src/NestedResults.js');
load('lib/jasmine/src/PrettyPrinter.js');
load('lib/jasmine/src/QueuedFunction.js');
load('lib/jasmine/src/Reporters.js');
load('lib/jasmine/src/Runner.js');
load('lib/jasmine/src/Spec.js');
load('lib/jasmine/src/Suite.js');
load('lib/jasmine/test/mock-timeout.js');
load('lib/jazz-hands/dist/reporter.js');
load('lib/jazz-hands/dist/json2.js');

var reader = new java.io.BufferedReader(new java.io.InputStreamReader(java.lang.System['in']));
var line;
while (line = reader.readLine()) {
  line = '' + line;
  if (line == 'exit') break;
  var result;
  try {
    result = 'ok ' + encodeURI(eval(line));
  } catch(e) {
    result = 'error ' + encodeURI(e);
  }
  print('!!!magic!!! ' + result);
}
