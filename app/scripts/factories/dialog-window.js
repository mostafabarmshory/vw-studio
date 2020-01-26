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

angular.module('am-wb-core')
.factory('WbDialogWindow', function($wbWindow, $document, $wbFloat) {
    


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

        if(angular.isDefined(dialogWindow.x)){
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
        if(angular.isDefined(dialogWindow.width)){
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
    var wbWindow = function(parent){
        this.parent = parent || $wbWindow;
        this.floatDialogElement = null;
        this.setTitleVisible(true);
    };

    /**
     * Gets parent of the window
     * 
     * @memberof WbDialogWindow
     */
    wbWindow.prototype.getParent = function(){
        return this.parent;
    };

    /**
     * Sets title of the window
     * 
     * @memberof WbDialogWindow
     * @params title {string} the window title
     */
    wbWindow.prototype.setTitle = function(title){
        this.title = title;
        if(this.isVisible()){
            // TODO: maso, 2019: set title of the current dialog
        }
    };

    /**
     * Sets title of the window
     * 
     * @memberof WbDialogWindow
     * @return {string} the window title
     */
    wbWindow.prototype.getTitle = function(){
        return this.title;
    };


    /**
     * Sets language of the window
     * 
     * @memberof WbDialogWindow
     * @params language {string} the window language
     */
    wbWindow.prototype.setLanguage = function(language){
        this.language = language;
        if(this.isVisible()){
            // TODO: maso, 2019: set title of the current dialog
        }
    };

    /**
     * Sets title of the window
     * 
     * @memberof WbDialogWindow
     * @return {string} the window language
     */
    wbWindow.prototype.getLanguage = function(){
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
    wbWindow.prototype.open = function(url, name, options, replace){
        return $wbWindow.open(url, name, options, replace);
    };

    /**
     * Close current window
     * 
     * 
     * @memberof WbDialogWindow
     * @params visible {boolean} of the window
     */
    wbWindow.prototype.close = function(){
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
    wbWindow.prototype.setVisible = function(visible){
        if(!this.floatDialogElement) {
            this.floatDialogElement = $wbFloat.create(covertToFloadConfig(this));
        } else if(this.floatDialogElement.isVisible() === visible) {
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
    wbWindow.prototype.isVisible = function(){
        if(! this.floatDialogElement){
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
    wbWindow.prototype.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
        if(this.floatDialogElement){
            // TODO: reload the window position
        }
    };

    /**
     * Gets current position of the window
     * 
     * @memberof WbDialogWindow
     * @return position
     */
    wbWindow.prototype.getPosition = function() {
        return {
            x: this.x,
            y:this.y,
        };
    };



    /**
     * Close window on Escape
     * 
     * @memberof WbDialogWindow
     * @params x {string|int} absolute position
     * @params y {string|int} absolute position
     */
    wbWindow.prototype.setCloseOnEscape = function(closeOnEscape) {
        this.closeOnEscape = closeOnEscape;
        if(this.floatDialogElement){
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
    wbWindow.prototype.setSize = function(width, height) {
        this.width = width;
        this.height = height;
        if(this.floatDialogElement){
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
    wbWindow.prototype.loadLibrary = function(path){
        return $wbWindow.loadLibrary(path);
    };

    /**
     * Check if the library is loaded
     * 
     * @memberof WbDialogWindow
     * @return true if the library is loaded
     */
    wbWindow.prototype.isLibraryLoaded = function(path){
        return $wbWindow.isLibraryLoaded(path);
    };

    /**
     * Loads a library
     * 
     * @memberof WbDialogWindow
     * @path path of library
     * @return promise to load the library
     */
    wbWindow.prototype.loadStyle = function(path){
        return $wbWindow.loadStyle(path);
    };

    /**
     * Check if the library is loaded
     * 
     * @memberof WbDialogWindow
     * @return true if the library is loaded
     */
    wbWindow.prototype.isStyleLoaded = function(path){
        return $wbWindow.isStyleLoaded(path);
    };


    /**
     * Set meta
     * 
     * @memberof WbDialogWindow
     * @params key {string} the key of meta
     * @params value {string} the value of meta
     */
    wbWindow.prototype.setMeta = function (key, value){
        var parent = this.getParent();
        if(parent) {
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
    wbWindow.prototype.setLink = function (key, data){
        var parent = this.getParent();
        if(parent) {
            parent.setLink(key, data);
        }
    };


    /**
     * Write the body
     * 
     * @memberof WbDialogWindow
     * @params data {string} the value
     */
    wbWindow.prototype.write = function (data){
        this.floatDialogElement.getElement()
        .then(function(parentElement){
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
    wbWindow.prototype.setView = function (view){
        return this.floatDialogElement.setView(view);
    };

    wbWindow.prototype.setWidth = function(width){
        this.resizeTo(width, this.getHeight());
    };

    wbWindow.prototype.getWidth = function(){
        return this.width;
    };

    wbWindow.prototype.setHeight = function(height){
        this.resizeTo(this.getWidth(), height);
    };

    wbWindow.prototype.getHeight = function(){
        return this.height;
    };

    wbWindow.prototype.resizeTo = function(width, height) {
        this.width = width;
        this.height = height;
        if(this.floatDialogElement){
            this.floatDialogElement.resize(width, height);
        }
    };

    wbWindow.prototype.setTitleVisible = function(visible){
        this._titleVisible = visible;
        if(this.floatDialogElement){
            // TODO: maso, 2019: Check if the JPanel supports title visibility online.
        }
    };

    wbWindow.prototype.isTitleVisible = function(){
        return this._titleVisible;
    };

    return wbWindow;
});
