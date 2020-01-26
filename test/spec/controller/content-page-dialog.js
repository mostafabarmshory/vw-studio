'use strict';

describe('PageNewDialog', function() {

	// load the controller's module
	beforeEach(module('ngMaterialHome'));

	var $rootScope;
	var $controller;

	// Initialize the controller and a mock scope
	beforeEach(inject(function(_$controller_, _$rootScope_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
	}));

	it('should extract canonical link from the route and new name', function() {
		var scope = $rootScope.$new();
		var ctrl = $controller('AmhPageNewDialogCtrl', {
			$scope : scope,
			config: {}
		});
		expect(angular.isFunction(ctrl.fetchRoute)).toBe(true);
		expect(ctrl.fetchRoute('abcd','http://localhost:9001')).toBe('/content/abcd');
		expect(ctrl.fetchRoute('abcd','http://localhost:9001/')).toBe('/content/abcd');
		expect(ctrl.fetchRoute('abcd','http://localhost:9001/users/login')).toBe('/content/abcd');
		expect(ctrl.fetchRoute('abcd','http://viraweb123.ir')).toBe('/content/abcd');
		expect(ctrl.fetchRoute('abcd','http://viraweb123.ir/')).toBe('/content/abcd');
		expect(ctrl.fetchRoute('abcd','http://viraweb123.ir/amh-blog/users/login')).toBe('/amh-blog/content/abcd');
		expect(ctrl.fetchRoute('abcd','http://viraweb123.ir/my-home/content/test-page-1')).toBe('/my-home/content/abcd');
		expect(ctrl.fetchRoute('abcd','https://viraweb123.ir:9001/users/content/test-page-1')).toBe('/users/content/abcd');
	});
});
