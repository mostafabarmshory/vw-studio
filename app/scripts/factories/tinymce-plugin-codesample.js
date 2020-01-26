///* 
// * The MIT License (MIT)
// * 
// * Copyright (c) 2016 weburger
// * 
// * Permission is hereby granted, free of charge, to any person obtaining a copy
// * of this software and associated documentation files (the "Software"), to deal
// * in the Software without restriction, including without limitation the rights
// * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// * copies of the Software, and to permit persons to whom the Software is
// * furnished to do so, subject to the following conditions:
// * 
// * The above copyright notice and this permission notice shall be included in all
// * copies or substantial portions of the Software.
// * 
// * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// * SOFTWARE.
// */
//
//angular.module('vwStudio')//
//
///**
// * @ngdoc Factories
// * @name TinymcePluginCodesample
// * @description Adding code sample to tinymce
// * 
// * 
// * ## options
// * 
// * codesample_languages: array of languages
// * 
// */
//.factory('TinymcePluginCodesample', function ($resource) {
//	
//	var languages;
//	var defaultLanguages = [{
//		text: 'HTML/XML',
//		value: 'markup'
//	},
//	{
//		text: 'JavaScript',
//		value: 'javascript'
//	},
//	{
//		text: 'CSS',
//		value: 'css'
//	},
//	{
//		text: 'PHP',
//		value: 'php'
//	},
//	{
//		text: 'Ruby',
//		value: 'ruby'
//	},
//	{
//		text: 'Python',
//		value: 'python'
//	},
//	{
//		text: 'Java',
//		value: 'java'
//	},
//	{
//		text: 'C',
//		value: 'c'
//	},
//	{
//		text: 'C#',
//		value: 'csharp'
//	},
//	{
//		text: 'C++',
//		value: 'cpp'
//	}];
//
//	/*
//	 * dom utils
//	 */
//	var tinymceDomeUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
//
//	function isCodeSample(elm) {
//		return elm && elm.nodeName === 'PRE' && elm.className.indexOf('language-') !== -1;
//	}
//
//	function trimArg(predicateFn) {
//		return function (arg1, arg2) {
//			return predicateFn(arg2);
//		};
//	}
//
//	/*
//	 * Insert new code sample into the cell
//	 */
//	function insertCodeSample(editor, language, code, node) {
//		editor.undoManager.transact(function () {
////			var node = getSelectedCodeSample(editor);
//			code = tinymceDomeUtils.DOM.encode(code);
//			if (node) {
//				editor.dom.setAttrib(node, 'class', 'language-' + language);
//				node.innerHTML = code;
//				Prism.highlightElement(node);
//				editor.selection.select(node);
//			} else {
//				editor.insertContent('<pre id="__new" class="language-' + language + '">' + code + '</pre>');
//				editor.selection.select(editor.$('#__new').removeAttr('id')[0]);
//			}
//		});
//	}
//
//	/*
//	 * Add to plugin manager
//	 */
//
//	var tinymcePluginCodesample = function (editor, pluginUrl) {
//		this.setEditor(editor, pluginUrl);
//	};
//
//	/**
//	 * Set editor and load the plugin
//	 */
//	tinymcePluginCodesample.prototype.setEditor = function(editor) {
//		this._editor = editor;
//		languages = editor.settings.codesample_languages || defaultLanguages;
//		this.setup();
//		this.register();
//	};
//
//	/**
//	 * Gets current editor
//	 */
//	tinymcePluginCodesample.prototype.getEditor = function(){
//		return this._editor;
//	};
//
//
//
//	/**
//	 * Setups the environments and events
//	 */
//	tinymcePluginCodesample.prototype.setup = function () {
//		var facotry = this;
//		var editor = this.getEditor();
//		var $ = editor.$;
//		editor.on('PreProcess', function (e) {
//			$('pre[contenteditable=false]', e.node).filter(trimArg(isCodeSample)).each(function (idx, elm) {
//				var $elm = $(elm), code = elm.textContent;
//				$elm.attr('class', $.trim($elm.attr('class')));
//				$elm.removeAttr('contentEditable');
//				$elm.empty().append($('<code></code>').each(function () {
//					this.textContent = code;
//				}));
//			});
//		});
//		editor.on('SetContent', function () {
//			var unprocessedCodeSamples = $('pre').filter(trimArg(isCodeSample)).filter(function (idx, elm) {
//				return elm.contentEditable !== 'false';
//			});
//			if (unprocessedCodeSamples.length) {
//				editor.undoManager.transact(function () {
//					unprocessedCodeSamples.each(function (idx, elm) {
//						$(elm).find('br').each(function (idx, elm) {
//							elm.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), elm);
//						});
//						elm.contentEditable = false;
//						elm.innerHTML = editor.dom.encode(elm.textContent);
//						Prism.highlightElement(elm);
//						elm.className = $.trim(elm.className);
//					});
//				});
//			}
//		});
//
//		editor.on('dblclick', function (ev) {
//			if (isCodeSample(ev.target)) {
//				facotry.openEditor();
//			}
//		});
//	};
//
//	/**
//	 * Register the plugin with the editor
//	 * 
//	 */
//	tinymcePluginCodesample.prototype.register = function () {
//		var facotry = this;
//		var editor = this.getEditor();
//		editor.addCommand('codesample', function () {
//			var node = editor.selection.getNode();
//			if (editor.selection.isCollapsed() || isCodeSample(node)) {
//				facotry.openEditor();
//			} else {
//				editor.formatter.toggle('code');
//			}
//		});
//		editor.addButton('codesample', {
//			cmd: 'codesample',
//			title: 'Insert/Edit code sample'
//		});
//		editor.addMenuItem('codesample', {
//			cmd: 'codesample',
//			text: 'Code sample',
//			icon: 'codesample'
//		});
//	};
//
//	/*
//	 * Get selected code sample from the editor
//	 */
//	tinymcePluginCodesample.prototype.getSelectedCodeSample = function () {
//		var editor = this.getEditor();
//		var node = editor.selection.getNode();
//		if (isCodeSample(node)) {
//			return node;
//		}
//		return null;
//	};
//
//	/*
//	 * Get current code.
//	 * 
//	 * If the code sample is empty then an empty text is returned as
//	 * result.
//	 */
//	tinymcePluginCodesample.prototype.getCurrentCode = function () {
//		var node = this.getSelectedCodeSample();
//		if (node) {
//			return node.textContent;
//		}
//		return '';
//	};
//
//
//	/*
//	 * Gets current language of the code sampler
//	 */
//	tinymcePluginCodesample.prototype.getCurrentLanguage = function (editor) {
//		var matches;
//		var node = this.getSelectedCodeSample();
//		if (node) {
//			matches = node.className.match(/language-(\w+)/);
//			return matches ? matches[1] : '';
//		}
//		return '';
//	};
//
//	/*
//	 * Open editor to edit a code sample
//	 */
//	tinymcePluginCodesample.prototype.openEditor = function () { 
//		var editor = this.getEditor();
//		var node = this.getSelectedCodeSample();
//		var factory = this;
//		$resource.get('script', {
//			data : {
//				language: this.getCurrentLanguage(editor),
//				languages: languages,
//				// TODO: maso, 2019: get code
//				code: this.getCurrentCode()
//			}
//		})
//		.then(function(script){
//			insertCodeSample(editor, script.language, script.code, node);
//		});
//	};
//
//
//	return tinymcePluginCodesample;
//});
//
//
//
//
//
//
//
//
//
//
//
//
