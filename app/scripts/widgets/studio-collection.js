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
 * @ngdoc Widgets
 * @name collection
 * @description Collection controller
 * 
 * A widget collection controller
 * 
 */
angular.module('am-wb-core').factory('AmWbSeenCollectionWidget', function(
		/* am-wb-core */ WbWidgetContainer, $wbUtil,
		/* angularjs  */ $q, $http, $log) {



	function QueryParameter() {
		// init
		this.param = {};
		this.filterMap = {};
		this.sortMap = {};
	}

	QueryParameter.prototype._init_filters = function() {
		var obj = this.filterMap;
		var keys = Object.keys(obj);
		this.param['_px_fk[]'] = [];
		this.param['_px_fv[]'] = [];
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var values = obj[key];
			for (var j = 0; j < values.length; j++) {
				var value = values[j];
				this.param['_px_fk[]'].push(key);
				this.param['_px_fv[]'].push(value);
			}
		}
	};

	QueryParameter.prototype._init_sorts = function() {
		var obj = this.sortMap;
		this.param['_px_sk[]'] = Object.keys(obj);
		// this.param['_px_so[]'] = Object.values(obj);
		this.param['_px_so[]'] = [];
		for (var index = 0; index < this.param['_px_sk[]'].length; index++) {
			var key = this.param['_px_sk[]'][index];
			this.param['_px_so[]'][index] = obj[key];
		}
	};

	QueryParameter.prototype.setSize = function(size) {
		this.param._px_ps = size;
		return this;
	};

	QueryParameter.prototype.setQuery = function(query) {
		this.param._px_q = query;
		return this;
	};

	QueryParameter.prototype.setPage = function($page) {
		this.param._px_p = $page;
		return this;
	};

	QueryParameter.prototype.nextPage = function() {
		if (!this.param._px_p) {
			this.param._px_p = 1;
		}
		this.param._px_p += 1;
		return this;
	};

	QueryParameter.prototype.setOrder = function($key, $order) {
		if (!$order) {
			this.removeSorter($key, $order);
		} else {
			this.addSorter($key, $order);
		}
		this._init_sorts();
		return this;
	};

	QueryParameter.prototype.addSorter = function($key, $order) {
		if (!$order) {
			return this;
		}
		this.sortMap[$key] = $order;
		this._init_sorts();
		return this;
	};

	QueryParameter.prototype.removeSorter = function($key) {
		delete this.sortMap[$key];
		this._init_sorts();
		return this;
	};

	QueryParameter.prototype.clearSorters = function() {
		this.sortMap = {};
	};

	QueryParameter.prototype.setFilter = function($key, $value) {
		if (!angular.isDefined($value)) {
			this.removeFilter($key, $value);
		} else {
			this.filterMap[$key] = [];
			this.addFilter($key, $value);
		}
		this._init_filters();
		return this;
	};

	QueryParameter.prototype.addFilter = function($key, $value) {
		if (!angular.isDefined($value)) {
			return this;
		}
		if (!angular.isArray(this.filterMap[$key])) {
			this.filterMap[$key] = [];
		}
		this.filterMap[$key].push($value);
		this._init_filters();
		return this;
	};

	QueryParameter.prototype.removeFilter = function($key) {
		delete this.filterMap[$key];
		this._init_filters();
		return this;
	};

	QueryParameter.prototype.clearFilters = function() {
		this.filterMap = {};
	};

	QueryParameter.prototype.getParameter = function() {
		return this.param;
	};

	QueryParameter.prototype.put = function(key, value) {
		this.param[key] = value;
		return this;
	};

	QueryParameter.prototype.get = function(key) {
		return this.param[key];
	};


	// ------------------------------------------------------------------
	// Utility
	// ------------------------------------------------------------------
	/*
	 * process state
	 */
	var STATE_BUSY = 'busy';
	var STATE_IDEAL = 'ideal';
	var collectionAttributes = ['url', 'filters', 'sorts', 'query', 'properties', 'template'];

	// ------------------------------------------------------------------
	// Utility
	// ------------------------------------------------------------------

	/*
	 * Creates widgets based on a mix of the template and input data
	 * 
	 * #utility
	 */
	function createWidgets(items, template) {
		var widgetList = [];
		var templateCopy = '';
		var html;
		if (!angular.isArray(items)) {
			return $q.resolve([]); // Empty items?
		}
		for (var i = 0; i < items.length; i++) {
			templateCopy = template;
			try {
				html = Mustache.to_html(templateCopy, items[i]);
				html = JSON.parse(html);
				html = $wbUtil.clean(html);
				widgetList.push(html);
			} catch (e) {
				$log.error({
					message: 'Falie to load template',
					error: e
				});
				continue;
			}
		}
		return $q.resolve(widgetList);
	}

	// ------------------------------------------------------------------
	// Widget internal
	//
	// ------------------------------------------------------------------
	/*
	 * TODO: maso, 2018: manage events 
	 * 
	 * - collection changes: any part of the query is changed 
	 * - style changes: internal group style changed 
	 * - model changes: the whole model changed
	 */

	function Widget($scope, $element, $parent) {
		WbWidgetContainer.apply(this, [$scope, $element, $parent]);
		this.setAllowedTypes();
		this.addElementAttributes('url', 'filters', 'sorts', 'query', 'properties', 'template');

		this._lastResponse;
		this._state = STATE_IDEAL;
		var ctrl = this;

		// watch model update
		function doTask($event) {
			// collection updated
			if (_.includes(collectionAttributes, $event.key)) {
				ctrl.reloadPage();
			}
		}

		ctrl.on('modelUpdated', doTask);
		ctrl.on('runtimeModelUpdated', doTask);
		this.on('loaded', function() {
			ctrl.reloadPage();
		});
	}

	Widget.prototype = Object.create(WbWidgetContainer.prototype);

	/**
	 * Gets collection from server, creates widgets, and forms the body of widget
	 * 
	 * @memberof AmWbSeenCollection
	 */
	Widget.prototype.reloadPage = function() {
		var ctrl = this;
		if (this._reloading) {
			return this._reloading.finally(function() {
				return ctrl.reloadPage();
			});
		}
		this.removeChildren();
		this.getElement().empty();
		delete this._lastResponse;
		this._reloading = this.loadNextPage(true)
			.finally(function() {
				delete ctrl._reloading;
			});
	};


	/**
	 * Load next page 
	 * 
	 * @memberof AmWbSeenCollection
	 * @param replace {boolean} current items or not
	 * @returns {number} the number of items in each page
	 */
	Widget.prototype.loadNextPage = function() {
		if (!this.hasMorePage()) {
			return $q.reject({
				message: 'No more page!?'
			});
		}
		var template = this.getTemplate();

		var ctrl = this;
		return this.getCollection()//
			.then(function(res) {
				ctrl._lastResponse = res.data;
				return ctrl.fire('success', res) || res.data;
			}, function(error) {
				return ctrl.fire('error', error) || error;
			})
			.then(function(data) {
				return createWidgets(data.items || [], template);
			})//
			.then(function(children) {
				return ctrl.addChildren(ctrl.getChildren().length, children)
					.then(function() {
						return ctrl.fire('load', {
							children: children
						}) || children;
					});
			});
	};

	Widget.prototype.getTemplate = function() {
		return this.getProperty('template') || this.getModelProperty('template') || {
			type: 'HtmlText',
			text: '<h3>Template is not set</h3>'
		};
	};

	/*
	 * Gets collection based on internal configurations.
	 * 
	 * This is an internal function
	 */
	Widget.prototype.getCollection = function() {
		// check state
		if (this._state !== STATE_IDEAL) {
			return this.lastQuery;
		}

		var q = new QueryParameter();

		//TODO: maso, 2019: merge runtime and origin model into a new model
		// like the way used in 'loadStyle' function in 'widgets-ctrl' in am-wb-core module

		// filters
		var filters = this.getProperty('filters') || this.getModelProperty('filters') || [];
		angular.forEach(filters, function(filter) {
			q.addFilter(filter.key, filter.value);
		});

		// sort
		var sorts = this.getProperty('sorts') || this.getModelProperty('sorts') || [];
		angular.forEach(sorts, function(sort) {
			q.addSorter(sort.key, sort.order);
		});

		q.setQuery(this.getProperty('query') || this.getModelProperty('query'));
		q.put('graphql', this.getProperty('properties') || this.getModelProperty('properties'));
		var url = this.getProperty('url') || this.getModelProperty('url');
		if (url) {
			var pageIndex = this.getNextPageIndex();
			if (pageIndex > 1) {
				q.setPage(pageIndex);
			}
			this._state = STATE_BUSY;
			var ctrl = this;
			this._lastQuery = $http({
				method: 'GET',
				url: url,
				params: q.getParameter()
			})
				.finally(function() {
					ctrl._state = STATE_IDEAL;
					delete ctrl.lastQuery;
				});
		} else {
			this._lastQuery = $q.reject({
				message: 'URL is not set',
				code: 1 // url is not set
			});
		}
		return this._lastQuery;
	};



	// ------------------------------------------------------------------
	// Widget global
	// ------------------------------------------------------------------

	/**
	 * Gets counts of all pages
	 * 
	 * @memberof AmWbSeenCollection
	 * @returns {number} the number of pages 
	 */
	Widget.prototype.getPagesCount = function() {
		if (!this._lastResponse) {
			return 0;
		}
		return this._lastResponse.page_number;
	};

	/**
	 * Gets current page number
	 * 
	 * @memberof AmWbSeenCollection
	 * @returns {number} the current page
	 */
	Widget.prototype.getCurrentPage = function() {
		if (!this._lastResponse) {
			return 0;
		}
		return this._lastResponse.current_page;
	};

	/**
	 * The number of items per each page
	 * 
	 * @memberof AmWbSeenCollection
	 * @returns {number} the number of items in each page
	 */
	Widget.prototype.getItemPerPage = function() {
		if (!this._lastResponse) {
			return 0;
		}
		return this._lastResponse.items_per_page;
	};

	/**
	 * Check if there is more page
	 * 
	 * @memberof AmWbSeenCollection
	 * @returns {boolean} true if there is more page
	 */
	Widget.prototype.hasMorePage = function() {
		if (!this._lastResponse) {
			return true;
		}
		return this._lastResponse.current_page < this._lastResponse.page_number;
	};

	/**
	 * Gets next page index
	 * 
	 * @memberof AmWbSeenCollection
	 * @returns {number} next page index
	 */
	Widget.prototype.getNextPageIndex = function() {
		if (!this._lastResponse) {
			return 1;
		}
		return this._lastResponse.current_page + 1;
	};

	/**
	 * The current state of the controller
	 * 
	 * @memberof AmWbSeenCollection
	 * @returns {string} current state of the controller
	 */
	Widget.prototype.getState = function() {
		return this._state || STATE_IDEAL;
	};


	/**
	 * set acceptable widgets
	 * 
	 * $widget.setAcceptableChild('a', 'b');
	 * 
	 * @memberof WbWidgetGroupCtrl
	 */
	Widget.prototype.setAllowedTypes = function() {
		this.allowedTypes = [];
	};

	/**
	 * Set edit mode
	 * 
	 * 
	 * @memberof WbAbstractWidget
	 */
	Widget.prototype.setEditable = function(editable) {
		WbWidgetContainer.prototype.setEditable.apply(this, arguments);
		// propagate to child
		var children = this.getChildren();
		while (!_.isEmpty(children)) {
			var widget = children.pop();
			widget.setSilent(editable);
			children = children.concat(widget.getChildren());
		}
	};

	return Widget;
});