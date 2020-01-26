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
 * @name WidgetEditorFake
 * @description Editor of a widget
 * 
 */

.factory('WidgetEditorCode', function ($resource, WidgetEditor) {

    /**
     * TODO: maso, 2019: extends WidgetEditorFake
     * 
     * Creates new instace of an editor
     */
    function editor(widget, options) {
        options = options || {};
        WidgetEditor.apply(this, [widget, options]);
    }
    
    editor.prototype = new WidgetEditor();


    editor.prototype.setActive = function(){}; 
    editor.prototype.isActive = function(){};
    editor.prototype.save = function(){};
    editor.prototype.hide = function(){};
    editor.prototype.show = function(){
        var ctrl = this;
        $resource.get('code', {
            data: {
                code: ctrl.widget.text(),
                languages: [{
                    text: 'HTML/XML',
                    value: 'markup'
                },
                {
                    text: 'JavaScript',
                    value: 'javascript'
                },
                {
                    text: 'CSS',
                    value: 'css'
                }]
            }
        })
        .then(function(value){
            ctrl.widget.setModelProperty('text', value.code);
        });
    };
    editor.prototype.isHidden = function(){};
    
//  the editor type
    return editor;
});
