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

'use strict';
describe('The directive amh-widget-path ', function() {

	var $rootScope;
	//	var $controller;
	var $compile;
	var $widget;
	var $help;
	var widgetType = 'TestWidget-' + Math.random();

	function MockRootWidget() {
		// TODO;
		this.scope = $rootScope.$new();
	}

	MockRootWidget.prototype.getScope = function() {
		return this.scope;
	};

	beforeEach(module('ngMaterialHome'));
	beforeEach(inject(function(_$controller_, _$rootScope_, _$compile_, _$widget_, _$help_) {
//		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$compile = _$compile_;
		$widget = _$widget_;
		$help = _$help_;

		/*
		 * Register a test widget
		 */
		$widget.newWidget({
			type: widgetType,
			controller: function() {
				this.testFunction = function() {
					return true;
				};
				this.initWidget = function() {
					// TODO;
				};
			},
			controllerAs: 'ctrl',
			template: '<h1>{{ctrl.text}}</h1>'
		});
	}));

	it('should create and watch a variable in the scope even if it is empty', function() {
		//		var html = '<amh-widget-path ng-model="rootWidget"></amh-widget-path>';
		//		var element = $compile(html)(scope);
		//		expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
	});

	it('should lists all children of the root even if the root selected', function() {
		var id = 'test of a widget in path' + Math.random();
		var model = {
			type: 'div',
			children: [{
				type: 'div',
				id: id
			}]
		};
		$widget.compile(model)
			.then(function(root) {
				var html = '<amh-widget-path ng-model="rootWidget"></amh-widget-path>';
				var scopePath = $rootScope.$new();
				scopePath.rootWidget = root.getChildren();
				var elementPath = $compile(html)(scopePath);
				scopePath.$apply();

				var iss = elementPath.isolateScope();
				expect(angular.isDefined(iss.widgets)).toBe(true);
				expect(angular.isArray(iss.widgets)).toBe(true);
				expect(iss.widgets.length).toBe(1);
			});
	});

	it('should open help for an item', function() {
		var id = 'test of a widget in path' + Math.random();
		var model = {
			type: 'div',
			children: [{
				type: 'div',
				id: id
			}]
		};
		$widget.compile(model)
			.then(function(root) {
				var html = '<amh-widget-path ng-model="rootWidget"></amh-widget-path>';
				var scopePath = $rootScope.$new();
				scopePath.rootWidget = root.getChildren();
				var elementPath = $compile(html)(scopePath);
				scopePath.$apply();

				var ctrl = elementPath.controller('amhWidgetPath');
				expect(angular.isFunction(ctrl.openHelp)).toBe(true);

				var flag = false;
				spyOn($help, 'openHelp').and.callFake(function(widget) {
					expect(angular.isDefined(widget)).toBe(true);
					flag = true;
				});

				ctrl.openHelp(root);
				expect(flag).toBe(true);
			});


	});
});
