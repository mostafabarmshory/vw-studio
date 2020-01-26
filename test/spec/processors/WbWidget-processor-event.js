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

describe('WbWidget processor event ', function () {
	// instantiate service
	var $widget;
	var processor;
	var $timeout;
	var $rootScope;


	angular.module('am-wb-core')//
	.config(['$qProvider', function ($qProvider) {
		$qProvider.errorOnUnhandledRejections(false);
	}]);

	// load the service's module
	beforeEach(module('am-wb-core'));
	beforeEach(inject(function (_$widget_, _WbProcessorAttribute_, _$rootScope_, _$timeout_) {
		$widget = _$widget_;
		processor = new _WbProcessorAttribute_();
		$rootScope = _$rootScope_;
		$timeout = _$timeout_;
	}));

	it('should load event handlers on init', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'WbWidget-processor-event-test-001',
				'class': 'a b',
				style: {
					backgroundColor: 'red'
				},
				on: {
					init: '$widget.setProperty(\'style.backgroundColor\', \'black\');',
					click: 'alert("hi");'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			expect(widget.getElement().css('backgroundColor')).toBe('black');
			done();
		});
		$rootScope.$apply();
	});

	it('should load style on model update', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'test',
				on: {
					click: '$widget.setProperty(\'style.backgroundColor\', \'pink\');'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			widget.getElement().click();
			expect(widget.getElement().css('backgroundColor')).toBe('pink');
			done();
		});
		$rootScope.$apply();
	});

	it('should not intropt the engine if there is error', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'test',
				style: {
					backgroundColor: 'red'
				},
				on: {
					init: '$widget2.setProperty(\'style.backgroundColor\', \'pink\');',
					load: '+++.setProperty(\'style.backgroundColor\', \'pink\');',
					click: '$widget.setProperty(\'style.backgroundColor\', \'pink\');'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			expect(widget.getElement().css('backgroundColor')).toBe('red');

			widget.getElement().click();
			expect(widget.getElement().css('backgroundColor')).toBe('pink');

			done();
		});
		$rootScope.$apply();
	});
	it('must disable events in edit mode', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'test',
				style: {
					backgroundColor: 'red'
				},
				on: {
					click: '$widget.setProperty(\'style.backgroundColor\', \'pink\');'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			expect(widget.getElement().css('backgroundColor')).toBe('red');

			widget.setEditable(true);

			widget.getElement().click();
			expect(widget.getElement().css('backgroundColor')).toBe('red');

			widget.setEditable(false);

			widget.getElement().click();
			expect(widget.getElement().css('backgroundColor')).toBe('pink');
			done();
		});
		$rootScope.$apply();
	});


	it('should handle dblclick', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'test',
				on: {
					dblclick: '$widget.setProperty(\'style.backgroundColor\', \'pink\');'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			widget.getElement().dblclick();
			expect(widget.getElement().css('backgroundColor')).toBe('pink');
			done();
		});
		$rootScope.$apply();
	});
	it('should handle mouseout', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'test',
				on: {
					mouseout: '$widget.setProperty(\'style.backgroundColor\', \'pink\');'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			widget.getElement().mouseout();
			expect(widget.getElement().css('backgroundColor')).toBe('pink');
			done();
		});
		$rootScope.$apply();
	});
	it('should handle mouseover', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'test',
				on: {
					mouseover: '$widget.setProperty(\'style.backgroundColor\', \'pink\');'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			widget.getElement().mouseover();
			expect(widget.getElement().css('backgroundColor')).toBe('pink');
			done();
		});
		$rootScope.$apply();
	});
	it('should handle mousedown', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'test',
				on: {
					mousedown: '$widget.setProperty(\'style.backgroundColor\', \'pink\');'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			widget.getElement().mousedown();
			expect(widget.getElement().css('backgroundColor')).toBe('pink');
			done();
		});
		$rootScope.$apply();
	});
	it('should handle mouseup', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'test',
				on: {
					mouseup: '$widget.setProperty(\'style.backgroundColor\', \'pink\');'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			widget.getElement().mouseup();
			expect(widget.getElement().css('backgroundColor')).toBe('pink');
			done();
		});
		$rootScope.$apply();
	});


	it('should cancel timeout service on edit mode', function (done) {
		// Create new instance
		var model = {
				type: 'div',
				id: 'test',
				style: {
					backgroundColor: 'red'
				},
				on: {
					init: '$timeout(function(){\n\t$widget.setProperty(\'style.backgroundColor\', \'pink\')\n}, 1);'
				}
		};
		$widget.compile(model)
		.then(function(widget){
			widget.setEditable(true);
			$timeout(function(){
				expect(widget.getElement().css('backgroundColor')).toBe('pink');
				done();
			}, 2000);
		});
		$rootScope.$apply();
		$timeout.flush();
	});
});
