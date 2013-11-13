/*
 * grunt-inline-css
 * https://github.com/straker/grunt-inline-css
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
    var options = this.data.options;
    var done = this.async();
    var index = 0;
    var count = this.files.length;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var filepath = f.src.toString();
      if (typeof filepath !== 'string') {
        grunt.log.error('src must be a single string');
        return false;
      }

      if (!grunt.file.exists(filepath)) {
        grunt.log.error('Source file "' + filepath + '" not found.');
        return false;
      }

      juice(filepath, options, function(err, html) {

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

  grunt.registerMultiTask('inlinecontent', 'Takes an html file and css files and turns inline.  Great for emails.', function() {
    // There are no options for juice.inlinecontent
    var done = this.async();
    var index = 0;
    var count = this.files.length;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var htmlpath = f.src.toString();
      var csspath = '';
      var html = '';
      var css = '';
      var error = false;

      if (typeof htmlpath !== 'string') {
        grunt.log.error('src must be a single string');
        return false;
      }

      if (!grunt.file.exists(htmlpath) || !htmlpath) {
        grunt.log.error('Source file "' + htmlpath + '" not found.');
        return false;
      }

      html = grunt.file.read(htmlpath).toString();

      // Iterate over all css files
      f.css.forEach(function(c) {
        csspath = c.toString();

        if (typeof csspath !== 'string') {
          grunt.log.error('src must be a single string');
          error = true;
          return false;
        }

        if (!grunt.file.exists(csspath) || !csspath) {
          grunt.log.error('CSS file "' + csspath + '" not found.');
          error = true;
          return false;
        }

        css += grunt.file.read(csspath).toString();
      });

      if (!error) {
        grunt.file.write(f.dest, juice.inlineContent(html, css));
        grunt.log.writeln('File "' + f.dest + '" created.');
      }


      index++;
      if (index === count) {
        done();
      }

    });
  });

};
