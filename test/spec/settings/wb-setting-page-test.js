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
'use strict';

describe('Abstract WbSettingPageCtrl controller', function() {

	// load the service's module
	beforeEach(module('am-wb-core'));

	var $rootScope;
	var $controller;
	var $widget;


	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$rootScope_, _$controller_, _$widget_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$widget = _$widget_;
	}));


	it('should add api function', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var controller = $controller('WbSettingPageCtrl', {
			$scope: scope,
			$element: element
		});

		expect(_.isFunction(controller.setWidget)).toBe(true);
		expect(_.isFunction(controller.getWidgets)).toBe(true);

		expect(_.isFunction(controller.off)).toBe(true);
		expect(_.isFunction(controller.on)).toBe(true);

		expect(_.isFunction(controller.trackAttributes)).toBe(true);
		expect(_.isFunction(controller.setAttribute)).toBe(true);

		expect(_.isFunction(controller.trackStyles)).toBe(true);
		expect(_.isFunction(controller.setStyle)).toBe(true);
	});

	it('should load attributes at advance', function(done) {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var controller = $controller('WbSettingPageCtrl', {
			$scope: scope,
			$element: element
		});
		controller.trackAttributes(['id', 'name', 'html']);
		var model = {
			type: 'a',
			id: 'a',
			name: 'a-test',
			html: 'HTML Text In 4th group',
		};
		$widget.compile(model)
			.then(function(widget) {
				controller.setWidget(widget);
				expect(controller.attributesValue.id).toBe(model.id);
				expect(controller.attributesValue.name).toBe(model.name);
				expect(controller.attributesValue.html).toBe(model.html);
				done();
			});
		$rootScope.$apply();
	});

	it('should check if widget is root', function(done) {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var controller = $controller('WbSettingPageCtrl', {
			$scope: scope,
			$element: element
		});
		controller.trackAttributes(['id', 'name', 'html']);
		expect(controller.isContainerWidget()).toBe(false);
		var model = {
			type: 'div',
			children: [{
				type: 'a'
			}]
		};
		$widget.compile(model)
			.then(function(widget) {
				controller.setWidget(widget);
				expect(controller.isContainerWidget()).toBe(true);

				controller.setWidget(widget.getChildren()[0]);
				expect(controller.isContainerWidget()).toBe(false);


				controller.setWidget();
				expect(controller.isContainerWidget()).toBe(false);

				done();
			});
		$rootScope.$apply();
	});

	it('should load styles at advance', function(done) {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var controller = $controller('WbSettingPageCtrl', {
			$scope: scope,
			$element: element
		});
		controller.trackAttributes(['id', 'name', 'html']);
		controller.trackStyles(['background', 'color']);
		var model = {
			type: 'div',
			style: {
				background: 'red',
				color: 'black'
			},
			children: [{
				type: 'a'
			}]
		};
		$widget.compile(model)
			.then(function(widget) {
				controller.setWidget(widget);
				expect(controller.stylesValue.background).toBe(model.style.background);
				expect(controller.stylesValue.color).toBe(model.style.color);
				done();
			});
		$rootScope.$apply();
	});

	it('should change the model', function(done) {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var controller = $controller('WbSettingPageCtrl', {
			$scope: scope,
			$element: element
		});
		controller.trackAttributes(['id', 'name', 'html']);
		controller.trackStyles(['background', 'color']);
		var model = {
			type: 'div',
			style: {
				background: 'red',
				color: 'black'
			},
			children: [{
				type: 'a'
			}]
		};
		$widget.compile(model)
			.then(function(widget) {
				controller.setWidget(widget);
				expect(controller.stylesValue.background).toBe(model.style.background);
				expect(controller.stylesValue.color).toBe(model.style.color);

				controller.setStyle('background', 'black');
				expect(controller.stylesValue.background).toBe('black');
				expect(widget.getModelProperty('style.background')).toBe('black');

				controller.setAttribute('id', 'xxx');
				expect(controller.attributesValue.id).toBe('xxx');
				expect(widget.getModelProperty('id')).toBe('xxx');

				done();
			});
		$rootScope.$apply();
	});

	it('should track model changesl', function(done) {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var controller = $controller('WbSettingPageCtrl', {
			$scope: scope,
			$element: element
		});
		controller.trackAttributes(['id', 'name', 'html']);
		controller.trackStyles(['background', 'color']);
		var model = {
			type: 'div',
			id: 'test',
			style: {
				color: 'black'
			},
			children: [{
				type: 'a'
			}]
		};
		$widget.compile(model)
			.then(function(widget) {
				controller.setStyle('color', 'a');
				controller.setAttribute('id', 'yyy');
				expect(controller.stylesValue.color).toBe(undefined);
				expect(controller.attributesValue.id).toBe(undefined);

				controller.setWidget(widget);
				expect(controller.stylesValue.color).toBe(model.style.color);
				expect(controller.attributesValue.id).toBe(model.id);

				widget.setModelProperty('id', 'xxx');
				widget.setModelProperty('style.color', 'red');

				expect(controller.stylesValue.color).toBe('red');
				expect(controller.attributesValue.id).toBe('xxx');

				done();
			});
		$rootScope.$apply();
	});

	it('should fire changes', function() {
		var controller = $controller('WbSettingPageCtrl', {
			$scope: {},
			$element: {}
		});
		controller.trackAttributes(['id', 'name', 'html']);
		controller.trackStyles(['background', 'color']);
		var flag = false;
		function listener() {
			flag = true;
		}
		controller.on('widgetChanged', listener);
		controller.setWidget();
		expect(flag).toBe(true);

		flag = false;
		controller.off('widgetChanged', listener);
		controller.setWidget();
		expect(flag).toBe(false);
	});
});
