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

describe('WbWidget converter WbConverterWeburger ', function () {
    // instantiate service
    var $widget;
    var $rootScope;
    var WbConverterWeburger;

    // load the service's module
    beforeEach(module('vwStudio'));
    beforeEach(inject(function (_$widget_, _$rootScope_, _WbConverterWeburger_) {
        $widget = _$widget_;
        $rootScope = _$rootScope_;
        WbConverterWeburger = _WbConverterWeburger_;
    }));

    it('should converte multi dom text to data model', function () {
        // Create new instance
        var data = '{"type":"div","style":{"background":"blue","color":"red"},"children":[{"type":"form"}]}';
        var converter = new WbConverterWeburger();
        var result = converter.decode(data);
        expect(result.length).toBe(1);
        expect(result[0].type).toBe('div');
        expect(result[0].style.background).toBe('blue');
        expect(result[0].style.color).toBe('red');
        
        expect(result[0].children.length).toBe(1);
        expect(result[0].children[0].type).toBe('form');
    });

    it('should encode lit of html widgets', function (done) {
        // Create new instance
        var model = {
                type: 'div',
                children: [{
                    type: 'p',
                    html: 'p1'
                },{
                    type: 'p',
                    html: 'p2'
                },{
                    type: 'img',
                    src: 'images/path.svg'
                }]
        };
        $widget.compile(model)
        .then(function(widget){
            var converter = new WbConverterWeburger();
            var result = converter.encode(widget);
            expect(result.match(/"div"/).length).toBe(1);
            expect(result.match(/"img"/).length).toBe(1);
            

            result = converter.encode(widget, widget);
            expect(result.match(/"div"/).length).toBe(1);
            expect(result.match(/"img"/).length).toBe(1);
            done();
        });
        $rootScope.$apply();
    });
});
