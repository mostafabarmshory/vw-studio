/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
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
'use strict';

describe('WbWidget locator manager ', function () {
    // instantiate service
    var $rootScope;
    var $widget;
    var WidgetLocatorManager;


    // load the service's module
    beforeEach(module('am-wb-core'));
    beforeEach(inject(function (_$rootScope_, _$widget_, _WidgetLocatorManager_) {
        $rootScope = _$rootScope_;
        $widget = _$widget_;
        WidgetLocatorManager = _WidgetLocatorManager_;
    }));

    it('should add location bound for children', function (done) {
        var model = {
                type: 'div',
                children: [{
                    type: 'p',
                    html: 'child'
                },{
                    type: 'p',
                    html: 'child'
                },{
                    type: 'p',
                    html: 'child'
                }]
        };
        $widget.compile(model)
        .then(function(widget){
            var manager = new WidgetLocatorManager({
                selectionEnable: false,
                selectionLocatorOption:{},
                boundEnable: true
            });
            manager.setRootWidget(widget);
            manager.setEnable(true);

            var w1 = widget.getChildren()[0];
            var bound = manager.getBoundLocator(w1);
            expect(bound).not.toBe(null);

            done();
        });
        $rootScope.$apply();
    });

    it('should update locators', function (done) {
        var model = {
                type: 'div',
                children: [{
                    type: 'p',
                    html: 'child'
                },{
                    type: 'p',
                    html: 'child'
                },{
                    type: 'p',
                    html: 'child'
                }]
        };
        $widget.compile(model)
        .then(function(widget){
            var manager = new WidgetLocatorManager({
                selectionEnable: false,
                selectionLocatorOption:{},
                boundEnable: true
            });
            manager.setRootWidget(widget);
            manager.setEnable(true);
            manager.updateLocators();
            done();
        });
        $rootScope.$apply();
    });
    
    it('should add selector for selected widget', function (done) {
        var model = {
                type: 'div',
                children: [{
                    type: 'p',
                    html: 'child'
                },{
                    type: 'p',
                    html: 'child'
                },{
                    type: 'p',
                    html: 'child'
                }]
        };
        $widget.compile(model)
        .then(function(widget){
            var manager = new WidgetLocatorManager({
                selectionEnable: false,
                selectionLocatorOption:{},
                boundEnable: true
            });
            manager.setRootWidget(widget);
            manager.setEnable(true);
            
            var w1 = widget.getChildren()[0];
            w1.setSelected(true);
            expect(manager.hasSelectionLocator(w1)).toBe(true);
            
            w1.setSelected(false);
            expect(manager.hasSelectionLocator(w1)).toBe(false);
            
            done();
        });
        $rootScope.$apply();
    });
    

    it('should unselect deleted widget', function (done) {
        var model = {
                type: 'div',
                children: [{
                    type: 'p',
                    html: 'child'
                },{
                    type: 'p',
                    html: 'child'
                },{
                    type: 'p',
                    html: 'child'
                }]
        };
        $widget.compile(model)
        .then(function(widget){
            var manager = new WidgetLocatorManager({
                selectionEnable: false,
                selectionLocatorOption:{},
                boundEnable: true
            });
            manager.setRootWidget(widget);
            manager.setEnable(true);

            var w1 = widget.getChildren()[0];
            expect(manager.hasBoundLocator(w1)).toBe(true);
            w1.setSelected(true);
            expect(manager.hasSelectionLocator(w1)).toBe(true);

            w1.delete();
            expect(manager.hasSelectionLocator(w1)).toBe(false);

            done();
        });
        $rootScope.$apply();
    });
    
    it('should add locator for new child', function (done) {
        var model = {
                type: 'div',
        };
        var manager = new WidgetLocatorManager();
        manager.setEnable(true);

        $widget.compile(model)
        .then(function(widget){
            manager.setRootWidget(widget);
            return widget.addChildModel(0, {
                type: 'p',
                html: 'hi'
            });
        })
        .then(function(child){
            expect(manager.hasBoundLocator(child)).toBe(true);
            
            child.setSelected(true);
            expect(manager.hasSelectionLocator(child)).toBe(true);
            done();
        });
        $rootScope.$apply();
    });
    
    it('should add locator for new model', function (done) {
        var model = {
                type: 'div',
        };
        var manager = new WidgetLocatorManager();
        manager.setEnable(true);
        
        $widget.compile(model)
        .then(function(widget){
            manager.setRootWidget(widget);
            return widget.setModel({
                type:'div',
                children: [{
                    type: 'p'
                }]
            })
            .then(function(){
                var child = widget.getChildren()[0];
                expect(manager.hasBoundLocator(child)).toBe(true);
                
                child.setSelected(true);
                expect(manager.hasSelectionLocator(child)).toBe(true);
                done();
            });
        });
        $rootScope.$apply();
    });
});
