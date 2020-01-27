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
.factory('AmhWorkbenchProcessorMetainfo', function(
		AmhWorkbenchProcessor, 
		/* mblowfish */ $page,
		/* vwStudio */ $window) {
	

	function Processor(editor, options) {
		options = options || {};
		AmhWorkbenchProcessor.apply(this, [editor, options]);
		this.info = {};
	}
	Processor.prototype = new AmhWorkbenchProcessor();


	Processor.prototype.connect = function(){
		var ctrl = this;
		this.metadataListener = function() {
			ctrl.updateFromMetadata();
		};
		this.editor.on('contentMetadataChanged', this.metadataListener);
	};


	/**
	 * Disconnect form editor
	 */
	Processor.prototype.disconnect = function(){
		this.editor.off('contentMetadataChanged', this.metadataListener);
		delete this.metadataListener;
	};

	Processor.prototype.updateFromMetadata = function() {
		var wrokbench = this.editor;
		var metadata = wrokbench.getContentMetadata() || [];
		// clean old values
		var ctlr = this;
		_.forEach(this.info, function(value, key){
			ctlr.info[key] = undefined;
		});
		// load new values
		for (var i = 0; i < metadata.length; i++) {
			var m = metadata[i];
			this.info[m.key] = m.value;
		}
		this.loadPageDescription();
	};

	/**
	 * Load page description
	 * 
	 * Page SEO is loaded with $page service.
	 * 
	 * Here is reserved keys:
	 * 
	 * - title
	 * - language
	 * - meta.description
	 * - meta.keywords
	 * - link.favicon
	 * - link.cover
	 * - link.canonical
	 */
	Processor.prototype.loadPageDescription = function () {
		// Load SEO and page
		$page //
			.setTitle(this.info.title) //
			.setLanguage(this.info.language)//
			.setDescription(this.info['meta.description'])//
			.setKeywords(this.info['meta.keywords']) //
			.setFavicon(this.info['link.favicon']) //
			.setCover(this.info['link.cover']) //
			.setCanonicalLink(this.info['link.canonical']);
		
		// Set meta datas
		_.forEach(this.info, function(value, key){
			try{
				$window.setMeta(key, value);
			} catch(ex){}
		});
	};

	return Processor;
});
