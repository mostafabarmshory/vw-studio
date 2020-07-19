
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
 * @name WbProcessorLocator
 * @description Widget processor
 * 
 */
angular.module('vwStudio').factory('WbProcessorLocator', function(WbProcessorAbstract, WidgetLocatorManager) {
	function Processor() {
		WbProcessorAbstract.apply(this);
		this.widgetLocator = new WidgetLocatorManager({
			boundEnable: false,     // Enable bound of each widget
			hoverEnable: false,     // Enable mouse hover for each widget
			selectionEnable: true,  // Enable selection
		});
		this.autoVisible = true;
	}

	Processor.prototype = new WbProcessorAbstract();

	Processor.prototype.process = function(widget, event) {
		if (event.type !== 'stateChanged' || !widget.isRoot()) {
			return;
		}
        /*
         * NOTE: we just trak a single root 
         */
		this.widgetLocator.setRootWidget(widget);
		if (this.autoVisible) {
			this.widgetLocator.setEnable(widget.state === 'edit');
		}
	};

    /**
     * Enable the processor
     */
	Processor.prototype.setEnable = function(enable) {
		this.enable = enable;
		var widgetLocator = this.widgetLocator;
		widgetLocator.setEnable(enable);
	};

    /**
     * Follow widget if is root
     */
	Processor.prototype.setTrackRoot = function(trackRoot) {
		this.trackRoot = trackRoot;
	};

	Processor.prototype.setAutoVisible = function(autoVisible) {
		this.autoVisible = autoVisible;
	};


	return Processor;
});
