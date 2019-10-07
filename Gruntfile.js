module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env : {
            build : {
                src : ".env"
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
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-json');

    grunt.registerTask('check-env', 'Check env vars', function() {
        grunt.log.writeln('Checking required env vars...');

        if (process.env.BASE_URL === undefined) {
            grunt.fail.fatal("Error: BASE_URL environtment variable not set.");
        }
    });

    grunt.registerTask('build', ['env:build', 'check-env', 'json']);

};