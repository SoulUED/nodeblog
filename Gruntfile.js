/**
 * Created by qinghui on 14/8/21.
 */
"use strict";


module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        copy: {
            css: {
                files: [
                    {
                        expand: true,
                        cwd: "css/",
                        src: ["*.css","**/*.css"],
                        dest: "build/css"
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: "js/",
                        src: ["*.min.js"],
                        dest: "build/js"
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        src: ["*.html"],
                        dest: "build/",
                        ext: ".html.php"
                    }
                ]
            },
            source: {
                files: [
                    {
                        expand: true,
                        cwd: "img/",
                        src: ["*.png","*.jpg","*.gif"],
                        dest: "build/img"
                    },
                    {
                        expand: true,
                        cwd: "font/",
                        src: ["**"],
                        dest: "build/font"
                    }
                ]
            }
        },
        clean: {
            all: ["build/**","build/**/*.*"]
        },
        dataUri: {
            main: {
                options: {
                    target: ["font/*.*"]
                },
                src: ["css/*.css"],
                dest: "css/"
            }
        },
        compass: {
            main: {
                options: {
                    sassDir: "sass/",
                    javascriptsDir: "js/",
                    specify: ["sass/*.scss", "sass/common/*.scss", "!sass/base/*.scss"],
                    imagesDir: "img/",
                    cssDir: "css/",
                    fontsDir: "fonts/",
                    noLineComments: true,
                    require: "ceaser-easing"
                }
            }
        },
        browserify: {
            dist: {
                files: [
                    {src: 'src/admin.js', dest: 'js/admin.min.js'},
                    {src: 'src/back.js', dest: 'js/back.min.js'}
                ]
            }
        },
        watch: {
            browserify: {
                files: ["src/*.js"],
                tasks: ["browserify"]
            },
            css: {
                files: ["sass/*.scss", "sass/common/*.scss"],
                tasks: ["compass:main"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-data-uri');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ["clean", "dataUri", "copy"]);
};
