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
 * @ngdoc Controllers
 * @name AmhContentEditorCtrl
 * @description Controller of a content
 * 
 * Shows a content and prepares all tools to allow users to manage the content. ##
 * Language
 * 
 * NOTE: Language is just supported in home page.
 * 
 * If the content is in the main page, language may be used to to load content.
 * Here is the list of language params: - $routeParams.language -
 * setting.language - config.language
 * 
 * @property {Object} $scope Shared data with view
 * @property {Object} $scope.error current error from controller
 * @property {boolean} $scope.working is true if controller is doing some
 *           process
 * @property {string} getModelMeta meta data of the content
 * @property {string} $scope.model data model and page design if is WB page.
 */
angular.module('vwStudio').controller('AmhContentEditorCtrl', function(
		/* AMH      */ WbObservableObject, $amhEditorService,
		/* angular  */ $scope, $element, $rootScope
) {


	/**
	 * Sets root widget
	 * 
	 * @param rootWidget {Widget} to set as root
	 */
	this.setRootWidget = function(rootWidget) {
		this.rootWidget = rootWidget;
		this.fire('rootWidgetChanged', {
			value: this.rootWidget
		});
	};

	/**
	 * Gets root widget
	 * 
	 * @return the root widget of the editor
	 */
	this.getRootWidget = function() {
		return this.rootWidget;
	};

	/**
	 * Sets selected widgets
	 * 
	 * @param widgets {Array} of widgets
	 */
	this.setSelectedWidgets = function(widgets) {
		var oldValue = this.SelectedWidgets;
		this.selectedWidgets = widgets || [];
		$rootScope.workbenchSelectedWidgets = widgets;
		if ($scope.workbench) {
			$scope.workbench.fire('selecteWidgetsChanged', {
				oldValue: oldValue,
				value: this.selectedWidgets
			});
		}
	};

	/**
	 * Gets selected widgets
	 * 
	 * @return selected widgets
	 */
	this.getSelectedWidgets = function() {
		return this.selectedWidgets || [];
	};

	this.getState = function() {
		return this.state;
	};

	this.setState = function(state) {
		var oldValue = this.state;
		this.state = state;
		this.fire('stateChanged', {
			oldValue: oldValue,
			value: state
		});
	};

	this.isEditable = function() {
		return this.state === 'edit';
	};

	this.getElement = function() {
		return $element;
	};

	this.getScope = function() {
		return $scope;
	};

	this.init = function() {
		// load observable
		angular.extend(this, WbObservableObject.prototype);
		WbObservableObject.apply(this);
		this.setState('ready');
		this.readOnly = true;
		$amhEditorService.connectEditor(this);
		// add edtor to 
		var ctrl = this;
		$scope.$watch('workbench', function(workbench) {
			if (workbench) {
				workbench.addEditor(ctrl);
			}
		});
	};

	this.init();
});

