module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        watch: {
            options: {
                livereload: true,
            },
            less: {
                files: ['less/*'],
                tasks: ['less:production', 'less:development'],
                options: {
                    livereload: false
                }
            },
            css: {
                files: ['dist/*.css']
            },
            js: {
                files: ['js/*'],
                tasks: ['uglify']
            }
        },



        less: {
            development: {
                options: {
                    paths: ["less"]
                },
                files: {
                    "dist/udata.css": "less/main.less",
                    sourceMap: true
                }
            },
            production: {
                options: {
                    paths: ["less"],
                    compress: true,
                    sourceMap: true
                },
                files: {
                    "dist/udata.min.css": "less/main.less"
                }
            }
        },


        uglify: {
            minified: {
                options: {
                    banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    mangle: false
                },
                files: {
                    'dist/udata.min.js': [
                        'js/main.js'
                    ]
                }
            },
            beautified: {
                options: {
                    banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    mangle: false,
                    beautify: {
                        width: 80,
                        beautify: true
                    }
                },
                files: {
                    'dist/udata.js': [
                        'js/main.js'
                    ]
                }
            },
        }


    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', ['less:production', 'uglify:beautified', 'uglify:minified']);

};
