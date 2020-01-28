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
 * @ngdoc Editor
 * @name WidgetEditorTinymceSection
 * @description Editor of a section
 * 
 *  Section is list of html widgets such as a, p, pre, and h. This editor allow
 * you to edit a section as a simple text. All entered text converted into a 
 * common widgets and stored into the section.
 */

angular.module('vwStudio').factory('WidgetEditorTinymceSection', function($widget, WidgetEditor) {

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
	 * @memberof WidgetEditorTinymce
	 */
	Editor.prototype.destroy = function() {
		WidgetEditor.prototype.destroy.call(this);
		this.hide();
	};

	/**
	 * Remove editor
	 */
	Editor.prototype.hide = function() {
		// remove all tinymce editor
		for (var i = tinymce.editors.length - 1; i > -1; i--) {
			var ed_id = tinymce.editors[i].id;
			tinymce.execCommand('mceRemoveEditor', true, ed_id);
		}

		// set hidern
		if (this.isHidden()) {
			return;
		}
		this._hide = true;

		// TODO: fire state changed
	};

	/**
	 * Run and display editor for the current widget
	 */
	Editor.prototype.show = function() {
		this._hide = false;
		var ctrl = this;
		var widget = this.getWidget();
		var element = widget.getElement();
		var selectorPath = element.getPath();
		tinymce.init(_.merge(this.options, {
			selector: selectorPath,
			themes: 'modern',
			setup: function(editor) {

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

				//				editor.on('focusout', function(){
				//				ctrl.closeWithoutSave();
				//				});

				editor.on('keydown', function(e) {
					if (e.keyCode === 27) { // escape
						ctrl.closeWithoutSave();
						return false;
					}
				});

				editor.on('KeyDown KeyUp KeyPress Paste Copy', function(event) {
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
			}
		}))
			.then(function() {
				element.focus();
			});
	};

	Editor.prototype.isHidden = function() {
		return this._hide;
	};

	/**
	 * Read value from element and set into the element
	 */
	Editor.prototype.updateView = function(editor) {
		var content = editor.getContent({
			format: this.options.format || 'html'
		}).trim();
		this._content = content;
		this.setDirty(true);
	};


	Editor.prototype.closeWithoutSave = function() {
		this.setDirty(false);
		this.hide();
		// reset old value
		var widget = this.widget;
		widget.loadWidgets();
	};

	Editor.prototype.saveAndClose = function() {
		this.hide();
		if (this.isDirty()) {
			var widget = this.widget;
			var converter = $widget.getConverter('text/html');
			var widgets = converter.decode(this._content);
			widget.removeChildren();
			widget.getElement().empty();
			widget.addChildrenModel(0, widgets);
			this.setDirty(false);
		}
	};

	//	the editor type
	return Editor;
});
