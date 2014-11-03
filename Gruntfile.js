module.exports = function(grunt) {

    var src = ['src/**/*.js', '!src/**/*.spec.js'];
    var specs = ['src/**/*.spec.js'];
    var gruntfile = 'Gruntfile.js';

    // config
    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        concat: {
            build: {
                src: src,
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        jasmine: {
            tests: {
                src: src,
                options: {
                    specs: specs,
                    helpers: [],
                    vendor: ['bower_components/jquery/dist/jquery.js']
                }
            }
        },
        jshint: {
            beforeconcat: [gruntfile].concat(src, specs),
            afterconcat: ['dist/<%= pkg.name %>.js']
        },
        watch: {
            all: {
                files: [gruntfile].concat(src, specs),
                tasks: ['default', 'jshint', 'test'],
                options: {
                    reload: true
                }
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['-a']
            }
        }
    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-bump');

    // tasks
    grunt.registerTask('build', ['concat:build']);
    grunt.registerTask('test', ['jasmine:tests']);
    grunt.registerTask('default', ['build', 'test']);
};
