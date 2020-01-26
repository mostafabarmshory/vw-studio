
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
	
	fit('should check clonable content', function() {
		var urlTest1 = new URL('/api/v2/cms/contnets/123/content#anchor', window.location.href);
		expect(urlTest1.protocol).toBe('http:');
		
		urlTest1 = new URL('config://app/test', window.location.href);
		expect(urlTest1.protocol).toBe('config:');
		
		urlTest1 = new URL('setting://app/test', window.location.href);
		expect(urlTest1.protocol).toBe('setting:');
		
		
		
		urlTest1 = new URL('mb://app/settings/key#test', window.location.href);
		expect(urlTest1.protocol).toBe('mb:');
		expect(urlTest1.hash).toBe('#test');
		urlTest1.hash = "";
		expect(urlTest1.hash).toBe("");
		
		expect(urlTest1.pathname.substring(2)).toBe('app/settings/key');
		expect(urlTest1.pathname.substring(2).replace(/\//gi, '.')).toBe('app.settings.key');
	});
	
});

