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

describe('WbWidget processor attributes ', function() {
	// instantiate service
	var $widget;
	var processor;
	var $rootScope;

	// load the service's module
	beforeEach(module('am-wb-core'));
	beforeEach(inject(function(_$widget_, _WbProcessorAttribute_, _$rootScope_) {
		$widget = _$widget_;
		var WbProcessorAttribute = _WbProcessorAttribute_;
		processor = new WbProcessorAttribute();
		$rootScope = _$rootScope_;
	}));

	it('should load attributes on model changed', function(done) {
		// Create new instance
		var model = {
			type: 'div',
			id: 'test',
			name: 'test',
			title: 'test',
			'class': 'test',
			style: {
				background: 'red'
			}
		};
		$widget.compile(model)
			.then(function(widget) {
				expect(widget.getElement().attr('id')).toBe('test');
				expect(widget.getElement().attr('name')).toBe('test');
				expect(widget.getElement().attr('title')).toBe('test');
				expect(widget.getElement().attr('class')).toBe('test');
				done();
			});
		$rootScope.$apply();
	});

	it('should load attrs on model update', function(done) {
		// Create new instance
		var model = {
			type: 'div',
			id: 'red',
			style: {
				background: 'red'
			}
		};
		$widget.compile(model)
			.then(function(widget) {
				expect(widget.getElement().attr('id')).toBe('red');

				widget.setModelProperty('id', 'black');
				expect(widget.getElement().attr('id')).toBe('black');

				widget.setProperty('name', 'pink');
				expect(widget.getElement().attr('name')).toBe('pink');

				done();
			});
		$rootScope.$apply();
	});


	it('should load style on model changed', function(done) {
		// Create new instance
		var model = {
			type: 'div',
			id: 'test',
			style: {
				backgroundColor: 'red'
			}
		};
		$widget.compile(model)
			.then(function(widget) {
				expect(widget.getElement().css('background-color')).toBe('red');
				done();
			});
		$rootScope.$apply();
	});

	it('should load style on model update', function(done) {
		// Create new instance
		var model = {
			type: 'div',
			id: 'test',
			style: {
				backgroundColor: 'red'
			}
		};
		$widget.compile(model)
			.then(function(widget) {
				expect(widget.getElement().css('background-color')).toBe('red');

				widget.setModelProperty('style.backgroundColor', 'black');
				expect(widget.getElement().css('backgroundColor')).toBe('black');
				expect(widget.getElement().css('background-color')).toBe('black');

				widget.setProperty('style.backgroundColor', 'pink');
				expect(widget.getElement().css('background-color')).toBe('pink');

				done();
			});
		$rootScope.$apply();
	});
});
