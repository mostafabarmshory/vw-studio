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
 * @ngdoc Factories
 * @name AbstractWidgetLocator
 * @description Locates a widget on the view
 * 
 * It is used to display extra information about a widget on the screen. For
 * example it is used to show widget actions on the fly.
 * 
 */
angular.module('vwStudio').factory('SelectionWidgetLocator', function(AbstractWidgetLocator, $document) {

	var selectionWidgetLocator = function(options) {
		options = options || {};
		AbstractWidgetLocator.apply(this, options);

		// set anchor
		this.setAnchor(options.anchor);

		// load templates
		var template = options.template || '<div class="wb-widget-locator selection wb-layer-editor-selector"></div>';

		this.titleElement = angular.element(template);
		this.titleElement.attr('id', 'header');

		// load elements
		this.topElement = angular.element(template);
		this.topElement.attr('id', 'top');

		this.rightElement = angular.element(template);
		this.rightElement.attr('id', 'right');

		this.buttomElement = angular.element(template);
		this.buttomElement.attr('id', 'buttom');

		this.leftElement = angular.element(template);
		this.leftElement.attr('id', 'left');

		this.sizeElement = angular.element('<img class="wb-widget-locator selection" src="resources/corner-handle.png">');
		this.sizeElement.attr('id', 'size');

		// init controller
		this.setElements([this.titleElement, this.topElement, this.rightElement,
		this.buttomElement, this.leftElement, this.sizeElement]);



		var position = {};
		var dimension = {};
		var ctrl = this;


		function mousemove($event) {
			var deltaWidth = dimension.width - (position.x - $event.clientX);
			var deltaHeight = dimension.height - (position.y - $event.clientY);
			var newDimensions = {
				width: deltaWidth + 'px',
				height: deltaHeight + 'px'
			};

			var widget = ctrl.getWidget();
			var model = widget.getModel();
			var $element = widget.getElement();
			var $scope = widget.getScope();

			if (model.style.size.height === 'auto') {
				newDimensions.height = 'auto';
			}
			$element.css(newDimensions);

			model.style.size.width = newDimensions.width;
			model.style.size.height = newDimensions.height;

			$scope.$apply();
			return false;
		}

		function mouseup() {
			$document.unbind('mousemove', mousemove);
			$document.unbind('mouseup', mouseup);
			//            lock = false;
		}

		function mousedown($event) {
			$event.stopImmediatePropagation();
			position.x = $event.clientX;
			position.y = $event.clientY;
			//            lock = true;
			var $element = ctrl.getWidget().getElement();
			dimension.width = $element.prop('offsetWidth');
			dimension.height = $element.prop('offsetHeight');
			$document.bind('mousemove', mousemove);
			$document.bind('mouseup', mouseup);
			return false;
		}


		this.sizeElement.on('mousedown', mousedown);
	};
	selectionWidgetLocator.prototype = new AbstractWidgetLocator();

	selectionWidgetLocator.prototype.updateView = function() {
		var widget = this.getWidget();
		var bound = widget.getBoundingClientRect();
		var space = 2;
		this.topElement.css({
			top: bound.top + space,
			left: bound.left + space,
			width: bound.width - 2 * space
		});
		this.rightElement.css({
			top: bound.top + space,
			left: bound.left + bound.width - 2 * space,
			height: bound.height - 2 * space
		});
		this.buttomElement.css({
			top: bound.top + bound.height - space,
			left: bound.left + space,
			width: bound.width - 2 * space
		});
		this.leftElement.css({
			top: bound.top + space,
			left: bound.left + space,
			height: bound.height - 2 * space
		});
		if (bound.top < 32) {
			this.titleElement.css({
				top: bound.top + bound.height,
				left: bound.left + bound.width / 2 - this.titleElement.width() / 2
			});
		} else {
			this.titleElement.css({
				top: bound.top - this.titleElement.height(),
				left: bound.left + bound.width / 2 - this.titleElement.width() / 2
			});
		}
		this.titleElement[0].innerHTML = '<span>' +
			(widget.getTitle() || widget.getId() || widget.getType()) +
			'</span>';


		this.sizeElement.css({
			top: bound.top + bound.height - 13,
			left: bound.left + bound.width - 15,
		});
	};
	return selectionWidgetLocator;
});

