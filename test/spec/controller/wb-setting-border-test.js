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
//describe('Setting border', function () {
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
//
//    it('should not change original model', function () {
//
//        var page = $settings.getPage('border');
//        var scope = $rootScope.$new();
//        var ctrl = {};
//        $injector.invoke(page.controller, ctrl, {
//            '$scope': scope
//        });
//        scope.wbModel = {
//                style: {}
//        };
//        scope.$digest();
//        expect(angular.isDefined(scope.wbModel.style.border)).toBe(false);
//
//        scope.$destroy();
//        ctrl = null;
//        page = null;
//    });
//
//    fit('should not change old model when the model is changed to the new one, and set correct values to the new model.', function () {
//
//        var page = $settings.getPage('border');
//        var scope = $rootScope.$new();
//        var ctrl = {};
//        $injector.invoke(page.controller, ctrl, {
//            '$scope': scope
//        });
//        scope.wbModel = {
//                style: {}
//        };
//        var wbModelNew = {
//                style: {
//                    border: {
//                        style: 'solid',
//                        color: '#26ea5e',
//                        width: '3px',
//                        radius: '20px'
//                    }
//                }
//        };
//        var wbModel = scope.wbModel;
//        scope.wbModel = wbModelNew;
//        scope.$digest();
//
//        expect(angular.isDefined(wbModel.style.border)).toBe(false);
//
//        expect(angular.isDefined(scope.wbModel.style.border)).toBe(true);
//        expect(ctrl.style).toBe('solid');
//        expect(ctrl.color).toBe('#26ea5e');
//        expect(ctrl.widthAll).toBe('3px');
//        expect(ctrl.width).toEqual({
//            top: '3px',
//            right: '3px',
//            bottom: '3px',
//            left: '3px'
//        });
//        expect(ctrl.radiusAll).toBe('20px');
//        expect(ctrl.radius).toEqual({
//            topLeft: '20px',
//            topRight: '20px',
//            bottomLeft: '20px',
//            bottomRight: '20px'
//        });
//
//        scope.$destroy();
//        ctrl = null;
//        wbModel = null;
//        wbModelNew = null;
//        page = null;
//    });
//
//    it('should set correct values to the new model if the items in width and radius are 1 || 2 || 3 || 4.', function () {
//
//        var page = $settings.getPage('border');
//        var scope = $rootScope.$new();
//        var ctrl = {};
//        $injector.invoke(page.controller, ctrl, {
//            '$scope': scope
//        });
//
//        scope.wbModel = {
//                style: {
//                    border: {
//                        style: 'solid',
//                        color: '#26ea5e',
//                        width: '3px 5px',
//                        radius: '10px 20px 30px'
//                    }
//                }
//        };
//        scope.$digest();
//
//        expect(angular.isDefined(scope.wbModel.style.border)).toBe(true);
//        expect(ctrl.width).toEqual({
//            top: '3px',
//            bottom: '3px',
//            right: '5px',
//            left: '5px'
//        });
//        expect(ctrl.radius).toEqual({
//            topLeft: '10px',
//            topRight: '20px',
//            bottomLeft: '20px',
//            bottomRight: '30px'
//        });
//
//        scope.$destroy();
//        ctrl = null;
//        page = null;
//    });
//
//    it('should not change the main model except in the changed field (for width & radius)', function () {
//
//        var page = $settings.getPage('border');
//
//        //width section
//        var scope = $rootScope.$new();
//        var ctrl = {};
//        $injector.invoke(page.controller, ctrl, {
//            '$scope': scope
//        });
//
//        scope.wbModel = {
//                style: {
//                    border: {
//                        style: 'solid',
//                        color: '#26ea5e',
//                        width: '5px 3px 3px 5px',
//                        radius: '10px 20px 30px'
//                    }
//                }
//        };
//        ctrl.width = {};
//        ctrl.radius = {};
//
//        scope.$digest();
//        ctrl.width.top = '10px';
//        ctrl.widthChanged();
//        expect(scope.wbModel.style.border.width).toBe('10px 3px 3px 5px');
//
//        //radius section
//        ctrl.radius.topLeft = '50px';
//        ctrl.radiusChanged();
//        expect(scope.wbModel.style.border.radius).toBe('50px 20px 30px 20px');
//
//        scope.$destroy();
//        ctrl = null;
//        page = null;
//    });
//});