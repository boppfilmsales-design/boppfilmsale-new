var http = require('https');
var opts = {
  hostname: 'boppfilmsale-new.vercel.app',
  path: '/api/upload-image',
  method: 'POST',
  headers: {}
};
var req = http.request(opts, function(res) {
  var b = '';
  res.on('data', function(c) { b += c; });
  res.on('end', function() {
    console.log('Status: ' + res.statusCode);
    console.log('Body: ' + b);
  });
});
req.on('error', function(e) { console.log('Error: ' + e.message); });
req.end();
