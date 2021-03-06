var console = {
  log: function (str) {
    print('!!!print!!!' + str);
  },
  error: function (str) {
    print('!!!print!!!' + str);
  }
};

load('vendor/plugins/env-js/dist/env.rhino.js');
window.location = 'vendor/plugins/jazzhands/lib/blank.html';

load('vendor/plugins/jasmine/src/base.js');
load('vendor/plugins/jasmine/src/util.js');
load('vendor/plugins/jasmine/src/Env.js');
load('vendor/plugins/jasmine/src/ActionCollection.js');
load('vendor/plugins/jasmine/src/Matchers.js');
load('vendor/plugins/jasmine/src/NestedResults.js');
load('vendor/plugins/jasmine/src/PrettyPrinter.js');
load('vendor/plugins/jasmine/src/QueuedFunction.js');
load('vendor/plugins/jasmine/src/Reporters.js');
load('vendor/plugins/jasmine/src/Runner.js');
load('vendor/plugins/jasmine/src/Spec.js');
load('vendor/plugins/jasmine/src/Suite.js');
load('vendor/plugins/jasmine/test/mock-timeout.js');
load('vendor/plugins/jazzhands/lib/reporter.js');
load('vendor/plugins/jazzhands/lib/json2.js');

jasmine.include = function (str) {
  load(str);
};

Envjs.scriptTypes = {
  "text/javascript"   :true,
  "text/envjs"        :true
};