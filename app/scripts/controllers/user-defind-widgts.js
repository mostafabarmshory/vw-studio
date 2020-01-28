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

/**
 * @ngdoc controller
 * @name AmhMainPageTmplCtrl
 * @description Main page template setting controller
 * 
 * This controller is used to control setting main page template
 * 
 * Here is list of flags in scope:
 * 
 * <ul>
 * 	<li>loadingTemplatePreview: Show if control is about to load template preview</li>
 * 	<li>savingContent: True if control is about save content</li>
 * </ul>
 */
angular.module('vwStudio').controller('AmhUserWidgetCtrl', function($scope, $http) {

	// Load from resources
	function load() {
		$http.get('resources/widget-templates.json')
			.then(function(result) {
				$scope.categories = result.data;
			});
	}

	function loadWidgets(selectedCategory) {
		if (!selectedCategory.type || selectedCategory.type === 'embed') {
			$scope.widgets = selectedCategory.templates;
		}
		if (selectedCategory.type === 'url') {
			$http.get(selectedCategory.url)
				.then(function(result) {
					$scope.widgets = result.data;
				});
		}
	}


	this.loadWidgets = loadWidgets;
	load();
});