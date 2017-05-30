/*
 * grunt-inline-css
 * https://github.com/jgallen23/grunt-inline-css
 *
 * Copyright (c) 2013 Greg Allen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    inlinecss: {
      basic: {
        options: {
          extraCss: 'body { background: green; }',
        },
        files: {
          'tmp/out.html': 'test/fixtures/in.html'
        },
      },
      with_important: {
        options: {
          extraCss: 'body { background: green; }',
          preserveImportant: true
        },
        files: {
          'tmp/out_with_important.html': 'test/fixtures/in.html'
        },
      },
      does_not_exist: {
        options: {},
        files: {
          'tmp/out_does_not_exist.html': 'test/fixtures/in_does_not_exist.html'
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
      options: {
        reporter: 'default'
      }
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'inlinecss', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
