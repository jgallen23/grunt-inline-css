'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.inline_css = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  basic: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/out.html');
    var expected = grunt.file.read('test/expected/out.html');
    test.equal(actual, expected, 'should inline css');

    test.done();
  },

  with_important: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/out_with_important.html');
    var expected = grunt.file.read('test/expected/out_with_important.html');
    test.equal(actual, expected, 'should inline css');

    test.done();
  },

  does_not_exist: function(test) {
    test.expect(0);

    try {
      var actual = grunt.file.read('tmp/out_does_not_exist.html');
    } catch(err) {

      if (err.origError.code === 'ENOENT') {
        return test.done();
      }

      return test.done(new Error('Should have errored with a file not found: ' + err.code));
    }

    test.done(new Error('Should have errored'));
  }
};
