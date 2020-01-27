/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * One of the most important part of AngularJS application are controllers. So, well
 * tested controllers directly effects the software quality.
 * 
 * In this test I try to implement a simple and light automated test. Them main idea
 * is taken from Korat[1] but this is a very simple implementation.
 * 
 * @returns
 */
describe('Automate test ', function() {
	'use strict';

	var $controller;
	var locals = {
		$scope: null,
		$app: {
			logout: function() {
				//Logout function
			},
			session: function() {
				return {
					then: function() {
						// TODO: call the fucntion
					}
				};
			}
		},
		// used in dialogs
		config: {},
		$element: angular.element('<div></div>'),
	};

	// load the controller's module
	beforeEach(module('vwStudio'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function(_$controller_, $rootScope) {
		$controller = _$controller_;
		locals.$scope = $rootScope.$new();
	}));



	/********************************************************************
	 * Test space
	 ********************************************************************/
	/**
	 * 
	 */
	function KoratObjectParser() { }

	/**
	 * Applies finitization to the test space
	 */
	KoratObjectParser.prototype.getFinitization = function(/*testSpace*/) { };


	var KoratObjectHolder = function(refrence) {
		this.refrence = refrence;
	};

	KoratObjectHolder.prototype.invokePredicate = function() {
		// XXX: maso, 2019
	};

	/**
	 * 
	 */
	function KoratControllerTestSpace(controllerName) {
		this.controllerName = controllerName;
		this.loaded = false;
	}

	KoratControllerTestSpace.prototype.load = function() {
		// create an instance of controller
		this.mainInstance = $controller(this.controllerName, locals);
		expect(this.mainInstance).not.toBe(null);

//		var objectParser = new KoratObjectParser();

//		var finitization = objectParser.getFinitization(this.mainInstance);
		//		var predicate = objectParser.getPredicate(this.mainInstance);

		// XXX: maso, 2019: build test space
		//		this.intialize(finitization);


		this.loaded = true;
	};

	KoratControllerTestSpace.prototype.hasNextCandidate = function() {
		this.checkPreconditions();
		return false;
	};

	KoratControllerTestSpace.prototype.nextCandidate = function() {
		this.checkPreconditions();
	};

	KoratControllerTestSpace.prototype.checkPreconditions = function() {
		if (!this.loaded) {
			throw 'The test space must be load befor any test';
		}
	};

	/***********************************************************************
	 * Our controllers
	 ***********************************************************************/
	var controllers = [
		// basics
		'AmhUserWidgetCtrl',
		'AmhContentEditorCtrl',
		'AmhContentMyPagesCtrl',
		'AmhContentTemplatesCtrl',
		'AmhContentPagesCtrl',
		'AmhOwnerToolbarCtrl',
		'AmhPageNewDialogCtrl',
		'AmhSeenSelectPagesCtrl',
	];

	angular.forEach(controllers, function(ctrlName) {
		var testSpace = new KoratControllerTestSpace(ctrlName);

		it('of ' + ctrlName + ' should pass all test based on Korat', function() {
			testSpace.load();
			while (testSpace.hasNextCandidate()) {
				var candidate = testSpace.nextCandidate();
				try {
					if (candidate.invokePredicate()) {
						//						output(candidate);
						console.log('Hi');
					}
				} catch (error) {
					// TODO: Report the problem??
				}
				//				backtrack();
			}
		});
	});

});
