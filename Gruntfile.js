/*
 * grunt-asset-versioning-redis
 * https://github.com/comicpanda/grunt-asset-versioning-redis
 *
 * Copyright (c) 2015 Dev1
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
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    nextversion: {
      options: {
          keyname : 'ASSET_VERSION',
          port : process.env.REDIS_PORT || 6379,
          host : process.env.REDIS_HOST || '127.0.0.1',
          auth_pass : process.env.REDIS_AUTH || null,
          nextVersion : '456'
      },
      next: {}
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nextversion', 'nodeunit']);
  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'nextversion']);

};
