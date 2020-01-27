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
angular.module('vwStudio').factory('AmhEditorProcessorCommon', function(
		/* MBlowFish */ $help, $actions,
	AmhEditorProcessor) {


	var COMMON_ACTION_GROUPS = ['amh.workbench.editor.weburger.toolbar#common'];

	function Processor(editor, options) {
		options = options || {};
		AmhEditorProcessor.apply(this, [editor, options]);
	}
	Processor.prototype = new AmhEditorProcessor();


	Processor.prototype.connect = function() {
		if (angular.isFunction(this.editModeListener)) {
			this.disconnect();
		}
		var ctrl = this;
		var editor = this.editor;

		function commonActionVisible() {
			return editor.getSelectedWidgets().length && editor.isEditable();
		}

		function singleWidgetActionVisible() {
			return editor.getSelectedWidgets().length === 1 && editor.isEditable();
		}

		// add actions
		$actions.newAction({
			id: 'amh.workbench.editor.delete',
			priority: 15,
			icon: 'delete',
			title: 'Delete',
			description: 'Delete selected widgets',
			visible: commonActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.deleteWidgets($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});
		$actions.newAction({
			id: 'amh.workbench.editor.clone',
			priority: 15,
			icon: 'view_stream',
			title: 'Clone',
			description: 'Clones selected widgets',
			visible: commonActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.cloneWidgets($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});
		$actions.newAction({
			id: 'amh.workbench.editor.help',
			priority: 15,
			icon: 'help',
			title: 'Help',
			description: 'Show help for the selected widget',
			visible: singleWidgetActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.openHelpOfWidgets($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});

		$actions.newAction({
			id: 'amh.workbench.editor.moveFirst',
			priority: 103,
			icon: 'first_page',
			title: 'First',
			description: 'Move widgets to the first postion',
			visible: commonActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.moveFirstWidgets($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});
		$actions.newAction({
			id: 'amh.workbench.editor.movePrevious',
			priority: 102,
			icon: 'chevron_left',
			title: 'Previous',
			description: 'Move widget to the previous postion',
			visible: commonActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.moveBeforeWidgets($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});
		$actions.newAction({
			id: 'amh.workbench.editor.moveNext',
			priority: 101,
			icon: 'chevron_right',
			title: 'Next',
			description: 'Move the widget to the next position',
			visible: commonActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.moveNextWidgets($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});
		$actions.newAction({
			id: 'amh.workbench.editor.moveLast',
			priority: 100,
			icon: 'last_page',
			title: 'Last',
			description: 'Move widgets to the last postion',
			visible: commonActionVisible,
			/*
			 * @ngInject
			 */
			action: function($event) {
				return ctrl.moveLastWidgets($event);
			},
			groups: COMMON_ACTION_GROUPS,
			scope: this.editor.getScope()
		});



		/*
		 * handle past
		 */
		this.keyEventListener = function(event) {
			if (event.code === 'Delete') {
				ctrl.deleteWidgets();
			}
		};
		/*
		 * Check editor state
		 */
		this.editModeListener = function() {
			var element = ctrl.editor.getElement();
			if (ctrl.editor.isEditable()) {
				element[0].addEventListener('keyup', ctrl.keyEventListener);
			} else {
				element[0].removeEventListener('keyup', ctrl.keyEventListener);
			}
		};
		this.editor.on('stateChanged', this.editModeListener);
	};

	/**
	 * 
	 * @memberof AmhEditorProcessorCommon
	 */
	Processor.prototype.disconnect = function() {
		var element = this.editor.getElement();
		this.editor.off('stateChanged', this.editModeListener);
		element[0].removeEventListener('keyup', this.keyEventListener);
		delete this.stateListener;
		delete this.keyEventListener;
	};

	/**
	 * 
	 * @memberof AmhEditorProcessorCommon
	 */
	Processor.prototype.deleteWidgets = function() {
		//NOTE: The list may be changed after the first delete. Therefore I clone the original
		//selected widgets and do the delete action over it.
		var widgets = _.clone(this.editor.getSelectedWidgets());
		var newSelection = [];
		widgets.forEach(function(widget) {
			var parent = widget.getParent();
			widget.delete();
			if (parent) {
				parent.setSelected(true);
				newSelection.push(parent);
			}
		});
		this.editor.setSelectedWidgets(newSelection);
	};

	/**
	 * Clones selected widgets
	 * 
	 * @memberof AmhEditorProcessorCommon
	 */
	Processor.prototype.cloneWidgets = function() {
		var widgets = this.editor.getSelectedWidgets();
		widgets.forEach(function(widget) {
			widget.clone();
		});
	};

	/**
	 * Move selected widgets to the first position
	 * 
	 * @memberof AmhEditorProcessorCommon
	 */
	Processor.prototype.moveFirstWidgets = function() {
		var widgets = this.editor.getSelectedWidgets();
		widgets.forEach(function(widget) {
			widget.moveFirst();
		});
	};

	/**
	 * Move selected widgets to the privieus postion
	 * 
	 * @memberof AmhEditorProcessorCommon
	 */
	Processor.prototype.moveBeforeWidgets = function() {
		var widgets = this.editor.getSelectedWidgets();
		widgets.forEach(function(widget) {
			widget.moveBefore();
		});
	};

	/**
	 * Moves selected widgets to the next position
	 * 
	 * @memberof AmhEditorProcessorCommon
	 */
	Processor.prototype.moveNextWidgets = function() {
		var widgets = this.editor.getSelectedWidgets();
		widgets.forEach(function(widget) {
			widget.moveNext();
		});
	};

	/**
	 * Moves selected widgets to the last postions
	 * 
	 * @memberof AmhEditorProcessorCommon
	 */
	Processor.prototype.moveLastWidgets = function() {
		var widgets = this.editor.getSelectedWidgets();
		widgets.forEach(function(widget) {
			widget.moveLast();
		});
	};

	/**
	 * Open help for first selected widgets
	 * 
	 * @memberof AmhEditorProcessorCommon
	 */
	Processor.prototype.openHelpOfWidgets = function() {
		var widgets = this.editor.getSelectedWidgets();
		return $help.openHelp(widgets[0]);
	};

	return Processor;
});
