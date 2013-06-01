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
    // Store reference to local scope
    var _this = this,
        done = this.async(),
        index = 0,
        count = this.files.length,
        filepath;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      filepath = f.src.toString();
      if (typeof filepath !== 'string') {
        grunt.log.error('src must be a single string');
        return false;
      }

      if (!grunt.file.exists(filepath)) {
        grunt.log.error('Source file "' + filepath + '" not found.');
        return false;
      }
      
      juice(filepath, _this.data.options, function(err, html) {

        if (err) {
          return grunt.log.error(err);
        }

        grunt.file.write(f.dest, html);
        grunt.log.writeln('File "' + f.dest + '" created.');

        index++;
        if (index === count) {
          done();
        }

      });

    });
  });

};
