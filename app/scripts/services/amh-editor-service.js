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
.service('$amhEditorService', function (WbObservableObject) {
	

	// load observable
	angular.extend(this, WbObservableObject.prototype);
	WbObservableObject.apply(this);

	var processors = {
			editor:[],
			workbench: []
	};

	function addProcessor(type, processor){
		processors[type].push(processor);
	}

	function connect (type, ctrl){
		disconnect(ctrl);
		ctrl.__processors = [];
		// connect processors
		_.forEach(processors[type], function(Processor){
			try{
				var processor = new Processor(ctrl);
				ctrl.__processors.push(processor);
			} catch(error){
				// TODO:
				console.log(error);
			}
		});
	}

	function disconnect(ctrl){
		if(!_.isArray(ctrl.__processors)){
			return;
		}
		_.forEach(ctrl.__processors, function(processor){
			try{
				processor.destroy();
			} catch(error){
				// TODO:
				console.log(error);
			}
		});
		delete ctrl.__processors;
	}

	/**
	 * Adds a processor to editors
	 * 
	 * @memberof $amhEditorService
	 */
	this.addEditorProcessor = function(processor){
		addProcessor('editor', processor);
	};

	/**
	 * Process the editor based on event type and event
	 * 
	 * @memberof $amhEditorService
	 */
	this.connectEditor = function(editor){
		return connect('editor', editor);
	};

	/**
	 * Removes all processor from editor
	 * 
	 * @memberof $amhEditorService
	 */
	this.disconnectEditor = function(editor){
		return disconnect(editor);
	};

	/**
	 * Adds a processor to workbench
	 * 
	 * @memberof $amhEditorService
	 */
	this.addWorkbenchProcessor = function(processor){
		addProcessor('workbench', processor);
	};

	/**
	 * Process the Workbench based on event type and event
	 * 
	 * @memberof $amhEditorService
	 */
	this.connectWorkbench= function(workbench){
		var oldValue = this.currentWorkbench;
		this.currentWorkbench = workbench;
		this.fire('workbenchChanged', {
			value: workbench,
			oldValue: oldValue
		});
		return connect('workbench', workbench);
	};

	/**
	 * Removes all processor from editor
	 * 
	 * @memberof $amhEditorService
	 */
	this.disconnectWorkbench = function(editor){
		return disconnect(editor);
	};
	
	this.getWorkbench = function(){
		return this.currentWorkbench;
	};

	this.getEditors = function(){
		return this.currentWorkbench.editors;
	};
});
