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
angular.module('vwStudio')
/**
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event
 * @param AmhEditorProcessor
 * @param $window
 * @returns
 */
.factory('AmhEditorProcessorClipboard', function(
		AmhEditorProcessor, $widget, $actions) {
	

	var EditorProcessor = function (editor, options) {
		options = options || {};
		AmhEditorProcessor.apply(this, [editor, options]);
	};

	EditorProcessor.prototype = new AmhEditorProcessor();


	EditorProcessor.prototype.connect = function(){
		if(angular.isFunction(this.editModeListener)){
			this.disconnect();
		}
		var ctrl = this;
		var editor = this.editor;
		// add actions
		$actions.newAction({
			id: 'amh.workbench.editor.copy',
			priority: 15,
			icon: 'content_copy',
			title: 'Copy',
			description: 'Copy selected widgets',
			visible: function () {
				return editor.getSelectedWidgets().length && editor.isEditable();
			},
			/*
			 * @ngInject
			 */
			action: function () {
				return ctrl.copy();
			},
			groups: ['amh.workbench.editor.weburger.toolbar#clipboard'],
			scope: this.editor.getScope()
		});
		$actions.newAction({
			id: 'amh.workbench.editor.past',
			priority: 15,
			icon: 'content_paste',
			title: 'Past',
			description: 'Past widgets from clipboard',
			visible: function () {
				return editor.getSelectedWidgets().length && editor.isEditable();
			},
			/*
			 * @ngInject
			 */
			action: function () {
				return ctrl.pastInternal();
			},
			groups: ['amh.workbench.editor.weburger.toolbar#clipboard'],
			scope: this.editor.getScope()
		});
		$actions.newAction({
			id: 'amh.workbench.editor.cut',
			priority: 15,
			icon: 'content_cut',
			title: 'Cut',
			description: 'Cut widgets into the clipboard',
			visible: function () {
				return editor.getSelectedWidgets().length && editor.isEditable();
			},
			/*
			 * @ngInject
			 */
			action: function () {
				return ctrl.cut();
			},
			groups: ['amh.workbench.editor.weburger.toolbar#clipboard'],
			scope: this.editor.getScope()
		});
		/*
		 * handle past
		 */
		this.copyListener = function(event){
			ctrl.copy(event);
		};

		/*
		 * handle past
		 */
		this.pastListener = function(event){
			ctrl.past(event);
		}
		
		/*
		 * handle cut
		 */
		this.cutListener = function(event){
			ctrl.cut(event);
		}

		/*
		 * Check editor state
		 */
		this.editModeListener = function() {
			var element = ctrl.editor.getElement();
			if(ctrl.editor.isEditable()){
				element.attr('tabindex', '1');
				element.focus();
				element[0].addEventListener('copy', ctrl.copyListener);
				element[0].addEventListener('paste', ctrl.pastListener);
				element[0].addEventListener('cut', ctrl.cutListener);
			} else {
				element.removeAttr('tabindex');
				element[0].removeEventListener('copy', ctrl.copyListener);
				element[0].removeEventListener('paste', ctrl.pastListener);
				element[0].removeEventListener('cut', ctrl.cutListener);
			}
		};
		this.editor.on('stateChanged', this.editModeListener);
	};

	/**
	 * Disconnect form editor
	 */
	EditorProcessor.prototype.disconnect = function(){
		var element = this.editor.getElement();
		this.editor.off('stateChanged', this.editModeListener);
		element[0].removeEventListener('copy', this.copyListener);
		element[0].removeEventListener('paste', this.pastListener);
		delete this.stateListener;
		delete this.pastListener;
		delete this.copyListener;
	};

	EditorProcessor.prototype.copy = function(event){
		// use chrom event
		var selectedWidgets = this.editor.getSelectedWidgets();
		if (selectedWidgets.length === 0) {
			return;
		} 
		var data;
		if (selectedWidgets.length === 1) {
			data = selectedWidgets[0].getModel();
		} else {
			data = [];
			angular.forEach(selectedWidgets, function (widget) {
				data.push(widget.getModel());
			});
		}
		if(event) {
			// NOTE: plain text is supported with common browsers
			event.clipboardData.setData('text/plain', JSON.stringify(data));
			event.preventDefault();
		} else {
			navigator.clipboard.writeText(JSON.stringify(data));
		}
	}

	EditorProcessor.prototype.past = function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		var mimeType = 'text/plain';
		var data =  clipboardData.getData('text');
		var converter = $widget.getConverter('text/plain');

		// Browsers that support the 'text/html' type in the Clipboard API (Chrome, Firefox 22+)
		if (clipboardData && clipboardData.types) {
			var converters = $widget.getConverters();
			for(var i = 0; i < converters.length; i++){
				var tc = converters[i];
				mimeType = tc.getMimetype();
				if(_.includes(clipboardData.types, mimeType)){
					converter = tc;
					data =  clipboardData.getData(mimeType);
					break;
				}
			}
		}
		addWidgets(this.editor, converter.decode(data));
		// Stop the data from actually being pasted
		event.stopPropagation();
		event.preventDefault();
		return false;
	};

	EditorProcessor.prototype.pastInternal = function(){
		var workbench = this.editor;
		navigator.clipboard.readText()
		.then(function(data) {
			var converters = $widget.getConverters();
			for(var i = 0; i < converters.length; i++){
				var converter = converters[i];
				var widgets = converter.decode(data);
				if(widgets.length){
					addWidgets(workbench, widgets);
					return;
				}
			}
		});
	};
	
	EditorProcessor.prototype.cut = function(){
		this.copy();
		var selectedWidgets = this.editor.getSelectedWidgets();
		_.forEach(selectedWidgets, function(widget){
			widget.delete();
		});
	};

	function addWidgets(workbench, widgets){
		var group = workbench.getRootWidget();
		var index = 0;
		var selectedWidgets = workbench.getSelectedWidgets();
		if (selectedWidgets.length !== 0) {
			var item = selectedWidgets[selectedWidgets.length - 1];
			if(!item.isLeaf() && selectedWidgets.length === 1){
				group = item;
			} else {
				group = item.getParent() || item;
				index = group.indexOfChild(item);
			}
		}
		group.addChildrenModel(index, widgets);
	}

	return EditorProcessor;
});
