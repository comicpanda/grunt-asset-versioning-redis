/*
 * grunt-asset-versioning-redis
 * https://github.com/comicpanda/grunt-asset-versioning-redis
 *
 * Copyright (c) 2015 Dev1
 * Licensed under the MIT license.
 */

'use strict';
var redis = require('redis');
    
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('nextversion', 'Get next version from redis', function() {
    var target = this.target,
        done = this.async(),   
        options = this.options({}),
        redisOptions = {
          'socket_keepalive' : false,
          'auth_pass' : options.auth || null
        };
    
    var client = redis.createClient(options.port, options.host, redisOptions), 
        completion = function() {
          client.end();
          done();
        };
    
    client.on('error', function (err) {
        grunt.log.error('Redis Error "' + err);
    });
    
    client.on("connect", function () {
        if (target === 'prepare') {
          client.incr('PRE_'+ options.keyname, function(err, reply) {
            grunt.config.set('nextversion.version', reply);
            completion();  
          });          
        }  else if (target === 'confirm') {          
          client.set(options.keyname, options.nextVersion, function(err, reply){
            completion();
          });          
        } else {
          completion();
        }
    });
  });
};
