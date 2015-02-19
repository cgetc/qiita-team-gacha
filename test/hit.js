var assert = require('assert');
var config = require('../config');

var hit = new Function(config.hit['arg'], 'return ' + config.hit['eval']);

describe('hit', function () {
    var user = {};
    it('10', function () {
        assert.equal(hit({items_count: 10}), true);
    });

    it('50', function () {
        assert.equal(hit({items_count: 50}), true);
    });

    it('100', function () {
        assert.equal(hit({items_count: 100}), true);
    });

    it('200', function () {
        assert.equal(hit({items_count: 200}), true);
    });

    it('11', function () {
        assert.equal(hit({items_count: 11}), false);
    });
});