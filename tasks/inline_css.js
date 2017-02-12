/*
 * grunt-inline-css
 * https://github.com/jgallen23/grunt-inline-css
 *
 * Copyright (c) 2013 Greg Allen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var juice = require('juice');

  grunt.registerMultiTask('inlinecss', 'Takes an html file with css link and turns inline.  Great for emails.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    var done = this.async();
    var index = 0;
    var count = this.files.length;

    var increaseCount = function () {
      index++;
      if (index === count) {
        done();
      }
    };

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var filepath = f.src.toString();
      if (typeof filepath !== 'string' || filepath === '') {
        grunt.log.error('src must be a single string');
        increaseCount();
        return false;
      }

      if (!grunt.file.exists(filepath)) {
        grunt.log.error('Source file "' + filepath + '" not found.');
        increaseCount();
        return false;
      }

      grunt.log.writeln("filepath:", filepath);

      juice.juiceFile(filepath, options, function(err, html) {

        if (err) {
          grunt.log.error(err);
          increaseCount();

          return;
        }

        grunt.file.write(f.dest, html);
        grunt.log.writeln('File "' + f.dest + '" created.');

        increaseCount();
      });

    });
  });

};
