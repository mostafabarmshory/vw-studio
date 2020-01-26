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
 * @ngdoc Converter
 * @name WbConverter
 * @description Widget converter
 * 
 * A converter are responsible to encode and decode a widget.
 * 
 */
.factory('WbConverterAbstract', function () {

    /**
     * Creates new instance of the converter
     * 
     * @memberof WbConverter
     */
    function Converter(mimetype){
        this.mimetype = mimetype || 'text/plain';
    }
    
    /**
     * Convert widgets into data
     * 
     * @param widget {Widget} to convert
     * @return string of data
     * @memberof WbConverter
     */
    Converter.prototype.encode = function(){};
    
    /**
     * Converts the input data into list of widgets
     * 
     * @param data {string} to convert
     * @returns list of widgets
     * @memberof WbConverter
     */
    Converter.prototype.decode = function(){};
    
    /**
     * Get the data mimetype
     * 
     * When widgets are converted into data, then the data can transfer anywhere, but
     * data type is very important to recover. 
     * 
     * @memberof WbConverter
     */
    Converter.prototype.getMimetype = function(){
        return this.mimetype;
    };

    /**
     * Sets the data mimetype
     * 
     * NOTE: this is not global
     * 
     * @memberof WbConverter
     */
    Converter.prototype.setMimetype = function(mimetype){
        this.mimetype = mimetype;
    };
    
    return Converter;
});
