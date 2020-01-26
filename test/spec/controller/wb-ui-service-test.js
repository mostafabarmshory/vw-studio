///* 
// * The MIT License (MIT)
// * 
// * Copyright (c) 2016 weburger
// * 
// * Permission is hereby granted, free of charge, to any person obtaining a copy
// * of this software and associated documentation files (the 'Software'), to deal
// * in the Software without restriction, including without limitation the rights
// * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// * copies of the Software, and to permit persons to whom the Software is
// * furnished to do so, subject to the following conditions:
// * 
// * The above copyright notice and this permission notice shall be included in all
// * copies or substantial portions of the Software.
// * 
// * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// * SOFTWARE.
// */
//'use strict';
//
//describe('Setting padding/margin ', function () {
//	// instantiate service
//	var $settings;
//	var $rootScope;
//	var $injector;
//
//
//	// load the service's module
//	beforeEach(module('am-wb-core'));
//	beforeEach(inject(function (_$settings_, _$rootScope_, _$injector_) {
//		$settings = _$settings_;
//		$rootScope = _$rootScope_;
//		$injector = _$injector_;
//	}));
//
//	it('should not change original model', function () {
//		var page = $settings.getPage('marginPadding');
//		var scope = $rootScope.$new();
//		scope.wbModel = {
//		    style:{}
//		};
//		var ctrl = {};
//		
//		// TODO: check if the controller is a function
//		$injector.invoke(page.controller, ctrl, {
//		    '$scope': scope
//		});
//		scope.$digest();
//		
//		expect(angular.isDefined(scope.wbModel.style.maring)).toBe(false);
//		expect(angular.isDefined(scope.wbModel.style.padding)).toBe(false);
//		
//		var wbModelNew = {
//		    name: 'New model',
//		    style:{}
//		};
//		var wbModel = scope.wbModel;
//		scope.wbModel = wbModelNew;
//		
//		scope.$digest();
//		expect(angular.isDefined(wbModel.style.maring)).toBe(false);
//		expect(angular.isDefined(wbModel.style.padding)).toBe(false);
//		
//		expect(angular.isDefined(scope.wbModel.style.maring)).toBe(false);
//		expect(angular.isDefined(scope.wbModel.style.padding)).toBe(false);
//	});
//	
//	it('should set correct value to margins and paddings', function () {
//		var page = $settings.getPage('marginPadding');
//		var scope = $rootScope.$new();
//		scope.wbModel = {
//		    style:{
//			margin: '10px',
//			padding: '5px'
//		    }
//		};
//		var ctrl = {};
//		
//		// TODO: check if the controller is a function
//		$injector.invoke(page.controller, ctrl, {
//		    '$scope': scope
//		});
//		scope.$digest();
//		
//		expect(angular.isDefined(scope.wbModel.style.margin)).toBe(true);
//		expect(angular.isDefined(scope.wbModel.style.padding)).toBe(true);
//		
//		expect(angular.isDefined(scope.marginAll)).toBe(true);
//		expect(angular.isDefined(scope.margin)).toBe(true);
//		expect(scope.marginAll).toBe('10px');
//		expect(scope.margin).toEqual({
//		    top: '10px',
//		    right: '10px',
//		    bottom: '10px',
//		    left: '10px'
//		});
//		
//		expect(angular.isDefined(scope.paddingAll)).toBe(true);
//		expect(angular.isDefined(scope.padding)).toBe(true);
//		expect(scope.paddingAll).toBe('5px');
//		expect(scope.padding).toEqual({
//		    top: '5px',
//		    right: '5px',
//		    bottom: '5px',
//		    left: '5px'
//		});
//		
//		ctrl.updateAllMargin('20%');
//		expect(scope.margin).toEqual({
//		    top: '20%',
//		    right: '20%',
//		    bottom: '20%',
//		    left: '20%'
//		});
//		expect(scope.wbModel.style.margin).toBe('20% 20% 20% 20%');
//		
//		ctrl.updateAllPadding('30%');
//		expect(scope.padding).toEqual({
//		    top: '30%',
//		    right: '30%',
//		    bottom: '30%',
//		    left: '30%'
//		});
//		expect(scope.wbModel.style.padding).toBe('30% 30% 30% 30%');
//		
//		ctrl.updateMargin({
//		    top: '10px',
//		    right: '2vh',
//		    bottom: 'auto',
//		    left: 'inherit'
//		});
//		expect(scope.wbModel.style.margin).toBe('10px 2vh auto inherit');
//		
//		ctrl.updatePadding({
//		    top: '10px',
//		    right: '2vh',
//		    bottom: 'auto',
//		    left: 'inherit'
//		});
//		expect(scope.wbModel.style.padding).toBe('10px 2vh auto inherit');
//		
//		var wbModelNew = {
//		    style:{}
//		};
//		var wbModel = scope.wbModel;
//		scope.wbModel = wbModelNew;
//		
//		scope.$digest();
//		expect(wbModel.style.margin).toBe('10px 2vh auto inherit');
//		expect(wbModel.style.padding).toBe('10px 2vh auto inherit');
//		
//		expect(angular.isDefined(scope.wbModel.style.margin)).toBe(false);
//		expect(angular.isDefined(scope.wbModel.style.padding)).toBe(false);
//	});
//});
