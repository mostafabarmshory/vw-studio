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
 * @ngdoc Directives
 * @name wb-widgets-explorer
 * @description Widgets explorers
 * 
 * This is widgets explorer list.
 * 
 */
.directive('wbWidgetsExplorer', function($widget, $rootScope) {
	/*
	 * link function
	 */
	function postLink(scope, element, attrs, ctrls) {

		var ngModel = ctrls[0];
		var widgets = null;

		if($rootScope.app && $rootScope.app.setting) {
			// save setting in root scope
			if(!$rootScope.app.setting.wbWidgetExplorer){
				$rootScope.app.setting.wbWidgetExplorer = {};
			}
			scope.wbWidgetExplorer = $rootScope.app.setting.wbWidgetExplorer;
		} else {
			scope.wbWidgetExplorer = {};
		}

		/*
		 * Filter widgets width the query
		 */
		function _loadQuery(query, widgets){
			if(query) {
				var q = query.trim().toLowerCase();
				return widgets.filter(function(w){
					return w.title.toLowerCase().indexOf(q) > -1 || w.description.indexOf(q) > -1;
				});
			}
			return widgets;
		}

		/*
		 * Load widgets in groups
		 */
		function _loadGroups(widgets){
			var groups = [];
			var tmp = {};
			for(var i = 0; i < widgets.length; i++){
				var gl = widgets[i].groups || [];
				for(var j = 0; j < gl.length; j++){
					var gid = gl[j];
					if(!angular.isDefined(tmp[gid])){
						tmp[gid] = angular.copy($widget.group(gid));
						tmp[gid].widgets = [];
						groups.push(tmp[gid]);
					}
					tmp[gid].widgets.push(widgets[i]);
				}
			}
			return groups;
		}

		function _runQuery(/*query, $event*/){
			scope.widgets = _loadQuery(scope.query, widgets);
			scope.groups = _loadGroups(scope.widgets);
		}

		function _load(){
			if(!widgets){
				scope.widgets = [];
				return;
			}
			// maso, 2018: clear configs
			scope.query = '';
			scope.widgets = _loadQuery(scope.query, widgets);
			scope.groups = _loadGroups(scope.widgets);
		}

		// Load models
		ngModel.$render = function(){
			widgets = ngModel.$modelValue;
			_load();
		};

		scope.runQuery = _runQuery;
	}

	return {
		templateUrl : 'views/directives/wb-widgets-explorer.html',
		restrict : 'E',
		replace : true,
		scope: {},
		require: ['ngModel'],
		link : postLink
	};
});