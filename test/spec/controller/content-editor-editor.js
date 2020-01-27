'use strict';

describe('Contnent edtiro controllr', function() {

	// load the controller's module
	var $rootScope;
	var $controller;

	// Initialize the controller and a mock scope
	beforeEach(function(){
		module('vwStudio');
		inject(function(_$controller_, _$rootScope_) {
			$controller = _$controller_;
			$rootScope = _$rootScope_;
		});
	});

	it('should root widget management', function() {
		var scope = $rootScope.$new();
		var element = angular.element('<div></div>');
		var ctrl = $controller('AmhContentEditorCtrl', {
			$scope : scope,
			$element: element,
			// place here mocked dependencies
		});

		expect(angular.isFunction(ctrl.getRootWidget)).toBe(true);
		expect(angular.isFunction(ctrl.setRootWidget)).toBe(true);
	});
});
