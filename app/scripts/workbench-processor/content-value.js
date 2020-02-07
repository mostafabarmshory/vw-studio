
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
angular.module('vwStudio').factory('AmhWorkbenchProcessorContentValue', function(
		/* ??        */ FileSaver,
		/* angular   */ $q, $rootScope, $window, $log,
		/* amh       */ AmhWorkbenchProcessor, AmhWorkbenchJob,
		/* mblowfish */ $navigator, $actions, $sidenav, $app,
		/* am-wb     */ $wbUtil, $resource) {

	var MIME_WB = 'application/weburger+json';

	var Processor = function(editor, options) {
		options = options || {};
		AmhWorkbenchProcessor.apply(this, [editor, options]);
	};
	Processor.prototype = new AmhWorkbenchProcessor();

	Processor.prototype.connect = function() {
		var ctrl = this;
		var workbench = this.editor;
		var $scope = workbench.getScope();
		this.actions = [
			//--------------------------------------------------------------
			// UI actions
			// Are responsible to open or change UI 
			//--------------------------------------------------------------
			{// template menu
				id: 'amh.workbench.contentValue.template.show',
				priority: 10,
				icon: 'photo_album',
				title: 'Templates',
				description: 'Show list of templates',
				visible: function() {
					return workbench.isContentEditable();
				},
				/*
				 * @ngInject
				 */
				action: function() {
					$sidenav
						.getSidenav('amh.workbench.weburger.templates')
						.toggle();
				},
				groups: ['amh.workbench.toolbar#advance'],
				scope: $scope
			}, {
				id: 'amh.workbench.weburger.widgets.show',
				type: 'action',
				priority: 11,
				icon: 'add',
				title: 'Widgets',
				description: 'Show widget panel',
				/*
				 * @ngInject
				 */
				action: function() {
					if (!workbench.isContentEditable()) {
						return false;
					}
					$rootScope.showWidgetsPanel = !$rootScope.showWidgetsPanel;
				},
				groups: ['amh.workbench.toolbar'],
				scope: $scope
			}, {
				id: 'amh.workbench.weburger.navigator.show',
				type: 'action',
				priority: 11,
				icon: 'near_me',
				title: 'Content Navigator',
				description: 'Show widgets tree',
				/*
				 * @ngInject
				 */
				action: function() {
					if (!workbench.isContentEditable()) {
						return false;
					}
					$rootScope.showWidgetsNavigator = !$rootScope.showWidgetsNavigator;
				},
				groups: ['amh.workbench.toolbar'],
				scope: $scope
			},

			//--------------------------------------------------------------
			// Basic actions
			// Manages basic informations in the system (e.g. save changes).
			//--------------------------------------------------------------
			{// download menu
				id: 'amh.workbench.contentValue.download',
				priority: 8,
				icon: 'cloud_download',
				title: 'Download',
				description: 'Download page',
				visible: function() {
					return workbench.isContentValueLoaded();
				},
				/*
				 * @ngInject
				 */
				action: function() {
					return ctrl.downloadContentValue();
				},
				groups: ['amh.owner-toolbar.scope'],
				scope: $scope
			}, {// upload menu
				id: 'amh.workbench.contentValue.upload',
				priority: 8,
				icon: 'cloud_upload',
				title: 'Upload',
				description: 'Upload a pre desinged page',
				visible: function() {
					return workbench.isContentValueLoaded();
				},
				/*
				 * @ngInject
				 */
				action: function($event) {
					if ($event.template) {
						return ctrl.setContentValue($event.template[0]);
					}
					return ctrl.uploadContentValue();
				},
				groups: ['amh.owner-toolbar.scope'],
				scope: $scope
			}, { // edit menu
				id: 'amh.workbench.contentValue.edit',
				priority: 15,
				icon: 'edit',
				title: 'Edit',
				description: 'Edit the page',
				visible: function() {
					return workbench.isContentValueLoaded();
				},
				/*
				 * @ngInject
				 */
				action: function() {
					return workbench.toggleEditMode();
				},
				groups: ['amh.owner-toolbar.scope'],
				scope: $scope
			}, {// save menu
				id: 'amh.workbench.contentValue.save',
				priority: 10,
				icon: 'save',
				title: 'Save',
				description: 'Save content value',
				visible: function() {
					return workbench.isContentValueLoaded() &&
						workbench.isContentEditable();
				},
				/*
				 * @ngInject
				 */
				action: function() {
					return ctrl.saveContentValue();
				},
				groups: ['amh.owner-toolbar.scope'],
				scope: $scope
			},
			//--------------------------------------------------------------
			// Module actions
			// Are responsible to open or change UI 
			//--------------------------------------------------------------
			{
				id: 'amh.workbench.weburger.modules.show',
				type: 'action',
				priority: 1,
				icon: 'view_module',
				title: 'Modules',
				description: 'Manage page modules',
				/*
				 * @ngInject
				 */
				action: function() {
					return $navigator.openDialog({
						config: {},
						locals: {
							$processor: ctrl
						},
						controllerAs: 'dialogCtrl',
						templateUrl: 'views/dialogs/amh-workbench-content-modules.html',
						fullscreen: true,
						multiple: true
					});
				},
				groups: ['amh.workbench.toolbar'],
				scope: $scope
			},
			{ // Content: new
				id: 'amh.workbench.content.module.remove',
				priority: 15,
				icon: 'delete',
				title: 'Delete',
				description: 'Delete module from content',
				visible: function() {
					return workbench.canCreateContent();
				},
				/*
				 * @ngInject
				 */
				action: function($event) {
					ctrl.deleteModule($event.modules[0]);
				},
				scope: $scope
			}, { // Content: new
				id: 'amh.workbench.content.module.add',
				priority: 15,
				icon: 'add',
				title: 'Add',
				description: 'Add module to the workbench module',
				/*
				 * @ngInject
				 */
				visible: function() {
					return workbench.canCreateContent();
				},
				action: function(/*$event*/) {
					ctrl.createModule();
				},
				scope: $scope
			}, { // Content: new
				id: 'amh.workbench.content.module.edit',
				priority: 15,
				icon: 'edit',
				title: 'Edit',
				description: 'Edit current module',
				/*
				 * @ngInject
				 */
				visible: function() {
					return workbench.canCreateContent();
				},
				action: function($event) {
					ctrl.editModule($event.modules, $event);
				},
				scope: $scope
			}];

		_.forEach(this.actions, function(action) {
			$actions.newAction(action);
		});

		this._listenToContent = function() {
			var content = workbench.getContent();
			if (content && !content.isAnonymous()) {
				ctrl.loadContentValue();
			}
		};

		this._listenState = function() {
			ctrl.loadContent();
		};

		workbench.on('contentChanged', this._listenToContent);
		workbench.on('stateChanged', this._listenState);
	};

	Processor.prototype.disconnect = function() {
		_.forEach(this.actions, function(action) {
			$actions.removeAction(action);
		});
		delete this.actions;

		var workbench = this.editor;
		workbench.off('contentChanged', this._listenToContent);
		workbench.off('stateChanged', this._listenToState);
		delete this._listenToContent;
	};

	/**
	 * Downloads content value and stores in a file
	 * 
	 * @memberof AmhContentCtrl
	 * @return {promiss} to save content value
	 */
	Processor.prototype.downloadContentValue = function() {
		var workbench = this.editor;
		var content = workbench.getContent();
		var model = this.getContentValue();
		// save result
		var promise = $navigator.openDialog({
			templateUrl: 'views/dialogs/amh-content-download-options.html',
			config: {
				options: {
					fileName: content.name
				}
			}
		})
			.then(function(options) {
				var preprocess = null;
				//			if (options.embeddedImage) {
				//			// TODO: convert image into the data url
				//			model = _.cloneDeep(model);
				//			preprocess = $wbmodel.embedImagesDeep(model);
				//			}
				return $q.when(preprocess)
					.then(function() {
						// save the model
						var dataString = JSON.stringify(model);
						var data = new Blob([dataString], {
							type: MIME_WB
						});
						return FileSaver.saveAs(data, (options.fileName || 'content') + '.wb');
					});
			});
		var job = new AmhWorkbenchJob('Download content value', promise);
		workbench.addJob(job);
		return job;
	};

	Processor.prototype.loadContentValue = function() {
		var ctrl = this;
		var workbench = this.editor;
		var content = workbench.getContent();
		var promise = content.downloadValue()
			.then(function(value) {
				ctrl.setContentValue(value);
			}, function() {
				// TODO: maso, 2018: open a page to load templates
				ctrl.setContentValue({ type: 'div' });
			});
		var job = new AmhWorkbenchJob('Download content value', promise);
		workbench.addJob(job);
		return job;
	};

	Processor.prototype.uploadContentValue = function() {
		var workbench = this.editor;
		var ctrl = this;
		var fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.style.display = 'none';
		fileInput.onchange = function(event) {
			var reader = new FileReader();
			reader.onload = function(event) {
				var model = JSON.parse(event.target.result);
				ctrl.setContentValue(model);
				var $scope = workbench.getScope();
				$scope.$apply();
			};
			reader.readAsText(event.target.files[0]);
		};
		document.body.appendChild(fileInput);
		// click element (fileInput)
		var eventMouse = document.createEvent('MouseEvents');
		eventMouse.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		fileInput.dispatchEvent(eventMouse);
	};

	Processor.prototype.saveContentValue = function() {
		var workbench = this.editor;
		var content = workbench.getContent();
		var promise = content.uploadValue(this.getContentValue())
			.then(function() {
				// workbench.setDerty(false);
			});
		var job = new AmhWorkbenchJob('Saving content value', promise);
		workbench.addJob(job);
		return job;
	};


	Processor.prototype.loadModules = function(filter) {
		var jobs = [];
		var modules = this.getModules();
		_.forEach(modules, function(module) {
			if (_.isUndefined(module) || module === null || (module.load !== filter && (module.load || filter !== 'lazy'))) {
				return;
			}
			module.state = 'loading';
			var job;
			switch (module.type) {
				case 'js':
					job = $window.loadLibrary(module.url);
					break;
				case 'css':
					job = $window.loadStyle(module.url);
					break;
			}
			if (job) {
				jobs.push(job.then(function() {
					module.state = 'success';
				}, function(error) {
					module.state = 'error';
					module.error = error;
				}));
			}
		});
		return $q.all(jobs);
	};

	Processor.prototype.loadBeforModules = function() {
		return this.loadModules('before');
	};
	Processor.prototype.loadLazyModules = function() {
		return this.loadModules('lazy');
	};
	Processor.prototype.loadAfterModules = function() {
		return this.loadModules('after');
	};

	Processor.prototype.removeModules = function() {
		var jobs = [];
		var modules = this.getModules();
		_.forEach(modules, function(module) {
			switch (module.type) {
				case 'js':
					jobs.push($window.removeLibrary(module.url));
					break;
				case 'css':
					jobs.push($window.removeStyle(module.url));
					break;
			}
		});
		return $q.all(jobs)
			.then(function() {
				$window.toast('Modules are removed. Reload the page to effect.');
			});
	};

	Processor.prototype.createModule = function() {
		var workbench = this.editor;
		var ctrl = this;
		$resource.get('/app/modules', {
			style: {},
		}).then(function(modules) {
			var newList = _.concat(workbench.getContentModules(), modules);
			ctrl.setModules(newList);
			return workbench.setContentModules(newList);
		}).then(function() {
			$window.toast('Modules are added. Reload the page to effect.');
		});
	};

	Processor.prototype.deleteModule = function(module) {
		var workbench = this.editor;
		var newList = _.remove(workbench.getContentModules(), function(moduleSrc) {
			return !_.isEqual(moduleSrc, module);
		});
		workbench.setContentModules(newList);
		this.setModules(newList);
	};

	Processor.prototype.editModule = function(modules) {
		var workbench = this.editor;
		var ctrl = this;
		$resource.get('/app/modules', {
			style: {},
			data: modules
		}).then(function(newModules) {
			var newList = workbench.getContentModules();
			var i = 0;
			_.forEach(modules, function(module){
				var index = newList.indexOf(module);
				if(index>=0){
					newList[index] = newModules[i++];
				}
			});
			ctrl.setModules(newList);
			return workbench.setContentModules(newList);
		}).then(function() {
			$window.toast('Modules are added. Reload the page to effect.');
		});
	};


	/**
	 * Load value as content into the current editor
	 * 
	 * @params value {json object} to load as content
	 */
	Processor.prototype.setContentValue = function(value) {
		this.origenalValue = value;
		this.loadContent();
	};

	/**
	 * Return actual value of content
	 * 
	 */
	Processor.prototype.getContentValue = function() {
		return this.origenalValue;
	};

	Processor.prototype.loadContent = function() {
		var ctrl = this;
		var workbench = this.editor;

		workbench.setContentModules(this.getModules());

		// Run preprocess
		$q.all([
			ctrl.loadBeforModules(),
			ctrl.loadTemplate()
		]).catch(function(ex) {
			// TODO: something wrong
			$log.error({
				message: 'fail to load preprocess (template or moduel)',
				srouce: ex
			});
		}).then(function() {
			ctrl.loadLazyModules();
			var value = ctrl.origenalValue;
			workbench.setOriginalContentValue(ctrl.origenalValue);
			if ((workbench.getState() !== 'edit') &&
				(ctrl.template && ctrl.templateAnchor)) {
				var newVal = _.cloneDeep(ctrl.template);
				$wbUtil.replaceWidgetModelById(
					newVal,
					ctrl.templateAnchor,
					value);
				value = newVal;
			}
			return workbench.setContentValue(value);
		}).then(function() {
			return ctrl.loadAfterModules();
		});
	};

	Processor.prototype.loadTemplate = function() {
		if (this.editor.getState() === 'edit') {
			return;
		}
		var templatepath = this.origenalValue ? this.origenalValue.template : null;
		var ctrl = this;
		if (!templatepath) {
			this.template = null;
			this.templateAnchor = null;
			return;
		}

		templatepath = new URL(templatepath, window.location.href);
		switch (templatepath.protocol) {
			case 'http:':
			case 'https:':
				break;
			case 'mb:':
				var key = templatepath.pathname.substring(2).replace(/\//gi, '.');
				templatepath = new URL($app.getProperty(key));
				break;
			default:
				$log.error('unsupported template protocole', templatepath);
				return;
		}

		this.templateAnchor = templatepath.hash.substring(1);
		templatepath.hash = '';
		return $wbUtil.downloadWidgetModel(templatepath.toString())
			.then(function(model) {
				ctrl.template = model;
			});
	};

	/**
	 * THis is internal method
	 * 
	 * change original data model and set the module list
	 * 
	 * the model will be dirty 
	 */
	Processor.prototype.setModules = function(modules) {
		var model = this.getContentValue();
		if (!model) {
			return;
		}
		model.modules = modules;
	};

	/*
	 * this is internal method
	 * 
	 * returns list of modules from original model.
	 */
	Processor.prototype.getModules = function() {
		var model = this.getContentValue();
		if (!model) {
			return [];
		}
		return model.modules || [];
	};


	/*
	 * Object
	 */
	return Processor;
});

