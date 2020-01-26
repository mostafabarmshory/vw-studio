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

angular.module('vwStudio')//

/**
 * @ngdoc Controllers
 * @name WbSettingPageCtrl
 * @description Manages settings page
 * 
 * Manages settings pages.
 * 
 * This is an abstract implementation of a setting page and contains list of 
 * utilities.
 * 
 */
.controller('WbSettingPageCtrl', function (WbObservableObject) {
	// extend from observable object
	angular.extend(this, WbObservableObject.prototype);
	WbObservableObject.apply(this);
	/*
	 * Attributes
	 */
	this.widgets = [];
	this.attributes = [];
	this.attributesValue = {};
	this.styles = [];
	this.stylesValue = {};
	this.callbacks = {
			widgetChanged: []
	};

	/********************************************************
	 * Widget management
	 ********************************************************/
	/**
	 * Sets new widgets list into the setting page
	 * 
	 * Note: the old widgets will be removed from the view and the
	 * new one is connect.
	 * 
	 * @memberof WbSettingPageCtrl
	 * @param widget {Widget} to track
	 */
	this.setWidget = function (widgets) {
		widgets =  widgets || [];
		if(!_.isArray(widgets)){
			widgets = [widgets];
		}
		var oldWidgets = this.widgets;
		this.disconnect();
		this.widgets = widgets;
		this.connect();
		// load values
		this.loadAttributes();
		this.loadStyles();
		// propagate the change
		this.fire('widgetChanged', {
			value: widgets,
			oldValue: oldWidgets
		});
	};

	/**
	 * Gets the current widgets list 
	 * 
	 * @memberof WbSettingPageCtrl
	 * @return the current widget
	 */
	this.getWidgets = function () {
		return this.widgets;
	};

	/**
	 * Checks if the current widget can contain others
	 * 
	 * @memberof WbSettingPageCtrl
	 * @return true if the widget is a container
	 */
	this.isContainerWidget = function(){
		var widgets = this.getWidgets();
		if(widgets.length === 0 || widgets.length > 1){
			return false;
		}
		var widget = widgets[0];
		return !widget.isLeaf();
	};

	/**
	 * Removes listeners to the widget
	 * 
	 * The controller track the widget changes by adding listener into it. This
	 * function removes all listener.
	 * 
	 * @memberof WbSettingPageCtrl
	 */
	this.disconnect = function(){
		var widgets = this.getWidgets();
		if(_.isEmpty(widgets) || !_.isFunction(this.widgetListener)){
			return;
		}
		var ctrl = this;
		_.forEach(widgets, function(widget){
			widget.off('modelUpdated', ctrl.widgetListener);
		});
	};

	/**
	 * Adds listeners to the widget
	 * 
	 * @memberof WbSettingPageCtrl
	 */
	this.connect= function(){
		var widgets = this.getWidgets();
		if(_.isEmpty(widgets)){
			return;
		}
		if(_.isEmpty(this.widgetListeners)){
			var ctrl = this;
			this.widgetListener = function($event) {
				if(ctrl.isSilent()){
					return;
				}
				if($event.type === 'modelUpdated'){
					ctrl.updateValues($event.key);
				}
			};
		}
		// Adding listeners
		_.forEach(widgets, function(widget){
			widget.on('modelUpdated', ctrl.widgetListener);
		});
	};


	this.updateValues = function(keys){
		if(_.isUndefined(keys)){
			return;
		}
		if(!_.isArray(keys)){
			keys = [keys];
		}
		var widgets = this.widgets;
		var firstFit = widgets.length > 1;
		var ctrl = this;
		var attrs = this.attributesValue;
		var styles = this.stylesValue;
		_.forEach(keys, function(key){
			_.forEach(widgets, function(widget){
				// load attribute
				if(_.includes(ctrl.attributes, key)){
					if(!firstFit || _.isUndefined(attrs[key])){
						attrs[key] = widget.getModelProperty(key);
					}
					return;
				}
				// load style
				if(!key.startsWith('style.')){
					return;
				}
				var stylekey =  key.substring(6);
				if(_.includes(ctrl.styles, stylekey)){
					if(!firstFit || _.isUndefined(styles[key])){
						styles[stylekey] = widget.getModelProperty(key);
					}
				}
			});
		});
	};

	/***************************************************************
	 * Track widget changes
	 ***************************************************************/

	/*
	 * INTERNAL
	 */
	this.loadAttributes= function(){
		// 0- clean
		this.attributesValue = {};
		this.updateValues(this.attributes);
	};

	/*
	 * INTERNAL
	 */
	this.loadStyles= function(){
		// 0- clean
		this.stylesValue = {};
		this.updateValues(_.map(this.styles, function(styleKey){
			return 'style.'+styleKey;
		}));
	};

	this.setSilent = function(silent){
		this._silent = silent;
	};

	this.isSilent = function(){
		return this._silent;
	};

	/* **************************************************************
	 * attribute utilities
	 * **************************************************************/
	/**
	 * Adds list of attributes to track
	 * 
	 * @memberof WbSettingPageCtrl
	 * @param {string[]} attributes to track
	 */
	this.trackAttributes = function(attributes){
		this.attributes = attributes || [];
		this.loadAttributes();
	};

	/**
	 * Adds key,value as attribute to the page
	 * 
	 * @memberof WbSettingPageCtrl
	 * @param {string} key to use
	 * @param {string} value to set for the key
	 */
	this.setAttribute = function (key, value) {
		if (_.isEmpty(this.widgets)) {
			return;
		}
		this.setSilent(true);
		try{
			this.attributesValue[key] = value;
			_.forEach(this.widgets, function(widget){
				widget.setModelProperty(key, value);
			});
		} finally {
			this.setSilent(false);
		}
	};

	/* **************************************************************
	 * style utilities
	 * **************************************************************/
	/**
	 * Adds list of styles to track
	 * 
	 * @memberof WbSettingPageCtrl
	 * @param {string[]} styles to track
	 */
	this.trackStyles = function(styles){
		this.styles = styles || [];
		this.loadStyles();
	};

	/**
	 * Adds key,value as style to the widget
	 * 
	 * @memberof WbSettingPageCtrl
	 * @param {string} key to use
	 * @param {string} value to set for the key
	 */
	this.setStyle = function (key, value) {
		if (_.isEmpty(this.widgets)) {
			return;
		}
		this.stylesValue[key] = value;
		this.setSilent(true);
		try{
			_.forEach(this.widgets, function(widget){
				widget.setModelProperty('style.' + key, value);
			});
		} finally {
			this.setSilent(false);
		}
	};

});
