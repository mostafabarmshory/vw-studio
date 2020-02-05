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
 * @ngdoc Widgets
 * @name StodioWidget
 * @descreption Abstract widget
 * 
 * This is an abstract implementation of the widgets. ## Models
 * 
 * The model of the widget is consist of two main part:
 * 
 * <ul>
 * <li>User data</li>
 * <li>Runtime data</li>
 * </ul>
 * 
 * User data is set as input data model and the runtime data is managed by
 * events and user functions.
 * 
 * Finally the combination of user and runtime data is used to update the view.
 * 
 * The setModelProperty changes the user data model.
 * 
 * The setProperty changes the runtime properties.
 *  ## Events
 * 
 * 
 * Here is list of allowed types:
 * 
 * <ul>
 * <li>modelChanged: some properties of the model is changed.</li>
 * <li>modelUpdated: A new data model is replaced with the current one.</li>
 * <li>styleChanged: Computed style of the current widget is update.</li>
 * <li>widgetIsEditable: Widget is in editable state (so the result of
 * isEditable() is true)</li>
 * <li>widgetIsNotEditable: widget is not in editable mode any more(so the
 * result of isEditable() is false)</li>
 * <li>widgetDeleted: the widgets is removed.</li>
 * <li>widgetUnderCursor: The widget is under the mouse</li>
 * <li>widgetSelected: the widget is selected</li>
 * <li>widgetUnselected: the widget is unselected</li>
 * </ul>
 * 
 * Following event propagate on the root too
 * 
 * <ul>
 * <li>widgetUnderCursor</li>
 * <li>widgetSelected</li>
 * </ul>
 */
angular.module('vwStudio').factory('StodioWidget', function(WbWidgetElement, $widget) {


	/**
	 * Creates new instance of the group
	 * 
	 * @memberof WbWidgetGroupCtrl
	 * @ngInject
	 */
	function StodioWidget($element, $parent) {
		WbWidgetElement.apply(this, [$element, $parent]);
	}

	// extend functionality
	StodioWidget.prototype = Object.create(WbWidgetElement.prototype);



	StodioWidget.prototype.isLeaf = function() {
		var wd = $widget.getWidget(this.getType());
		return wd.isLeaf;
	};

	/**
	 * List of allowed child
	 * 
	 * @memeberof WbWidgetGroupCtrl
	 */
	StodioWidget.prototype.getAllowedTypes = function() {
		return this.allowedTypes;
	};

	/**
	 * set acceptable widgets
	 * 
	 * $widget.setAcceptableChild('a', 'b');
	 * 
	 * @memberof WbWidgetGroupCtrl
	 */
	StodioWidget.prototype.setAllowedTypes = function() {
		this.allowedTypes = arguments;
	};

	StodioWidget.prototype.isHorizontal = function() {
		var direction = this.getModelProperty('style.flexDirection') || this.getProperty('style.flexDirection');
		return direction === 'row';
	};

	return StodioWidget;
});

