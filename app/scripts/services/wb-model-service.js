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
 * @ngdoc service
 * @name $wbmodel
 * @description Utility of a model
 * 
 */
function WbModelService($q, $http, $wbUtil) {
	// init data
	this.$q = $q;
	this.$http = $http;
	this.$wbUtil = $wbUtil;
}

/**
 * Embeds all image with data url
 * 
 * @memberof $wbmodel
 */
WbModelService.prototype.embedImagesDeep = function(model) {
	var jobs = [];
	// embed images
	jobs.push(this.embedImages(model));

	var service = this;
	// go to child
	if (model.type === 'Group') {
		angular.forEach(model.children, function(subModel) {
			jobs.push(service.embedImages(subModel));
		});
	}
	return this.$q.all(jobs);
};

/**
 * Embed images
 * 
 * @memberof $wbmodel
 */
WbModelService.prototype.embedImages = function(model) {
	var jobs = [];
	var job;
	//    var $http = this.$http;

	// background image
	var url = this.getBackgroundImage(model);
	var service = this;
	if (url) {
		job = this.urlToDataImage(url)
			.then(function(res) {
				service.setBackgroundImage(model, res.data);
			});
		jobs.push(job);
	}

	// image
	url = this.getImageUrl(model);
	if (url) {
		job = this.urlToDataImage(url)
			.then(function(res) {
				service.setImageUrl(model, res.data);
			});
		jobs.push(job);
	}

	// carousel
	if (model.type === 'am-wb-carouselNavigator') {
		angular.forEach(model.slides, function(slide) {
			jobs.push(service.urlToDataImage(slide.image)
				.then(function(url) {
					slide.image = url;
				}));
		});
	}

	return this.$q.all(jobs);
};

/**
 * Converts URL to image data
 * 
 * @memberof $wbmodel
 */
WbModelService.prototype.urlToDataImage = function(url) {
	var $q = this.$q;
	if (url.startsWith('data:')) {
		return $q.when(url);
	}
	return this.$http({
		method: 'GET',
		url: url,
		responseType: 'arraybuffer',
		transformResponse: function(data) {
			var uint8View = new Uint8Array(data);
			return 'data:image/*;base64,' + btoa(uint8View.reduce(function(data, byte) { return data + String.fromCharCode(byte); }, ''));
		}
	});
};

/**
 * Get background image url or null
 * 
 * @memberof $wbmodel
 */
WbModelService.prototype.getBackgroundImage = function(model) {
	if (!model.style) {
		return;
	}
	if (!model.style.background) {
		return;
	}
	return model.style.background.image;
};

/**
 * Sets background image URL
 * 
 * @memberof $wbmodel
 */
WbModelService.prototype.setBackgroundImage = function(model, url) {
	if (!model.style) {
		model.style = {};
	}
	if (!model.style.background) {
		model.style.background = {};
	}
	model.style.background.image = url;
};

WbModelService.prototype.getImageUrl = function(model) {
	if (model.type !== 'Imgage') {
		return;
	}
	return model.url;
};

WbModelService.prototype.setImageUrl = function(model, url) {
	if (model.type !== 'Imgage') {
		return;
	}
	model.url = url;
};

WbModelService.prototype.copyToClipboard = function(model) {
    /*
     * TODO: Masood, 2019: There is also another solution but now it doesn't work because of browsers problem
     * A detailed solution is presented in:
     * https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript 
     */
	var js = JSON.stringify(model);
	var fakeElement = document.createElement('textarea');
	fakeElement.value = js;
	document.body.appendChild(fakeElement);
	fakeElement.select();
	document.execCommand('copy');
	document.body.removeChild(fakeElement);
	return;
};

WbModelService.prototype.pasteFromClipboard = function() {
	var def = this.$q.defer();
	var ctrl = this;
	navigator.clipboard.readText()//
		.then(function(data) {
			try {
				var model = JSON.parse(data);
				model = ctrl.$wbUtil.clean(model);
				def.resolve(model);
			} catch (error) {
				alert('Failed to paste.');
			}
		}, function(e) {
			alert(e);
		});
	return def.promise;
};


//TODO: hadi: move it to new module angular-material-home-seo
angular.module('vwStudio').service('$wbmodel', function($q, $http, $wbUtil) {
	var service = new WbModelService($q, $http, $wbUtil);
	return service;
});
