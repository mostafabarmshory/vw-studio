/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


angular.module('vwStudio')
	/*
	 * State machine of the system
	 * 
	 */
	.config(function ($routeProvider) {
		var defaultSidenavs = ['amh.cms.pages.sidenav',
			'amh.workbench.weburger.widgets',
			'amh.workbench.weburger.settings',
			'amh.workbench.weburger.templates',
			'amh.workbench.weburger.navigator',
			'amh.workbench.content',
			// 'amh.workbench.contentMetadata',
			// 'amh.workbench.termTaxonomies'
		];

		$routeProvider //
			.otherwise({
				redirectTo: '/'
			})
			/**
			 * @ngdoc ngRoute
			 * @name /
			 * @description Main page of the site
			 */
			.when('/', {
				templateUrl: 'views/amh-content-editor.html',
				helpId: 'amh-content',
				groups: ['workbench'],
				sidenavs: defaultSidenavs,
			})
			/**
			 * @ngdoc ngRoute
			 * @name /home/:language
			 * @description Main page of the site
			 */
			.when('/home/:language', {
				templateUrl: 'views/amh-content-editor.html',
				helpId: 'amh-content',
				groups: ['workbench'],
				sidenavs: defaultSidenavs,
			})
			/**
			 * @ngdoc ngRoute
			 * @name /home/:language
			 * @description Main page of the site
			 */
			.when('/home', {
				templateUrl: 'views/amh-content-editor.html',
				helpId: 'amh-content',
				groups: ['workbench'],
				sidenavs: defaultSidenavs,
			})

			/**
			 * @ngdoc ngRoute
			 * @name /content/:name
			 * @description Display a content value
			 */
			.when('/content/:name', {
				templateUrl: 'views/amh-content-editor.html',
				helpId: 'amh-content',
				groups: ['workbench'],
				sidenavs: defaultSidenavs,
			});
	});