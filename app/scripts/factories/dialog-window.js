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

angular.module('vwStudio').factory('WbDialogWindow', function($window, $wbFloat) {



	// Utils
	function covertToFloadConfig(dialogWindow) {
		var options = {
			closeOnEscape: dialogWindow.closeOnEscape,
			header: dialogWindow.isTitleVisible(),
			headerTitle: dialogWindow.getTitle(),
			headerLogo: '',
			headerControls: {
				//                  close: 'remove',
				//                  maximize: 'remove',
				//                  normalize: 'remove',
				//                  minimize: 'remove',
				//                  smallify: 'remove',
				//                  smallifyrev: 'remove',
			}
		};

		if (angular.isDefined(dialogWindow.x)) {
			options.position = {
				type: 'fixed',
				my: 'left-top',
				at: 'left-top',
				of: 'body',
				container: 'body',
				offsetX: dialogWindow.x,
				offsetY: dialogWindow.y
			};
		}
		if (angular.isDefined(dialogWindow.width)) {
			options.panelSize = {
				width: dialogWindow.width,
				height: dialogWindow.width
			};
		}

		return options;
	}

    /**
     * @ngdoc Factory
     * @name WbDialogWindow
     * @description WbDialogWindow a dialog manager
     * 
     */
	var window = function(parent) {
		this.parent = parent || $window;
		this.floatDialogElement = null;
		this.setTitleVisible(true);
	};

    /**
     * Gets parent of the window
     * 
     * @memberof WbDialogWindow
     */
	window.prototype.getParent = function() {
		return this.parent;
	};

    /**
     * Sets title of the window
     * 
     * @memberof WbDialogWindow
     * @params title {string} the window title
     */
	window.prototype.setTitle = function(title) {
		this.title = title;
		if (this.isVisible()) {
			// TODO: maso, 2019: set title of the current dialog
		}
	};

    /**
     * Sets title of the window
     * 
     * @memberof WbDialogWindow
     * @return {string} the window title
     */
	window.prototype.getTitle = function() {
		return this.title;
	};


    /**
     * Sets language of the window
     * 
     * @memberof WbDialogWindow
     * @params language {string} the window language
     */
	window.prototype.setLanguage = function(language) {
		this.language = language;
		if (this.isVisible()) {
			// TODO: maso, 2019: set title of the current dialog
		}
	};

    /**
     * Sets title of the window
     * 
     * @memberof WbDialogWindow
     * @return {string} the window language
     */
	window.prototype.getLanguage = function() {
		return this.language;
	};

    /**
     * 
     * The open() method opens a new browser window, or a new tab, depending 
     * on your browser settings.
     * 
     * Tip: Use the close() method to close the window.
     * 
     * @memberof WbDialogWindow
     * @return window object
     */
	window.prototype.open = function(url, name, options, replace) {
		return $window.open(url, name, options, replace);
	};

    /**
     * Close current window
     * 
     * 
     * @memberof WbDialogWindow
     * @params visible {boolean} of the window
     */
	window.prototype.close = function() {
		this.setVisible(false);
		// TODO: maso, 2019: remove dome and destroy scope.
	};

    /**
     * Sets visible of the window
     * 
     * 
     * @memberof WbDialogWindow
     * @params visible {boolean} of the window
     */
	window.prototype.setVisible = function(visible) {
		if (!this.floatDialogElement) {
			this.floatDialogElement = $wbFloat.create(covertToFloadConfig(this));
		} else if (this.floatDialogElement.isVisible() === visible) {
			return;
		}

		this.floatDialogElement.setVisible(visible);
	};

    /**
     * Gets visible of the window
     * 
     * 
     * @memberof WbDialogWindow
     * @returns true if the window is visible
     */
	window.prototype.isVisible = function() {
		if (!this.floatDialogElement) {
			return false;
		}
		return this.floatDialogElement.isVisible();
	};

    /**
     * Sets position of the window
     * 
     * 
     * @memberof WbDialogWindow
     * @params x {string|int} absolute position
     * @params y {string|int} absolute position
     */
	window.prototype.setPosition = function(x, y) {
		this.x = x;
		this.y = y;
		if (this.floatDialogElement) {
			// TODO: reload the window position
		}
	};

    /**
     * Gets current position of the window
     * 
     * @memberof WbDialogWindow
     * @return position
     */
	window.prototype.getPosition = function() {
		return {
			x: this.x,
			y: this.y,
		};
	};



    /**
     * Close window on Escape
     * 
     * @memberof WbDialogWindow
     * @params x {string|int} absolute position
     * @params y {string|int} absolute position
     */
	window.prototype.setCloseOnEscape = function(closeOnEscape) {
		this.closeOnEscape = closeOnEscape;
		if (this.floatDialogElement) {
			// TODO: reload the window close
		}
	};

    /**
     * Sets size of the window
     * 
     * @memberof WbDialogWindow
     * @params width {string|int} absolute position
     * @params height {string|int} absolute position
     */
	window.prototype.setSize = function(width, height) {
		this.width = width;
		this.height = height;
		if (this.floatDialogElement) {
			// TODO: reload the window size
		}
	};

    /**
     * Loads a library
     * 
     * @memberof WbDialogWindow
     * @path path of library
     * @return promise to load the library
     */
	window.prototype.loadLibrary = function(path) {
		return $window.loadLibrary(path);
	};

    /**
     * Check if the library is loaded
     * 
     * @memberof WbDialogWindow
     * @return true if the library is loaded
     */
	window.prototype.isLibraryLoaded = function(path) {
		return $window.isLibraryLoaded(path);
	};

    /**
     * Loads a library
     * 
     * @memberof WbDialogWindow
     * @path path of library
     * @return promise to load the library
     */
	window.prototype.loadStyle = function(path) {
		return $window.loadStyle(path);
	};

    /**
     * Check if the library is loaded
     * 
     * @memberof WbDialogWindow
     * @return true if the library is loaded
     */
	window.prototype.isStyleLoaded = function(path) {
		return $window.isStyleLoaded(path);
	};


    /**
     * Set meta
     * 
     * @memberof WbDialogWindow
     * @params key {string} the key of meta
     * @params value {string} the value of meta
     */
	window.prototype.setMeta = function(key, value) {
		var parent = this.getParent();
		if (parent) {
			parent.setMeta(key, value);
		}
	};

    /**
     * Set link
     * 
     * @memberof WbDialogWindow
     * @params key {string} the key of link
     * @params data {string} the value of link
     */
	window.prototype.setLink = function(key, data) {
		var parent = this.getParent();
		if (parent) {
			parent.setLink(key, data);
		}
	};


    /**
     * Write the body
     * 
     * @memberof WbDialogWindow
     * @params data {string} the value
     */
	window.prototype.write = function(data) {
		this.floatDialogElement.getElement()
			.then(function(parentElement) {
				// string
				var element = angular.element(data);
				parentElement.empty();
				parentElement.append(element);
			});
	};

    /**
     * Set view the body
     * 
     * @memberof WbDialogWindow
     * @params data {Object} the view
     */
	window.prototype.setView = function(view) {
		return this.floatDialogElement.setView(view);
	};

	window.prototype.setWidth = function(width) {
		this.resizeTo(width, this.getHeight());
	};

	window.prototype.getWidth = function() {
		return this.width;
	};

	window.prototype.setHeight = function(height) {
		this.resizeTo(this.getWidth(), height);
	};

	window.prototype.getHeight = function() {
		return this.height;
	};

	window.prototype.resizeTo = function(width, height) {
		this.width = width;
		this.height = height;
		if (this.floatDialogElement) {
			this.floatDialogElement.resize(width, height);
		}
	};

	window.prototype.setTitleVisible = function(visible) {
		this._titleVisible = visible;
		if (this.floatDialogElement) {
			// TODO: maso, 2019: Check if the JPanel supports title visibility online.
		}
	};

	window.prototype.isTitleVisible = function()  {
		return this._titleVisible;
	};

	return window;
});
