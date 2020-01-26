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

angular.module('vwStudio')//

/**
 * @ngdoc Factories
 * @name AbstractWidgetLocator
 * @description Locates a widget on the view
 * 
 * It is used to display extra information about a widget on the screen. For
 * example it is used to show widget actions on the fly.
 * 
 */
.factory('AbstractWidgetLocator', function () {

    /**
     * Creates new instance of the widget locator
     * 
     * @memberof AbstractWidgetLocator
     */
    function Locator() {
        this.callbacks = [];
        this.elements = [];
        this.observedWidgets = [];

        // Creates listeners
        var ctrl = this;
        this.widgetListeners = {
                'select' : function (/*$event*/) {
                    ctrl.addClass('selected');
                    ctrl.removeClass('mouseover');
                },
                'unselect' : function (/*$event*/) {
                    ctrl.removeClass('selected');
                    if (ctrl.mouseover) {
                        ctrl.addClass('mouseover');
                    }
                },
                'mouseover' : function (/*$event*/) {
                    ctrl.addClass('mouseover');
                    ctrl.mouseover = true;
                },
                'mouseout' : function (/*$event*/) {
                    ctrl.removeClass('mouseover');
                    ctrl.mouseover = false;
                },
        };
    }

    /**
     * Defines anchor 
     */
    Locator.prototype.setAnchor = function (anchor) {
        this.anchor = anchor;
    };

    /**
     * Update the view
     */
    Locator.prototype.setAnchor = function (anchor) {
        this.anchor = anchor;
    };

    Locator.prototype.getAnchor = function (/*auncher*/) {
        // find custom anchor
//        if(this.anchor){
//            if(angular.isFunction(this.anchor)){
//                return this.anchor();
//            }
//            if(angular.isString(this.anchor)){
//                var list = $rootElement.find(this.anchor);
//                if(list){
//                    return list[0];
//                }
//            }
//        }
//        // find parent
        var widget = this.getWidget();
//        if(widget && widget.getParent()){
//            return widget.getParent().getElement();
//        }
        // return root
//        return $rootElement;
      return widget.getRoot().getElement();
    };


    /**
     * Sets new widget
     */
    Locator.prototype.setWidget = function (widget) {
        this.widget = widget;
    };

    Locator.prototype.getWidget = function () {
        return this.widget;
    };

    Locator.prototype.setElements = function (elements) {
        this.elements = elements;
    };

    Locator.prototype.getElements = function () {
        return this.elements;
    };

    Locator.prototype.addClass = function (value) {
        var elements = this.getElements();
        for (var i = 0; i < elements.length; i++) {
            elements[i].addClass(value);
        }
    };

    Locator.prototype.removeClass = function (value) {
        var elements = this.getElements();
        for (var i = 0; i < elements.length; i++) {
            elements[i].removeClass(value);
        }
    };

    /**
     * Remove connection the the current widget
     */
    Locator.prototype.disconnect = function () {
        this.connect(null);
        this.connected = false;
    };

    Locator.prototype.connect = function (widget) {
        this.connected = true;
        if (this.widget !==  widget) {
            var elements = this.getElements();
            if(this.widget){
                var oldWidget = this.widget;
                angular.forEach(this.widgetListeners, function (listener, type) {
                    oldWidget.off(type, listener);
                });
                for (var i = 0; i < elements.length; i++) {
                    elements[i].detach();
                }
            }
            this.setWidget(widget);
            if(widget){
                angular.forEach(this.widgetListeners, function (listener, type) {
                    widget.on(type, listener);
                });
                var anchor = this.getAnchor();
                angular.forEach(elements, function (element) {
                    anchor.append(element);
                });
            }
        }
        if(this.getWidget()){
            this.updateView();
        }
    };


    Locator.prototype.isConnected = function () {
        return this.connected;
    };

    return Locator;
});
