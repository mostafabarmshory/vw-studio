'use strict';

describe('Application controller', function() {
	// load the controller's module
	var m;

	// Initialize the controller and a mock scope
	beforeEach(inject(function() {
		// m = module('my-dashboard');
		m = 'value';
	}));

	it('should load', function() {
		expect(angular.isDefined(m)).toBe(true);
	});
});
