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

angular.module('vwStudio')//

/**
 * @ngdoc Widget Editor
 * @name WidgetEditorTinymceSingleLine
 * @description A single line text editor
 * 
 *  In a single line editor you are allowed to set a text property into a widget. For
 * example you can change text of a header. Some key and actions are reserved:
 * 
 * - Enter: save and close the editor
 * - ESC: close editor without save
 * 
 * 
 */

.factory('WidgetEditorTinymceSingleLine', function ($sce, WidgetEditor) {

	/**
	 * TODO: maso, 2019: extends WidgetEditorFake
	 * 
	 * Creates new instace of an editor
	 */
	function Editor(widget, options) {
		options = options || {};
		WidgetEditor.apply(this, [widget, options]);
	}

	Editor.prototype = new WidgetEditor();

	/**
	 * remove all resources
	 * 
	 * @memberof WidgetEditorTinymceSingleLine
	 */
	Editor.prototype.destroy = function () {
		this.hide();
		WidgetEditor.prototype.destroy.call(this);
	};

	/**
	 * Remove editor
	 * 
	 * @memberof WidgetEditorTinymceSingleLine
	 */
	Editor.prototype.hide = function () {
		// remove all tinymce editor
		for (var i = tinymce.editors.length - 1 ; i > -1 ; i--) {
			var ed_id = tinymce.editors[i].id;
			tinyMCE.execCommand('mceRemoveEditor', true, ed_id);
		}

		// check current editor
		if (this.isHidden()) {
			return;
		}
		this._hide = true;
		// TODO: fire state changed
		if(this.tinyEditor){
			this.tinyEditor.remove();
			delete this.tinyEditor;
		}
	};

	/**
	 * Run and display editor for the current widget
	 * 
	 * @memberof WidgetEditorTinymceSingleLine
	 */
	Editor.prototype.show = function () {
		this._hide = false;
		var ctrl = this;
		var widget = this.getWidget();
		var element = widget.getElement();
		tinymce.init(_.merge(this.options, {
			selector : element.getPath(),
			themes : 'modern',
			setup: function (editor) {
				ctrl.tinyEditor = editor;
				editor.on('keydown', function(e) {
					if (e.keyCode === 27) { // escape
						ctrl.closeWithoutSave();
						return false;
					}
					if (e.keyCode === 13){
						ctrl.saveAndClose();
						return false;
					}
				});

//				editor.on('focusout', function(){
//				ctrl.closeWithoutSave();
//				});

				editor.on('KeyDown KeyUp KeyPress Paste Copy', function(event){
					event.stopPropagation();
					editor.save();
				});

				// Update model when:
				// - a button has been clicked [ExecCommand]
				// - the editor content has been modified [change]
				// - the node has changed [NodeChange]
				// - an object has been resized (table, image) [ObjectResized]
				editor.on('ExecCommand change NodeChange ObjectResized', function() {
					editor.save();
					ctrl.updateView(editor);
				});

				//
				// Adding custom actions
				//
				// Save button to save and close the editor
				editor.ui.registry.addButton('save', {
//					text: 'save',
					icon: 'save',
					tooltip: 'Save current changes and close the editor',
					onAction: function() {
						ctrl.saveAndClose();
					}
				});
				// close button
				editor.ui.registry.addButton('close', {
//					text: 'close',
					icon: 'close',
					tooltip: 'Close and discards changes',
					onAction: function() {
						ctrl.closeWithoutSave();
					}
				});

//				alignleft aligncenter alignjustify alignright alignfull
				// style.textAlign: left, center, right, justify;
				_.forEach(['widgetalignleft', 'widgetaligncenter', 'widgetalignjustify', 'widgetalignright'], function(action){
					editor.ui.registry.addButton(action, {
						icon: 'align-' + action.substring(11),
						onAction: function() {
							ctrl.widget.setModelProperty('style.textAlign', action.substring(11));
						}
					});
				});
			}
		}))
		.then(function () {
			element.focus();
		});
	};

	/**
	 * Checks if the editor is hiden
	 * 
	 * @memberof WidgetEditorTinymceSingleLine
	 */
	Editor.prototype.isHidden = function () {
		return this._hide;
	};

	/**
	 * Read value from element and set into the element
	 * 
	 * @memberof WidgetEditorTinymceSingleLine
	 */
	Editor.prototype.updateView = function (editor) {
		var content = editor.getContent({
			format : this.options.format || 'html'
		}).trim();
		this._content = content;
		this.setDirty(true);
	};

	/**
	 * Close editor and discards changes
	 * 
	 * @memberof WidgetEditorTinymceSingleLine
	 */
	Editor.prototype.closeWithoutSave = function(){
		this.setDirty(false);
		this.hide();
		// reset old value
		var widget = this.widget;
		widget.fire('modelUpdated', {
			key: this.options.property,
			oldValue: '',
			value: this.widget.getModelProperty(this.options.property)
		});
	};

	/**
	 * Save and close the editor
	 * 
	 * @memberof WidgetEditorTinymceSingleLine
	 */
	Editor.prototype.saveAndClose = function(){
		// remove editor
		if(this.isDirty()){
			this.widget.setModelProperty(this.options.property, this._content);
		}
		this.hide();
	};

//	the editor type
	return Editor;
});
