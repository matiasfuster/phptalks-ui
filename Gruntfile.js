module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            build: {
                src: ".env"
            }
        },
        json: {
            main: {
                options: {
                    namespace: 'CONFIG',
                    includePath: false,
                    pretty: true,
                    processContent: function (content) {
                        content.base_url = process.env.BASE_URL;
                        return content;
                    }
                },
                src: ['js/config/**.json'],
                dest: 'js/config.js'
            }
        },
        uglify: {
            build: {
                sourceMap: true,
                files: {
                    'dist/js/main.min.js': ['js/config.js', 'js/main.js']
                }
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: 'dist/index.html'
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['images/**'],
                        dest: 'dist/'
                    },
                    // includes files within path
                    {
                        expand: true,
                        src: ['css/**'],
                        dest: 'dist/'
                    },
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['index.html'],
                        dest: 'dist/'
                    }
                ],
            },
        },
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-json');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('check-env', 'Check env vars', function () {
        grunt.log.writeln('Checking required env vars...');

        if (process.env.BASE_URL === undefined) {
            grunt.fail.fatal("Error: BASE_URL environtment variable not set.");
        }
    });
    grunt.registerTask('build:dev', ['env:build', 'check-env', 'json']);
    grunt.registerTask('build', ['env:build', 'check-env', 'json', 'uglify', 'copy', 'usemin']);

};