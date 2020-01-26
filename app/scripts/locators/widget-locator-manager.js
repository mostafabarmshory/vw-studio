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

angular
.module('am-wb-core')


/**
 * @ngdoc Factories
 * @name CursorWidgetLocator
 * @description Manages list of locators
 * 
 * 
 * There are two type of widgets locator: selection and bound.
 * 
 * For each widget a bound locator will be created.
 * 
 * For each item in selection a selection locator will be created.
 */
.factory('WidgetLocatorManager',function ($widget, BoundWidgetLocator, SelectionWidgetLocator) {

    /**
     * Creates new instance of the manager
     * 
     * @memberof CursorWidgetLocator
     */
    function WidgetLocatorManager(options) {
        var ctrl = this;
        options = options || {};

        this.boundLocatorMap = new Map();
        this.boundLocatorTrash = [];

        this.selectionLocatorMap = new Map();
        this.selectionLocatorTrash = [];


        // selection options
        this.selectionLocatorOption = options.selectionLocatorOption || {};
        this.selectionEnable = true;
        if (angular.isDefined(options.selectionEnable)) {
            this.selectionEnable = options.selectionEnable;
        }

        // bound options
        this.boundLocatorOption = options.boundLocatorOption || {};
        this.boundEnable = true;
        if (angular.isDefined(options.boundEnable)) {
            this.boundEnable = options.boundEnable;
        }

        this.widgetListeners = {
                'select': function($event){
                    ctrl.widgetSelectionChanged($event.source);
                },
                'unselect': function($event){
                    ctrl.widgetSelectionChanged($event.source);
                },
                'delete': function($event) {
                    ctrl.untrackWidget($event.source);
                },
                'newchild': function($event) {
                    _.forEach($event.widgets, function(widget){
                        ctrl.trackWidget(widget);
                    });
                },
                'loaded': function($event){
                    ctrl.disconnect();
                    ctrl.rootWidget = null;
                    ctrl.setRootWidget($event.source);
                },
        };
        this.rootListeners = {
                'newchild': function($event) {
                    _.forEach($event.widgets, function(widget){
                        ctrl.trackWidget(widget);
                    });
                },
                'loaded': function($event){
                    ctrl.disconnect();
                    ctrl.rootWidget = null;
                    ctrl.setRootWidget($event.source);
                },
        };
    }


    WidgetLocatorManager.prototype.untrackWidget = function(widget){
        // events
        var listener = widget.isRoot() ? this.rootListeners : this.widgetListeners;
        angular.forEach(listener, function (callback, type) {
            widget.off(type, callback);
        });
        this.removeBoundLocator(widget);
        this.removeSelectionLocator(widget);
    };

    WidgetLocatorManager.prototype.trackWidget = function(widget){
        // add events
        var listener = widget.isRoot() ? this.rootListeners : this.widgetListeners;
        angular.forEach(listener, function (callback, type) {
            widget.on(type, callback);
        });
        if(widget.isRoot()){
            return;
        }
        this.createBoundLocator(widget);
        if(widget.isSelected()){
            this.createSelectionLocator(widget);
        }
    };

    WidgetLocatorManager.prototype.disconnect = function(){
        var rootWidget = this.getRootWidget();
        if(!rootWidget) {
            return;
        }
        // Widgets
        var widgets = $widget.getChildren(rootWidget);
        this.untrackWidget(rootWidget);
        var ctrl = this;
        _.forEach(widgets, function(widget){
            ctrl.untrackWidget(widget);
        });
        // interval
        if(this._intervalCheck){
            clearInterval(this._intervalCheck);
            delete this._intervalCheck;
        }
    };

    WidgetLocatorManager.prototype.connect = function(){
        var rootWidget = this.getRootWidget();
        if(!rootWidget){
            return;
        }
        var ctrl = this;

        // widgets
        var widgets = $widget.getChildren(rootWidget);
        this.trackWidget(rootWidget);
        _.forEach(widgets, function(widget){
            ctrl.trackWidget(widget);
        });

        // interval
        if(!this._intervalCheck){
            this._intervalCheck = setInterval(function(){
                ctrl.updateLocators();
            }, 300);
        }
    };

    WidgetLocatorManager.prototype.setEnable = function (enable) {
        if (this.enable === enable) {
            return;
        }
        this.enable = enable;
        if(this.enable){
            this.connect();
        } else {
            this.disconnect();
        }
    };

    WidgetLocatorManager.prototype.isEnable = function () {
        return this.enable;
    };

    /**
     * Sets the root widget
     * 
     * @param rootWidget
     *            {WbAbstractWidget} root widget
     * @memberof WidgetLocatorManager
     */
    WidgetLocatorManager.prototype.setRootWidget = function (rootWidget) {
        if(this.rootWidget === rootWidget) {
            return;
        }
        var enable = this.isEnable();
        this.setEnable(false);
        this.rootWidget = rootWidget;
        this.setEnable(enable);
    };

    /**
     * Gets the root widget
     * 
     * @return the root widget
     * @memberof WidgetLocatorManager
     */
    WidgetLocatorManager.prototype.getRootWidget = function () {
        return this.rootWidget;
    };


    /**
     * Update all locators
     * 
     * @memberof WidgetLocatorManager
     */
    WidgetLocatorManager.prototype.updateLocators = function () {
        function handleWidget(bound, widget){
            if(widget.isIntersecting()){
                bound.connect(widget);
            } else {
                bound.disconnect();
            }
        }
        // locator
        this.boundLocatorMap.forEach(handleWidget);
        // selector
        this.selectionLocatorMap.forEach(handleWidget);
    };


    /**********************************************************
     * Selection
     */
    WidgetLocatorManager.prototype.hasBoundLocator = function(widget){
        return this.boundLocatorMap.has(widget);
    };

    WidgetLocatorManager.prototype.getBoundLocator = function(widget){
        return this.boundLocatorMap.get(widget);
    };

    WidgetLocatorManager.prototype.createBoundLocator = function(widget){
        var map = this.boundLocatorMap;
        if(!map.has(widget)) {
            var locator;
            if(this.boundLocatorTrash.length > 0){
                locator = this.boundLocatorTrash.pop();
            } else {
                locator = new BoundWidgetLocator(this.boundLocatorOption);
            }
            map.set(widget, locator);
        }
        return map.get(widget);
    };

    WidgetLocatorManager.prototype.removeBoundLocator = function(widget){
        if(!this.hasBoundLocator(widget)){
            return;
        }
        var locator = this.getBoundLocator(widget);
        locator.disconnect();
        this.boundLocatorMap.delete(widget);
        this.boundLocatorTrash.push(locator);
    };

    /**********************************************************
     * Selection
     */
    /**
     * Sets widgets which are selected
     * 
     */
    WidgetLocatorManager.prototype.widgetSelectionChanged = function (widgets) {
        if(!this.isEnable()){
            return;
        }
        if(!angular.isArray(widgets)){
            widgets = [widgets];
        }
        var ctrl = this;
        _.forEach(widgets, function(widget){
            if(widget.isSelected()){
                ctrl.createSelectionLocator(widget);
            } else {
                ctrl.removeSelectionLocator(widget);
            }
        });
    };

    WidgetLocatorManager.prototype.removeSelectionLocator = function(widget) {
        var map = this.selectionLocatorMap;
        if(map.has(widget)) {
            var locator = this.getSelectionLocator(widget);
            this.selectionLocatorTrash.push(locator);
            this.selectionLocatorMap.delete(widget);
            locator.disconnect();
        }
    };

    WidgetLocatorManager.prototype.createSelectionLocator = function(widget) {
        var map = this.selectionLocatorMap;
        if(!map.has(widget)) {
            var locator;
            if(this.selectionLocatorTrash.length > 0){
                locator = this.selectionLocatorTrash.pop();
            } else {
                locator = new SelectionWidgetLocator(this.selectionLocatorOption);
            }
            map.set(widget, locator);
        }
        return map.get(widget);
    };

    WidgetLocatorManager.prototype.getSelectionLocator = function(widget) {
        var map = this.selectionLocatorMap;
        return map.get(widget);
    };

    WidgetLocatorManager.prototype.hasSelectionLocator = function(widget){
        return this.selectionLocatorMap.has(widget);
    };


    return WidgetLocatorManager;
});