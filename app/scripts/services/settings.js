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

angular.module('vwStudio')

/**
 * @ngdoc Services
 * @name $settings
 * @description Manage settings panel 
 * 
 * 
 */
.service('$settings', function() {
	
	/**
	 * Setting page storage
	 * 
	 */
	var settingPages = [];

	var notFound = {
			label : 'Settings not found',
			templateUrl : 'views/settings/wb-notfound.html'
	};

	function pageMatchWith(page, widgetDescription){
		if(_.isUndefined(page.targets) || page.targets.length === 0){
			return true;
		}
		for(var i = 0; i < page.targets.length; i++){
			var patt = new RegExp(page.targets[i]);
			if(patt.test(widgetDescription.type)){
				return true;
			}
		}
		return false;
	}

	/**
	 * Fetchs a setting page with the given type
	 * 
	 * @memberof $settings
	 * @param model
	 * @returns
	 */
	this.getPage = function (type) {
		var pageResult = notFound;
		_.forEach(settingPages, function(settingPage){
			if (type === settingPage.type) {
				pageResult = settingPage;
			}
		});
		return pageResult;
	};

	/**
	 * 
	 * @memberof $settings
	 * @param page type
	 * @returns
	 */
	this.removePage = function (type) {
		settingPages=  _.remove(settingPages, function(page) {
			return type === page.type;
		});
		this.settingPagesCach = [];
		return this;
	};

	/**
	 * Adds new setting page.
	 * 
	 * @memberof $settings
	 * @returns
	 */
	this.addPage = function (page) {
		settingPages.push(page);
		this.settingPagesCach = [];
		return this;
	};

	/**
	 * Set new setting page.
	 * 
	 * @memberof $settings
	 * @returns
	 */
	this.setPage = function (page) {
		this.remvoePage(page.type);
		return this.addPage(page);
	};

	/**
	 * Finds and lists all setting pages.
	 * 
	 * @memberof $settings
	 * @returns
	 */
	this.getPages = function () {
		return _.clone(settingPages);
	};

	/**
	 * Finds and lists all setting pages.
	 * 
	 * @deprecated
	 * @memberof $settings
	 * @returns
	 */
	this.pages = this.getPages;

	/**
	 * Defines default settings for widget
	 * 
	 * @memberof $settings
	 * @param widget
	 * @returns
	 */
	this.getSettingsFor = function (widgetDescription) {
		// if it was cached before
		this.settingPagesCach = this.settingPagesCach || {};
		if(_.has(this.settingPagesCach, widgetDescription.type)){
			return this.settingPagesCach[widgetDescription.type];
		}

		// create list
		var widgetSettings = [];
		_.forEach(settingPages, function(page){
			if(pageMatchWith(page, widgetDescription)){
				widgetSettings.push(page);
			}
		});

		// put into cache
		this.settingPagesCach[widgetDescription.type] =  widgetSettings;

		return widgetSettings;
	};
});
