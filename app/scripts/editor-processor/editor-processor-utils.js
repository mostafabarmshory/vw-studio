
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
 * @name AmhEditorProcessorUtils
 * 
 */
angular.module('vwStudio').factory('AmhEditorProcessorUtils', function(
		/* amh       */ AmhEditorProcessor,
		/* weburger  */ $widget, WbProcessorLocator, WbProcessorSelect, WbProcessorDnd,
		/* mblowfish */ $actions
		/* angularjs */) {


	var COMMON_ACTION_GROUPS = ['amh.workbench.editor.weburger.toolbar#common'];

	function Processor(editor, options) {
		options = options || {};
		AmhEditorProcessor.apply(this, [editor, options]);

		this.locatorProcessor = new WbProcessorLocator();
		this.selectProcessor = new WbProcessorSelect();
		this.dndProcessor = new WbProcessorDnd();

		var ctrl = this;
		this.selectProcessor.on('selectionChange', function() {
			// XXX:
			var selectedWidgets = ctrl.selectProcessor.getSelectedWidgets();
			ctrl.editor.setSelectedWidgets(selectedWidgets || []);
			try{
				ctrl.editor.getScope().$digest();
			} catch(ex){}
		});
	}
	Processor.prototype = new AmhEditorProcessor();



	/*
	 * Connect to the editor
	 * @see AmhEditorProcessor#connect
	 */
	Processor.prototype.connect = function() {
		if (angular.isFunction(this.editModeListener)) {
			this.disconnect();
		}
		var ctrl = this;
		var editor = ctrl.editor;
		function singleContainerActionVisible() {
			var widgets = editor.getSelectedWidgets();
			return widgets.length === 1 &&
				!widgets[0].isLeaf() &&
				editor.isEditable();
		}

		/*
		 * Check editor state
		 */
		this.editModeListener = function() {
			if (ctrl.editor.isEditable()) {
				ctrl.connectUtilities();
			} else {
				ctrl.disConnectUtilities();
			}
			editor.getRootWidget().setEditable(editor.isEditable());
		};
		this.editor.on('stateChanged', this.editModeListener);

		$actions.newAction({
			id: 'amh.workbench.widget.selectChildren',
			priority: 15,
			icon: 'select_all',
			title: 'Select Children',
			description: 'Select all children of the selected widget',
			visible: singleContainerActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.selectChildrenWidget($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});
		$actions.newAction({
			id: 'amh.workbench.widget.click',
			priority: 15,
			icon: 'select',
			title: 'Select the widget',
			description: 'Select the widget',
			visible: singleContainerActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.clickWidget($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});
		$actions.newAction({
			id: 'amh.workbench.widget.dblclick',
			priority: 15,
			icon: 'eidt',
			title: 'Edit the widget',
			description: 'Edit the widget',
			visible: singleContainerActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.dblclickWidget($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});
	};

	/*
	 * Disconnect form editor
	 * @see AmhEditorProcessor#disconnect
	 */
	Processor.prototype.disconnect = function() {
		this.disConnectUtilities();
	};

	Processor.prototype.connectUtilities = function() {
		$widget.setProcessor('locator', this.locatorProcessor);
		$widget.setProcessor('select', this.selectProcessor);
		$widget.setProcessor('dnd', this.dndProcessor);

		this.locatorProcessor.setEnable(true);
		this.selectProcessor.setEnable(true);
	};

	Processor.prototype.disConnectUtilities = function() {
		this.locatorProcessor.setEnable(false);
		this.selectProcessor.setEnable(false);
	};

	Processor.prototype.selectChildrenWidget = function($event) {
		var widgets = [];
		var items = $event.items || this.selectProcessor.getSelectedWidgets();
		_.forEach(items || [], function(item) {
			if (item.getChildren) {
				widgets = _.concat(widgets, item.getChildren());
			}
		});
		return this.selectProcessor.setSelectedWidgets(widgets);
	};

	Processor.prototype.clickWidget = function($event) {
		$event.source = $event.items[0];
		return this.selectProcessor.clickListener($event);
	};

	Processor.prototype.dblclickWidget = function($event) {
		$event.source = $event.items[0];
		return this.selectProcessor.dblclickListener($event);
	};

	return Processor;
});
