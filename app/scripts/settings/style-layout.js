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
 * 
 * @ngdoc Widget Settings
 * @name WbSettingStyleLayoutCtrl
 * @description Manages element layout
 * 
 * Layout is consists of the following attributes for a group:
 * 
 * <ul>
 *     <li>direction</li>
 *     <li>direction-inverse</li>
 *     <li>wrap</li>
 *     <li>wrap-inverse</li>
 *     <li>align</li>
 *     <li>justify</li>
 * </ul>
 * 
 * and following ones for a widget (or group):
 * 
 * <ul>
 *     <li>grow</li>
 *     <li>shrink</li>
 *     <li>order</li>
 * </ul>
 * 
 * See the layout documents for more details.
 * 
 * @see wb-layout
 */
.controller('WbSettingStyleLayoutCtrl', function (/*$scope, $element*/) {

    /*
     * Initial the setting editor
     */
    this.init = function () {
        this.trackStyles([
            'display',
            'order',
            'zIndex',
            'clear',
            'float',
            // Position
            'position',
            'bottom',
            'left',
            'right',
            'top',
            // overflow
            'overflow',
            'overflowX',
            'overflowY',
            'scrollBehavior',
            // Print
            'pageBreakAfter',
            'pageBreakBefore',
            'pageBreakInside',
            // Flex
            'alignContent',
            'alignItems',
            'alignSelf',
            'justifyContent',
            'flex',
            'flexBasis',
            'flexDirection',
            'flexGrow',
            'flexShrink',
            'flexWrap',
            // grid
            'grid',
            'gridArea',
            'gridAutoColumns',
            'gridAutoFlow',
            'gridAutoRows',
            'gridColumn',
            'gridColumnEnd',
            'gridColumnGap',
            'gridColumnStart',
            'gridGap',
            'gridRow',
            'gridRowEnd',
            'gridRowGap',
            'gridRowStart',
            'gridTemplate',
            'gridTemplateAreas',
            'gridTemplateColumns',
            'gridTemplateRows',
            // column view
            'columns',
            'columnWidth',
            'columnCount',
            'columnSpan',
            'columnFill',
            'columnGap',
            'columnRule',
            'columnRuleColor',
            'columnRuleStyle',
            'columnRuleWidth',
            ]);
    };
});
