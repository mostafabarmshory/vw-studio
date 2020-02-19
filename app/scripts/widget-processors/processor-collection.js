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
 * @name StudioWidgetProcessorCollection
 * @description Manages Collection Widget
 * 
 *  Collection is managed in edit and preview states. We will remove imported widget or 
 * reload the collection in state changed.
 */
angular.module('vwStudio').factory('StudioWidgetProcessorCollection', function(
	/* AngularJS */ $rootScope, $log,
	/* WB Core   */ $widget, WbProcessorAbstract,
	/* Studio    */ StudioWbConverterWeburger) {

	var converter = new StudioWbConverterWeburger();

	function Processor() {
		WbProcessorAbstract.apply(this, arguments);
	}
	Processor.prototype = new WbProcessorAbstract();

	/**
	 * Processes the widget based on event
	 * 
	 * @memberof WbProcessorSelect
	 */
	Processor.prototype.process = function(widget, event) {
		if (event.type !== 'stateChanged' || widget.getType() !== 'ObjectCollection') {
			return;
		}
		if (event.value === 'edit') {
			widget.setLock(true);
			// 1- remove content
			widget.empty();

			// 2- check template if can display
			var templateModel = converter.decode(widget.getModelProperty('template'));
			if (_.size(templateModel) > 0) {
				widget.addChildren(0, templateModel);
				widget.setTemplateLoadedAsContnet(true);
			}
		} else if (event.value === 'ready' && event.oldValue === 'edit') {
			// 1- load template from designe
			if (widget.isTemplateLoadedAsContnet()) {
				var children = widget.getChildren();
				if (_.size(children) > 0) {
					widget.setModelProperty('template', converter.encode(children[0]));
					if (_.size(children) > 1) {
						$log.warn('There is more than a child in the collection desinge?!');
					}
				} else {
					$log.warn('collection template is removed!');
					widget.setModelProperty('template');
				}
				widget.setTemplateLoadedAsContnet(false);
			}

			// 2- init
			widget.setLock(false);
			widget.reload();
		}
	};


	return Processor;
});
