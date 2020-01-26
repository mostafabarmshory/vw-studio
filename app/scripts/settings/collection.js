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
angular.module('am-wb-seen-core')
/**
 * @ngdoc Settings Ctrl
 * @name WbSeenCollectionSettingCtrl
 * @description Collection setting controller
 * 
 */
.controller('WbSeenCollectionSettingCtrl', function () {
    'use strict';
    /*
     * Initial the setting editor
     */
    this.init = function () {
        this.trackAttributes(['url', 'filters', 'sorts', 'query', 'properties', 'template']);
        this.trackStyles([]);
    };


    /**
     * Add filter to the current filters
     * 
     * @memberof WbSeenCollectionSettingCtrl
     */
    this.addFilter = function () {
    	var filters = this.attributesValue.filters || [];
        filters.push({
            key: '',
            value: ''
        });
        this.setAttribute('filters', filters);
    };

    /**
     * Remove filter to the current filters
     * 
     * @memberof WbSeenCollectionSettingCtrl
     */
    this.removeFilter = function (index) {
    	var filters = this.attributesValue.filters || [];
    	filters.splice(index, 1);
        this.setAttribute('filters', filters);
    };

    /**
     * Add sort to the current sorts
     * 
     * @memberof WbSeenCollectionSettingCtrl
     */
    this.addSort = function () {
    	var sorts = this.attributesValue.sorts || [];
        sorts.push({
            key: '',
            order: ''
        });
        this.setAttribute('sorts', sorts);
    };

    /**
     * Removes filter 
     * 
     * @param index {in} of the sort
     * @memberof WbSeenCollectionSettingCtrl
     */
    this.removeSort = function (index) {
    	var sorts = this.attributesValue.sorts || [];
    	sorts.splice(index, 1);
        this.setAttribute('sorts', sorts);
    };
});