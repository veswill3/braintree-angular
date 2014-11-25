var express = require('express');
var braintree = require('braintree');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "8t9kz9kbkcfh6nv5",
  publicKey: "jdnfthhytbhxhtdf",
  privateKey: "2dbc90489ad56267e7caa6790f971017"
});

var angularStr = fs.readFileSync('../../node_modules/angular/angular.js', 'utf8');
var braintreeAngularStr = fs.readFileSync('../../dist/braintree-angular.js', 'utf8');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/client-token', function(req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    var clientToken = response.clientToken
    res.send(clientToken);
  });
});

app.post('/buy-something', function(req, res) {
  var nonce = req.body.payment_method_nonce;
  gateway.transaction.sale({
    amount: "10.00",
    paymentMethodNonce: nonce
  }, function (err, result) {
    if (err) {
      res.send('error:', err);
    } else {
      res.send('successfully charged $10, check your sandbox dashboard!');
    }
  });
});

app.get('/angular.js', function(req, res) {
  res.send(angularStr);
});

app.get('/braintree-angular.js', function(req, res) {
  res.send(braintreeAngularStr);
});

app.use(express.static(__dirname));

var port = 8000;
app.listen(port, function() {
  console.log('Running on port '+port);
});