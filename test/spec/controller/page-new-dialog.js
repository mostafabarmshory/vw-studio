/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use strict';

describe('AmhPageNewDialogCtrl ', function() {
	// instantiate service
	var $settings;
	var $controller;
	var $rootScope;


	// load the service's module
	beforeEach(module('vwStudio'));
	beforeEach(inject(function(_$settings_, _$controller_, _$rootScope_) {
		$settings = _$settings_;
		$controller = _$controller_;
		$rootScope = _$rootScope_;
	}));


	it('should manage metas of the page', function() {
		var scope = $rootScope.$new();
		var window = {
			location: {
				href: 'http://localhost:9090/app/content/id-of-current-contetn'
			}
		};
		var config = {};
		var ctrl = $controller('AmhPageNewDialogCtrl', {
			$scope: scope,
			config: config,
			$window: window
		});

		var meta = ctrl.getPageMeta('test.meta');
		expect(angular.isDefined(meta)).toBe(false);

		ctrl.setPageMeta('test.meta', 'test');
		meta = ctrl.getPageMeta('test.meta');
		expect(angular.isDefined(meta)).toBe(true);
		expect(meta.value).toBe('test');
	});

	it('should change canonical link if name changed', function() {
		var scope = $rootScope.$new();
		var window = {
			location: {
				href: 'http://localhost:9090/app/content/id-of-current-contetn'
			}
		};
		var config = {};
		var ctrl = $controller('AmhPageNewDialogCtrl', {
			$scope: scope,
			config: config,
			$window: window
		});

		expect(angular.isDefined(ctrl)).toBe(true);

		ctrl.setPageInfo('name', 'test');
		var meta = ctrl.getPageMeta('link.canonical');
		expect(angular.isDefined(meta)).toBe(true);
		expect(meta.value).toBe('/content/test');
	});
});