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
angular.module('vwStudio').controller('AmhContentWorkbenchTermTaxonomiesCtrl', function(
    /* angularjs             */ $scope,
    /* angualr-material-home */ $amhEditorService, $actions) {
	/*
	 * Allow user to change current content settings such as title, description
	 * and ..
	 */
	var ctrl = this;
	this.termTaxonomiesMap = {};

	function termTaxonomiesChanged() {
		ctrl.termTaxonomies = ctrl.workbench ? ctrl.workbench.getTermTaxonomies() : [];
		ctrl.termTaxonomiesMap = {};
		_.forEach(ctrl.termTaxonomies, function(termTaxonomies) {
			var list = ctrl.termTaxonomiesMap[termTaxonomies.taxonomy];
			if (!_.isArray(list)) {
				list = [];
				ctrl.termTaxonomiesMap[termTaxonomies.taxonomy] = list;
			}
			list.push(termTaxonomies);
		});
	}

	function setWorkbench(workbenc) {
		if (ctrl.workbench) {
			ctrl.workbench.off('termTaxonomiesChanged', termTaxonomiesChanged);
		}
		ctrl.workbench = workbenc;
		if (ctrl.workbench) {
			ctrl.workbench.on('termTaxonomiesChanged', termTaxonomiesChanged);
		}
		termTaxonomiesChanged();
	}

	function handleWorkbench(event) {
		setWorkbench(event.value);
	}

	function contentChanged() {
		// XXX: maso, 2020: check content chaged event
	}

	this.addTermTaxonomies = function($event) {
		$actions.exec('amh.workbench.content.termTaxonomies.create', $event);
	};

	this.deleteTermTaxonomy = function(item, $event) {
		$event.items = [item];
		$actions.exec('amh.workbench.content.termTaxonomies.delete', $event);
	};


	setWorkbench($amhEditorService.getWorkbench());
	$amhEditorService.on('workbenchChanged', handleWorkbench);
	$scope.$on('destory', function() {
		$amhEditorService.off('workbenchChanged', handleWorkbench);
		if (ctrl.workbench) {
			ctrl.workbench.on('contentChanged', contentChanged);
		}
	});
});