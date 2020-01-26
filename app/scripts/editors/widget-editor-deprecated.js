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
 * @name WidgetEditorFake
 * @description Editor of a widget
 * 
 */

.factory('WidgetEditorDeprecated', function ($window, WidgetEditor) {

    /**
     * TODO: maso, 2019: extends WidgetEditorFake
     * 
     * Creates new instace of an editor
     */
    function Editor(widget, options) {
        options = options || {};
        WidgetEditor.apply(this, [widget, options]);
    }
    Editor.prototype = Object.create(WidgetEditor.prototype);


    Editor.prototype.setActive = function(){}; 
    Editor.prototype.isActive = function(){};
    Editor.prototype.save = function(){};
    Editor.prototype.hide = function(){};
    Editor.prototype.show = function(){
        $window.alert('This widget type is deprecated. This will be removed in the next major version.');
    };
    Editor.prototype.isHidden = function(){};

//  the editor type
    return Editor;
});
