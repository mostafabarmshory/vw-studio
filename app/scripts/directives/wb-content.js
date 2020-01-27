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
 * @ngdoc Directives
 * @name wb-content
 * @description Render a list of widget
 *  ## wbOnModelSelect
 * 
 * If a widget select with in the group then the wbOnModelSelect parameter will
 * be evaluated with the following attributes:
 *  - $event : the related event - $ctrl : the widget (to support legacy) -
 * $model: the model (to support legace)
 * 
 * NOTE: The root widget will be passed as first selected item. The function
 * will be evaluated in non edit mode.
 */
angular.module('vwStudio').directive('wbContent', function($widget) {
	/*
	 * Link widget view
	 */
	function wbGroupLink($scope, $element, $attrs, ctrls) {
		var rootWidget;
		var ngModelCtrl = ctrls[0];
		// Load ngModel
		ngModelCtrl.$render = function() {
			var model = ngModelCtrl.$viewValue;
			if (!model) {
				return;
			}

			// 0- remove old
			var editable = false;
			if (rootWidget) {
				editable = rootWidget.isEditable();
				rootWidget.destroy();
			}
			$element.empty();

			// 1- create widget
			$widget.compile(model, null, $element)
				.then(function(widget) {
					rootWidget = widget;
					rootWidget.setEditable(editable);
					$element.trigger('load', widget);
				}, function(error) {
					$element.error(error);
				});
		};
	}

	return {
		restrict: 'EA',
		scope: true,
		link: wbGroupLink,
		require: ['?ngModel']
	};
});
