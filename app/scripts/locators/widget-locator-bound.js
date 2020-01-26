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


angular.module('am-wb-core')//

/**
 * @ngdoc Factories
 * @name BoundWidgetLocator
 * @description Locates a widget bound
 * 
 */
.factory('BoundWidgetLocator', function (AbstractWidgetLocator) {

    var boundWidgetLocator = function (options) {
        options = options || {};
        AbstractWidgetLocator.apply(this, options);

        // set anchor
        this.setAnchor(options.anchor);

        // load templates
        var template = options.template || '<div class="wb-widget-locator bound wb-layer-editor-locator"></div>';

        // load elements
        this.topElement = angular.element(template);
        this.topElement.attr('id', 'top');

        this.rightElement = angular.element(template);
        this.rightElement.attr('id', 'right');

        this.buttomElement = angular.element(template);
        this.buttomElement.attr('id', 'buttom');

        this.leftElement = angular.element(template);
        this.leftElement.attr('id', 'left');

        // init controller
        this.setElements([this.topElement, this.rightElement,
            this.buttomElement, this.leftElement]);
    };
    boundWidgetLocator.prototype = new AbstractWidgetLocator();

    boundWidgetLocator.prototype.updateView = function () {
        var widget = this.getWidget();
        var bound = widget.getBoundingClientRect();
        var space = 2;
        this.topElement.css({
            top: bound.top + space,
            left: bound.left + space,
            width: bound.width - 2*space
        });
        this.rightElement.css({
            top: bound.top + space,
            left: bound.left + bound.width - 2*space,
            height: bound.height - 2*space
        });
        this.buttomElement.css({
            top: bound.top + bound.height - space,
            left: bound.left + space,
            width: bound.width - 2*space
        });
        this.leftElement.css({
            top: bound.top + space,
            left: bound.left + space,
            height: bound.height - 2*space
        });

    };
    return boundWidgetLocator;
});
