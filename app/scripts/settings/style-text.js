/*
 * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
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
 * @ngdoc Controllers
 * @name WbSettingStyleTextCtrl
 * @description Edit text style of a widget
 * 
 */
.controller('WbSettingStyleTextCtrl', function () {

    /*
     * Initial the setting editor
     */
    this.init = function () {
        this.trackStyles([
            // writing
            'hyphens',
            'letterSpacing',
            'lineHeight',
            'quotes',
            'tabSize',
            'verticalAlign',
            'whiteSpace',
            'wordBreak',
            'wordSpacing',
            'wordWrap',
            'writingMode',
            'userSelect',
            // Text
            'textAlign',
            'textAlignLast',
            'textDecoration',
            'textDecorationColor',
            'textDecorationLine',
            'textDecorationStyle',
            'textIndent',
            'textJustify',
            'textOverflow',
            'textShadow',
            'textTransform',
            // Local
            'direction',
            'unicodeBidi',
            // font
            'font',
            'fontFamily',
            'fontKerning',
            'fontSize',
            'fontSizeAdjust',
            'fontStretch',
            'fontStyle',
            'fontVariant',
            'fontWeight',
            ]);
    };


});
