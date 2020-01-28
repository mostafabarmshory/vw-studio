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
 * @ngdoc Converter
 * @name WbConverterWeburger
 * @description Widget converter
 * 
 * A converter are responsible to encode and decode a widget.
 * 
 */
angular.module('vwStudio').factory('WbConverterWeburger', function(WbConverterAbstract) {

	function Converter() {
		WbConverterAbstract.apply(this, ['application/json']);
	}
	Converter.prototype = new WbConverterAbstract();

	Converter.prototype.encode = function() {
		var widgets = Array.prototype.slice.call(arguments) || [];
		if (widgets.length === 1) {
			return JSON.stringify(widgets[0].getModel());
		}
		var models = [];
		_.forEach(widgets, function(widget) {
			models.push(widget.getModel());
		});
		return JSON.stringify(models);
	};

	Converter.prototype.decode = function(data) {
		var widgets = [];
		try {
			var model = JSON.parse(data);
			if (angular.isArray(model)) {
				widgets = model;
			} else {
				widgets = [];
				widgets.push(model);
			}
			// TODO: clean each item
		} catch (ex) {
			// TODO:
		}
		return widgets;
	};


	return Converter;
});
