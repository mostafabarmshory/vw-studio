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
//angular.module('vwStudio')//
//
///**
// * @ngdoc Factories
// * @name TinymcePluginLink
// * @description Adding image plugin
// * 
// * 
// * ## Options
// * 
// * link_assume_external_targets: 
// * link_context_toolbar:
// * link_list:
// * default_link_target: 
// */
//.factory('TinymcePluginLink', function ($resource) {
//	
//	
//
//	var attachState = {};
//
//
//	var global$1 = tinymce.util.Tools.resolve('tinymce.util.VK');
//	var global$2 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');
//	var global$3 = tinymce.util.Tools.resolve('tinymce.Env');
//	var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');
//	var global$5 = tinymce.util.Tools.resolve('tinymce.util.Delay');
//	var global$6 = tinymce.util.Tools.resolve('tinymce.util.XHR');
//
//
//
//	//-----------------------------------------------------------
//	// utility
//	//-----------------------------------------------------------
//	var assumeExternalTargets = function (editorSettings) {
//		return typeof editorSettings.link_assume_external_targets === 'boolean' ? editorSettings.link_assume_external_targets : false;
//	};
//
//	var hasContextToolbar = function (editorSettings) {
//		return typeof editorSettings.link_context_toolbar === 'boolean' ? editorSettings.link_context_toolbar : false;
//	};
//
//	var getLinkList = function (editorSettings) {
//		return editorSettings.link_list;
//	};
//
//	function hasDefaultLinkTarget(editorSettings) {
//		return typeof editorSettings.default_link_target === 'string';
//	}
//
//	function getDefaultLinkTarget(editorSettings) {
//		return editorSettings.default_link_target;
//	};
//
//	var getTargetList = function (editorSettings) {
//		return editorSettings.target_list;
//	};
//
//	var setTargetList = function (editor, list) {
//		editor.settings.target_list = list;
//	};
//
//	var shouldShowTargetList = function (editorSettings) {
//		return getTargetList(editorSettings) !== false;
//	};
//
//	var getRelList = function (editorSettings) {
//		return editorSettings.rel_list;
//	};
//
//	var hasRelList = function (editorSettings) {
//		return getRelList(editorSettings) !== undefined;
//	};
//
//	var getLinkClassList = function (editorSettings) {
//		return editorSettings.link_class_list;
//	};
//
//	var hasLinkClassList = function (editorSettings) {
//		return getLinkClassList(editorSettings) !== undefined;
//	};
//
//	var shouldShowLinkTitle = function (editorSettings) {
//		return editorSettings.link_title !== false;
//	};
//
//	var allowUnsafeLinkTarget = function (editorSettings) {
//		return typeof editorSettings.allow_unsafe_link_target === 'boolean' ? editorSettings.allow_unsafe_link_target : false;
//	};
//
//	var isImageFigure = function (node) {
//		return node && node.nodeName === 'FIGURE' && /\bimage\b/i.test(node.className);
//	};
//
//	var appendClickRemove = function (link, evt) {
//		document.body.appendChild(link);
//		link.dispatchEvent(evt);
//		document.body.removeChild(link);
//	};
//
//	var isLink = function (elm) {
//		return elm && elm.nodeName === 'A' && elm.href;
//	};
//	
//	var hasLinks = function (elements) {
//		return global$4.grep(elements, isLink).length > 0;
//	};
//	
//	var getLink = function (editor, elm) {
//		return editor.dom.getParent(elm, 'a[href]');
//	};
//
//	var getSelectedLink = function (editor) {
//		return getLink(editor, editor.selection.getStart());
//	};
//	
//	var getHref = function (elm) {
//		var href = elm.getAttribute('data-mce-href');
//		return href ? href : elm.getAttribute('href');
//	};
//	
//	var isContextMenuVisible = function (editor) {
//		var contextmenu = editor.plugins.contextmenu;
//		return contextmenu ? contextmenu.isContextMenuVisible() : false;
//	};
//	
//	var hasOnlyAltModifier = function (e) {
//		return e.altKey === true && e.shiftKey === false && e.ctrlKey === false && e.metaKey === false;
//	};
//	
//	var trimCaretContainers = function (text) {
//		return text.replace(/\uFEFF/g, '');
//	};
//
//
//	function getAnchorElement(editor, selectedElm) {
//		selectedElm = selectedElm || editor.selection.getNode();
//		if (isImageFigure(selectedElm)) {
//			return editor.dom.select('a[href]', selectedElm)[0];
//		} else {
//			return editor.dom.getParent(selectedElm, 'a[href]');
//		}
//	}
//	
//	function getAnchorText(selection, anchorElm) {
//		var text = anchorElm ? anchorElm.innerText || anchorElm.textContent : selection.getContent({ format: 'text' });
//		return trimCaretContainers(text);
//	}
//	
//	function isOnlyTextSelected(html) {
//		if (/</.test(html) && (!/^<a [^>]+>[^<]+<\/a>$/.test(html) || html.indexOf('href=') === -1)) {
//			return false;
//		}
//		return true;
//	}
//	
//	function buildListItems(inputList, itemCallback, startItems) {
//		var appendItems = function (values, output) {
//			output = output || [];
//			angular.forEach(values, function (item) {
//				var menuItem = { 
//						text: item.text || item.title 
//				};
//				if (item.menu) {
//					menuItem.menu = appendItems(item.menu);
//				} else {
//					menuItem.value = item.value;
//					if (itemCallback) {
//						itemCallback(menuItem);
//					}
//				}
//				output.push(menuItem);
//			});
//			return output;
//		};
//		return appendItems(inputList, startItems || []);
//	};
//	
//
//	var toggleTargetRules = function (rel, isUnsafe) {
//		var rules = ['noopener'];
//		var newRel = rel ? rel.split(/\s+/) : [];
//		var toString = function (rel) {
//			return global$4.trim(rel.sort().join(' '));
//		};
//		var addTargetRules = function (rel) {
//			rel = removeTargetRules(rel);
//			return rel.length ? rel.concat(rules) : rules;
//		};
//		var removeTargetRules = function (rel) {
//			return rel.filter(function (val) {
//				return global$4.inArray(rules, val) === -1;
//			});
//		};
//		newRel = isUnsafe ? addTargetRules(newRel) : removeTargetRules(newRel);
//		return newRel.length ? toString(newRel) : null;
//	};
//
//	var link = function (editor, attachState) {
//		return function (data) {
//			editor.undoManager.transact(function () {
//				var selectedElm = editor.selection.getNode();
//				var anchorElm = getAnchorElement(editor, selectedElm);
//				var linkAttrs = {
//						href: data.href,
//						target: data.target ? data.target : null,
//								rel: data.rel ? data.rel : null,
//										class: data.class ? data.class : null,
//												title: data.title ? data.title : null
//				};
//				if (!hasRelList(editor.settings) && allowUnsafeLinkTarget(editor.settings) === false) {
//					linkAttrs.rel = toggleTargetRules(linkAttrs.rel, linkAttrs.target === '_blank');
//				}
//				if (data.href === attachState.href) {
//					attachState.attach();
//					attachState = {};
//				}
//				if (anchorElm) {
//					editor.focus();
//					if (data.hasOwnProperty('text')) {
//						if ('innerText' in anchorElm) {
//							anchorElm.innerText = data.text;
//						} else {
//							anchorElm.textContent = data.text;
//						}
//					}
//					editor.dom.setAttribs(anchorElm, linkAttrs);
//					editor.selection.select(anchorElm);
//					editor.undoManager.add();
//				} else {
//					if (isImageFigure(selectedElm)) {
//						linkImageFigure(editor, selectedElm, linkAttrs);
//					} else if (data.hasOwnProperty('text')) {
//						editor.insertContent(editor.dom.createHTML('a', linkAttrs, editor.dom.encode(data.text)));
//					} else {
//						editor.execCommand('mceInsertLink', false, linkAttrs);
//					}
//				}
//			});
//		};
//	};
//	
//	var unlink = function (editor) {
//		return function () {
//			editor.undoManager.transact(function () {
//				var node = editor.selection.getNode();
//				if (isImageFigure(node)) {
//					unlinkImageFigure(editor, node);
//				} else {
//					editor.execCommand('unlink');
//				}
//			});
//		};
//	};
//	
//	var unlinkImageFigure = function (editor, fig) {
//		var a, img;
//		img = editor.dom.select('img', fig)[0];
//		if (img) {
//			a = editor.dom.getParents(img, 'a[href]', fig)[0];
//			if (a) {
//				a.parentNode.insertBefore(img, a);
//				editor.dom.remove(a);
//			}
//		}
//	};
//	var linkImageFigure = function (editor, fig, attrs) {
//		var a, img;
//		img = editor.dom.select('img', fig)[0];
//		if (img) {
//			a = editor.dom.create('a', attrs);
//			img.parentNode.insertBefore(a, img);
//			a.appendChild(img);
//		}
//	};
//
//	var delayedConfirm = function (editor, message, callback) {
//		var rng = editor.selection.getRng();
//		global$5.setEditorTimeout(editor, function () {
//			editor.windowManager.confirm(message, function (state) {
//				editor.selection.setRng(rng);
//				callback(state);
//			});
//		});
//	};
//
//	
//	//-----------------------------------------------------------
//	// Factory
//	//
//	//
//	//-----------------------------------------------------------
//	var tinymcePluginLink = function (editor/*, pluginUrl*/) {
//		this.setEditor(editor);
//
//		this.setupButtons();
//		this.setupMenuItems();
//		this.setupContextToolbars();
//		this.setupGotoLinks();
//		this.register();
//	};
//
//	tinymcePluginLink.prototype.setEditor = function(editor) {
//		this._editor = editor;
//	};
//
//	tinymcePluginLink.prototype.getEditor = function() {
//		return this._editor;
//	};
//
//	tinymcePluginLink.prototype.setupButtons = function () {
//		var editor = this.getEditor();
//		var factory = this;
//		editor.ui.registry.addSplitButton('link', {
//			active: false,
//			icon: 'link',
//			tooltip: 'Insert/edit link',
//			onclick: function(){
//				factory.openDialog();
//			},
//			onpostrender: function(){
//				factory.toggleActiveState();
//			}
//		});
//		editor.ui.registry.addSplitButton('unlink', {
//			active: false,
//			icon: 'unlink',
//			tooltip: 'Remove link',
//			onclick: function(){
//				factory.unlink();
//			},
//			onpostrender: function(){
//				factory.toggleActiveState();
//			}
//		});
//		if (editor.ui.registry.addContextToolbar) {
//			editor.ui.registry.addSplitButton('openlink', {
//				icon: 'newtab',
//				tooltip: 'Open link',
//				onclick: function () {
//					gotoLink(editor, getSelectedLink(editor));
//				}
//			});
//		}
//	};
//
//	tinymcePluginLink.prototype.setupMenuItems = function () {
//		var editor = this.getEditor();
//		var factory = this;
//		editor.ui.registry.addMenuItem('openlink', {
//			text: 'Open link',
//			icon: 'newtab',
//			onclick: function () {
//				factory.gotoLink(editor, getSelectedLink(editor));
//			},
//			onPostRender: function () {
//				var self = this;
//				var toggleVisibility = function (e) {
//					if (hasLinks(e.parents)) {
//						self.show();
//					} else {
//						self.hide();
//					}
//				};
//				if (!hasLinks(editor.dom.getParents(editor.selection.getStart()))) {
//					self.hide();
//				}
//				editor.on('nodechange', toggleVisibility);
//				self.on('remove', function () {
//					editor.off('nodechange', toggleVisibility);
//				});
//			},
//			prependToContext: true
//		});
//		editor.ui.registry.addMenuItem('link', {
//			icon: 'link',
//			text: 'Link',
//			shortcut: 'Meta+K',
//			onclick: function(){
//				factory.openDialog();
//			},
//			stateSelector: 'a[href]',
//			context: 'insert',
//			prependToContext: true
//		});
//		editor.ui.registry.addMenuItem('unlink', {
//			icon: 'unlink',
//			text: 'Remove link',
//			onclick: function(){
//				factory.unlink();
//			},
//			stateSelector: 'a[href]'
//		});
//	};
//
//	tinymcePluginLink.prototype.setupContextToolbars = function () {
//		var editor = this.getEditor();
//		if (editor.ui.registry.addContextToolbar) {
//			editor.ui.registry.addContextToolbar(function (elm) {
//				var sel, rng, node;
//				if (hasContextToolbar(editor.settings) && !isContextMenuVisible(editor) && isLink(elm)) {
//					sel = editor.selection;
//					rng = sel.getRng();
//					node = rng.startContainer;
//					if (node.nodeType === 3 && sel.isCollapsed() && rng.startOffset > 0 && rng.startOffset < node.data.length) {
//						return true;
//					}
//				}
//				return false;
//			}, 'openlink | link unlink');
//		}
//	};
//
//	tinymcePluginLink.prototype.setupGotoLinks = function () {
//		var editor = this.getEditor();
//		editor.on('click', function (e) {
//			var link = getLink(editor, e.target);
//			if (link && global$1.metaKeyPressed(e)) {
//				e.preventDefault();
//				gotoLink(editor, link);
//			}
//		});
//		editor.on('keydown', function (e) {
//			var link = getSelectedLink(editor);
//			if (link && e.keyCode === 13 && hasOnlyAltModifier(e)) {
//				e.preventDefault();
//				gotoLink(editor, link);
//			}
//		});
//	};
//	
//	tinymcePluginLink.prototype.toggleActiveState = function () {
//		var editor = this.getEditor();
//		return function () {
//			var self = this;
//			editor.on('nodechange', function (e) {
//				self.active(!editor.readonly && !!$_ft5004fzjm0o6bvs.getAnchorElement(editor, e.element));
//			});
//		};
//	};
//	
//	tinymcePluginLink.prototype.register = function () {
//		var factory = this;
//		var editor = this.getEditor();
//		// commands
//		editor.addCommand('mceLink', function(){
//			factory.openDialog();
//		});
//		// shortcuts
//		editor.addShortcut('Meta+K', '', function(){
//			factory.openDialog();
//		});
//	};
//	
//
//	tinymcePluginLink.prototype.openDialog = function (editor) {
//		var editor = this.getEditor();
//		var linkList = getLinkList(editor.settings);
//		var factory = this;
//		if (typeof linkList === 'string') {
//			global$6.send({
//				url: linkList,
//				success: function (text) {
//					factory.showDialog(JSON.parse(text));
//				}
//			});
//		} else if (typeof linkList === 'function') {
//			linkList(function (list) {
//				factory.showDialog(list);
//			});
//		} else {
//			factory.showDialog(linkList);
//		}
//	};
//	
//	tinymcePluginLink.prototype.unlink = function () {
//		var editor = this.getEditor();
//		editor.undoManager.transact(function () {
//			var node = editor.selection.getNode();
//			if (isImageFigure(node)) {
//				unlinkImageFigure(editor, node);
//			} else {
//				editor.execCommand('unlink');
//			}
//		});
//	};
//	
//
//	tinymcePluginLink.prototype.showDialog = function (linkList) {
//		var editor = this.getEditor();
//		var data = {};
//		var selection = editor.selection;
//		var dom = editor.dom;
//		var anchorElm, initialText;
//		
//		var win, onlyText, textListCtrl, linkListCtrl, relListCtrl, targetListCtrl, classListCtrl, linkTitleCtrl, value;
//		
//		var linkListChangeHandler = function (e) {
//			var textCtrl = win.find('#text');
//			if (!textCtrl.value() || e.lastControl && textCtrl.value() === e.lastControl.text()) {
//				textCtrl.value(e.control.text());
//			}
//			win.find('#href').value(e.control.value());
//		};
//		
//		var buildAnchorListControl = function (url) {
//			var anchorList = [];
//			global$4.each(editor.dom.select('a:not([href])'), function (anchor) {
//				var id = anchor.name || anchor.id;
//				if (id) {
//					anchorList.push({
//						text: id,
//						value: '#' + id,
//						selected: url.indexOf('#' + id) !== -1
//					});
//				}
//			});
//			if (anchorList.length) {
//				anchorList.unshift({
//					text: 'None',
//					value: ''
//				});
//				return {
//					name: 'anchor',
//					type: 'listbox',
//					label: 'Anchors',
//					values: anchorList,
//					onselect: linkListChangeHandler
//				};
//			}
//		};
//		
//		var updateText = function () {
//			if (!initialText && onlyText && !data.text) {
//				this.parent().parent().find('#text')[0].value(this.value());
//			}
//		};
//		
//		var urlChange = function (e) {
//			var meta = e.meta || {};
//			if (linkListCtrl) {
//				linkListCtrl.value(editor.convertURL(this.value(), 'href'));
//			}
//			global$4.each(e.meta, function (value, key) {
//				var inp = win.find('#' + key);
//				if (key === 'text') {
//					if (initialText.length === 0) {
//						inp.value(value);
//						data.text = value;
//					}
//				} else {
//					inp.value(value);
//				}
//			});
//			if (meta.attach) {
//				attachState = {
//						href: this.value(),
//						attach: meta.attach
//				};
//			}
//			if (!meta.text) {
//				updateText.call(this);
//			}
//		};
//		
//		var onBeforeCall = function (e) {
//			e.meta = win.toJSON();
//		};
//		
//		onlyText = isOnlyTextSelected(selection.getContent());
//		anchorElm = getAnchorElement(editor);
//		data.text = initialText = getAnchorText(editor.selection, anchorElm);
//		data.href = anchorElm ? dom.getAttrib(anchorElm, 'href') : '';
//		if (anchorElm) {
//			data.target = dom.getAttrib(anchorElm, 'target');
//		} else if (hasDefaultLinkTarget(editor.settings)) {
//			data.target = getDefaultLinkTarget(editor.settings);
//		}
//		if (value = dom.getAttrib(anchorElm, 'rel')) {
//			data.rel = value;
//		}
//		if (value = dom.getAttrib(anchorElm, 'class')) {
//			data.class = value;
//		}
//		if (value = dom.getAttrib(anchorElm, 'title')) {
//			data.title = value;
//		}
//		if (onlyText) {
//			textListCtrl = {
//					name: 'text',
//					type: 'textbox',
//					size: 40,
//					label: 'Text to display',
//					onchange: function () {
//						data.text = this.value();
//					}
//			};
//		}
//		if (linkList) {
//			linkListCtrl = {
//					type: 'listbox',
//					label: 'Link list',
//					values: buildListItems(linkList, function (item) {
//						item.value = editor.convertURL(item.value || item.url, 'href');
//					}, [{
//						text: 'None',
//						value: ''
//					}]),
//					onselect: linkListChangeHandler,
//					value: editor.convertURL(data.href, 'href'),
//					onPostRender: function () {
//						linkListCtrl = this;
//					}
//			};
//		}
//		if (shouldShowTargetList(editor.settings)) {
//			if (getTargetList(editor.settings) === undefined) {
//				setTargetList(editor, [{
//						text: 'None',
//						value: ''
//					},{
//						text: 'New window',
//						value: '_blank'
//					}]);
//			}
//			targetListCtrl = {
//					name: 'target',
//					type: 'listbox',
//					label: 'Target',
//					values: buildListItems(getTargetList(editor.settings))
//			};
//		}
//		if (hasRelList(editor.settings)) {
//			relListCtrl = {
//					name: 'rel',
//					type: 'listbox',
//					label: 'Rel',
//					values: buildListItems(getRelList(editor.settings), function (item) {
//						if (allowUnsafeLinkTarget(editor.settings) === false) {
//							item.value = toggleTargetRules(item.value, data.target === '_blank');
//						}
//					})
//			};
//		}
//		if (hasLinkClassList(editor.settings)) {
//			classListCtrl = {
//					name: 'class',
//					type: 'listbox',
//					label: 'Class',
//					values: buildListItems(getLinkClassList(editor.settings), function (item) {
//						if (item.value) {
//							item.textStyle = function () {
//								return editor.formatter.getCssText({
//									inline: 'a',
//									classes: [item.value]
//								});
//							};
//						}
//					})
//			};
//		}
//		if (shouldShowLinkTitle(editor.settings)) {
//			linkTitleCtrl = {
//					name: 'title',
//					type: 'textbox',
//					label: 'Title',
//					value: data.title
//			};
//		}
//		win = editor.windowManager.open({
//			title: 'Insert link',
//			data: data,
//			body: [
//				{
//					name: 'href',
//					type: 'filepicker',
//					filetype: 'file',
//					size: 40,
//					autofocus: true,
//					label: 'Url',
//					onchange: urlChange,
//					onkeyup: updateText,
//					onpaste: updateText,
//					onbeforecall: onBeforeCall
//				},
//				textListCtrl,
//				linkTitleCtrl,
//				buildAnchorListControl(data.href),
//				linkListCtrl,
//				relListCtrl,
//				targetListCtrl,
//				classListCtrl
//				],
//				onSubmit: function (e) {
//					var assumeExternalTargetsResult = assumeExternalTargets(editor.settings);
//					var insertLink = link(editor, attachState);
//					var removeLink = unlink(editor);
//					var resultData = global$4.extend({}, data, e.data);
//					var href = resultData.href;
//					if (!href) {
//						removeLink();
//						return;
//					}
//					if (!onlyText || resultData.text === initialText) {
//						delete resultData.text;
//					}
//					if (href.indexOf('@') > 0 && href.indexOf('//') === -1 && href.indexOf('mailto:') === -1) {
//						delayedConfirm(editor, 'The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?', function (state) {
//							if (state) {
//								resultData.href = 'mailto:' + href;
//							}
//							insertLink(resultData);
//						});
//						return;
//					}
//					if (assumeExternalTargetsResult === true && !/^\w+:/i.test(href) || assumeExternalTargetsResult === false && /^\s*www[\.|\d\.]/i.test(href)) {
//						delayedConfirm(editor, 'The URL you entered seems to be an external link. Do you want to add the required http:// prefix?', function (state) {
//							if (state) {
//								resultData.href = 'http://' + href;
//							}
//							insertLink(resultData);
//						});
//						return;
//					}
//					insertLink(resultData);
//				}
//		});
//	};
//	
//
//
//	var gotoLink = function (a) {
//		var editor = this.getEditor();
//		if (a) {
//			var href = getHref(a);
//			if (/^#/.test(href)) {
//				var targetEl = editor.$(href);
//				if (targetEl.length) {
//					editor.selection.scrollIntoView(targetEl[0], true);
//				}
//			} else {
//				var url = a.href;
//				if (!global$3.ie || global$3.ie > 10) {
//					var link = document.createElement('a');
//					link.target = '_blank';
//					link.href = url;
//					link.rel = 'noreferrer noopener';
//					var evt = document.createEvent('MouseEvents');
//					evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//					appendClickRemove(link, evt);
//				} else {
//					var win = window.open('', '_blank');
//					if (win) {
//						win.opener = null;
//						var doc = win.document;
//						doc.open();
//						doc.write('<meta http-equiv="refresh" content="0; url=' + global$2.DOM.encode(url) + '">');
//						doc.close();
//					}
//				}
//			}
//		}
//	};
//
//	return tinymcePluginLink;
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
