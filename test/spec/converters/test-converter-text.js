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

describe('WbWidget converter WbConverterText ', function() {
	// instantiate service
	var $widget;
	var processor;
	var $rootScope;
	var WbConverterText;

	// load the service's module
	beforeEach(module('am-wb-core'));
	beforeEach(inject(function(_$widget_, _WbProcessorAttribute_, _$rootScope_, _WbConverterText_) {
		$widget = _$widget_;
		var WbProcessorAttribute = _WbProcessorAttribute_;
		processor = new WbProcessorAttribute();
		$rootScope = _$rootScope_;
		WbConverterText = _WbConverterText_;
	}));

	it('should converte multi line text to paragraph', function() {
		// Create new instance
		var data = 'p1\np2\np3\n\n\np4';
		var converter = new WbConverterText();
		var result = converter.decode(data);
		expect(result.length).toBe(4);
		_.forEach(result, function(item) {
			expect(item.type).toBe('p');
		});
	});

	it('should encode lit of html widgets', function(done) {
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
				var converter = new WbConverterText();
				var result = converter.encode(widget);
				expect(result.match(/p1/).length).toBe(1);
				expect(result.match(/p2/).length).toBe(1);
				done();
			});
		$rootScope.$apply();
	});
});
