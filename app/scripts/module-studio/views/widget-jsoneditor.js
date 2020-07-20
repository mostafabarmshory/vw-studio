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

angular.module('vwStudio').controller('StudioWidgetJsonEditorCtrl', function($scope, $element, $window, $q, $amhEditorService) {

	var editor;
	var ctrl = this;
	var workbench;
	var editor;
	var widget;

	function createEditor() {
		// load js
		$q.all([
			$window.loadLibrary('//cdn.viraweb123.ir/api/v2/cdn/libs/jsoneditor@9.0.3/dist/jsoneditor.min.js'),
			$window.loadStyle('//cdn.viraweb123.ir/api/v2/cdn/libs/jsoneditor@9.0.3/dist/jsoneditor.min.css')
		]).then(function() {
			// create the editor
			var container = $element[0];
			var options = {
				onChangeJSON: function(event) {
					saveModel();
				}
			};
			editor = new JSONEditor(container, options);
		});
	}

	function setModel(model) {
		var newModel = _.cloneDeep(model);
		delete newModel.on;
		delete newModel.children;
		editor.set(newModel);
	}

	function saveModel() {
		var newModel = editor.get();
		_.forEach(newModel, function(value, key) {
			if (key === 'style') {
				return;
			}
			widget.setModelProperty(key, value);
		});
		_.forEach(newModel.style, function(value, key) {
			widget.setModelProperty('style.' + key, value);
		});
	}

	function setSelectedWidget(newWidgets) {
		widget = newWidgets[0];
		setModel(widget.getModel());
	}

	function handleSelectionEvent(event) {
		setSelectedWidget(event.value);
	}

	//	function handleWorkbenchEvent(event) {
	//		setEditor(event.value);
	//	};

	//	function setEditor(newEditor) {
	//		if (editor) {
	//			editor.off('selecteWidgetsChanged', handleSelectionEvent);
	//		}
	//		editor = newEditor;
	//		if (editor) {
	//			editor.on('selecteWidgetsChanged', handleSelectionEvent);
	//		}
	//	}

	function setWorkbench(newWorkbench) {
		if (workbench) {
			newWorkbench.off('selecteWidgetsChanged', handleSelectionEvent);
		}
		workbench = newWorkbench;
		if (workbench) {
			newWorkbench.on('selecteWidgetsChanged', handleSelectionEvent);
		}
	}

	_.assign(ctrl, {

	});

	createEditor();

	$amhEditorService.on('workbenchChanged', function($event) {
		setWorkbench($event.value);
	});
	setWorkbench($amhEditorService.getWorkbench());
});

// MBlowfish 7
//mblowfish.addView('/studio/widgets/jsoneditor', {
//	templateUrl: '',
//	controller: function(){},
//	controllerAs: 'ctrl'
//});

// Mblowfish 8
//import 'MblowfishEditor';
//import './widget-jsoneditor.css';
//import './widget-jsoneditor.html';
//class StudioWidgetJsonEditor extends MblowfishEditor {}
//mblowfish.addView('/studio/widgets/jsoneditor', StudioWidgetJsonEditor);