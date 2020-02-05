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
angular.module('vwStudio').factory('StudioProcessorAttribute', function(WbProcessorAbstract) {

	function loadStyle(widget, keys) {
		var element = widget.getElement();

		var computedStyle = {};
		var style = widget.getModelProperty('style') || {};
		var runtimeModel = widget.getRuntimeModel() || {};
		if (!keys) {
			element.attr('style', '');
			computedStyle = angular.merge({}, style, runtimeModel.style);
		} else {
			_.forEach(keys, function(key) {
				computedStyle[key] = runtimeModel.style[key] || style[key] || '';
			});
		}
		element.css(computedStyle);
	}

	function setWidgetElementAttribute(widget, key, value) {
		if (widget.isEditable() && (key === 'draggable' || key === 'dropzone')) {
			// are handled by processors in edit mode
			return;
		}
		if (key === 'style') {
			return;
		}
		var $element = widget.getElement();
		if (value) {
			$element.attr(key, value);
		} else {
			$element.removeAttr(key);
		}
		// NOTE: html is special value
		if (key === 'html') {
			$element.html(value);
		}
		if (key === 'text') {
			$element.text(value);
		}
		if (key === 'inputType') {
			widget.setElementAttribute('type', value);
		}
		if (key === 'value') {
			$element.val(value);
		}
	}

	function setWidgetElementAttributes(widget, elementAttributes) {
		if (_.isUndefined(elementAttributes)) {
			var model = widget.getModelProperty();
			_.forEach(model, function(value, key) {
				setWidgetElementAttribute(widget, key, value);
			});
			return;
		}
		for (var i = 0; i < elementAttributes.length; i++) {
			var key = elementAttributes[i];
			setWidgetElementAttribute(widget, key, widget.getProperty(key) || widget.getModelProperty(key));
		}
	}

	function Processor() {
		WbProcessorAbstract.apply(this);
		//        this.devToolsCallback = new MutationObserver(function(mutationsList, observer) {
		//            // Use traditional 'for loops' for IE 11
		//            for(let mutation of mutationsList) {
		//                if(mutation.attributeName === 'style'){
		//                    var elementStyle = ctrl.getElement()[0].style;
		//                    for (prop in elementStyle) {
		//                        if (elementStyle.hasOwnProperty(prop)) {
		//                            ctrl.setModelProperty('style.'+prop, elementStyle[prop]);
		//                        }
		//                    }
		//                }
		//            }
		//        });
	}
	Processor.prototype = new WbProcessorAbstract();

	Processor.prototype.process = function(widget, event) {
		if (event.type === 'modelChanged') {
			setWidgetElementAttributes(widget/*, widget.getElementAttributes()*/);
			loadStyle(widget);
		} else if (event.type === 'modelUpdated') {
			var evKeys = event.keys || [event.key];
			var styleKeys = [];
			var attributeKeys = [];
			for (var i = 0; i < evKeys.length; i++) {
				if (evKeys[i].startsWith('style.')) {
					styleKeys.push(evKeys[i].substring(6));
				} else {
					attributeKeys.push(evKeys[i]);
				}
			}

			// attributes
			setWidgetElementAttributes(widget, attributeKeys/*_.intersection(attributeKeys, widget.getElementAttributes())*/);

			// style
			loadStyle(widget, styleKeys);
		}
	};
	return Processor;
});
