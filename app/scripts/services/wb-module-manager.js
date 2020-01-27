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

angular.module('vwStudio')
/**
 * @ngdoc service
 * @name $wbModuleManager
 * @description Utility of a model
 * 
 */
.service('$wbModuleManager', function (
	/* AngularJS */ $q, $dispatcher,
	/* MBlowfish */ $app) {
	

	this.setState = function(state){
		this.state = state;
	};

	this.getState = function(){
		return this.state;
	};


	this.removeModules = function(){
		return $q.resolve(this);
	};

	this.loadModules = function(){
		return $q.resolve(this);
	};

	this.getModules = function(){};
	this.addModule = function(/*module*/){};
	this.removeModule = function(/*module*/){};
	this.hasModule = function(/*module*/){
		return false;
	};



	var ctrl = this;
	function listenToApp(event){
		if(event.type !== 'update' || !$app.getState().startsWith('ready')){
			return;
		}
		ctrl.setState('loading');
		ctrl.removeModules()
		.then(function(){
			ctrl.loadModules();
		})
		.finally(function(){
			ctrl.setState('ready');
		});
	}

	// init the service
	$dispatcher.on('/app/state', listenToApp);
});
