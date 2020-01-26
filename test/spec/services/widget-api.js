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

describe('Service $widget', function () {
	// instantiate service
	var $rootScope;
	var $widget;
	var $timeout;


	// load the service's module
	// instantiate service
	beforeEach(function(){
		module('am-wb-core');
		inject(function (_$rootScope_, _$widget_, _$timeout_) {
			$rootScope = _$rootScope_;
			$widget = _$widget_;
			$timeout = _$timeout_;
		});

		$widget.newWidget({
			type : 'Group',
			description : 'Panel contains list of widgets.',
			template : '<div></div>',
			controller: 'WbWidgetDiv',
		});
		$widget.newWidget({
			type : 'HtmlText',
			template : '<div></div>',
			controller: 'WbWidgetDiv',
		});
		$widget.newWidget({
			type : 'BoostForm',
			template : '<form></form>',
			controller: 'WbWidgetDiv',
			controllerAs: 'ctrl'
		});
	});

	it('should add a new widget', function () {
		expect(angular.isFunction($widget.newWidget)).toBe(true);
	});
	it('should find a related widget for a model', function () {
		expect(angular.isFunction($widget.widget)).toBe(true);
	});

	it('should list all widget', function () {
		expect(angular.isFunction($widget.widgets)).toBe(true);
	});

	it('should get children and sub-children from a widget', function () {
		expect(angular.isFunction($widget.getChildren)).toBe(true);
	});

	it('should returns empty list of children for a widget', function (done) {
		// Create new instance
		$widget.compile({
			type : 'HtmlText',
			id : 'test',
			name : 'Widget',
			text : '<h2>HTML Text In 4th group0</h2>',
		})
		.then(function (widget) {
			expect(widget).not.toBe(null);
			var children = $widget.getChildren(widget);
			expect(children.length).toBe(0);
			done();
		});
		$rootScope.$apply();
	});

	// XXX: maso, 2018: fail on several internal promi
	it('should returns children of a group', function (done) {
		// Create new instance
		$widget.compile({
			type : 'Group',
			children : [ {
				type : 'HtmlText',
				text : '<h2>HTML Text In 4th group0</h2>',
			}, {
				type : 'HtmlText',
				text : '<h2>HTML Text In 4th group0</h2>',
			} ]
		})
		.then(function (widget) {
			// wait for children
			expect(widget).not.toBe(null);
			var children = $widget.getChildren(widget);
			expect(children.length).toBe(2);
			done();
		});
		$rootScope.$apply();
		$timeout.flush();
	});

	it('should returns sub-children of a group', function (done) {
		// Create new instance
		$widget.compile({
			type : 'Group',
			children : [ {
				type : 'Group',
				children : [ {
					type : 'Group',
					children : [ {
						type : 'HtmlText',
						text : '<h2>HTML Text In 4th group0</h2>',
					}, {
						type : 'HtmlText',
						text : '<h2>HTML Text In 4th group0</h2>',
					} ]
				} ]
			} ]
		})
		.then(function (widget) {
			expect(widget).not.toBe(null);
			var children = $widget.getChildren(widget);
			expect(children.length).toBe(4);
			done();
		});
		$rootScope.$apply();
		$timeout.flush();
	});

	it('should process widgets with processors', function (done) {

		var flag = false;
		$widget.setProcessor('test',{ 
			process: function(widget, event){
				if(event.type === 'testEvent'){
					flag = true;
				}
			}
		});
		// Create new instance
		$widget.compile({
			type : 'Group',
			children : []
		})
		.then(function (widget) {
			widget.fire('testEvent', {key: 'test'});
			expect(flag).toBe(true);
			done();
		});
		$rootScope.$apply();
		$timeout.flush();
	});

	it('should support widget controller ', function (done) {
		// Create new instance
		$widget.compile({
			type : 'BoostForm',
			children : [{
				type: 'input'
			}]
		})
		.then(function (widget) {
			expect(angular.isFunction(widget.isRoot)).toBe(true);
			expect(angular.isFunction(widget.getChildren)).toBe(true);
			done();
		});
		$rootScope.$apply();
		$timeout.flush();
	});

	it('should manages widget converters ', function () {
		expect($widget.getConverters().length>0).toBe(true);
		expect($widget.getConverter('text/plain')).not.toBe(null);
	});



	/**************************************************************************************
	 *  Providers
	 * 
	 * Default providers:
	 * 
	 **************************************************************************************/
	it('should support providers api ', function () {
		expect(_.isFunction($widget.setProvider)).toBe(true);
		expect(_.isFunction($widget.getProviders)).toBe(true);
		expect(_.isFunction($widget.getProvider)).toBe(true);
		expect(_.isFunction($widget.removeProvider)).toBe(true);
		expect(_.isFunction($widget.getProvidersKey)).toBe(true);
	});

	it('should support providers api ', function () {
		function provider(){};

		var pks = $widget.getProvidersKey();

		$widget.setProvider('xxx', provider);
		expect($widget.getProvider('xxx')).toBe(provider);

		$widget.removeProvider('xxx', provider);
		expect($widget.getProvider('xxx')).toBe(undefined);

		function provider2 (){};
		$widget.setProvider('xxx', provider);
		expect($widget.getProvider('xxx')).toBe(provider);
		$widget.setProvider('xxx', provider2);
		expect($widget.getProvider('xxx')).not.toBe(provider);
		expect($widget.getProvider('xxx')).toBe(provider2);
		expect($widget.getProvidersKey().length).toBe(pks.length+1);
		expect($widget.getProvidersKey()).toEqual(_.concat(pks,['xxx']));

		expect($widget.getProviders()).not.toBe(undefined);
	});
});
