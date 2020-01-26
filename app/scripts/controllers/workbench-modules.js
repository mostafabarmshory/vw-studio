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
.controller('AmhContentWorkbenchModuleCtrl', function($scope, $amhEditorService, $actions, $window){
	
	var ctrl = this;
	var COTNTENT_CHANGE_EVENT = 'contentChanged';
	var WORKBENCH_CHANGE_EVENT = 'workbenchChanged';

	function modulesChanged(){
		ctrl.modules = ctrl.workbench.getContentModules();
	}

	function setWorkbench(workbenc){
		if(ctrl.workbench){
			ctrl.workbench.off(COTNTENT_CHANGE_EVENT, modulesChanged);
		}
		ctrl.workbench = workbenc;
		if(ctrl.workbench){
			ctrl.workbench.on(COTNTENT_CHANGE_EVENT, modulesChanged);
		}
		modulesChanged();
	}

	function handleWorkbench(event){
		setWorkbench(event.value);
	}

	this.addModule = function($event){
		$actions.exec('amh.workbench.content.module.add', $event);
	};

	this.deleteModule = function(module, $event){
		$window.confirm('Delete modeule?')
		.then(function(){
			$event.modules = [module];
			$actions.exec('amh.workbench.content.module.remove', $event);
		});
	};

	this.editModule = function(module, $event){
		$event.modules = [module];
		$actions.exec('amh.workbench.content.module.edit', $event);
	};

	/*
	 * connect to environment
	 */
	setWorkbench($amhEditorService.getWorkbench());
	$amhEditorService.on(WORKBENCH_CHANGE_EVENT, handleWorkbench);
	$scope.$on('destory', function(){
		$amhEditorService.off(WORKBENCH_CHANGE_EVENT, handleWorkbench);
		if(ctrl.workbench){
			ctrl.workbench.on(COTNTENT_CHANGE_EVENT, contentChanged);
		}
	});
});