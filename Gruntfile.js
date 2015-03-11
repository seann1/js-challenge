module.exports = function (grunt) {
  grunt.initConfig({
    bgShell: {
      _defaults: {
        bg: true
      },

      watchCompass: {
        cmd: 'compass watch'
      },

      sublime: {
      	cmd: 'subl .',
      	bg: false
      },

      runNode: {
        cmd: 'http-server',
        bg: false
      }
    }
  });


	grunt.loadNpmTasks('grunt-bg-shell');

  grunt.registerTask('default', ['bgShell:watchCompass', 'bgShell:sublime', 'bgShell:runNode']);
};