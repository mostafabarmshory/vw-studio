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
 * @name WbProcessorEvent
 * @description Widget processor
 * 
 */
angular.module('vwStudio').factory('StudioProcessorEvent', function(WbProcessorAbstract, $widget, $injector) {

    /**
     * Loads events for the widget
     * 
     * @param event
     *            {object} part of the widget data model
     * @memberof WbAbstractWidget
     */
	function evalWidgetEvent(widget, type, event) {
		var eventFunction;
		if (!widget.eventFunctions.hasOwnProperty(type)) {
			try {
				var ucode = widget.getEvent()[type];
				if (!ucode) {
					return;
				}
				ucode += '\n//@ sourceURL=wb-' + widget.getId() + '-' + type + '.js';
				var params = _.join(_.concat(
					['$widget', '$event'], // dynamic data
					$widget.getProvidersKey()));
				/*jslint evil: true */
				widget.eventFunctions[type] = new Function(params, ucode);// code
			} catch (ex) {
				//                console.error({
				//                    message: 'Fail to load user function',
				//                    original: ex
				//                });
			}
		}
		eventFunction = widget.eventFunctions[type];
		if (eventFunction) {
			try {
				var locals = _.merge({
					$event: event, // -> $event
					$widget: widget, // -> $widget
				}, $widget.getProviders());
				return $injector.invoke(eventFunction, widget, locals);
			} catch (ex) {
				//                console.error({
				//                    original: ex,
				//                    message: 'faile to run the event code of the widget',
				//                    type: type,
				//                    event: event
				//                });
			}
		}
	}

	function loadWidgetEventsHandlers(widget) {
		widget.__eventListeners = {
			click: function($event) {
				return evalWidgetEvent(widget, 'click', $event);
			},
			dblclick: function($event) {
				return evalWidgetEvent(widget, 'dblclick', $event);
			},
			mouseout: function($event) {
				return evalWidgetEvent(widget, 'mouseout', $event);
			},
			mouseover: function($event) {
				return evalWidgetEvent(widget, 'mouseover', $event);
			},
			mousedown: function($event) {
				return evalWidgetEvent(widget, 'mousedown', $event);
			},
			mouseup: function($event) {
				return evalWidgetEvent(widget, 'mouseup', $event);
			},
			mouseenter: function($event) {
				return evalWidgetEvent(widget, 'mouseenter', $event);
			},
			mouseleave: function($event) {
				return evalWidgetEvent(widget, 'mouseleave', $event);
			},
			resize: function($event) {
				return evalWidgetEvent(widget, 'resize', $event);
			},
			intersection: function($event) {
				return evalWidgetEvent(widget, 'intersection', $event);
			},

			//
			// Common media events
			//
			success: function($event) {
				return evalWidgetEvent(widget, 'success', $event);
			},
			error: function($event) {
				return evalWidgetEvent(widget, 'error', $event);
			},
			abort: function($event) {
				return evalWidgetEvent(widget, 'abort', $event);
			},
			load: function($event) {
				return evalWidgetEvent(widget, 'load', $event);
			},
			beforeunload: function($event) {
				return evalWidgetEvent(widget, 'beforeunload', $event);
			},
			unload: function($event) {
				return evalWidgetEvent(widget, 'unload', $event);
			},


			change: function($event) {
				return evalWidgetEvent(widget, 'change', $event);
			},
			input: function($event) {
				return evalWidgetEvent(widget, 'input', $event);
			},

			/*
			 * Keyboard events
			 */
			keyup: function($event) {
				return evalWidgetEvent(widget, 'keyup', $event);
			},
			keydown: function($event) {
				return evalWidgetEvent(widget, 'keydown', $event);
			},
			keypress: function($event) {
				return evalWidgetEvent(widget, 'keypress', $event);
			},

		};
		angular.forEach(widget.__eventListeners, function(listener, key) {
			widget.on(key, listener);
		});
	}

	function removeWidgetEventsHandlers(widget) {
		if (angular.isDefined(widget.__eventListeners)) {
			angular.forEach(widget.__eventListeners, function(listener, key) {
				widget.off(key, listener);
			});
			delete widget.__eventListeners;
		}
		// clean all providers
		_.forEach($widget.getProviders(), function(provider) {
			if (_.isFunction(provider.clean)) {
				provider.clean();
			}
		});
	}

	function Processor() {
		WbProcessorAbstract.apply(this);
	}

	// extend functionality
	Processor.prototype = new WbProcessorAbstract();

	Processor.prototype.process = function(widget, event) {
		if (event.type !== 'stateChanged') {
			return;
		}
		if (widget.state === 'ready') {
			loadWidgetEventsHandlers(widget);
			evalWidgetEvent(widget, 'stateChanged', event);
			// TODO: maso, 2019: remove in next major version
			// support legecy
			var newEvent = _.clone(event);
			newEvent.type = 'init';
			evalWidgetEvent(widget, newEvent.type, newEvent);
		} else {
			removeWidgetEventsHandlers(widget);
		}
	};

	return Processor;
});
