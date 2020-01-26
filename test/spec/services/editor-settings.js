/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use strict';

describe('Service $settings', function () {
    // instantiate service
    var $rootScope;
    var $widget;
    var $httpBackend;
    var $timeout;
    var $settings;

    // load the service's module
    beforeEach(module('am-wb-core'));

    // instantiate service
    beforeEach(inject(function (_$rootScope_, _$widget_, _$httpBackend_, _$settings_,
            _$timeout_) {
        $rootScope = _$rootScope_;
        $widget = _$widget_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
        $settings = _$settings_;
    }));

    /**************************************************************************************
     *  Providers
     * 
     * Default providers:
     * 
     **************************************************************************************/
    it('should support pages api ', function () {
        expect(_.isFunction($settings.getSettingsFor)).toBe(true);
        expect(_.isFunction($settings.setPage)).toBe(true);
        expect(_.isFunction($settings.addPage)).toBe(true);
        expect(_.isFunction($settings.removePage)).toBe(true);
        expect(_.isFunction($settings.getPage)).toBe(true);
        expect(_.isFunction($settings.getPages)).toBe(true);
    });
    
    it('should support getSettingsFor api ', function () {
        var pages = $settings.getSettingsFor({
            type: 'a'
        });
        expect(pages.length > 0).toBe(true);
    });
    
    it('should support default style pages  ', function () {
        expect(_.isUndefined($settings.getPage('style.annimation'))).toBe(false);
        expect(_.isUndefined($settings.getPage('style.background'))).toBe(false);
        expect(_.isUndefined($settings.getPage('style.boarder'))).toBe(false);
        expect(_.isUndefined($settings.getPage('style.general'))).toBe(false);
        expect(_.isUndefined($settings.getPage('style.layout'))).toBe(false);
        expect(_.isUndefined($settings.getPage('style.media'))).toBe(false);
        expect(_.isUndefined($settings.getPage('style.size'))).toBe(false);
        expect(_.isUndefined($settings.getPage('style.text'))).toBe(false);
    });
    
    it('should support microdata pages  ', function () {
        expect(_.isUndefined($settings.getPage('microdata'))).toBe(false);
    });
    
    it('should check targets', function () {
        var apages = $settings.getSettingsFor({
            type: 'a'
        });
        var aapages = $settings.getSettingsFor({
            type: 'aa'
        });

        var divpages = $settings.getSettingsFor({
            type: 'div'
        });
        
        $settings.addPage({
            type: 'xxx',
            label: 'Image',
            description: 'Manage image widget settings.',
            icon: 'settings',
            templateUrl: 'views/settings/wb-img.html',
            controllerAs: 'ctrl',
            controller: 'MbSettingImgCtrl',
            targets: ['a+']
        });
        
        // test if is catch
        var apages2 = $settings.getSettingsFor({
            type: 'a'
        });
        apages2 = $settings.getSettingsFor({
            type: 'a'
        });
        var aapages2 = $settings.getSettingsFor({
            type: 'aa'
        });
        var divpages2 = $settings.getSettingsFor({
            type: 'div'
        });
        
        expect(apages.length).toBe(apages2.length - 1);
        expect(aapages.length).toBe(aapages2.length - 1);
        expect(divpages.length).toBe(divpages2.length);
    });
    
    
});
