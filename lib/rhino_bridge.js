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


