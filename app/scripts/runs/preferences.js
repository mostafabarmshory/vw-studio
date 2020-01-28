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

/**
 * Adds basic system settings
 * 
 */
angular.module('vwStudio').run(function ($preferences) {
	$preferences
	
	/**
	 * @ngdoc preferences
	 * @name crisp-chat
	 * @description adds crisp chat into the page
	 */
	.newPage({
		id : 'crisp-chat',
		title : 'CRISP chat',
		templateUrl : 'views/preferences/mb-crisp-chat.html',
		description : 'Give your customer messaging experience a human touch with CRISP.',
		icon : 'chat',
		tags : [ 'chat' ]
	})
	
	/**
	 * @ngdoc preferences
	 * @name main-page-template
	 * @description Set initial template for main page of the current SPA
	 * 
	 * This page is used to init main page and used in the initial process
	 */
	.newPage({
		id: 'main-page-template',
		templateUrl: 'views/preferences/main-page-template.html',
		controller: 'AmhMainPageTmplCtrl',
		title: 'Main Page Template',
		description: 'Set initial template for main page.',
		icon: 'view_quilt',
		priority: 1,
		hidden: true,
		required: true
	})
	
	/**
	 * @ngdoc preferences
	 * @name pageNotFound
	 * @description Manage page not found page
	 * 
	 * In this preference page, user are allowed to design the page 
	 * of NOT FOUND.
	 * 
	 */
	.newPage({
		id: 'pageNotFound',
		templateUrl: 'views/preferences/pageNotFound.html',
		title: 'Page not found',
		description: 'Default error page of the application.',
		icon: 'pageview',
		helpId: 'page-not-found',
		/*
		 * @ngInject
		 */
		controller: function ($scope, $actions, $rootScope) {
			/*
			 * Add scope menus
			 */
			if(!$rootScope.app.config.pageNotFound){
				$scope.app.config.pageNotFound = {};
			}
		}
	});
});
