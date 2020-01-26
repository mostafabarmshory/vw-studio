/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
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

jQuery.fn.extend({
	getPath: function () {
		var path, node = this;
		while (node.length) {
			var realNode = node[0], name = realNode.localName;
			if (!name) { 
				break;
			}
			name = name.toLowerCase();
			var parent = node.parent();
			var sameTagSiblings = parent.children(name);
			if (sameTagSiblings.length > 1) { 
				var allSiblings = parent.children();
				var index = allSiblings.index(realNode) + 1;
				if (index > 1) {
					name += ':nth-child(' + index + ')';
				}
			}
			path = name + (path ? '>' + path : '');
			node = parent;
		}
		return path;
	}
});

/*
 * Main module of the application.
 */
angular
.module('vwStudio', [
	'mblowfish-core',
	'mblowfish-language',
	'ui.tree'
])
//  Load application
.run(function($app, $window, $toolbar, $sidenav) {
	$toolbar.setDefaultToolbars([ 'amh.owner-toolbar' ]);
	$sidenav.setDefaultSidenavs([ 'amh.cms.pages.sidenav', ]);
    $app.start('vm-studio');

    // load crisp
    $window.$crisp=[];
    $window.CRISP_WEBSITE_ID = '55019c32-37d1-46ab-b97e-1b524309deb1';
    $window.loadLibrary('https://client.crisp.chat/l.js');
})
//.config(function($routeProvider) {
//    $routeProvider.otherwise('/dashboard');
//})
/*
 * Disabling AngularJS $http cache
 * @see https://stackoverflow.com/questions/38196452/disabling-angularjs-http-cache
 */
.config(function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
})
.controller('MainCtrl', function(){});


