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
//describe('Setting layout', function () {
//    // instantiate service
//    var $settings;
//    var $rootScope;
//    var $injector;
//
//
//    // load the service's module
//    beforeEach(module('am-wb-core'));
//    beforeEach(inject(function (_$settings_, _$rootScope_, _$injector_) {
//        $settings = _$settings_;
//        $rootScope = _$rootScope_;
//        $injector = _$injector_;
//    }));
//
//    it('should not change original model', function () {
//        var page = $settings.getPage('layout');
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
//        scope.wbWidget = {
//                getParent: function(){
//                    return null;
//                }
//        }
//        scope.$digest();
//        expect(angular.isDefined(scope.wbModel.style.layout)).toBe(false);
//
//
//        /*
//         * When the model is changed to the new one, old model shouldn't have changed.
//         * Also, the new model(in this case) shouldn't have layout property
//         */ 
//        var wbModelNew = {
//                style:{}
//        };
//        var wbModel = scope.wbModel;
//        scope.wbModel = wbModelNew;
//        scope.$digest();
//
//        expect(angular.isDefined(wbModel.style.layout)).toBe(false);
//        expect(angular.isDefined(scope.wbModel.style.layout)).toBe(false);
//
//
//        /*
//         * When the model is changed to the new one, old model shouldn't have changed.
//         * Also, the new model(based on the new model) should have new properties.
//         */
//        var wbModelNew1 = {
//                style:{
//                    layout: {
//                        align: 'stretch',
//                        wrap: 'true',
//                        align_self: 'stretch',
//                        direction: 'column',
//                        justify: 'start'
//                    }
//                }
//        };
//        wbModel = scope.wbModel;
//        scope.wbModel = wbModelNew1;
//        scope.$digest();
//
//        expect(angular.isDefined(wbModel.style.layout)).toBe(false);
//        expect(angular.isDefined(scope.wbModel.style.layout)).toBe(true);
//        expect(ctrl.align).toBe('stretch');
//        expect(ctrl.wrap).toBe('true');
//        expect(angular.isDefined(ctrl.alignSelf)).toBe(false);
//        expect(angular.isDefined(ctrl.alignSelf)).toBe(false);
//        expect(ctrl.direction).toBe('column');
//        expect(ctrl.justify).toBe('start');
//
//
//        /*
//         * When the model is changed to the new one, old model shouldn't have changed.
//         * Also, the new model(based on the new model) should have new properties.
//         */
//        var wbModelNew2 = {
//                style:{
//                    layout: {
//                        align: 'center',
//                        wrap: 'false',
//                        align_self: 'center',
//                        direction: 'row',
//                        justify: 'end'
//                    }
//                }
//        };
//        wbModel = scope.wbModel;
//        scope.wbModel = wbModelNew2;
//        scope.$digest();
//
//        expect(angular.isDefined(wbModel.style.layout)).toBe(true);
//        expect(wbModel.style.layout.align).toBe('stretch');
//        expect(wbModel.style.layout.wrap).toBe('true');
//        expect(wbModel.style.layout.align_self).toBe('stretch');
//        expect(wbModel.style.layout.direction).toBe('column');
//        expect(wbModel.style.layout.justify).toBe('start');
//
//        expect(angular.isDefined(scope.wbModel.style.layout)).toBe(true);
//        expect(ctrl.align).toBe('center');
//        expect(ctrl.wrap).toBe('false');
//	expect(angular.isDefined(ctrl.alignSelf)).toBe(false);
//        expect(ctrl.direction).toBe('row');
//        expect(ctrl.justify).toBe('end');
//
//
//    });
//});