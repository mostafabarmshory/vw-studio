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
 * @ngdoc Controllers
 * @name AmhPageNewDialogCtrl
 * @description Manage the dialog used to create new page.
 * 
 * This controller is used to manage an steper to create a page.
 */
angular.module('vwStudio').controller('AmhPageNewDialogCtrl', function($scope, $controller, $mdStepper, $cms, $q, $wbUtil,
	$dispatcher, $navigator, $http, $translate, uuid4, config, QueryParameter, $resource, $window, $mdDialog) {
	// Extends Items controller
	angular.extend(this, $controller('AmdNavigatorDialogCtrl', {
		$scope: $scope,
		config: config
	}));
	/*
	 * ID of the stepper
	 */
	var parameterQuery = new QueryParameter();
	var _stepper_id = 'page-stepper';
	this.steps = [];

	//Content base structure
	this.contentModel = {
		info: {
			media_type: 'page',
			mime_type: 'application/weburger+json',
		},
		template: {},
		termTaxonomies: [],
		metas: []
	};

	/**
	 * List of supported page types
	 * 
	 * @memberof AmhPageNewDialogCtrl
	 */
	this.supportedPageTypes = [{
		mime_type: 'application/weburger+json',
		title: 'Weburger',
		enable: true,
		icon: 'resources/images/page-type-wb.svg',
	}, {
		mime_type: 'text/html',
		title: 'HTML',
		enable: false,
		icon: 'resources/images/page-type-html.svg',
	}, {
		mime_type: 'image/svg+xml',
		title: 'SVG',
		enable: false,
		icon: 'resources/images/page-type-svg.svg',
	}, {
		mime_type: 'text/markdown',
		title: 'Markdown',
		enable: false,
		icon: 'resources/images/page-type-md.svg',
	}];

	/**
	 * Sets page type and go to the next step
	 * 
	 * @memberof AmhPageNewDialogCtrl
	 */
	this.setPageType = function(type) {
		this.contentModel.info.mime_type = type.mime_type;
		this.nextStep();
	};

	/*
	 * 
	 * @param {type} key
	 * @param {type} href
	 * @returns {String}
	 * @description get the name of page and the current route of browser (full url) and 
	 * constract a relative canonical link
	 */
	this.fetchRoute = function(key, href) {
		var baseUrl;
		var url = new URL(href);
		if (url.port) {
			baseUrl = url.protocol + '//' + url.hostname + ':' + url.port + '/';
		} else {
			baseUrl = url.protocol + '//' + url.hostname + '/';
		}

		// href without baseUrl
		var remainedUrl = url.href.replace(baseUrl, '');
		//if baseUrl contain 'localhost' 
		if (baseUrl.indexOf('localhost') > -1 || remainedUrl.length === 0) {
			return '/content/' + key;
		} else {
			return '/' + remainedUrl.split('/')[0] + '/content/' + key;
		}
	};

	/**
	 * Updates a info field
	 * 
	 * @memberof AmhPageNewDialogCtrl
	 */
	this.setPageInfo = function(key, value) {
		// update info
		this.contentModel.info[key] = value;

		// update meta
		var metaKey;
		switch (key) {
			case 'name':
				metaKey = 'link.canonical';
				var href = $window.location.href;
				value = this.fetchRoute(value, href);
				break;
			case 'title':
				metaKey = 'title';
				break;
			case 'description':
				metaKey = 'meta.description';
				break;
			case 'cover':
				metaKey = 'link.cover';
				break;
			default:
				metaKey = key;
		}
		this.setPageMeta(metaKey, value);
	};

	/**
	 * Sets meta of the page
	 * 
	 * @memberof AmhPageNewDialogCtrl
	 */
	this.setPageMeta = function(key, value) {
		var meta = this.getPageMeta(key);
		if (!meta) {
			meta = {
				key: key
			};
			this.contentModel.metas.push(meta);
		}
		meta.value = value;
	};

	/**
	 * FIndes meta of the page
	 * 
	 * @memberof AmhPageNewDialogCtrl
	 */
	this.getPageMeta = function(key) {
		var metas = this.contentModel.metas;
		for (var i = 0; i < metas.length; i++) {
			var item = metas[i];
			if (item.key === key) {
				return item;
			}
		}
	};

	/**
	 * Sets cover of the page from resources
	 * 
	 * @memberof AmhPageNewDialogCtrl
	 */
	this.selectCoverFromResources = function() {
		var ctrl = this;
		return $resource.get('image', {
			config: {
				title: 'Page cover'
			},
			name: 'Page cover'
		}).then(function(cover) {
			ctrl.setPageInfo('cover', cover);
		});
	};

	/**
	 * Sets page name with random value
	 * 
	 * @memberof AmhPageNewDialogCtrl
	 */
	this.generateRandomName = function() {
		this.setPageInfo('name', uuid4.generate());
	};

	/**
	 * Sets template 
	 */
	this.setTemplate = function(template) {
		this.contentModel.template = template || {};
		this.nextStep();
	};

	/**
	 * Shows a preview of a template
	 * 
	 * @memberof AmhMainPageTmplCtrl
	 * @param {type} template
	 * @return {promiss} to load preview
	 */
	this.showPreviewOf = function(template) {
		// load content
		if (this.loadingTemplatePreview) {
			return;
		}
		this.loadingTemplatePreview = true;
		var ctrl = this;
		return $http.get('/api/v2/cms/contents/' + template.id + '/content') //
			.then(function(response) {
				var responseData = $wbUtil.clean(response.data);
				return $navigator.openDialog({
					templateUrl: 'views/dialogs/amh-template-preview.html',
					config: {
						model: responseData,
						page: template
					}
				});
			})//
			.finally(function() {
				ctrl.loadingTemplatePreview = false;
			});
	};

	/**
	 * Loads settings with the index
	 * 
	 * @memberof MbInitialCtrl
	 * @param {integer}
	 *            index of the setting
	 */
	this.goToStep = function(index) {
		$mdStepper(_stepper_id)//
			.goto(index);
	};

	/**
	 * Loads the next setting page
	 * 
	 * @memberof MbInitialCtrl
	 */
	this.nextStep = function() {
		$mdStepper(_stepper_id)//
			.next();
	};

	/**
	 * Loads the previous setting page
	 * 
	 * @memberof MbInitialCtrl
	 */
	this.prevStep = function() {
		$mdStepper(_stepper_id)//
			.back();
	};

	/**
	 * Create the model
	 * 
	 * The editor can create a page if you add createModel function.
	 * By default, the function dose not implemented.
	 */
	this.createModel = function(newContentModel) {
		var ctrl = this;
		var contentOrg;
		if (this.creatingContent) {
			return;
		}
		this.creatingContent = true;
		return $cms.putContent(newContentModel.info)
			.then(function(content) {
				contentOrg = content;
				var list = [];
				//load template to content
				list.push($http.get('/api/v2/cms/contents/' + newContentModel.template.id + '/content') //
					.then(function(response) {
						content.uploadValue(response.data);
					}));
				// metas
				angular.forEach(newContentModel.metas, function(meta) {
					list.push(content.putMetadatum(meta));
				});
				return $q.all(list);
			})//
			.finally(function() {
				$dispatcher.dispatch('/cms/contents', {
					key: 'created',
					values: [contentOrg]
				});
				ctrl.creatingContent = false;
				ctrl.contentCreated = true;

				for (var i = 0; i < newContentModel.metas.length; i++) {
					if (newContentModel.metas[i].key === 'link.canonical') {
						ctrl.canonicalLink = newContentModel.metas[i].value;
						break;
					}
				}
			});
	};

	this.goTo = function() {
		$mdDialog.hide();
	};

	/*
	 * Load templates for view
	 */
	this._getTemplates = function() {
		parameterQuery.setFilter('taxonomy', 'template');
		parameterQuery.put('graphql', '{current_page,page_number,items{term{id,name},contents{id, name, title, description, media_type}}}');
		var ctrl = this;
		$cms.getTermTaxonomies(parameterQuery)
			.then(function(response) {
				ctrl.items = response.items;
			}, function() {
				alert($translate.instant('Fail to load template'));
			});
	};

	// add watch on setting stepper current step.
	$scope.$watch(function() {
		var current = $mdStepper(_stepper_id);
		if (current) {
			return current.currentStep;
		}
		return -1;
	}, function(index) {
		if (index >= 0 && $scope.steps && $scope.steps.length) {
			$scope.currentStep = $scope.steps[index];
		}
	});

	// TODO: mao, 2019: check a content with the same name exist
	this._getTemplates();
	this.setPageInfo('name', config.name || uuid4.generate());
	//	this.loadCategories();
});