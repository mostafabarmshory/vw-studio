

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine',
      'detectBrowsers'
    ],

    detectBrowsers: {
    	enabled: true,
    	usePhantomJS: false,
    	preferHeadless: true
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/lodash/lodash.js',
      'bower_components/mustache.js/mustache.js',
      'bower_components/seen-core/dist/seen-core.js',
      'bower_components/seen-user/dist/seen-user.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/seen-bank/dist/seen-bank.js',
      'bower_components/seen-tenant/dist/seen-tenant.js',
      'bower_components/seen-cms/dist/seen-cms.js',
      'bower_components/seen-monitor/dist/seen-monitor.js',
      'bower_components/flux/dist/Flux.js',
      'bower_components/am-wb-core/dist/am-wb-core.js',
      'bower_components/ng-appcache/dist/appcache.js',
      'bower_components/lf-ng-md-file-input/dist/lf-ng-md-file-input.js',
      'bower_components/angular-recaptcha/release/angular-recaptcha.js',
      'bower_components/blob-polyfill/Blob.js',
      'bower_components/file-saver.js/FileSaver.js',
      'bower_components/angular-file-saver/dist/angular-file-saver.bundle.js',
      'bower_components/material-steppers/dist/material-steppers.js',
      'bower_components/angular-material-persian-datepicker/dist/datePicker.min.js',
      'bower_components/jspanel4x/dist/jspanel.js',
      'bower_components/tinymce/tinymce.js',
      'bower_components/tinycolor/tinycolor.js',
      'bower_components/md-color-picker/dist/md-color-picker.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/weakmap-polyfill/weakmap-polyfill.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/moment/moment.js',
      'bower_components/loglevel/dist/loglevel.min.js',
      'bower_components/mblowfish-core/dist/mblowfish-core.js',
      'bower_components/mblowfish-language/dist/mblowfish-language.js',
      'bower_components/angular-material-dashboard/dist/angular-material-dashboard.js',
      'bower_components/angular-material-dashboard-account/dist/angular-material-dashboard-account.js',
      'bower_components/seen-supertenant/dist/seen-supertenant.js',
      'bower_components/angular-material-dashboard-tenant/dist/angular-material-dashboard-tenant.js',
      'bower_components/angular-material-dashboard-cms/dist/angular-material-dashboard-cms.js',
      'bower_components/angular-material-dashboard-spa/dist/angular-material-dashboard-spa.js',
      'bower_components/angular-material-dashboard-bank/dist/angular-material-dashboard-bank.js',
      'bower_components/angular-material-dashboard-user/dist/angular-material-dashboard-user.js',
      'bower_components/seen-seo/dist/seen-seo.js',
      'bower_components/angular-material-dashboard-seo/dist/angular-material-dashboard-seo.js',
      'bower_components/seen-shop/dist/seen-shop.js',
      'bower_components/angular-material-dashboard-shop/dist/angular-material-dashboard-shop.js',
      'bower_components/angular-material-dashboard-wallet/dist/angular-material-dashboard-wallet.js',
      'bower_components/seen-sdp/dist/seen-sdp.js',
      'bower_components/angular-material-dashboard-sdp/dist/angular-material-dashboard-sdp.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],
    
    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // coverage reporter generates the coverage
    reporters: [
    	'progress', 
    	'coverage'
    ],
    
    // optionally, configure the reporter
    coverageReporter: {
    	dir : 'coverage/',
    	reporters: [{
    		type : 'lcovonly',
    		file : 'lcov.info'
    	},{
    		type: 'text-summary'
    	}]
    },

    preprocessors: {
      'src/scripts/**/*.js': ['coverage']
    },

    // Which plugins to enable
    plugins: [
    	'karma-jasmine',
    	'karma-coverage',
    	
        'karma-chrome-launcher',
        'karma-edge-launcher',
        'karma-firefox-launcher',
        'karma-ie-launcher',
        'karma-safari-launcher',
        'karma-safaritechpreview-launcher',
        'karma-opera-launcher',
        'karma-detect-browsers'
    ],
    
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
