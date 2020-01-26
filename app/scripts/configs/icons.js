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


/**
 * @ngdoc module
 * @name ngDonate
 * @description Defines icons to use every where.
 *
 */
angular.module('ngMaterialHome')
.config(function(wbIconServiceProvider) {
	wbIconServiceProvider
	// widget move icon
	.addShapes({
		'widget_move_first': '<path d="M 17.160156 5.9628906 L 11.160156 11.962891 L 17.160156 17.962891 L 18.570312 16.552734 L 13.990234 11.962891 L 18.570312 7.3730469 L 17.160156 5.9628906 z M 12 6 L 6 12 L 12 18 L 13.410156 16.589844 L 8.8300781 12 L 13.410156 7.4101562 L 12 6 z " />',
		'widget_move_left': '<path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>',
		'widget_move_right': '<path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>',
		'widget_move_last': '<path d="m 7.410156,5.9628906 6,6.0000004 -6,6 L 6,16.552734 10.580078,11.962891 6,7.3730469 Z M 12.570312,6 l 6,6 -6,6 L 11.160156,16.589844 15.740234,12 11.160156,7.4101562 Z" />',
		
		'widget_move_top': '<path d="m 18.303711,16.856445 -6.000001,-6 -5.9999997,6 1.410157,1.410156 4.5898427,-4.580078 4.589844,4.580078 z m -0.03711,-5.160156 -6,-5.9999997 -5.9999997,5.9999997 1.410156,1.410156 4.5898437,-4.5800777 4.589844,4.5800777 z" />',
		'widget_move_up': '<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>',
		'widget_move_down': '<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>',
		'widget_move_button': '<path d="M 18.303711,7.1064453 12.30371,13.106445 6.3037103,7.1064453 7.7138673,5.6962893 12.30371,10.276367 16.893554,5.6962893 Z m -0.03711,5.1601557 -6,6 -5.9999997,-6 1.410156,-1.410156 4.5898437,4.580078 4.589844,-4.580078 z" />',
	});
});
