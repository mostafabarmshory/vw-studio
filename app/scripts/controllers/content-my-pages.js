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


//Test controller
angular.module('vwStudio')
.controller('AmhContentMyPagesCtrl', function ($scope, $rootScope, $controller, $cms, $dispatcher, $q) {
	// Extends Items controller
	angular.extend(this, $controller('MbSeenCmsContentsCtrl',{
		$scope: $scope
	}));


	// get accounts
	this.getModels = function(queryParams) {
		// Check if user is login
		if($rootScope.__account.anonymous){
			return $q.resolve({
				items:[]
			});
		}

		// Getting user pages
		queryParams.setFilter('media_type', 'page');
		queryParams.setFilter('author_id', $rootScope.__account.id);
		return $cms.getContents(queryParams)
		.then(function(list){
			for(var i = 0; i < list.items.length; i++){
				var item  = list.items[i];
				var map = {};
				var metas = item.metas || [];
				for(var j = 0; j < metas.length; j++){
					var key = metas[j].key.replace('.', '_');
					map[key] = metas[j].value;
				}
				item.metasMap = map;
			}
			return list;
		});
	};

	/*
	 * Add store listener
	 * 
	 * This is an internal function, is overried to handle my-page condition
	 */
	this.eventHandlerCallBack = function(){
		if(this._eventHandlerCallBack){
			return this._eventHandlerCallBack ;
		}
		var ctrl = this;
		this._eventHandlerCallBack = function($event){
			var contents = $event.values || [];
			contents = _.filter(contents, {'author_id': Number($rootScope.__account.id)});
			if(!contents){
				return;
			}
			switch ($event.key) {
			case 'created':
				ctrl.pushViewItems(contents);
				break;
			case 'updated':
				ctrl.updateViewItems(contents);
				break;
			case 'removed':
				ctrl.removeViewItems(contents);
				break;
			default:
				break;
			}
		};
		return this._eventHandlerCallBack;
	};

	this.init
});