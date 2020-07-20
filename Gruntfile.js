//Generated on 2016-11-10 using generator-angular 0.15.1
'use strict';

//# Globbing
//for performance reasons we're only matching one level down:
//'test/spec/{,*/}*.js'
//use this if you want to recursively match all subfolders:
//'test/spec/**/*.js'

module.exports = function(grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);
	//MODIFIED: add require for connect-modewrite
	var modRewrite = require('connect-modrewrite');

	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin',
		ngtemplates: 'grunt-angular-templates',
		cdnify: 'grunt-google-cdn',
		compress: 'grunt-contrib-compress',
		configureProxies: 'grunt-connect-proxy',
		uglify: 'grunt-contrib-uglify-es'
	});

	var bowerJson = require('./bower.json');
	// Configurable paths for the application
	var appConfig = {
		app: bowerJson.appPath || 'app',
		moduleName: bowerJson.moduleName,
		name: bowerJson.name || 'no-name',
		version: bowerJson.version || 'no-version',
		license: bowerJson.license || 'no-license',
		title: bowerJson.title || 'no-title',
		description: bowerJson.description || 'no-descripiton',
		homepage: bowerJson.homepage || 'no-home',
		backend: bowerJson.backend || {
			host: 'localhost',
			port: 8080
		},
		dist: 'dist'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({
		// Project settings
		yeoman: appConfig,
		// Watches files for changes and runs tasks based on the changed
		// files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
				tasks: ['injector', 'newer:jshint:all', 'newer:jscs:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			jsTest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: [
					'newer:jshint:test',
					'newer:jscs:test',
					'karma:unit']
			},
			styles: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
				tasks: ['injector', 'newer:copy:styles', 'postcss']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9001,
				// Change this to '0.0.0.0' to access the server from
				// outside.
				hostname: 'localhost',
				livereload: 35729
			},
			proxies: [{
				context: '/', // the context of the data service
				host: '<%= yeoman.backend.host %>',
				port: '<%= yeoman.backend.port %>',
				changeOrigin: true,
				headers: {
					host: '<%= yeoman.backend.host %>'
				}
			}],
			livereload: {
				options: {
					open: true,
					middleware: function(connect, options) {
						var middlewares = [];
						//Matches everything that does not contain a '.' (period)
						middlewares.push(modRewrite(['!/api/.*|.*\\..* /index.html [L]']));
						middlewares.push(connect.static('.tmp'));
						middlewares.push(
							connect()
								.use('/bower_components', connect.static('./bower_components')));
						middlewares.push(
							connect()
								.use('/app/styles', connect.static('./app/styles')));
						middlewares.push(
							connect()
								.use('/modules', connect.static('./modules')));
						middlewares.push(connect.static(appConfig.app));
						middlewares.push(connect.static('dist'));
						options.base.forEach(function(base) {
							middlewares.push(connect.static(base));
						});
						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}

						// Setup the proxy
						middlewares
							.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

						// Serve static files
						options.base.forEach(function(base) {
							middlewares.push(connect.static(base));
						});

						return middlewares;
					}
				}
			},
			test: {
				options: {
					port: 9001,
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect()
								.use('/bower_components',
									connect
										.static('./bower_components')),
							connect.static(appConfig.app)];
					}
				}
			},
			dist: {
				options: {
					open: true,
					middleware: function(connect, options) {
						var middlewares = [];
						//Matches everything that does not contain a '.' (period)
						middlewares.push(modRewrite(['!/api/.*|.*\\..* /index.html [L]']));
						middlewares.push(connect.static(appConfig.dist));

						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}

						// Setup the proxy
						middlewares
							.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

						// Serve static files
						options.base.forEach(function(base) {
							middlewares.push(connect.static(base));
						});

						return middlewares;
					}
				}
			}
		},

		// Make sure there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: ['Gruntfile.js',
					'<%= yeoman.app %>/scripts/{,*/}*.js']
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},

		// Make sure code styles are up to par
		jscs: {
			options: {
				config: '.jscsrc',
				verbose: true
			},
			all: {
				src: ['Gruntfile.js',
					'<%= yeoman.app %>/scripts/**/*.js']
			},
			test: {
				src: ['test/spec/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: ['.tmp', '<%= yeoman.dist %>/{,*/}*',
						'!<%= yeoman.dist %>/.git{,*/}*']
				}]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		postcss: {
			options: {
				processors: [require('autoprefixer-core')({
					browsers: ['last 1 version']
				})]
			},
			server: {
				options: {
					map: true
				},
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: [
					'<%= yeoman.app %>/index.html',
					'<%= yeoman.app %>/offline.html'
				],
				ignorePath: /\.\.\//
			},

			test: {
				devDependencies: true,
				src: '<%= karma.unit.configFile %>',
				ignorePath: /\.\.\//,
				fileTypes: {
					js: {
						block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
						detect: {
							js: /'(.*\.js)'/gi
						},
						replace: {
							js: '\'{{filePath}}\','
						}
					}
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that
		// automatically
		// concat, minify and revision files. Creates configurations in
		// memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on filerev and the useminPrepare
		// configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			js: ['<%= yeoman.dist %>/scripts/**/*.js'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>',
					'<%= yeoman.dist %>/images',
					'<%= yeoman.dist %>/styles'],
				patterns: {
					js: [[
						/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g,
						'Replacing references to images']]
				}
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: ['*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		ngtemplates: {
			dist: {
				options: {
					module: '<%= yeoman.moduleName %>',
					htmlmin: '<%= htmlmin.dist.options %>',
					usemin: 'scripts/scripts.js'
				},
				cwd: '<%= yeoman.app %>',
				src: [
					'views/**/*.html',
					'scripts/**/*.html'
				],
				dest: '.tmp/templateCache.js'
			}
		},

		// ng-annotate tries to make the code safe for minification
		// automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html'],
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= yeoman.app %>',
						dest: '<%= yeoman.dist %>',
						src: ['*.{ico,png,txt}', '*.html',
							'images/{,*/}*.{webp}',
							'styles/fonts/{,*/}*.*']
					}, {
						expand: true,
						cwd: '.tmp/images',
						dest: '<%= yeoman.dist %>/images',
						src: ['generated/*']
					}, { // resources
						expand: true,
						dot: true,
						cwd: '<%= yeoman.app %>/resources',
						src: '**/*.*',
						dest: '<%= yeoman.dist %>/resources',
					}
				]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: ['copy:styles'],
			test: ['copy:styles'],
			dist: [
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		},

		// Test settings
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			},
			debug: {
				configFile: 'test/karma.conf.js',
				port: 9999,
				singleRun: false,
				browsers: ['Chrome'],
				preprocessors: {}
			}
		},

		/*
		 * محصول ایجاد شده را به صورت فشرده تولید می‌کند.
		 * 
		 * این محصول قابلیت نصب روی سرورهای سین را دارد. برای فشرده سازی
		 * از zip استفاده شده است. اطلاعات کامل در مورد نظیم این بسته در
		 * مسیر زیر وجود دارد.
		 * 
		 * https://github.com/gruntjs/grunt-contrib-compress
		 */
		compress: {
			main: {
				options: {
					archive: '<%= yeoman.name %>.zip',
					mode: 'zip'
				},
				expand: true,
				cwd: 'dist/',
				src: ['**/*']
			}
		},

		/*
		 * فایل‌های مورد نیاز رو به صورت خودکار ایجاد می‌کنه. یکی از
		 * فایل‌هایی که برای کارهامون نیاز داریم فایل spa.json هست که
		 * توش اطلاعاتی راجع به این برنامه قرار می‌گیره. سرورهای ما این
		 * فایل رو پردازش می‌کنند.
		 * 
		 * ساختن فایل‌ها با استفاده از ابزار grunt--creator انجام
		 * می‌شود. برای اطلاع بیشتر در مورد این بسته به آدرس زیر مراجعه
		 * کنید:
		 * 
		 * 
		 */
		'file-creator': {
			spa: {
				'dist/spa.json': function(fs, fd, done) {
					/*
					 * تمام خصوصیت‌های مورد نیاز برای نرم‌افزارها بر
					 * اساس استاندارد سین تعیین شده است. این نرم افزار
					 * به روی سایر سرورهایی که از این پروتکل حمایت
					 * می‌کنند نیز قابل استفاده است.
					 */
					fs.writeSync(fd, JSON.stringify({
						name: appConfig.name,
						version: appConfig.version,
						license: appConfig.license,
						title: appConfig.title,
						description: appConfig.description,
						homepage: appConfig.homepage,
						index: 'index.html'
					}));
					done();
				}
			}
		},

		/*
		 * پرونده مانیفست برای پروژه ایجاد می‌کند. این پرونده برای ایجاد
		 * نرم‌افزارهایی استفاده می‌شود که می‌خواهند از خصوصیت appcache
		 * در html5 استفاده کنند. با این کار تمام کدها سمت کاربر نگهداری
		 * می‌شود و منجب به افزایش سرعت لود سایت خواهد شد. نکته اینکه
		 * مدیریت به روز رسانی برنامه‌ها با کاربر است.
		 * 
		 * پرونده مورد نیاز با استفاده از بسته grunt-manifest ایجاد
		 * می‌شود. برای اطلاع در مورد این ابزار پیوند زیر را ببینید.
		 * 
		 * https://github.com/gunta/grunt-manifest
		 */
		manifest: {
			appcache: {
				options: {
					basePath: '<%= yeoman.dist %>',
					network: ['*'],
					fallback: ['/offline.html'],
					preferOnline: true,
					headcomment: ' <%= yeoman.name %> v<%= yeoman.version %>',
					verbose: true,
					timestamp: true,
					hash: true,
					master: ['index.html']
				},
				src: [
					'*.{html,ico,json}',
					'styles/*.css',
					'styles/fonts/*.{woff,woff2,svg,ttf,eot,ijmap}',
					'images/*.{svg,png,jpeg}',
					'images/*/*.{svg,png,jpeg}',
					'scripts/*.js',
					//					'scripts/plugins/**/*.*',
					//					'scripts/themes/**/*.*',
					//					'scripts/skins/**/*.*',
				],
				dest: '<%= yeoman.dist %>/manifest.appcache'
			}
		},

		/*
		 * Inject project files into the HTMLS
		 * 
		 * SEE: https://github.com/klei/grunt-injector
		 */
		injector: {
			options: {
				// Task-specific options go here.
				relative: true,
				addRootSlash: false
			},
			project_files: {
				files: {
					'<%= yeoman.app %>/index.html': [
						'<%= yeoman.app %>/scripts/**/*.js',
						'<%= yeoman.app %>/styles/**/*.css'
					],
				}
			}

		},

		/*
		 * Copy bower components resources into the dist
		 */
		bowercopy: {
			options: {
			},
			resources: {
				options: {
				},
				files: {
					'<%= yeoman.dist %>': '*/dist/resources/',
					'<%= yeoman.dist %>/scripts/plugins': 'tinymce/plugins/',
					'<%= yeoman.dist %>/scripts/themes': 'tinymce/themes/',
					'<%= yeoman.dist %>/scripts/skins': 'tinymce/skins/',
				}
			},
		}
	});

	grunt.registerTask('setversion', function(arg1) {
		console.log('Attempting to update version to ' + arg1);
		var parsedJson = grunt.file.readJSON('bower.json');//read in the current
		parsedJson.version = arg1; //set the top level version field to arg1
		grunt.file.write('bower.json', JSON.stringify(parsedJson, null, 2));
	});

	grunt.registerTask('serve',
		'Compile then start a connect web server',
		function(target) {
			if (target === 'dist') {
				return grunt.task.run([
					'build',
					'configureProxies:server',
					'connect:dist:keepalive'
				]);
			}

			grunt.task.run([
				'clean:server',
				'bowercopy',
				'wiredep',
				'injector',
				'concurrent:server',
				'postcss:server',
				'configureProxies:server',
				'connect:livereload',
				'watch'
			]);
		});

	grunt.registerTask(
		'server',
		'DEPRECATED TASK. Use the "serve" task instead',
		function(target) {
			grunt.log
				.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
			grunt.task.run([
				'serve:' + target
			]);
		});

	grunt.registerTask('test', [
		'clean:server',
		'wiredep',
		'injector',
		'concurrent:test',
		'postcss',
		'connect:test',
		'ngtemplates', //
		'karma:unit'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'wiredep',
		'injector',
		'useminPrepare',
		'concurrent:dist',
		'postcss',
		'ngtemplates',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'bowercopy',
		//		'cdnify', 
		'cssmin',
		'uglify',
		//		'filerev',
		'usemin',
		'htmlmin',
		'file-creator',
		'manifest',
		'compress'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'newer:jscs',
		'test',
		'build'
	]);

	grunt.registerTask('debug', [ //
		'clean', //
		'wiredep', //
		'injector', //
		'concurrent:server', //
		'postcss', //
		'ngtemplates', //
		'karma:debug' //
	]);
};
