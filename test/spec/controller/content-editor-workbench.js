'use strict';

describe('Content editor workbench ', function() {

	// load the controller's module
	var $rootScope;
	var $controller;
	var $mockCms = {};
	var CmsContent;
	var CmsContentMetadata;
	var CmsTermTaxonomy;
	var $rootElement;
	var $routeParams;
	var $q;
	var $cms;
	var $dispatcher;
	var mockRouteParams = {
			name : 'contentname'
	};
	var mockTranslate = {
			use : function() {
			}
	};

	// Initialize the controller and a mock scope
	beforeEach(function(){
		module('vwStudio');
		inject(function(_$controller_, _$rootScope_,
				_CmsContent_, _CmsContentMetadata_, _CmsTermTaxonomy_,_$cms_,
				_$rootElement_, _$q_, _$dispatcher_, _$routeParams_) {
			$controller = _$controller_;
			$rootScope = _$rootScope_;
			CmsContent = _CmsContent_;
			CmsContentMetadata = _CmsContentMetadata_;
			CmsTermTaxonomy = _CmsTermTaxonomy_;
			$rootElement = _$rootElement_;
			$q = _$q_;
			$dispatcher = _$dispatcher_;
			$routeParams = _$routeParams_;
			$cms = _$cms_;
		});
	});

	it('should support a basic management', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var ctrl = $controller('AmhContentWorkbenchCtrl', {
			$scope : scope,
			$element: element,
			// place here mocked dependencies
			$cms : $mockCms,
			$routeParams : mockRouteParams,
			$translate : mockTranslate,
		});

		expect(angular.isFunction(ctrl.getElement)).toBe(true);
		expect(angular.isFunction(ctrl.getScope)).toBe(true);
		expect(angular.isFunction(ctrl.on)).toBe(true);
		expect(angular.isFunction(ctrl.off)).toBe(true);
		expect(angular.isFunction(ctrl.fire)).toBe(true);
		expect(angular.isFunction(ctrl.getState)).toBe(true);
		expect(angular.isFunction(ctrl.setState)).toBe(true);

		expect(ctrl.getScope()).toBe(scope);
		expect(ctrl.getElement()).toBe(element);
	});

	it('should support a sidnavs', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div><md-sidenav id="x"></md-sidenav></div>');
		$rootElement.append(element);
		var ctrl = $controller('AmhContentWorkbenchCtrl', {
			$scope : scope,
			$element: element,
			// place here mocked dependencies
			$cms : $mockCms,
			$routeParams : mockRouteParams,
			$translate : mockTranslate,
		});

		expect(angular.isFunction(ctrl.openHelp)).toBe(true);
		expect(angular.isFunction(ctrl.toggleSidenav)).toBe(true);
		expect(angular.isFunction(ctrl.isSidenavOpen)).toBe(true);

		expect(ctrl.isSidenavOpen('random-id')).toBe(false);
		expect(ctrl.isSidenavOpen('x')).toBe(false);

		ctrl.toggleSidenav('x');
		expect(ctrl.oldComponentId).toBe('x');

		ctrl.toggleSidenav('x');
		expect(ctrl.isSidenavOpen('x')).toBe(false);

		ctrl.openHelp();
		expect($rootScope.showHelp).toBe(true);
	});

	it('should support a content management function', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var ctrl = $controller('AmhContentWorkbenchCtrl', {
			$scope : scope,
			$element: element,
			// place here mocked dependencies
			$cms : $mockCms,
			$routeParams : mockRouteParams,
			$translate : mockTranslate,
		});

		expect(angular.isFunction(ctrl.getContentType)).toBe(true);
		expect(angular.isFunction(ctrl.setContentType)).toBe(true);

		expect(angular.isFunction(ctrl.getContent)).toBe(true);
		expect(angular.isFunction(ctrl.getContentId)).toBe(true);

		ctrl.setContentType('xx');
		expect(ctrl.getContentType()).toBe('xx');
	});


	it('should support a content value management function', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var ctrl = $controller('AmhContentWorkbenchCtrl', {
			$scope : scope,
			$element: element,
			// place here mocked dependencies
			$cms : $mockCms,
			$routeParams : mockRouteParams,
			$translate : mockTranslate,
		});

		expect(angular.isFunction(ctrl.setContentValue)).toBe(true);
		expect(angular.isFunction(ctrl.getContentValue)).toBe(true);
	});

	it('should set content and get content', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var ctrl = $controller('AmhContentWorkbenchCtrl', {
			$scope : scope,
			$element: element,
			// place here mocked dependencies
			$cms : $mockCms,
			$routeParams : mockRouteParams,
			$translate : mockTranslate,
		});

		expect(ctrl.getContent()).toBe(undefined);

		var content = new CmsContent({
			id: 0
		});
		ctrl.setContent(content);
		ctrl.setContent(content);
		expect(ctrl.getContent()).toBe(content);

		var metas = [{id:1}];
		ctrl.setContentMetadata(metas);
		expect(ctrl.getContentMetadata()).toBe(metas);
	});

	it('should set state and get state', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var ctrl = $controller('AmhContentWorkbenchCtrl', {
			$scope : scope,
			$element: element,
			// place here mocked dependencies
			$cms : $mockCms,
			$routeParams : mockRouteParams,
			$translate : mockTranslate,
		});

		expect(ctrl.getState()).toBe('ready');
		expect(ctrl.isEditorLoaded()).toBe(false);

		ctrl.setState('edit');
		expect(ctrl.isEditorLoaded()).toBe(true);
		ctrl.setState('edit');
		expect(ctrl.getState()).toBe('edit');
	});

	it('should set content value', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var ctrl = $controller('AmhContentWorkbenchCtrl', {
			$scope : scope,
			$element: element,
			// place here mocked dependencies
			$cms : $mockCms,
			$routeParams : mockRouteParams,
			$translate : mockTranslate,
		});
		// default value
		expect(ctrl.getContentValue()).toBe(undefined);

		// set object
		ctrl.setContentValue({type: 'p'});
		expect(ctrl.getContentValue().type).toBe('p');

		// set non boject
		try{
			ctrl.setContentValue('p');
			expect(false).toBe(true);
		} catch(ex){
			expect(true).toBe(true);
		}

		// clean
		ctrl.setContentValue();
		expect(ctrl.getContentValue()).toBe(undefined);
	});


//	it('should load content if the page is not created', function(done) {
//		$routeParams.name = 'test';
//		var scope = $rootScope.$new();
//		var element = angular.element('<div></div>');
//
//		var model = {
//				id: '1',
//				name: 'test',
//				metas: [],
//				term_taxonomies: []
//		};
//		var content = new CmsContent(model);
//		content.value = function(){
//			return $q.resolve({});
//		};
//		$cms.getContent = function(){
//			return $q.resolve(content);
//		};
//		$routeParams.name = undefined;
//		
//		var ctrl = $controller('AmhContentWorkbenchCtrl', {
//			$scope : scope,
//			$element: element,
//		});
//		ctrl.setState('ready');
//		expect(ctrl.getContentId()).toBe(undefined);
//		ctrl.on('stateChanged', function(){
//			if(ctrl.state === 'ready'){
//				expect(ctrl.getContent().id).toBe(content.id);
//				expect(ctrl.getContentId()).toBe(content.id);
//				done();
//			}
//		});
//		$dispatcher.dispatch('/cms/contents', {
//			key: 'read',
//			values: [content]
//		});
//		$rootScope.$apply();
//	});

//	it('should clean the controller', function() {
//		var scope = $rootScope.$new();
//		var element = angular.element('<div></div>');
//		var ctrl = $controller('AmhContentWorkbenchCtrl', {
//			$scope : scope,
//			$element: element,
//			// place here mocked dependencies
//			$cms : $mockCms,
//			$routeParams : mockRouteParams,
//			$translate : mockTranslate,
//		});
//		// set object
//		ctrl.setContent(new CmsContent({id: 1}));
//		ctrl.setContentMetadata([new CmsContentMetadata({id: 1})]);
//		ctrl.setContentValue({type: 'p'});
//		ctrl.setTermTaxonomies([new CmsTermTaxonomy({id: 1})]);
//
//		ctrl.clean();
//
//		expect(ctrl.getContent()).toBe(undefined);
//		expect(ctrl.getContentValue()).toBe(undefined);
//		expect(ctrl.getContentMetadata()).toBe(undefined);
//		expect(ctrl.getTermTaxonomies()).toBe(undefined);
//	});
});



//it('should update content meta', function(done) {
//var scope = $rootScope.$new();
//var element = angular.element('<div></div>');
//var ctrl = $controller('AmhContentWorkbenchCtrl', {
//$scope : scope,
//$element: element,
////place here mocked dependencies
//$cms : $mockCms,
//$routeParams : mockRouteParams,
//$translate : mockTranslate,
//});

//var model = {};
//var content = new CmsContent(model);
//content.update = function(){
//return $q.resolve(model);
//};
//ctrl.setContent(content);
//ctrl.setState('edit');
//ctrl.updateContent()
//.finally(function(){
//expect(ctrl.getState()).toBe('edit');
//done();
//});
//$rootScope.$apply();
//});

//it('should fail to update if is loading', function(done) {
//var scope = $rootScope.$new();
//var element = angular.element('<div></div>');
//var ctrl = $controller('AmhContentWorkbenchCtrl', {
//$scope : scope,
//$element: element,
////place here mocked dependencies
//$cms : $mockCms,
//$routeParams : mockRouteParams,
//$translate : mockTranslate,
//});

//var model = {};
//var content = new CmsContent(model);
//content.update = function(){
//return $q.resolve(model);
//};
//ctrl.setContent(content);
//ctrl.setState('loading');
//var flag;
//ctrl.updateContent()
//.then(function(){
//flag = false;
//}, function(){
//flag = true;
//})
//.finally(function(){
//expect(flag).toBe(true);
//done();
//});
//$rootScope.$apply();
//});

//it('should delete content', function(done) {
//var scope = $rootScope.$new();
//var element = angular.element('<div></div>');
//var ctrl = $controller('AmhContentWorkbenchCtrl', {
//$scope : scope,
//$element: element,
////place here mocked dependencies
//$cms : $mockCms,
//$routeParams : mockRouteParams,
//$translate : mockTranslate,
//});

//var model = {
//id: '1'
//};
//var content = new CmsContent(model);
//content.delete = function(){
//return $q.resolve(model);
//};
//ctrl.setContent(content);
//ctrl.setState('ready');
//ctrl.deleteContent()
//.finally(function(){
//expect(ctrl.getContent()).toBe(undefined);
//done();
//});

//$rootScope.$apply();
//});

//it('should fail delete content if is in loading', function(done) {
//var scope = $rootScope.$new();
//var element = angular.element('<div></div>');
//var ctrl = $controller('AmhContentWorkbenchCtrl', {
//$scope : scope,
//$element: element,
////place here mocked dependencies
//$cms : $mockCms,
//$routeParams : mockRouteParams,
//$translate : mockTranslate,
//});

//var model = {
//id: '1'
//};
//var content = new CmsContent(model);
//content.delete = function(){
//return $q.resolve(model);
//};
//ctrl.setContent(content);
//ctrl.setState('loading');
//var flag;
//ctrl.deleteContent()
//.then(function(){
//flag = false;
//}, function(){
//flag = true;
//})
//.finally(function(){
//expect(flag).toBe(true);
//done();
//});

//$rootScope.$apply();
//});
