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


/**
 * @ngdoc Directives
 * @name amh-workbench-navigator
 * @description Show basic tools of work bench
 */
angular.module('vwStudio').directive('amhWorkbenchNavigator', function (/*$actions*/) {

	return {
		templateUrl: 'views/directives/amh-workbench-navigator.html',
		restrict: 'E',
		replace: true,
		scope: {
			
		},
//		require: ['ngModel'],
//		/**
//		 * @ngInject
//		 * @ngdoc Controllers
//		 * @name amhWidgetPathCtrl
//		 * @description Controls the widget path
//		 * 
//		 * There are many things which are controlled by the widget path controller
//		 * such as opening help. 
//		 */
//		controller: function(/*$scope*/){
////			$scope.tools = $actions.group('amh.workbench.toolbar');
////			$scope.advanceTools = $actions.group('amh.workbench.toolbar#advanced');
//		},
//		controllerAs: 'ctrl'
	};
});
