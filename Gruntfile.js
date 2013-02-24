module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      src: 'static',
      dest: 'static/dist',
      oz: {
        baseUrl: '<%= meta.src %>/js/',
        distUrl: '<%= meta.desc %>/js/'
      },
      banner: '/*! 豆瓣酱 - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= pkg.license %> */'
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
      },
      //static_mappings: {
      //},
      deps: {
        options: {
          banner: '',
        },
        files: [
          {
            flatten: true,
            src: [
              '<%= meta.src %>/components/jquery/jquery.js',
              '<%= meta.src %>/components/bootstrap/docs/assets/js/bootstrap.js',
            ],
            dest: '<%= meta.dest %>/deps/bootstrap.js',
          }
        ]
      },
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: '<%= meta.dest %>/js/',
            src: ['**/?*.js'],
            dest: '<%= meta.dest %>/js/'
          }
        ]
      }
    },
    //istatic: {
      //main: {
        //repos: {
          //'twitter/bootstrap': {
            //commit: '3.0.0-wip',
            //file: {
              //'./docs/assets/js/bootstrap.js': 'static/dist/bootstrap.js',
              //'./docs/assets/css/bootstrap.css': 'static/dist/bootstrap.css',
              //'./docs/assets/fonts': 'static/dist/fonts'
            //}
          //}
        //}
      //}
    //},
    copy: {
      deps: {
        files: [
          {
            expand: true,
            src: [
              '**',
            ],
            cwd: '<%= meta.src %>/components/bootstrap/docs/assets/fonts/',
            dest: '<%= meta.dest %>/fonts/',
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: '<%= meta.src %>/js/',
            src: ['**/?*.js'],
            dest: '<%= meta.dest %>/js/'
          }
        ]
      }
    },
    includereplace: {
      js: {
        src: '<%= meta.src %>/js/**/*.js',
        dest: '<%= meta.dest %>/js/'
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['<%= meta.src %>/css'],
          urlfunc: 'embedurl',
        },
        files: [
          {
            expand: true,
            cwd: '<%= meta.src %>/css/',
            src: ['base.styl'],
            dest: '<%= meta.dest %>/css/',
            ext: '.css'
          }
        ]
      }
    },
    cssmin: {
      deps: {
        files: [
          {
            flatten: true,
            expand: true,
            src: [
              '<%= meta.src %>/components/bootstrap/docs/assets/css/bootstrap.css',
            ],
            dest: '<%= meta.dest %>/deps/',
          },
        ],
      },
      compress: {
        files: [
          {
            expand: true,
            cwd: '<%= meta.dest %>/css/',
            src: ['**/?*.css'],
            dest: '<%= meta.dest %>/css/',
          }
        ]
      }
    },
    watch: {
      js: {
        files: '<%= jshint.files %>',
        tasks: ['copy:js', 'includereplace:js', 'jslint']
      }, 
      css: {
        files: '<%= meta.src %>/css/**/*.styl',
        tasks: ['stylus']
      }
    },
    jshint: {
      files: ['static/dist/js/**/*!{.min}.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    },
    clean: {
      files: ['<%= meta.dest %>/js/', '<%= meta.dest %>/css/', '<%= meta.dest %>/deps/']
    },
  });

  // Default task.
  grunt.registerTask('dist_js', ['copy:js', 'includereplace:js', 'jshint']);
  grunt.registerTask('dist_css', ['stylus']);

  grunt.registerTask('deps', ['uglify:deps', 'cssmin:deps', 'copy:deps']);

  grunt.registerTask('default', ['clean', 'deps', 'dist_js', 'dist_css']);

  grunt.registerTask('build', ['dist_js', 'dist_css', 'uglify', 'cssmin']);
  //grunt.registerTask('init', ['istatic']);

  // build files and add it in git
  grunt.registerTask('build', function() {
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-include-replace');
  //grunt.loadNpmTasks('grunt-istatic');
};
