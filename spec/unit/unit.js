var assert = require('assert');

var services = require('../../braintree-factory');
var braintreeService = services.braintreeService;
var fullBraintreeService = services.fullBraintreeService;

describe('braintreeService', function() {

  it('throws error if path constant is null', function() {
    assert.throws(braintreeService.bind(null, null, {}));
  });

  it('attempts to fetch client token from path constant', function() {
    var callsHttpGet = false;
    var $http = {
      get: function(path) {
        callsHttpGet = true;
        return {
          success: function() {
            return {
              error: function() {}
            }
          }
        };
      }
    };

    var service = new braintreeService('/bogus-path', $http);
    assert.ok(callsHttpGet, 'calls $http.get() on startup');
  });

});

describe('fullBraintreeService', function() {

  it('matches the arguments of braintreeService', function() {
    var fnStr = braintreeService.toString();
    var argStartOffset = 'function braintreeService('.length;
    var argEndOffset = fnStr.indexOf(')');
    var argStr = fnStr.slice(argStartOffset, argEndOffset);
    var args = argStr.split(',').map(function(s){return s.trim()});

    var depLength = fullBraintreeService.length;
    var fullDependencies = fullBraintreeService.slice(0, depLength - 1);

    assert.deepEqual(args, fullDependencies);
  });

});
