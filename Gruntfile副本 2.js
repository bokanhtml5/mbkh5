module.exports = function(grunt) {

	grunt.initConfig({
        less: {
            // 编译
            compile: {
                files: {
                    'public/mobile/stylesheets/index.css' : 'src/mobile/less/index.less'
                }
            },
			options: {
				cleancss: false,
				ieCompat: true,
				syncImport: true
			}
        },
        watch: {
            css: {
                files: ['src/mobile/less/*.less'],
                tasks: ['less']
            }
        }
    });
 	
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    grunt.registerTask('default', ['less', 'watch']);
};