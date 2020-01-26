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

describe('wb-ui-setting-ui directive ', function () {
    /*
     * Service
     */
    var $rootScope;
    var $compile;

    /*
     * Element 
     */
    var scope;
    var directiveElem;



    // instantiate service
    beforeEach(function(){
        module('am-wb-core')
        inject(function (_$rootScope_, _$compile_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;

//          $widget = _$widget_;
//          $httpBackend = _$httpBackend_;
//          $timeout = _$timeout_;
//          $settings = _$settings_;

            scope = $rootScope.$new();
            scope.title = 'title';
            scope.description = 'description';
            scope.value = 'true';
            directiveElem = getCompiledElement();
        });
    });


    function getCompiledElement(){
        var element = angular.element('<wb-ui-setting-boolean '+
                'wb-title="{{title}}" '+
                'wb-description="{{description}}" '+
                'ng-value="value"' + 
        '></wb-ui-setting-boolean>');
        var compiledElement = $compile(element)(scope);
        $rootScope.$digest();
        return compiledElement;
    }

    /**************************************************************************************
     *  Providers
     **************************************************************************************/
    it('should applied template', function () {
        expect(directiveElem.html()).not.toEqual('');
    });

    it('should have md-switch element', function () {
        var inputElement = directiveElem.find('input');
        expect(inputElement).toBeDefined();
    });
});
