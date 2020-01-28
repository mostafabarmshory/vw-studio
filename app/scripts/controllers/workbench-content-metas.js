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
angular.module('vwStudio').controller('AmhContentWorkbenchMetasCtrl', function(
    /* angularjs */ $scope, $window,
    /* angualr-material-home */ $amhEditorService, $actions) {

	var ctrl = this;
	var CONTENT_METADATA_CHANGE_EVENT = 'contentMetadataChanged';
	var WORKBENCH_CHANGE_EVENT = 'workbenchChanged';

	function contentMetadataChanged() {
		if (ctrl.workbench) {
			ctrl.contentMetadata = ctrl.workbench.getContentMetadata();
		}
	}

	function setWorkbench(workbenc) {
		if (ctrl.workbench) {
			ctrl.workbench.off(CONTENT_METADATA_CHANGE_EVENT, contentMetadataChanged);
		}
		ctrl.workbench = workbenc;
		if (ctrl.workbench) {
			ctrl.workbench.on(CONTENT_METADATA_CHANGE_EVENT, contentMetadataChanged);
		}
		contentMetadataChanged();
	}

	function handleWorkbench(event) {
		setWorkbench(event.value);
	}

	this.deleteMetadatum = function(meta, $event) {
		$window.confirm('Delete metadata?')
			.then(function() {
				$event.metadata = [meta];
				return $actions.exec('amh.workbench.content.metadata.delete', $event);
			});
	};

	this.editMetadatum = function(meta, $event) {
		$event.metadata = [meta];
		return $actions.exec('amh.workbench.content.metadata.update', $event);
	};

	this.addMetadatum = function($event) {
		return $actions.exec('amh.workbench.content.metadata.create', $event);
	};

	setWorkbench($amhEditorService.getWorkbench());
	$amhEditorService.on(WORKBENCH_CHANGE_EVENT, handleWorkbench);
	$scope.$on('destory', function() {
		$amhEditorService.off(WORKBENCH_CHANGE_EVENT, handleWorkbench);
		if (ctrl.workbench) {
			ctrl.workbench.on(CONTENT_METADATA_CHANGE_EVENT, contentMetadataChanged);
		}
	});

});