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


angular.module('ngMaterialHome')

/**
 * @ngdoc Directives
 * @name amh-cms-content-setting
 * @description Show and manage content meta datas.
 */
.directive('amhCmsContentSetting', function ($parse) {

	/*
	 * Link widget view
	 */
	function postLink($scope, $element, $attrs, $ctrls) {
		var ctrl = $ctrls[0];
		var ngModelCtrl = $ctrls[1];

		// Load ngModel
		ngModelCtrl.$render = function () {
			if(!ngModelCtrl.$viewValue){
				// TODO: maso, 2019: clean and lock settings
				return;
			}
			ctrl.loadContent(ngModelCtrl.$viewValue);
		};
	}

	return {
		templateUrl: 'views/directives/amh-cms-content-setting.html',
		restrict: 'E',
		replace: true,
		scope: {},
		link: postLink,
		controller: 'AmhCmsContentCtrl',
		controllerAs: 'ctrl',
		require: ['amhCmsContentSetting', 'ngModel']
	};
});
