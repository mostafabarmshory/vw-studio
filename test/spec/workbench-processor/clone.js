//'use strict';
//
//describe('Clon Workbench Processor ', function() {
//
//	// load the controller's module
//	var $rootScope;
//	var $controller;
//	var $mockCms = {};
//	var CmsContent;
//	var CmsContentMetadata;
//	var CmsTermTaxonomy;
//	var $rootElement;
//	var $routeParams;
//	var $q;
//	var $dispatcher;
//	var mockRouteParams = {
//		name : 'contentname'
//	};
//	var mockTranslate = {
//		use : function() {
//		}
//	};
//	var AmhWorkbenchProcessorClone;
//
//	// Initialize the controller and a mock scope
//	beforeEach(function(){
//		module('vwStudio');
//		inject(function(_$controller_, _$rootScope_,
//				_CmsContent_, _CmsContentMetadata_, _CmsTermTaxonomy_,
//				_$rootElement_, _$q_, _$dispatcher_, _$routeParams_,
//				_AmhWorkbenchProcessorClone_) {
//			$controller = _$controller_;
//			$rootScope = _$rootScope_;
//			CmsContent = _CmsContent_;
//			CmsContentMetadata = _CmsContentMetadata_;
//			CmsTermTaxonomy = _CmsTermTaxonomy_;
//			$rootElement = _$rootElement_;
//			$q = _$q_;
//			$dispatcher = _$dispatcher_;
//			$routeParams = _$routeParams_;
//			AmhWorkbenchProcessorClone = _AmhWorkbenchProcessorClone_;
//		});
//	});
//
//	it('should support clone action', function() {
//		var scope = $rootScope.$new();
//		var element = angular.element('<div></div>');
//		var workbench = $controller('AmhContentWorkbenchCtrl', {
//			$scope : scope,
//			$element: element,
//			// place here mocked dependencies
//			$cms : $mockCms,
//			$routeParams : mockRouteParams,
//			$translate : mockTranslate,
//		});
//		
//		var processor = new AmhWorkbenchProcessorClone(workbench);
//		
//		expect(angular.isFunction(processor.cloneContent)).toBe(true);
//		expect(angular.isFunction(processor.isClonable)).toBe(true);
//	});
//	
//	it('should check clonable content', function() {
//		var scope = $rootScope.$new();
//		var element = angular.element('<div></div>');
//		var workbench = $controller('AmhContentWorkbenchCtrl', {
//			$scope : scope,
//			$element: element,
//			// place here mocked dependencies
//			$cms : $mockCms,
//			$routeParams : mockRouteParams,
//			$translate : mockTranslate,
//		});
//		
//		var processor = new AmhWorkbenchProcessorClone(workbench);
//		
//		// initial state
//		expect(processor.isClonable()).toBe(false);
//		
//		// with content
//		var model = {
//				id: 1
//		};
//		workbench.setContent(new CmsContent(model));
//		expect(processor.isClonable()).toBe(false);
//	});
//	
//});
//
//
//
////it('should update content meta', function(done) {
////	var scope = $rootScope.$new();
////	var element = angular.element('<div></div>');
////	var ctrl = $controller('AmhContentWorkbenchCtrl', {
////		$scope : scope,
////		$element: element,
////		// place here mocked dependencies
////		$cms : $mockCms,
////		$routeParams : mockRouteParams,
////		$translate : mockTranslate,
////	});
////	
////	var model = {};
////	var content = new CmsContent(model);
////	content.update = function(){
////		return $q.resolve(model);
////	};
////	ctrl.setContent(content);
////	ctrl.setState('edit');
////	ctrl.updateContent()
////	.finally(function(){
////		expect(ctrl.getState()).toBe('edit');
////		done();
////	});
////	$rootScope.$apply();
////});
////
////it('should fail to update if is loading', function(done) {
////	var scope = $rootScope.$new();
////	var element = angular.element('<div></div>');
////	var ctrl = $controller('AmhContentWorkbenchCtrl', {
////		$scope : scope,
////		$element: element,
////		// place here mocked dependencies
////		$cms : $mockCms,
////		$routeParams : mockRouteParams,
////		$translate : mockTranslate,
////	});
////	
////	var model = {};
////	var content = new CmsContent(model);
////	content.update = function(){
////		return $q.resolve(model);
////	};
////	ctrl.setContent(content);
////	ctrl.setState('loading');
////	var flag;
////	ctrl.updateContent()
////	.then(function(){
////		flag = false;
////	}, function(){
////		flag = true;
////	})
////	.finally(function(){
////		expect(flag).toBe(true);
////		done();
////	});
////	$rootScope.$apply();
////});
////
////it('should delete content', function(done) {
////	var scope = $rootScope.$new();
////	var element = angular.element('<div></div>');
////	var ctrl = $controller('AmhContentWorkbenchCtrl', {
////		$scope : scope,
////		$element: element,
////		// place here mocked dependencies
////		$cms : $mockCms,
////		$routeParams : mockRouteParams,
////		$translate : mockTranslate,
////	});
////	
////	var model = {
////			id: '1'
////	};
////	var content = new CmsContent(model);
////	content.delete = function(){
////		return $q.resolve(model);
////	};
////	ctrl.setContent(content);
////	ctrl.setState('ready');
////	ctrl.deleteContent()
////	.finally(function(){
////		expect(ctrl.getContent()).toBe(undefined);
////		done();
////	});
////	
////	$rootScope.$apply();
////});
//
////it('should fail delete content if is in loading', function(done) {
////	var scope = $rootScope.$new();
////	var element = angular.element('<div></div>');
////	var ctrl = $controller('AmhContentWorkbenchCtrl', {
////		$scope : scope,
////		$element: element,
////		// place here mocked dependencies
////		$cms : $mockCms,
////		$routeParams : mockRouteParams,
////		$translate : mockTranslate,
////	});
////	
////	var model = {
////			id: '1'
////	};
////	var content = new CmsContent(model);
////	content.delete = function(){
////		return $q.resolve(model);
////	};
////	ctrl.setContent(content);
////	ctrl.setState('loading');
////	var flag;
////	ctrl.deleteContent()
////	.then(function(){
////		flag = false;
////	}, function(){
////		flag = true;
////	})
////	.finally(function(){
////		expect(flag).toBe(true);
////		done();
////	});
////	
////	$rootScope.$apply();
////});
