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
 * @name amh-widget-path
 * @description Shows the path of a widget from its first parent to the widget itself.
 */
angular.module('vwStudio').directive('amhWidgetPath', function($actions, $help) {

	/*
	 * Link widget view
	 */
	function postLink($scope, $element, $attrs, $ctrls) {
		$scope.widgets = [{ id: 1 }];
		var workbench;
		// Load ngModel
		var ngModelCtrl = $ctrls[0];
		ngModelCtrl.$render = function() {
			if (workbench) {
				workbench.off('selecteWidgetsChanged', eventHandler);
			}
			workbench = ngModelCtrl.$viewValue;
			if (workbench) {
				workbench.on('selecteWidgetsChanged', eventHandler);
			}
		};

		function eventHandler($event) {
			loadPath($event.value || []);
		}


		function loadPath(list) {
			if (list.length === 0) {
				$scope.widgets = [];
				return;
			}
			// Now list is an array of length 1 which contains just a widget.
			var widget = list[0];
			var newPath = [];
			while (widget) {
				newPath.push(widget);
				widget = widget.getParent();
			}
			newPath = newPath.reverse();
			if (!isPrefix(newPath, $scope.widgets)) {
				$scope.widgets = newPath;
			}
			$scope.prefixIndex = newPath.length;
		}

		/**
		 * The function:
		 * return 'false' if the newPath is not a prefix of oldPath
		 * return 'newPath.length' as index (which will be used for changing the color of path in view)
		 */
		function isPrefix(newPath, oldPath) {
			if (oldPath.length < newPath.length) {
				return false;
			}
			for (var i = 0; i < newPath.length; i++) {
				if (newPath[i] !== oldPath[i]) {
					return false;
				}
			}
			return true;
		}
	}

	return {
		templateUrl: 'views/directives/amh-widget-path.html',
		restrict: 'E',
		replace: true,
		scope: {},
		link: postLink,
		require: ['ngModel'],
		/**
		 * @ngInject
		 * @ngdoc Controllers
		 * @name amhWidgetPathCtrl
		 * @description Controls the widget path
		 * 
		 * There are many things which are controlled by the widget path controller
		 * such as opening help. 
		 */
		controller: function() {
			/**
			 * Opens help for a widget
			 * 
			 * @memberof amhWidgetPathCtrl
			 * @param widget {Widget} to display help for
			 */
			this.openHelp = function(widget) {
				return $help.openHelp(widget);
			};

			this.selectChildren = function(widget, $event) {
				$event.items = [widget];
				$actions.exec('amh.workbench.widget.selectChildren', $event);
			};
		},
		controllerAs: 'ctrl'
	};
});
