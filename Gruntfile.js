module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlhint: {
		    build: {
		        options: {
		            'tag-pair': true,
		            'tagname-lowercase': true,
		            'attr-lowercase': true,
		            'attr-value-double-quotes': true,
		            'doctype-first': true,
		            'spec-char-escape': true,
		            'id-unique': true,
		            'style-disabled': true
		        },
		        src: ['*.html']
		    }
		},

		watch: {
		    html: {
		        files: ['*.html'],
		        tasks: ['htmlhint']
		    },

		    css: {
		        files: ['scss/*.scss'],
		        tasks: ['buildcss']
		    },

		    js: {
		        files: ['js/init.js' , 'js/Mars.js', 'js/MartianRobot.js', 'spec/MarsSpec.js'],
		        tasks: ['uglify','jasmine']
		    }
		},

		uglify: {
		    build: {
		        files: {
		            'js/app.js': ['js/Mars.js','js/MartianRobot.js','js/init.js']
		        }
		    }
		},

		cssmin: {
		    build: {
		        src: 'css/main.css',
		        dest: 'css/main.css'
		    }
		},

		sass: {
		    build: {
		        files: {
		            'css/main.css': 'scss/main.scss'
		        }
		    }
		},
		jasmine: {
		    pivotal: {
		      src: ['js/jquery.js','js/Mars.js','js/MartianRobot.js'],
		      options: {
		        specs: 'spec/*Spec.js',
		        helpers: 'spec/*Helper.js'
		      }
		    }
		  }

    });

    grunt.registerTask('default', []);
    grunt.registerTask('buildcss',  ['sass', 'cssmin']);
    grunt.loadNpmTasks('grunt-contrib-jasmine');

};