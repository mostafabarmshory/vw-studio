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
angular.module('ngMaterialHome')
.factory('AmhWorkbenchProcessorClone', function(AmhWorkbenchProcessor, $actions, $app, $sidenav) {
	

	var Processor = function (editor, options) {
		options = options || {};
		AmhWorkbenchProcessor.apply(this, [editor, options]);
		
	};
	Processor.prototype = new AmhWorkbenchProcessor();
	
	Processor.prototype.connect = function(){
		var ctrl = this;
		var workbench = this.editor;
		this.actions = [{// clone new menu
			id: 'amh.scope.clone',
			priority: 15,
			icon: 'content_copy',
			title: 'Clone',
			description: 'Clone page',
			visible: function () {
				return ctrl.isClonable();
			},
			/*
			 * @ngInject
			 */
			action: function () {
				return ctrl.cloneContent();
			},
			groups: ['amh.owner-toolbar.scope'],
			scope: this.editor.getScope()
		}];
		_.forEach(this.actions, function(action){
			$actions.newAction(action); 
		});
	};
	
	Processor.prototype.disconnect = function(){
		_.forEach(this.actions || [], function(action){
			$actions.removeAction(action); 
		});
		delete this.actions;
	};
	
	Processor.prototype.isClonable = function(){
		var workbench = this.editor;
		var content = workbench.getContent();
		if(!content){
			return false;
		}
		var permissions = $app.getProperty('account.permissions');
		return permissions.tenant_owner || permissions.cms_author || permissions.cms_editor;
	};
	
	Processor.prototype.cloneContent = function(){
		this
		.then(function () {
			$window.toast('Page is cloned.');
		}, function (/*error*/) {
			$window.alert('Fail to clone the page.');
		});
	};
	
	return Processor;
});

