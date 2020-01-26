
describe('Clon Workbench Processor ', function() {
	'use strict';

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
	var $dispatcher;
	var $wbWindow;
	var mockRouteParams = {
		name : 'contentname'
	};
	var mockTranslate = {
		use : function() {
		}
	};
	var AmhWorkbenchProcessorMetainfo;

	// Initialize the controller and a mock scope
	beforeEach(function(){
		module('ngMaterialHome');
		inject(function(_$controller_, _$rootScope_,
				_CmsContent_, _CmsContentMetadata_, _CmsTermTaxonomy_,
				_$rootElement_, _$q_, _$dispatcher_, _$routeParams_,
				_AmhWorkbenchProcessorMetainfo_,
				_$wbWindow_) {
			$controller = _$controller_;
			$rootScope = _$rootScope_;
			CmsContent = _CmsContent_;
			CmsContentMetadata = _CmsContentMetadata_;
			CmsTermTaxonomy = _CmsTermTaxonomy_;
			$rootElement = _$rootElement_;
			$q = _$q_;
			$dispatcher = _$dispatcher_;
			$routeParams = _$routeParams_;
			AmhWorkbenchProcessorMetainfo = _AmhWorkbenchProcessorMetainfo_;
			$wbWindow = _$wbWindow_;
		});
	});
	
	it('should check clonable content', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var workbench = $controller('AmhContentWorkbenchCtrl', {
			$scope : scope,
			$element: element,
			// place here mocked dependencies
			$cms : $mockCms,
			$routeParams : mockRouteParams,
			$translate : mockTranslate,
		});
		
		new AmhWorkbenchProcessorMetainfo(workbench);
		var metas = [{
			key: 'a',
			value: 'b'
		}];
		workbench.setContentMetadata(metas);
		expect($wbWindow.getMeta('a')).toBe('b');
	});
	
});

