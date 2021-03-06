module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON('package.json')

    sass:
      dist:
        files: [
          expand: true
          cwd: 'src/scss'
          src: ['**/index.scss']
          dest: 'public/css'
          ext: '.css'
        ]

    coffee:
      dist:
        files: [
          expand: true
          cwd: 'src/coffee'
          src: '**/*.coffee'
          dest: 'tmp/js'
          ext: '.js'
        ]

    haml:
      dist:
        files: [
          expand: true
          cwd: 'src/haml'
          src: ['**/*.haml']
          dest: 'public'
          ext: '.html'
        ]

    copy:
      main:
        files: [
          expand: true
          cwd: 'src/images/'
          src: ['**']
          dest: 'public/images'
          filter: 'isFile'
        ]

    concat:
      dist:
        src: ['tmp/**/*.js'],
        dest: 'public/js/index.js',

    clean: ['tmp']

    watch:
      sass:
        files: 'src/scss/**/*.scss'
        tasks: ['sass']
      coffee:
        files: 'src/coffee/**/*.coffee'
        tasks: ['coffee', 'concat']
      haml:
        files: 'src/haml/**/*.haml'
        tasks: ['haml']
      images:
        files: 'src/images/**'
        tasks: ['copy']

  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-haml')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('compile', ['sass', 'coffee', 'haml', 'concat', 'copy', 'clean'])
  grunt.registerTask('default', ['compile', 'watch'])
