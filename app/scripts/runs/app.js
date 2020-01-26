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
 * دریچه‌های محاوره‌ای
 */
.run(function(
		/* mblowfish */ $app, $actions, $sidenav, $toolbar,
		/* angularjs */ $rootScope, $window,
		/* mateiral  */ $mdSidenav,
		/* weburger  */ $resource, $widget,
		/* amh       */ $amhEditorService) {

	$actions.newAction({
		id: 'amh.cms.pages',
		type: 'action',
		priority : 11,
		icon : 'list',
		title: 'Pages',
		description: 'Pages',
		action: function(){
			$mdSidenav('amh.cms.pages.sidenav').toggle();
		},
		groups:['amh.owner-toolbar.public']
	});

	// TODO: Hadi 1396-12-23: should get login action and add it to desired group
	$actions.newAction({ 
		id: 'amh.login',
		type: 'link',
		priority : 10,
		icon : 'login',
		title : 'Login',
		url: 'users/login',
		groups:['amh.sidenav']
	});
	// TODO: Hadi 1396-12-23: should get logout action and add it to desired group
	$actions.newAction({ 
		id: 'amh.logout',
		type: 'action',
		priority : 10,
		icon : 'exit',
		title : 'Logout',
		action : function(){
			$app.logout();
		},
		groups:['amh.sidenav']
	});
	// TODO: Hadi 1396-12-23: should get home action and add it to desired group
	$actions.newAction({ 
		id: 'amh.home',
		type: 'link',
		priority : 100,
		icon : 'home',
		title : 'Home',
		url: '/',
		groups:['amh.sidenav', 'mb.toolbar.menu']
	});

	$toolbar.newToolbar({
		id: 'amh.owner-toolbar',
		title: 'Owner Toolbar',
		description: 'Toolbar for owners',
		controller: 'AmhOwnerToolbarCtrl',
		controllerAs: 'ctrl',
		templateUrl: 'views/toolbars/amh-owner-toolbar.html',
		visible: function(){
			return !$rootScope.__account.anonymous;
		},
		raw: true
	});

	/*********************************************************************
	 * workbench  Sidenave :
	 * 
	 * - widgets
	 * - settings
	 * - templates
	 * - pages
	 ********************************************************************/
	/*
	 * Display list of widgets to drag and drop into the current document
	 * and editors.
	 */
	$sidenav.newSidenav({
		id : 'amh.workbench.weburger.widgets',
		title : 'Widgets',
		description : 'Basic widgets of Weburger',
		template : '<wb-widgets-explorer ng-model="widgets.items"></wb-widgets-explorer>',
		locked : true,
		visible : function () {
			return $rootScope.showWidgetsPanel;
		},
		position : 'start',
		/*
		 * @ngInject
		 */
		controller: function($scope){
			$widget.widgets()
			.then(function(list){
				$scope.widgets = list;
			});
		},
		controllerAs: 'ctrl'
	});
	$sidenav.newSidenav({
		id : 'amh.workbench.weburger.navigator',
		title : 'Navigator',
		description : 'Navigator widgets of Weburger',
		templateUrl : 'views/sidenavs/amh-contents-navigator.html',
		locked : true,
		visible : function () {
			return $rootScope.showWidgetsNavigator;
		},
		position : 'start',
		/*
		 * @ngInject
		 */
		controller: function($scope){

			var ctrl = this;

			$scope.treeOptions = {
//					accept: function(sourceNodeScope, destNodesScope, destIndex) {
//						return true;
//					},
//					beforeDrag(sourceNodeScope)
//					removed(node)
//					dropped(event)
//					dragStart(event)
//					dragMove(event)
//					dragStop(event)
//					beforeDrop(event)
//					toggle(collapsed, sourceNodeScope)
			};

			$scope.collapseAll = function () {
				$scope.$broadcast('angular-ui-tree:collapse-all');
			};

			$scope.expandAll = function () {
				$scope.$broadcast('angular-ui-tree:expand-all');
			};

			$scope.toggleItem = function (handler, $event) {
				handler.toggle();
				$event.stopPropagation();
			};

			$scope.dblclick = function(widget, handler, $event){
				$event.items = [widget];
				$actions.exec('amh.workbench.widget.dblclick', $event);
			};

			$scope.click = function(widget, handler, $event){
				$event.items = [widget];
				$actions.exec('amh.workbench.widget.click', $event);
			};


			$scope.openHelp = function(widget){
				return $help.openHelp(widget);
			};

			$scope.selectChildren = function(widget, $event){
				$event.items = [widget];
				$actions.exec('amh.workbench.widget.selectChildren', $event);
			}

			function setRootWidget(widget){
				ctrl.widgets = [widget];
			}

			function activeEditorChanged(/*event*/){
				var activeEditor  = ctrl.workbench.getActiveEditor();
				if(!activeEditor){
					return;
				}
				activeEditor.on('rootWidgetChanged', function($event){
					setRootWidget($event.value);
				});
				setRootWidget(activeEditor.getRootWidget());
			}

			function setWorkbench(workbench){
				if(ctrl.workbench){
					ctrl.workbench.off('activeEditorChanged', activeEditorChanged);
				}
				ctrl.workbench = workbench;
				if(ctrl.workbench){
					ctrl.workbench.on('activeEditorChanged', activeEditorChanged);
					activeEditorChanged();
				}
			}

			function handleWorkbench(event){
				setWorkbench(event.value);
			}

			setWorkbench($amhEditorService.getWorkbench());
			$amhEditorService.on('workbenchChanged', handleWorkbench);
			$scope.$on('destory', function(){
				$amhEditorService.off('workbenchChanged', handleWorkbench);
				if(ctrl.workbench){
					ctrl.workbench.on('contentChanged', contentChanged);
				}
			});
		},
		controllerAs: 'ctrl'
	});
	/*
	 * Adds a sidenav to manage settings of selected widgets. You can
	 * ecit attributes, style, and events of an widget.
	 */
	$sidenav.newSidenav({
		id : 'amh.workbench.weburger.settings',
		title : 'Settings',
		description : 'Settings and configurations fo selected widgets',
		templateUrl : 'views/sidenavs/amh-workbench-settings.html',
		locked : true,
		visible : function () {
			return $rootScope.showWorkbenchSettingPanel;
		},
		position : 'end',
		/*
		 * @ngInject
		 */
		controller: function(){
			$rootScope.showWorkbenchPanel = true;
			this.setVisible = function(visible){
				$rootScope.showWorkbenchSettingPanel = visible;
			};

			this.isVisible = function(){
				return $rootScope.showWorkbenchSettingPanel;
			}
		},
		controllerAs: 'ctrl'
	});
	/*
	 * Allow user to search and apply a template from the backend.
	 */
	$sidenav.newSidenav({
		id : 'amh.workbench.weburger.templates',
		title : 'Templates',
		description : 'Select and apply a templte to the current page',
		templateUrl : 'views/sidenavs/amh-workbench-template.html',
		locked : false,
//		visible : function () {
//		return true;
//		},
		position : 'start',
		/*
		 * @ngInject
		 */
		controller: function(){
			this.loadModelTemplate = function(template, $event){
				var $event = $event || jQuery.Event( "upload", { 
					target: this
				});
				$event.template = [template];
				return $actions.exec('amh.workbench.contentValue.upload', $event);
			};
		},
		controllerAs: 'ctrl'
	});

	/*
	 * Allow user to search and find pages from the backend.
	 */
	$sidenav.newSidenav({
		id : 'amh.cms.pages.sidenav',
		title : 'Pages',
		description : 'Sidenav contain navigations about AMH',
		templateUrl : 'views/sidenavs/amh-contents-list.html',
		locked : false,
		position : 'start',
		/*
		 * @ngInject
		 */
		controller: function($scope){
			$scope.pageId = 'pages';
			$scope.goto = function(pageId) {
				$scope.pageId = pageId;
			};
		}
	});
	/*
	 * Allow user to change current content settings such as title, description
	 * and ..
	 */
	$sidenav.newSidenav({
		id : 'amh.workbench.content',
		title : 'Page settings',
		description : 'Manages current page settings',
		templateUrl : 'views/sidenavs/amh-workbench-content.html',
		locked : false,
//		visible : function () {
//		return true;
//		},
		position : 'start',
		/*
		 * @ngInject
		 */
		controller: function($scope){
			var ctrl = this;

			function contentChanged(){
				if(ctrl.workbench){
					ctrl.content = ctrl.workbench.getContent();
				}
			}

			function setWorkbench(workbenc){
				if(ctrl.workbench){
					ctrl.workbench.off('contentChanged', contentChanged);
				}
				ctrl.workbench = workbenc;
				if(ctrl.workbench){
					ctrl.workbench.on('contentChanged', contentChanged);
				}
				contentChanged();
			}

			function handleWorkbench(event){
				setWorkbench(event.value);
			}

			this.saveChanges = function(){
				var promise = this.content.update()
				.then(function(){
					ctrl.contentDirty = false;
				});
				var job = new AmhWorkbenchJob('Save content', promise);
				this.workbench.addJob(job);
				return job;
			};

			setWorkbench($amhEditorService.getWorkbench());
			$amhEditorService.on('workbenchChanged', handleWorkbench);
			$scope.$on('destory', function(){
				$amhEditorService.off('workbenchChanged', handleWorkbench);
				if(ctrl.workbench){
					ctrl.workbench.on('contentChanged', contentChanged);
				}
			});
		},
		controllerAs: 'ctrl'
	});

	/*********************************************************************
	 * Resources
	 ********************************************************************/
	$resource.newPage({
		type: 'pages',
		icon: 'insert_drive_file',
		label: 'pages',
		templateUrl: 'views/resources/pages.html',
		controller: 'AmhSeenSelectPagesCtrl',
		controllerAs: 'ctrl',
		priority: 10,
		tags: ['url']
	});
});