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

describe('Service $window ', function () {

    var $window;
    var $rootScope;


    // load the service's module
    beforeEach(module('vwStudio'));

    // instantiate service
    beforeEach(inject(function ( _$window_, _$rootScope_) {
        $window = _$window_;
        $rootScope = _$rootScope_;
    }));

//    it(' parent is the $window parent', function () {
//        expect($window.getParent()).toBe($window.parent);
//    });
//
//    it(' all widgets must have a window', function () {
//        // create default window
//        var title = 'new title:' + Math.random();
//        $window.setTitle(title);
//        expect($window.getTitle()).toBe(title);
//        expect($window.document.title).toBe(title);
//    });
//
//    it(' must be able to change language of the page', function () {
//        // create default window
//        var language = 'lang-' + Math.random();
//        $window.setLanguage(language);
//        // Not works in test mode
////        expect($window.getLanguage()).toBe(language);
//    });
//    
//    it(' must open internal window', function () {
//        // create default window
//        var window = $window.open('', 'name', {
//            internal: true,
//        }, false);
//        expect(angular.isDefined(window)).toBe(true);
//        
//        // window is common window manager
//        expect(angular.isFunction(window.setTitle)).toBe(true);
//        expect(angular.isFunction(window.getTitle)).toBe(true);
//        
//        expect(angular.isFunction(window.setLanguage)).toBe(true);
//        expect(angular.isFunction(window.getLanguage)).toBe(true);
//        
//        expect(angular.isFunction(window.open)).toBe(true);
//        expect(angular.isFunction(window.close)).toBe(true);
//        expect(angular.isFunction(window.setVisible)).toBe(true);
//        expect(angular.isFunction(window.isVisible)).toBe(true);
//        
//        expect(angular.isFunction(window.loadLibrary)).toBe(true);
//        expect(angular.isFunction(window.isLibraryLoaded)).toBe(true);
//        
//        expect(angular.isFunction(window.setLink)).toBe(true);
//        expect(angular.isFunction(window.setMeta)).toBe(true);
//        
//        expect(angular.isFunction(window.setWidth)).toBe(true);
//        expect(angular.isFunction(window.getWidth)).toBe(true);
//        
//        expect(angular.isFunction(window.setHeight)).toBe(true);
//        expect(angular.isFunction(window.getHeight)).toBe(true);
//    });
    
    it('must load library', function(done){
        var path = 'path/to/library';
        $window.loadLibrary(path)
        .then(function(){
            done();
        }, function(){
            done();
        });
        $rootScope.$digest();
    });
    
    it('must set meat', function(){
        var key = 'key';
        var value = 'value:' + Math.random();
        
        $window.setMeta(key, value);
        $window.setMeta(key, value);
    });

    it('must remove meat', function(){
        var key = 'key';
        var value = 'value:' + Math.random();
        
        $window.setMeta(key, value);
        expect($window.getMeta(key)).toBe(value);
        $window.setMeta(key);
        expect($window.getMeta(key)).toBe(undefined);
    });
    
    it('must set link', function(){
        var key = 'key';
        var data = {
               value: 'value'
        };
        
        $window.setLink(key, data);
        $window.setLink(key, data);
    });

    
});
