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

/**
 * @ngdoc Controllers
 * @name AmhContentWorkbenchCtrl
 * @description Manage environment of editors
 * 
 * Workbench manages a list of jobs.
 * 
 * Following information are load in the workbench:
 *  - Content 
 *  - Content Meta 
 *  - Content term-taxonomis 
 *  - Content value
 * 
 */
.controller('AmhContentWorkbenchCtrl', function (
		/* amh */ WbObservableObject, $amhEditorService, AmhWorkbenchContentType,
		/* material */ $mdSidenav, $mdMedia, 
		/* weburger */ $wbUtil,
		/* angular */ $q, $window, $routeParams, $rootScope,
		/* mblowfish */ $actions, $app,
		/* cms */ CmsContent, CmsContentMetadata, $cms,
		/* controller */ $scope, $element
) {
	

	/*
	 * States are:
	 *  
	 * - start: the controller start its work 
	 * - ready: controller is in read only mode 
	 * - edit: controller load editor environment
	 */
	this.state = 'start';

	/*
	 * If the editor is loaded for then this true.
	 */
	this.editorLoaded = false;

	/*
	 * Store list of editors
	 * 
	 * In the current version there is just a single content editor.
	 */
	this.editors = [];

	/*
	 * Put media service into the scope
	 */
	$scope.$mdMedia = $mdMedia;


	/***************************************************************************
	 * Editors * *
	 **************************************************************************/
	this.addEditor = function(editor){
		// put job
		var editors = _.concat(this.editors, editor);
		this.setEditors(editors);
	};
	
	this.getEditors = function(){
		return this.editors;
	};
	
	this.getActiveEditor = function(){
		return this.activeEditor;
	};
	
	this.setActiveEditor = function(editor){
		var oldEditor = this.activeEditor;
		this.activeEditor = editor;
		this.fire('activeEditorChanged', {
			values: this.activeEditor,
			oldValues: oldEditor
		});
	};

	this.setEditors = function(editors){
		var oldEditors = this.editors;
		this.editors = editors;
		this.fire('editorsChanged', {
			values: this.editors,
			oldValues: oldEditors
		});
		if(!this.activeEditor) {
			this.setActiveEditor(editors[0]);
		}
	};

	/***************************************************************************
	 * jobs * *
	 **************************************************************************/
	this.addJob = function(job){
		// listen to job
		var ctrl = this;
		job.finally(function(){
			ctrl.removeJob(job);
		});
		// put job
		var jobs = _.concat(this.jobs, job);
		this.setJobs(jobs);
	};

	/**
	 * 
	 * NOTE: do not use directly
	 */
	this.setJobs = function(jobs){
		var oldJobs = this.jobs;
		this.jobs = jobs;
		this.fire('jobsChanged', {
			values: this.jobs,
			oldValues: oldJobs
		});
	};

	this.getJobs = function(){
		return this.jobs;
	};

	this.removeJob = function(job){
		// TODO: maso, 2019: use set job to change list
		var index = this.jobs.indexOf(job);
		if(index >= 0){
			this.jobs.splice(index, 1);
		}
	};

	/***************************************************************************
	 * environment * *
	 **************************************************************************/
	this.getElement = function(){
		return $element;
	};

	this.getScope = function(){
		return $scope;
	}

	/***************************************************************************
	 * State * *
	 **************************************************************************/
	this.setState = function(state){
		if(this.state === state){
			return;
		}
		var event = {
				source: this,
				value: state,
				oldValue: this.state
		};
		this.state = state;
		if(state === 'edit'){
			this.setEditorLoaded(true);
		}
		this.fire('stateChanged', event);
	};

	this.getState = function(){
		return this.state;
	};

	this.isEditorLoaded = function(){
		return this.editorLoaded;
	};

	this.setEditorLoaded = function(editorLoaded){
		$rootScope.workbenchEditorLoaded = editorLoaded;
		this.editorLoaded = editorLoaded;
	};

	this.toggleEditMode = function(){
		var newState = this.getState() === 'edit' ? 'ready' : 'edit';
		this.setState(newState);
		_.forEach(this.editors, function(editor){
			editor.setState(newState);
		});
		// support old sidenave model
		$rootScope.showWorkbenchSettingPanel = this.getState() === 'edit';
	};


	/***************************************************************************
	 * Sidenavs *
	 **************************************************************************/

	/**
	 * Check if sidenave is open
	 * 
	 * @memberof AmhContentCtrl
	 * @params {string} id of the sidenav
	 */
	this.isSidenavOpen = function (id) {
		return $mdSidenav(id).isOpen();
	};


	/**
	 * Toggles the sidenav with the given id
	 * 
	 * @memberof AmhContentCtrl
	 * @params {string} componentId of the sidenav
	 */
	this.toggleSidenav = function (componentId) {
		if (angular.isDefined(this.oldComponentId) && $mdSidenav(this.oldComponentId).isOpen()) {
			$mdSidenav(this.oldComponentId).toggle();
			if (this.oldComponentId == componentId) {
				return;
			}
		}
		this.oldComponentId = componentId;
		$mdSidenav(componentId).toggle();
	};

	// Open general help in right sidenav.
	this.openHelp = function () {
		// TODO: maso, 2018: replace with help service
		$rootScope.showHelp = !$rootScope.showHelp;
	};

	this.clean = function(){
		this.setContent(undefined);
		this.setContentValue(undefined);
		this.setContentMetadata(undefined);
		this.setTermTaxonomies(undefined);
	};

	/***************************************************************************
	 * Content *
	 **************************************************************************/
	/**
	 * Return the model id
	 * 
	 * The model ID will be fetch from the model.
	 */
	this.getContentId = function () {
		var meta = this.getContent();
		if (!angular.isDefined(meta)) {
			return;
		}
		return meta.id;
	};

	this.setContentType = function (contentType) {
		this.contentType = contentType;
	};

	this.getContentType = function () {
		return this.contentType;
	};

	this.setContent = function(content){
		// set content
		if(this.content === content) {
			return;
		}
		var oldContent = this.content;
		this.content = content;

		// find content type
		var contentType = 'weburger';
		_.forEach(this.supportedTypes, function(type){
			if(type.match(content.mime_type)){
				contentType = type.key;
			}
		})
		this.setContentType(contentType);

		// fire change
		this.fire('contentChanged', {
			value: content,
			oldValue: oldContent
		});
	};

	this.getContent = function(){
		return this.content;
	};

	this.isContentDeletable = function () {
		var permissions = $app.getProperty('account.permissions');
		return (permissions.tenant_owner || permissions.cms_author || permissions.cma_editor);
	};

	this.isContentEditable = function () {
		var permissions = $app.getProperty('account.permissions');
		var accountId = $app.getProperty('account.id');
		var content = this.getContent();
		if(!content){
			return false;
		}
		// TODO: maso, 2019: check if the content is wb
		return permissions.tenant_owner || permissions.cms_editor ||
		(permissions.cms_author && (angular.equals(Number(content.author_id), Number(accountId)))) ||
		false;
	};

	this.canCreateContent = function(){
		var permissions = $app.getProperty('account.permissions');
		return permissions.tenant_owner || permissions.cms_author || permissions.cma_editor;
	};

	/***************************************************************************
	 * Content Value *
	 **************************************************************************/
	this.setContentValue = function (contentValue) {
		if (!contentValue) {
			this.contentValue = contentValue;
			return;
		}
		if(!angular.isObject(contentValue)){
			throw {
				message: 'content must be an object'
			};
		}
		var oldContentValue = this.contentValue;
		this.contentValue = $wbUtil.clean(contentValue);
		this.fire('contentValueChanged', {
			values: contentValue,
			oldValue: oldContentValue
		});
	};

	this.getContentValue = function () {
		return this.contentValue;
	};

	this.isContentValueLoaded = function(){ 
		return this.getContentValue();
	};

	/***************************************************************************
	 * Content Metadata *
	 **************************************************************************/
	this.setContentMetadata = function (list) {
		var oldList = this.contentMetadata;
		this.contentMetadata = list;
		this.fire('contentMetadataChanged', {
			values: list,
			oldValue: oldList
		});
	};

	this.getContentMetadata = function () {
		return this.contentMetadata;
	};



	/***************************************************************************
	 * term taxonomies *
	 **************************************************************************/
	this.setTermTaxonomies = function (termTaxonomies) {
		var oldList = this.termTaxonomies;
		this.termTaxonomies = termTaxonomies;
		this.fire('termTaxonomiesChanged', {
			values: termTaxonomies,
			oldValue: oldList
		});
	};

	this.getTermTaxonomies = function () {
		return this.termTaxonomies;
	};

	/***************************************************************************
	 * modules
	 **************************************************************************/
	this.setContentModules = function (contentModules) {
		var oldList = this.contentModules;
		this.contentModules = contentModules;
		this.fire('contentModulesChanged', {
			values: contentModules,
			oldValue: oldList
		});
	};

	this.getContentModules = function () {
		return this.contentModules;
	};

	/***************************************************************************
	 * Basic *
	 **************************************************************************/
	/**
	 * Load and initializ the workbench
	 */
	this.init = function(){
		// load observable
		angular.extend(this, WbObservableObject.prototype);
		WbObservableObject.apply(this);

		this.jobs = [];	
		this.supportedTypes = [];
		this.editors = [];

		var ctrl = this;
		$scope.$on('$destroy', function () {
			$amhEditorService.disconnectWorkbench(ctrl);
		});
		$amhEditorService.connectWorkbench(ctrl);

		this.supportedTypes.push(new AmhWorkbenchContentType('weburger', 'application/weburger+json'));

		this.setState('ready');
	};

	this.init();
});

