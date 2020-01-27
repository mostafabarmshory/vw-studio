//'use strict';
//
//describe('CRUD Workbench Processor ', function() {
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
//	var $cms;
//	var mockRouteParams = {
//			name : 'contentname'
//	};
//	var mockTranslate = {
//			use : function() {
//			}
//	};
//	var AmhWorkbenchProcessorCrud;
//
//	// Initialize the controller and a mock scope
//	beforeEach(function(){
//		module('vwStudio');
//		inject(function(_$controller_, _$rootScope_,
//				_CmsContent_, _CmsContentMetadata_, _CmsTermTaxonomy_,
//				_$rootElement_, _$q_, _$dispatcher_, _$routeParams_, _$cms_,
//				_AmhWorkbenchProcessorCrud_) {
//			$controller = _$controller_;
//			$rootScope = _$rootScope_;
//			CmsContent = _CmsContent_;
//			CmsContentMetadata = _CmsContentMetadata_;
//			CmsTermTaxonomy = _CmsTermTaxonomy_;
//			$rootElement = _$rootElement_;
//			$q = _$q_;
//			$dispatcher = _$dispatcher_;
//			$routeParams = _$routeParams_;
//			AmhWorkbenchProcessorCrud = _AmhWorkbenchProcessorCrud_;
//			$cms = _$cms_;
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
//		var processor = new AmhWorkbenchProcessorCrud(workbench);
//
//		expect(angular.isFunction(processor.isContentDeletable)).toBe(true);
//		expect(angular.isFunction(processor.isContentEditable)).toBe(true);
//
//		expect(angular.isFunction(processor.createContent)).toBe(true);
//		expect(angular.isFunction(processor.readContent)).toBe(true);
//		expect(angular.isFunction(processor.updateContent)).toBe(true);
//		expect(angular.isFunction(processor.deleteContent)).toBe(true);
//	});
//
//	it('should update content meta', function(done) {
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
//		var processor = new AmhWorkbenchProcessorCrud(workbench);
//		expect(processor.isContentDeletable()).toBe(false);
//		expect(processor.isContentEditable()).toBe(false);
//
//		var model = {};
//		var content = new CmsContent(model);
//		content.update = function(){
//			return $q.resolve(model);
//		};
//		workbench.setContent(content);
//		workbench.setState('edit');
//
//		expect(processor.isContentDeletable()).toBe(false);
//		expect(processor.isContentEditable()).toBe(false);
//		processor.updateContent()
//		.finally(function(){
//			expect(workbench.getState()).toBe('edit');
//			done();
//		});
//		$rootScope.$apply();
//	});
//
//	it('should fail to update if is loading', function(done) {
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
//		var model = {};
//		var content = new CmsContent(model);
//		content.update = function(){
//			return $q.resolve(model);
//		};
//		workbench.setContent(content);
//		workbench.setState('loading');
//		var processor = new AmhWorkbenchProcessorCrud(workbench);
//
//		var flag;
//		processor.updateContent()
//		.then(function(){
//			flag = false;
//		}, function(){
//			flag = true;
//		})
//		.finally(function(){
//			expect(flag).toBe(true);
//			done();
//		});
//		$rootScope.$apply();
//	});
//
//	it('should delete content', function(done) {
//		var scope = $rootScope.$new();
//		var element = angular.element('<div></div>');
//		var workbench = $controller('AmhContentWorkbenchCtrl', {
//			$scope : scope,
//			$element: element,
////			place here mocked dependencies
//			$cms : $mockCms,
//			$routeParams : mockRouteParams,
//			$translate : mockTranslate,
//		});
//		var model = {
//				id: '1'
//		};
//		var content = new CmsContent(model);
//		var flag = false;
//		content.delete = function(){
//			flag = true;
//			return $q.resolve(model);
//		};
//		workbench.setContent(content);
//		workbench.setState('ready');
//		var processor = new AmhWorkbenchProcessorCrud(workbench);
//
//		processor.deleteContent()
//		.finally(function(){
//			expect(workbench.getContent()).toBe(undefined);
//			expect(flag).toBe(true);
//			done();
//		});
//		$rootScope.$apply();
//	});
//
//	it('should fail delete content if is in loading', function(done) {
//		var scope = $rootScope.$new();
//		var element = angular.element('<div></div>');
//		var workbench = $controller('AmhContentWorkbenchCtrl', {
//			$scope : scope,
//			$element: element,
////			place here mocked dependencies
//			$cms : $mockCms,
//			$routeParams : mockRouteParams,
//			$translate : mockTranslate,
//		});
//		var model = {
//				id: '1'
//		};
//		var content = new CmsContent(model);
//		content.delete = function(){
//			return $q.resolve(model);
//		};
//		workbench.setContent(content);
//		workbench.setState('loading');
//		var processor = new AmhWorkbenchProcessorCrud(workbench);
//		var flag;
//
//
//		processor.deleteContent()
//		.then(function(){
//			flag = false;
//		}, function(){
//			flag = true;
//		})
//		.finally(function(){
//			expect(flag).toBe(true);
//			done();
//		});
//		$rootScope.$apply();
//	});
//	
//	it('should read content if aplication is ready', function() {
//		var scope = $rootScope.$new();
//		var element = angular.element('<div></div>');
//		var workbench = $controller('AmhContentWorkbenchCtrl', {
//			$scope : scope,
//			$element: element,
////			place here mocked dependencies
//			$cms : $mockCms,
//			$routeParams : mockRouteParams,
//			$translate : mockTranslate,
//		});
//		
//		var processor = new AmhWorkbenchProcessorCrud(workbench);
//		var flag = false;
//		processor.readContent = function(){
//			flag = true;
//		}
//		
//		// init app
//		$dispatcher.dispatch('/app/state', {
//			type: 'update',
//			value: 'init'
//		});
//		
//		// app loaded
//		$dispatcher.dispatch('/app/state', {
//			type: 'update',
//			value: 'ready'
//		});
//		
//		expect(flag).toBe(true);
//	});
//	
//	it('should read content', function(done) {
//		var scope = $rootScope.$new();
//		var element = angular.element('<div></div>');
//		var workbench = $controller('AmhContentWorkbenchCtrl', {
//			$scope : scope,
//			$element: element,
////			place here mocked dependencies
//			$cms : $mockCms,
//			$routeParams : mockRouteParams,
//			$translate : mockTranslate,
//		});
//		
//		workbench.setState('ready');
//		$routeParams.name = 'test';
//		$cms.getContent = function(){
//			var c = new CmsContent({
//				id: 1,
//				name: 'test',
//				metas: [{id: 1, key: 'x', value: 'y'}],
//				term_taxonomies: [{id:1}]
//			});
//			c.value = function(){
//				return $q.resolve({type: 'p'});
//			}
//			return $q.resolve(c);
//		};
//		var processor = new AmhWorkbenchProcessorCrud(workbench);
//		processor.readContent()
//		.then(function(){
//			expect(workbench.getContent()).not.toBe(undefined);
//			expect(workbench.getContentMetadata().length).toBe(1);
//			expect(workbench.getTermTaxonomies().length).toBe(1);
//			done();
//		});
//		$rootScope.$apply();
//	});
//});
//
//
//
