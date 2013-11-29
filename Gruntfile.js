/*global module, require*/
module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        copy: {
            main: {
                files: [
                    {
                        src: 'bower_components/backbone/backbone-min.js',
                        dest: 'dist/js/lib/backbone.js'
                    }, {
                        src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                        dest: 'dist/js/lib/bootstrap.js'
                    }, {
                        src: 'bower_components/jquery/jquery.min.js',
                        dest: 'dist/js/lib/jquery.js'
                    }, {
                        src: 'bower_components/underscore/underscore-min.js',
                        dest: 'dist/js/lib/underscore.js'
                    }, {
                        src: 'bower_components/requirejs/require.js',
                        dest: 'dist/js/lib/require.js'
                    }, {
                        src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        dest: 'dist/style/bootstrap.min.css'
                    }
                ]
            }
        }

    });

    grunt.registerTask('default', ['copy']);
};
