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
//describe('Setting margin/padding', function () {
//    // instantiate service
//    var $settings;
//    var $rootScope;
//    var $injector;
//
//
//    // load the service's module
//    beforeEach(module('vwStudio'));
//    beforeEach(inject(function (_$settings_, _$rootScope_, _$injector_) {
//        $settings = _$settings_;
//        $rootScope = _$rootScope_;
//        $injector = _$injector_;
//    }));
//
//    it('should not change original empty model', function () {
//        var page = $settings.getPage('marginPadding');
//        var scope = $rootScope.$new();
//        var ctrl = {};
//
//        // TODO: check if the controller is a function
//        $injector.invoke(page.controller, ctrl, {
//            '$scope': scope
//        });
//
//        // scope.wbModel shouldn't have layout property
//        scope.wbModel = {
//                style:{}
//        };
//        scope.$digest();
//        expect(angular.isDefined(scope.wbModel.style.margin)).toBe(false);
//        expect(angular.isDefined(scope.wbModel.style.padding)).toBe(false);
//    });
//
//    it('should not change old empty model on the model switching', function(){
//        var page = $settings.getPage('marginPadding');
//        var scope = $rootScope.$new();
//        var ctrl = {};
//
//        // TODO: check if the controller is a function
//        $injector.invoke(page.controller, ctrl, {
//            '$scope': scope
//        });
//
//        // scope.wbModel shouldn't have layout property
//        scope.wbModel = {
//                style:{}
//        };
//        scope.$digest();
//        var wbModelNew = {
//                style:{}
//        };
//        var wbModel = scope.wbModel;
//        scope.wbModel = wbModelNew;
//        scope.$digest();
//
//        expect(angular.isDefined(wbModel.style.margin)).toBe(false);
//        expect(angular.isDefined(wbModel.style.padding)).toBe(false);
//        expect(angular.isDefined(scope.wbModel.style.margin)).toBe(false);
//        expect(angular.isDefined(scope.wbModel.style.padding)).toBe(false);
//    });
//
//    it('should not change original non empty model on loading', function(){
//        var page = $settings.getPage('marginPadding');
//        var scope = $rootScope.$new();
//        var ctrl = {};
//
//        // TODO: check if the controller is a function
//        $injector.invoke(page.controller, ctrl, {
//            '$scope': scope
//        });
//        scope.wbModel = {
//                style:{
//                    margin: '10px',
//                    padding: '20px 10% 4px 8%'
//                }
//        };
//        scope.$digest();
//        expect(scope.wbModel.style.margin).toBe('10px');
//        expect(scope.wbModel.style.padding).toBe('20px 10% 4px 8%');
//    });
//    
//    
//    it('should set all margin with the same value on function call', function(){
//        var page = $settings.getPage('marginPadding');
//        var scope = $rootScope.$new();
//        var ctrl = {};
//
//        // TODO: check if the controller is a function
//        $injector.invoke(page.controller, ctrl, {
//            '$scope': scope
//        });
//
//        scope.wbModel = {
//                style:{
//                    margin: '10px 98vh 6% 5em',
//                    padding: '20px 10% 4px 8%'
//                }
//        };
//        scope.$digest();
//        ctrl.updateAllMargin('3px');
//        expect(scope.wbModel.style.margin).toBe('3px 3px 3px 3px');
//    });
//    
//});