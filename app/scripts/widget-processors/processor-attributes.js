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
 * @ngdoc Processor
 * @name WbProcessorAttribute
 * @description Widget processor
 * 
 */
angular.module('vwStudio').factory('StudioProcessorAttribute', function(WbProcessorAbstract, $widget, $styleUtil, $rootScope) {

	function Processor() {
		WbProcessorAbstract.apply(this);
//		this.devToolsCallback = new MutationObserver(function(mutationsList/*, observer*/) {
//			// Use traditional 'for loops' for IE 11
//			_.forEach(mutationsList, function(mutation) {
//				if (mutation.attributeName === 'style') {
//					var ctrl = $widget.widgetFromElement(mutation.target);
//					if (!ctrl) {
//						return;
//					}
//					if (ctrl.state !== 'edit') {
//						return;
//					}
//					var style = mutation.target.style;
//					for (var i = 0; i < style.length; i++) {
//						var propertyName = style.item(i);
//						var value = style.getPropertyValue(propertyName);
//						ctrl.setModelProperty('style.' + $styleUtil.cssNameToJsName(propertyName), value);
//						$rootScope.$digest();
//					}
//				}
//			});
//		});
	}
	Processor.prototype = new WbProcessorAbstract();

	Processor.prototype.process = function(widget/*, event*/) {
//		if (!widget._devToolsConnected) {
//			this.devToolsCallback.observe(widget.getElement()[0], {
//				childList: false,
//				attributes: true,
//				subtree: false
//			});
//			widget._devToolsConnected = true;
//		}
	};
	return Processor;
});
