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

describe('WbWidget converter WbConverterDom ', function() {
	// instantiate service
	var $widget;
	var $rootScope;
	var WbConverterDom;

	// load the service's module
	beforeEach(module('vwStudio'));
	beforeEach(inject(function(_$widget_, _$rootScope_, _WbConverterDom_) {
		$widget = _$widget_;
		$rootScope = _$rootScope_;
		WbConverterDom = _WbConverterDom_;
	}));

	it('should converte multi dom text to data model', function() {
		// Create new instance
		var data = '<div style="color: red; background-color: blue;"><form><img src="test/path.svg"></img></form></div>';
		var converter = new WbConverterDom();
		var result = converter.decode(data);
		expect(result.length).toBe(1);
		expect(result[0].type).toBe('div');
		expect(result[0].style.backgroundColor).toBe('blue');
		expect(result[0].style.color).toBe('red');

		expect(result[0].children.length).toBe(1);
		expect(result[0].children[0].type).toBe('form');

		expect(result[0].children[0].children.length).toBe(1);
		expect(result[0].children[0].children[0].type).toBe('img');
		expect(result[0].children[0].children[0].src).toBe('test/path.svg');
	});

	it('should encode list of html widgets', function(done) {
		// Create new instance
		var model = {
			type: 'div',
			children: [{
				type: 'p',
				html: 'p1'
			}, {
				type: 'p',
				html: 'p2'
			}, {
				type: 'img',
				src: 'images/path.svg'
			}]
		};
		$widget.compile(model)
			.then(function(widget) {
				var converter = new WbConverterDom();
				var result = converter.encode(widget);
				expect(result.match(/<div/).length).toBe(1);
				expect(result.match(/<img/).length).toBe(1);
				done();
			});
		$rootScope.$apply();
	});

	fit('should converte pre and its text', function() {
		// Create new instance
		var data = '<pre>hi</pre>';
		var converter = new WbConverterDom();
		var result = converter.decode(data);
		expect(result.length).toBe(1);
		expect(result[0].type).toBe('pre');
		expect(result[0].text).toBe('hi');
	});
	it('should converte li and its text', function() {
		// Create new instance
		var data = '<li>hi</li>';
		var converter = new WbConverterDom();
		var result = converter.decode(data);
		expect(result.length).toBe(1);
		expect(result[0].type).toBe('li');
		expect(result[0].children.length).toBe(1);
		expect(result[0].children[0].type).toBe('p');
		expect(result[0].children[0].html).toBe('hi');
	});
	it('should converte li and its child', function() {
		// Create new instance
		var data = '<li><p>hi</p></li>';
		var converter = new WbConverterDom();
		var result = converter.decode(data);
		expect(result.length).toBe(1);
		expect(result[0].type).toBe('li');
		expect(result[0].children.length).toBe(1);
		expect(result[0].children[0].type).toBe('p');
		expect(result[0].children[0].html).toBe('hi');
	});
});
