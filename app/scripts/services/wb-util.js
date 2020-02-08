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
 * Utility class of WB
 */
angular.module('vwStudio').service('$wbUtil', function(
        /* AngularJS */ $q, $templateRequest, $sce,
        /* vw-studio */ WbConverterDom) {

	var converterDom = new WbConverterDom();

	function getTemplateOf(page) {
		var template = page.template;
		var templateUrl = page.templateUrl;
		if (angular.isDefined(template)) {
			if (angular.isFunction(template)) {
				template = template(page.params || page);
			}
		} else if (angular.isDefined(templateUrl)) {
			if (angular.isFunction(templateUrl)) {
				templateUrl = templateUrl(page.params);
			}
			if (angular.isDefined(templateUrl)) {
				page.loadedTemplateUrl = $sce.valueOf(templateUrl);
				template = $templateRequest(templateUrl);
			}
		}
		return template;
	}

	/**
	 * Loading template of the page
	 * 
	 * @name getTemplateFor
	 * @memberof $wbUtil
	 * @param page
	 *            {object} properties of a page, widget , ..
	 * @return promise to load template on resolve.
	 */
	function getTemplateFor(page) {
		return $q.when(getTemplateOf(page));
	}


	function cleanEvetns(model) {
		if (model.on) {
			delete model.event;
			return;
		}

		// event
		if (!model.event) {
			model.event = {};
		}

		// load legecy events
		if (model.event.failure) {
			model.event.error = model.event.failure;
			delete model.event.failure;
		}

		if (model.event) {
			model.on = model.event;
			delete model.event;
		}

		// add a note to all event 
		if (model.on) {
			_.forOwn(model.on, function(value, key) {
				model.on[key] = '/* code style is deprecated. see http://www.viraweb123.ir/amh-blog/content/wb-v4-release */ \n' + value;
			});
		}
	}

	function cleanLayout(model) {
		if (model.style.layout) {
			if (model.style.layout.align_self) {
				model.style.alignSelf = model.style.layout.align_self;
			}
			if (model.style.layout.direction) {
				model.style.display = 'flex';

				//				model.style.flex
				model.style.flexGrow = model.style.layout.grow;
				model.style.flexShrink = model.style.layout.shrink;
				model.style.flexBasis = model.style.layout.basis;

				//				model.style.flexFlow
				model.style.flexDirection = model.style.layout.direction;
				model.style.flexWrap = model.style.layout.wrap ? 'wrap' : 'no-wrap';
				model.style.justifyContent = model.style.layout.justify;
				if (model.style.justifyContent === 'end' || model.style.justifyContent === 'end') {
					model.style.justifyContent = 'flex-' + model.style.justifyContent;
				}
				//				alignContent = ??
				model.style.alignItems = model.style.layout.align;
				model.style.order = model.style.layout.order;
			}
			delete model.style.layout;
			return;
		}
	}

	function cleanSize(model) {
		// w1 style.size -> w4
		if (model.style.size) {
			model.style.width = model.style.size.width;
			model.style.minWidth = model.style.size.minWidth;
			model.style.maxWidth = model.style.size.maxWidth;

			model.style.height = model.style.size.height;
			model.style.minHeight = model.style.size.minHeight;
			model.style.maxHeight = model.style.size.maxHeight;
			delete model.style.size;
		}
	}

	function cleanBackground(model) {
		if (model.style.background) {
			if (model.style.background.image) {
				model.style.backgroundImage = 'url("' + model.style.background.image + '")';
			}
			model.style.backgroundColor = model.style.background.color;
			model.style.backgroundSize = model.style.background.size;
			model.style.backgroundRepeat = model.style.background.repeat;
			model.style.backgroundOrigin = model.style.background.origin;
			model.style.backgroundPosition = model.style.background.position;
			delete model.style.background;
			return;
		}
	}

	function cleanBorder(model) {
		// w1 border -> w4
		if (model.style.border) {
			model.style.borderStyle = model.style.border.style;
			model.style.borderColor = model.style.border.color;
			model.style.borderWidth = model.style.border.width;
			model.style.borderRadius = model.style.border.radius;
			delete model.style.border;
			return;
		}
	}

	function cleanSpace(model) {
		// Padding from W0 -> w4
		if (model.style.padding && angular.isObject(model.style.padding)) {
			var padding = '';
			if (model.style.padding.isUniform) {
				padding = model.style.padding.uniform;
			} else {
				padding = model.style.padding.top || '0px' + ' ' +
					model.style.padding.right || '0px' + ' ' +
					model.style.padding.bottom || '0px' + ' ' +
					model.style.padding.left || '0px' + ' ';
			}
			model.style.padding = padding;
		}

		// Margin from W0 -> w4
		if (model.style.margin && angular.isObject(model.style.margin)) {
			var margin = '';
			if (model.style.margin.isUniform) {
				margin = model.style.margin.uniform;
			} else {
				margin = model.style.margin.top || '0px' + ' ' +
					model.style.margin.right || '0px' + ' ' +
					model.style.margin.bottom || '0px' + ' ' +
					model.style.margin.left || '0px' + ' ';
			}
			model.style.margin = margin;
		}
	}

	function cleanAlign(/*model*/) {
		//		if (!model.style.align) {
		//		model.style.align = {};
		//		}
	}

	function cleanOverflow(model) {
		if (model.style.overflow) {
			model.style.overflowX = model.style.overflow.x;
			model.style.overflowY = model.style.overflow.y;
		}
	}

	function cleanShadow(model) {
		//h-offset v-offset blur spread color
		if (model.style.shadows) {
			var boxShadows = [];
			_.forEach(model.style.shadows, function(shadow) {
				var sh = shadow.hShift + ' ' +
					shadow.vShift + ' ' +
					shadow.blur + ' ' +
					shadow.spread + ' ' +
					shadow.color;
				if (shadow.inset) {
					sh += ' ' + 'inset';
				}
				boxShadows.push(sh);
			});
			model.style.boxShadow = _.join(boxShadows);
			delete model.style.shadows;
			return;
		}
	}

	function cleanStyle(model) {
		if (!angular.isObject(model.style)) {
			model.style = {};
		}
		cleanLayout(model);
		cleanSize(model);
		cleanBackground(model);
		cleanBorder(model);
		cleanSpace(model);
		cleanAlign(model);
		cleanOverflow(model);
		cleanShadow(model);
	}

	function cleanType(model) {
		if (model.type === 'Group') {
			model.type = 'div';
		}
		if (model.type === 'Import') {
			model.type = 'import';
		}
		if (model.type === 'Link') {
			model.type = 'a';
			model.html = model.title;
			model.href = model.url;
			model.style.text = {
				align: 'center'
			};
			model.style.cursor = 'pointer';

			delete model.title;
			delete model.url;
		}
		if (model.type === 'Image') {
			model.type = 'img';
			model.src = model.url;

			delete model.url;
		}
		if (model.type === 'HtmlText') {
			model.html = model.text;
			delete model.text;
		}
		if (model.type === 'HtmlText') {
			model.type = 'section';
			model.children = converterDom.decode(model.html);
			delete model.html;
		}
	}

	function cleanInternal(model) {
		delete model.version;
		cleanEvetns(model);
		cleanStyle(model);
		if (_.isArray(model.contents)) {
			model.children = model.contents;
			delete model.contents;
		}
		if (_.isArray(model.children) && model.children.length) {
			_.forEach(model.children, cleanInternal);
		}
		cleanType(model);
		return model;
	}

	/**
	 * Clean data model
	 * @name clean 
	 * @param {object} model 
	 * @param {type} force
	 */
	function clean(model, force) {
		if (!model.type || model.type === 'Page' || model.type === 'Group') {
			model.type = 'div';
		}
		if (model.version === 'wb4' && !force) {
			return model;
		}
		var newModel = cleanInternal(model);
		newModel.version = 'wb4';
		return newModel;
	}

	this.clean = clean;

	this.getTemplateFor = getTemplateFor;
	this.getTemplateOf = getTemplateOf;

	this.findWidgetModelById = function(model, id) {
		if (model.id === id) {
			return model;
		}
		if (_.isArray(model.children)) {
			for (var i = 0; i < model.children.length; i++) {
				var child = this.findWidgetModelById(model.children[i], id);
				if (child) {
					return child;
				}
			}
		}
		return null;
	};

	this.replaceWidgetModelById = function(model, id, newModel) {
		if (!model || model.id === id) {
			return newModel;
		}
		if (_.isArray(model.children)) {
			for (var i = 0; i < model.children.length; i++) {
				if (model.children[i].id === id) {
					model.children[i] = newModel;
					return model;
				}
			}
			for (i = 0; i < model.children.length; i++) {
				var genModel = this.replaceWidgetModelById(model.children[i], id, newModel);
				if (genModel) {
					return model;
				}
			}
		}
		return;
	};

	this.downloadWidgetModel = function(url, id) {
		var ctrl = this;
		return $templateRequest(url)
			.then(function(template) {
				var obj = ctrl.clean(angular.fromJson(template));
				if (!id) {
					return obj;
				}
				return ctrl.findWidgetModelById(obj, id);
			});
	};
});
