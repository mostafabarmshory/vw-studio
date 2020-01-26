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
 * @ngdoc controllers
 * @name AmhOwnerToolbarCtrl
 * @description Controller for toolbar which is shown for owners only.
 * 
 * This toolbar uses following groups of actions
 * 
 * - amh.owner-toolbar.public
 * - amh.owner-toolbar.location
 * - amh.owner-toolbar.scope
 * - mb.user
 */
.controller("AmhOwnerToolbarCtrl", function ($scope, $actions, $app, $mdSidenav, $monitor) {
	$scope.userMenu = $actions.group('mb.user');

	this.logout = function () {
		$app.logout();
	};


	this.toggleMessageSidenav = function(){
		$mdSidenav('messages').toggle();
	};

	this.getMessageCount = function() {
		var ctrl = this;
		return $monitor.getMetric('message.count')
		.then(function (metric) {
			ctrl.messageCount = metric.value;
		});
	};

	this.showLocalSettings = function(){
		return $mdSidenav('settings').toggle();
	};

	this.getMessageCount();
});