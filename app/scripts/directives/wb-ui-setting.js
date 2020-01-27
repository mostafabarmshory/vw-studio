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

/*
 * link setting widgets
 */
function wbUiSettingLinkFunction($scope, $element, $attrs, ctrls) {
	var ngModel = ctrls[0];

	$scope.wbActionClean = ! _.isUndefined($attrs.wbActionClean);

	ngModel.$render = function () {
		$scope.value = ngModel.$modelValue;
	};

	$scope.cleanValue = function () {
		setValue(undefined);
	};


	function setValue(value){
		$scope.value = value;
		// TODO: validate and set
		ngModel.$setViewValue(value);
	}
	$scope.setValue = setValue;
}

angular.module('vwStudio')

/**
 * @ngdoc Directives
 * @name wb-ui-settingn-boolean
 * @description a setting section for on/off switch.
 *
 */
.directive('wbUiSettingBoolean', function () {
	return {
		templateUrl: 'views/directives/wb-ui-setting-boolean.html',
		restrict: 'E',
		replace: true,
		scope: {
			title: '@wbTitle',
			description: '@wbDescription',
		},
		require: ['ngModel'],
		link: wbUiSettingLinkFunction
	};
})

/**
 * @ngdoc Directives
 * @name wb-ui-setting-text
 * @description Setting for a text
 */
.directive('wbUiSettingText', function () {
	return {
		templateUrl: 'views/directives/wb-ui-setting-text.html',
		restrict: 'E',
		scope: {
			title: '@wbTitle',
			description: '@wbDescription',
			resourceType: '@?wbResourceType'
		},
		require: ['ngModel'],
		link: wbUiSettingLinkFunction,
		/*
		 * @ngInject
		 */
		controller: function($scope, $resource){
			function openResourcePage(type){
				return $resource.get(type, {
					data: $scope.value,
					style: {
						title: $scope.title,
						description: $scope.description
					}
				})
				.then(function(newValue){
					$scope.setValue(newValue);
				});
			}
			$scope.openResource = function(){
				openResourcePage($scope.resourceType);
			};
		}
	};
})


/**
 * @ngdoc Directives
 * @name wbUiSettingSelect
 * @description a setting section for choosing values.
 */
.directive('wbUiSettingSelect', function () {
	return {
		templateUrl: 'views/directives/wb-ui-setting-select.html',
		restrict: 'E',
		scope: {
			title: '@wbTitle',
			description: '@wbDescription',
		},
		require: ['ngModel'],
		link: wbUiSettingLinkFunction
	};
})


/**
 * @ngdoc Directives
 * @name wbUiSettingNumber
 * @description a setting section to set a number.
 *
 */
.directive('wbUiSettingNumber', function () {
	return {
		templateUrl: 'views/directives/wb-ui-setting-number.html',
		restrict: 'E',
		scope: {
			title: '@wbTitle',
			description: '@wbDescription',
		},
		require: ['ngModel'],
		link: wbUiSettingLinkFunction
	};
})


/**
 * @ngdoc Directives
 * @name wbUiSettingLength
 */
.directive('wbUiSettingLength', function () {
	return {
		templateUrl: 'views/directives/wb-ui-setting-length.html',
		restrict: 'E',
		replace: true,
		scope: {
			title: '@wbTitle',
			description: '@wbDescription',
		},
		require: ['ngModel'],
		link: wbUiSettingLinkFunction
	};
})

/**
 * @ngdoc Directives
 * @name wbUiSettingColor
 * @description a setting section to set color.
 *
 */
.directive('wbUiSettingColor', function ($mdColorPicker){
	return {
		templateUrl: 'views/directives/wb-ui-setting-color.html',
		restrict: 'E',
		scope: {
			title: '@wbTitle',
			description: '@wbDescription',


			options: '=wbColorPicker',

			// Input options
			type: '@wbType',
			label: '@?wbLabel',
			icon: '@?wbIcon',
			random: '@?wbRandom',
		default: '@?wbDefault',

		// Dialog Options
		openOnInput: '=?wbOpenOnInput',
		hasBackdrop: '=?wbHasBackdrop',
		clickOutsideToClose: '=?wbClickOutsideToClose',
		skipHide: '=?wbSkipHide',
		preserveScope: '=?wbPreserveScope',

		// Advanced options
		wbColorClearButton: '=?wbColorClearButton',
		wbColorPreview: '=?wbColorPreview',

		wbColorAlphaChannel: '=?wbColorAlphaChannel',
		wbColorSpectrum: '=?wbColorSpectrum',
		wbColorSliders: '=?wbColorSliders',
		wbColorGenericPalette: '=?wbColorGenericPalette',
		wbColorMaterialPalette: '=?wbColorMaterialPalette',
		wbColorHistory: '=?wbColorHistory',
		wbColorHex: '=?wbColorHex',
		wbColorRgb: '=?wbColorRgb',
		wbColorHsl: '=?wbColorHsl',
		wbColorDefaultTab: '=?wbColorDefaultTab'
		},
		require: ['ngModel'],
		link: wbUiSettingLinkFunction,
		/*
		 * @ngInject
		 */
		controller: function($scope, $element) {
			var preview = $element.find('.preview');
			$scope.$watch('value', function(color){
				preview.css({background: color});
			});

			$scope.selectColor = function($event){

				$mdColorPicker.show({
					value: $scope.value || 'red',
					defaultValue: $scope.default,
					random: $scope.random,
					clickOutsideToClose: $scope.clickOutsideToClose,
					hasBackdrop: $scope.hasBackdrop,
					skipHide: $scope.skipHide,
					preserveScope: $scope.preserveScope,

					mdColorAlphaChannel: $scope.wbColorAlphaChannel,
					mdColorSpectrum: $scope.wbColorSpectrum,
					mdColorSliders: $scope.wbColorSliders,
					mdColorGenericPalette: $scope.wbColorGenericPalette,
					mdColorMaterialPalette: $scope.wbColorMaterialPalette,
					mdColorHistory: $scope.wbColorHistory,
					mdColorHex: $scope.wbColorHex,
					mdColorRgb: $scope.wbColorRgb,
					mdColorHsl: $scope.wbColorHsl,
					mdColorDefaultTab: $scope.wbColorDefaultTab,

					$event: $event

				}).then(function( color ) {
					$scope.setValue(color);
				});
			};
		},
		controllerAs: 'ctrl'
	};
});

