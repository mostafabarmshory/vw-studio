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
angular.module('vwStudio').factory('AmhWorkbenchProcessorCrud', function(
		/* AMh       */ AmhWorkbenchProcessor, AmhWorkbenchJob,
		/* weburger  */ $dispatcher, $resource,
		/* angular   */ $window, $routeParams, $q,
		/* mblowfish */ $actions, $app, $navigator, $sidenav,
		/* cms       */ CmsContent, CmsContentMetadata, CmsTermTaxonomy, $cms
) {


	var graphql = '{' +
	/* content */ 'id,name,title,description,mime_type,media_type,file_name,file_size,downloads,state,creation_dtime,modif_dtime,author_id' +
	/* metas */ ',metas{id,content_id,key,value}' +
	/* terms */ ',term_taxonomies{id, taxonomy, term{id, name, metas{key,value}}}' +
		'}';
	//	var categoryGraphql = "{items{id,description,term{id,name, metas{key,value}}}}";
	//	var tagGraphql = "{items{id,description,term{id,name, metas{key,value}}}}";

	/*
	 * Fetch model id from the environment
	 * 
	 * Returns name of the contents to load. If use define a name, the actual
	 * value is returned. In the other case, name of the home content with
	 * language is returned.
	 * 
	 * default language is en
	 */
	function calculateContentId() {
		if ($routeParams.name) {
			return $routeParams.name;
		}
		var key = $app.getProperty('app.key', 'undefined');
		var lang = $routeParams.language ||
			$app.getProperty('app.setting.localLanguage') ||
			$app.getProperty('app.config.localLanguage') ||
			$app.getProperty('tenat.setting.localLanguage') ||
			$app.getProperty('tenat.config.localLanguage') ||
			'en';
		return key + '-' + lang;
	}

	function isSameContent(currentContent, content) {
		if (_.isUndefined(currentContent)) {
			var id = calculateContentId();
			return _.isEqual(content.id, id) || _.isEqual(content.name, id);
		}
		return _.isEqual(currentContent.id, content.id);
	}

	function Processor(editor, options) {
		var ctrl = this;
		this.dispatchers = [{ // listen to application state
			id: undefined,
			type: '/app/state',
			action: function(event) {
				if (event.type !== 'update' || !event.value.startsWith('ready')) {
					return;
				}
				return ctrl.readContent();
			}
		}, { // listen to content changes
			id: undefined,
			type: '/cms/contents',
			action: function(event) {
				// TODO:
				var values = event.values || [event.value];
				_.forEach(values, function(content) {
					if (isSameContent(ctrl.editor.getContent(), content)) {
						switch (event.key) {
							case 'create':
							case 'read':
							case 'update':
								if (_.isUndefined(ctrl.editor.getContent())) {
									ctrl.readContent();
								} else {
									ctrl.editor.setContent(content);
								}
								break;
							case 'delete':
								ctrl.editor.clean();
								break;
						}
					}
				});
			}
		}];

		options = options || {};
		AmhWorkbenchProcessor.apply(this, [editor, options]);

		var state = $app.getState() || '';
		if (state.startsWith('ready')) {
			ctrl.readContent();
		}
	}
	Processor.prototype = new AmhWorkbenchProcessor();

	Processor.prototype.connect = function() {
		var workbench = this.editor;
		var ctrl = this;
		var $scope = workbench.getScope();
		this.actions = [
			//--------------------------------------------------------------
			// UI actions
			// Are responsible to open or change UI 
			//--------------------------------------------------------------
			{ // Content: show setting editor
				id: 'amh.workbench.content.show',
				priority: 10,
				icon: 'settings',
				title: 'Content settings',
				description: 'Edit settings of the current content',
				visible: function() {
					return workbench.isContentEditable();
				},
				/*
				 * @ngInject
				 */
				action: function() {
					$sidenav.getSidenav('amh.workbench.content')
						.toggle();
				},
				groups: ['amh.workbench.toolbar'],
				scope: $scope
			}, { // Content Meta: show content setting 
				id: 'amh.workbench.contentMeta.show',
				priority: 8,
				icon: 'perm_device_information',
				title: 'Content metadata',
				description: 'List of metadata',
				visible: function() {
					return workbench.isContentEditable();
				},
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
						templateUrl: 'views/dialogs/amh-workbench-content-metadata.html',
						fullscreen: true,
						multiple: true
					});
				},
				groups: ['amh.workbench.toolbar'],
				scope: $scope
			}, { // TermTaxonomies: show editor 
				id: 'amh.workbench.termTaxonomies.show',
				priority: 9,
				icon: 'label',
				title: 'Content labels and categories',
				description: 'Edit categories or labels of the current content',
				visible: function() {
					return workbench.isContentEditable();
				},
				/*
				 * @ngInject
				 */
				action: function() {
					// $sidenav.getSidenav('amh.workbench.termTaxonomies')
					// .toggle();
					return $navigator.openDialog({
						config: {},
						locals: {
							$processor: ctrl
						},
						controllerAs: 'dialogCtrl',
						templateUrl: 'views/dialogs/amh-workbench-content-termTaxonomies.html',
						fullscreen: true,
						multiple: true
					});
				},
				groups: ['amh.workbench.toolbar'],
				scope: $scope
			},


			//--------------------------------------------------------------
			// Basic actions
			// Manages basic informations in the system (e.g. save changes).
			//--------------------------------------------------------------
			{ // Content: new
				id: 'amh.workbench.content.new',
				priority: 15,
				icon: 'add_box',
				title: 'New',
				description: 'Add a new page',
				alias: true,
				actionId: 'studio.cms.contents.new',
				visible: function() {
					return workbench.canCreateContent();
				},
				groups: ['amh.owner-toolbar.scope'],
				scope: $scope
			}, { // Content: delete
				id: 'amh.workbench.content.delete',
				priority: 9,
				icon: 'delete',
				title: 'Delete',
				description: 'Delete page',
				visible: function() {
					return workbench.isContentDeletable();
				},
				/*
				 * @ngInject
				 */
				action: function() {
					return $window.confirm('Delete the page?')
						.then(function() {
							ctrl.deleteContent();
						});
				},
				groups: ['amh.owner-toolbar.scope'],
				scope: $scope
			},
			//--------------------
			// Metadata
			//-------------------
			{ // Metadata: add 
				id: 'amh.workbench.content.metadata.create',
				priority: 8,
				icon: 'perm_device_information',
				title: 'Adds new metadata',
				description: 'Adds new metadata',
				visible: function() {
					return workbench.isContentEditable();
				},
				/*
				 * @ngInject
				 */
				action: function(/*$event*/) {
					ctrl.createMetadata();
				},
				scope: $scope
			}, { // Metadata: remove 
				id: 'amh.workbench.content.metadata.delete',
				priority: 8,
				icon: 'perm_device_information',
				title: 'Update Term-Taxonomies',
				description: 'Save all changed term taxonomies',
				visible: function() {
					return workbench.isContentEditable();
				},
				/*
				 * @ngInject
				 */
				action: function($event) {
					if ($event.metadata) {
						ctrl.deleteMetadata($event.metadata);
					}
				},
				scope: $scope
			}, { // Metadata: edit 
				id: 'amh.workbench.content.metadata.update',
				priority: 8,
				icon: 'perm_device_information',
				title: 'Update Term-Taxonomies',
				description: 'Save all changed term taxonomies',
				visible: function() {
					return workbench.isContentEditable();
				},
				/*
				 * @ngInject
				 */
				action: function($event) {
					ctrl.updateMetadata($event.metadata[0]);
				},
				scope: $scope
			},
			//--------------------
			// TermTaxonomies
			//-------------------
			{ // TermTaxonomies: add 
				id: 'amh.workbench.content.termTaxonomies.create',
				visible: function() {
					return workbench.isContentEditable();
				},
				/*
				 * @ngInject
				 */
				action: function($event) {
					$resource.get('/cms/term-taxonomies', {
						event: $event,
						data: workbench.getTermTaxonomies(),
						style: {
							title: 'Term Taxonomies',
							description: 'Select term-taxonomies to add into the current content'
						}
					})
						.then(function(items) {
							ctrl.addTermTaxonomies(items);
						});
				},
				scope: $scope
			}, { // TermTaxonomies: remove 
				id: 'amh.workbench.content.termTaxonomies.delete',
				visible: function() {
					return workbench.isContentEditable();
				},
				/*
				 * @ngInject
				 */
				action: function($event) {
					if ($event.items) {
						ctrl.removeTermTaxonomies($event.items);
					}
				},
				scope: $scope
			}];

		// connect listeners
		_.forEach(this.dispatchers, function(dispatcher) {
			dispatcher.id = $dispatcher.on(dispatcher.type, dispatcher.action);
		});

		_.forEach(this.actions, function(action) {
			$actions.newAction(action);
		});
	};

	/**
	 * Removes all listeneres
	 */
	Processor.prototype.disconnect = function() {
		_.forEach(this.dispatchers, function(dispatcher) {
			$dispatcher.off(dispatcher.type, dispatcher.id);
			dispatcher.id = undefined;
		});
		_.forEach(this.actions || [], function(action) {
			$actions.removeAction(action);
		});
		delete this.actions;
	};

	/**
	 * Load content data
	 * 
	 * @memberof AmhContentCtrl
	 * @param {string}
	 *            contentName The id or name of the content.
	 * @return {promiss} to load the content data
	 */
	Processor.prototype.readContent = function() {
		var process = this.checkOtherProcess();
		if (process) {
			return process;
		}
		var workbench = this.editor;
		var contentName = calculateContentId();
		$cms.getContent(contentName, {
			'graphql': graphql
		}) //
			.then(function(data) {
				// meta
				var metas = [];
				_.forEach(data.metas || [], function(metadataItem) {
					metas.push(new CmsContentMetadata(metadataItem));
				});
				delete data.metas;
				workbench.setContentMetadata(metas);

				// taxonomis
				var taxonomies = [];
				_.forEach(data.term_taxonomies || [], function(data) {
					taxonomies.push(new CmsTermTaxonomy(data));
				});
				delete data.term_taxonomies;
				workbench.setTermTaxonomies(taxonomies);

				// content
				var content = new CmsContent(data);
				workbench.setContent(content);
			});
	};

	/**
	 * Save the model
	 * 
	 * The editor can save the page if you add saveModel function. By default,
	 * there is not save model function.
	 */
	Processor.prototype.updateContent = function() {
		var process = this.checkOtherProcess();
		if (process) {
			return process;
		}
		var workbench = this.editor;
		//		var state = workbench.getState();
		var meta = workbench.getContent();
		meta.media_type = workbench.getContentType();
		return meta.update()
			.then(function(content) {
				$dispatcher.dispatch('/cms/contents', {
					key: 'updated',
					values: [content]
				});
			}, function(error) {
				throw error;
			});
	};


	/**
	 * Delete the content
	 * 
	 * The editor can delete the page if you add deleteModel function. By
	 * default, there is not delete model function.
	 */
	Processor.prototype.deleteContent = function() {
		var process = this.checkOtherProcess();
		if (process) {
			return process;
		}
		var workbench = this.editor;
		var meta = workbench.getContent();
		var event = {
			key: 'delete',
			values: [angular.copy(meta)]
		};
		return meta.delete()
			.then(function() {
				$dispatcher.dispatch('/cms/contents', event);
			});
	};

	Processor.prototype.checkOtherProcess = function() {
		var workbench = this.editor;
		if (workbench.getJobs().length) {
			return workbench.getJobs()[0];
		}
	};


	Processor.prototype.addTermTaxonomies = function(termTaxonomies) {
		var workbench = this.editor;
		var jobs = [];
		var content = workbench.getContent();
		_.forEach(termTaxonomies, function(termTaxonomy) {
			jobs.push(content.putTermTaxonomy(termTaxonomy));
		});

		var promise = $q.all(jobs)
			.then(function() {
				var newList = _.concat(workbench.getTermTaxonomies(), termTaxonomies);
				workbench.setTermTaxonomies(newList);
			});

		var job = new AmhWorkbenchJob('Adding term taxonomies', promise);
		workbench.addJob(job);
		return job;
	};

	Processor.prototype.removeTermTaxonomies = function(termTaxonomies) {
		var workbench = this.editor;
		var jobs = [];
		var content = workbench.getContent();
		_.forEach(termTaxonomies, function(termTaxonomy) {
			jobs.push(content.deleteTermTaxonomy(termTaxonomy));
		});

		var promise = $q.all(jobs)
			.then(function() {
				var newList = _.filter(workbench.getTermTaxonomies(), function(tt) {
					var flag = true;
					_.forEach(termTaxonomies, function(tt2) {
						if (_.isEqual(tt.id, tt2.id)) {
							flag = false;
						}
					});
					return flag;
				});
				workbench.setTermTaxonomies(newList);
			});

		var job = new AmhWorkbenchJob('Adding term taxonomies', promise);
		workbench.addJob(job);
		return job;
	};



	Processor.prototype.createMetadata = function() {
		// views/dialogs/amh-metadata.html
		var workbench = this.editor;
		return $navigator.openDialog({
			templateUrl: 'views/dialogs/amh-metadata.html',
			/**
			 * @ngInject
			 */
			controller: function($scope, $controller, config) {
				// Extends Items controller
				angular.extend(this, $controller('AmdNavigatorDialogCtrl', {
					$scope: $scope,
					config: config
				}));

				this.data = config.data || {};
			},
			controllerAs: 'ctrl',
			config: {
				data: {
					key: 'key-' + Math.random(),
					value: 'value'
				}
			}
		}).then(function(data) {
			return workbench.getContent().putMetadatum(data);
		}).then(function(metadata) {
			var newList = _.concat(workbench.getContentMetadata(), metadata);
			workbench.setContentMetadata(newList);
		});
	};

	Processor.prototype.updateMetadata = function(meta) {
		var workbench = this.editor;
		return $navigator.openDialog({
			templateUrl: 'views/dialogs/amh-metadata.html',
			/**
			 * @ngInject
			 */
			controller: function($scope, $controller, config) {
				// Extends Items controller
				angular.extend(this, $controller('AmdNavigatorDialogCtrl', {
					$scope: $scope,
					config: config
				}));

				this.data = config.data || {};
			},
			controllerAs: 'ctrl',
			config: {
				data: _.clone(meta)
			}
		})
			.then(function(data) {
				meta.setData(data);
				meta.update();

				// force to fire
				workbench.setContentMetadata(workbench.getContentMetadata());
			});
	};

	Processor.prototype.deleteMetadata = function(metadata) {
		var workbench = this.editor;
		var jobs = [];
		var removed = [];
		var content = workbench.getContent();
		_.forEach(metadata, function(metadatum) {
			jobs.push(content.deleteMetadatum(metadatum)
				.then(function() {
					removed.push(metadatum);
				}));
		});

		$q.all(jobs)
			.then(function() {
				var newList = _.filter(workbench.getContentMetadata(), function(tt) {
					var flag = true;
					_.forEach(removed, function(tt2) {
						if (_.isEqual(tt.id, tt2.id)) {
							flag = false;
						}
					});
					return flag;
				});
				workbench.setContentMetadata(newList);
			});
	};

	return Processor;
});

