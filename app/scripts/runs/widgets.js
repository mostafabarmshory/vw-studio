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

/***********************************************************************
 * Widgets
 ***********************************************************************/
angular.module('vwStudio').run(function($widget) {
	$widget.newWidget({
		// Functionall
		type: 'a',
		controller: 'StodioWidget',

		// stodio
		title: 'A link',
		description: 'A widget to add external link. It is used as block item.',
		icon: 'wb-widget-a',
		groups: ['basic'],
		// functional properties
		model: {
			html: 'Link title'
		},
		isLeaf: true
	});
	$widget.newWidget({
		type: 'address',
		controller: 'StodioWidget',

		title: 'address',
		description: 'description.',
		icon: 'wb-widget-address',
		groups: ['basic'],
		isLeaf: false
	});
	$widget.newWidget({
		type: 'applet',
		controller: 'StodioWidget',

		title: 'applet',
		description: 'applet.',
		icon: 'wb-widget-applet',
		groups: ['basic'],
		isLeaf: true
	});
	$widget.newWidget({
		type: 'area',
		controller: 'StodioWidget',

		title: 'area',
		description: 'area',
		icon: 'wb-widget-area',
		groups: ['basic'],
	});
	$widget.newWidget({
		type: 'article',
		controller: 'StodioWidget',

		title: 'article',
		description: 'article',
		icon: 'wb-widget-article',
		groups: ['basic'],
	});
	$widget.newWidget({
		type: 'aside',
		controller: 'StodioWidget',

		title: 'aside',
		description: 'aside',
		icon: 'wb-widget-aside',
		groups: ['basic'],
	});
	$widget.newWidget({
		type: 'audio',
		controller: 'StodioWidget',

		title: 'Audio',
		label: 'audio',
		icon: 'wb-widget-audio',
		description: 'This widget is used to add audio in the document.',
		groups: ['basic'],
		model: {
			media: '(min-width: 650px)',
			src: 'http://www.gitlab.com/am-wb/am-wb-commonhttps://unsplash.com/photos/8emNXIvrCL8/download?force=true'
		},
		isLeaf: false,
	});
	$widget.newWidget({
		type: 'blockquote',
		controller: 'StodioWidget',

		title: 'blockquote',
		label: 'blockquote',
		icon: 'wb-widget-blockquote',
		description: 'description',
		groups: ['basic'],
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'button',
		controller: 'StodioWidget',

		title: 'button',
		label: 'button',
		icon: 'wb-widget-button',
		description: 'description',
		groups: ['basic'],
		template: '<button></button>',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'canvas',
		controller: 'StodioWidget',

		title: 'canvas',
		label: 'canvas',
		icon: 'wb-widget-canvas',
		description: 'description',
		groups: ['basic'],
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'datalist',
		controller: 'StodioWidget',

		title: 'datalist',
		label: 'datalist',
		icon: 'wb-widget-datalist',
		description: 'description',
		groups: ['basic'],
	});
	$widget.newWidget({
		type: 'dd',
		title: 'dd',
		label: 'dd',
		icon: 'wb-widget-dd',
		description: 'description',
		groups: ['basic'],
		template: '<dd></dd>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'details',
		title: 'details',
		label: 'details',
		icon: 'wb-widget-details',
		description: 'description',
		groups: ['basic'],
		template: '<details></details>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'dialog',
		title: 'dialog',
		label: 'dialog',
		icon: 'wb-widget-dialog',
		description: 'description',
		groups: ['basic'],
		template: '<dialog></dialog>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'div',
		title: 'div',
		label: 'div',
		icon: 'wb-widget-div',
		description: 'description',
		groups: ['basic'],
		template: '<div></div>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'dl',
		title: 'dl',
		label: 'dl',
		icon: 'wb-widget-dl',
		description: 'description',
		groups: ['basic'],
		template: '<dl></dl>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'dt',
		title: 'dt',
		label: 'dt',
		icon: 'wb-widget-dt',
		description: 'description',
		groups: ['basic'],
		template: '<dt></dt>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'embed',
		title: 'embed',
		label: 'embed',
		icon: 'wb-widget-embed',
		description: 'description',
		groups: ['basic'],
		template: '<embed></embed>',
		help: 'http://dpq.co.ir/more-information-embed',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'fieldset',
		title: 'fieldset',
		label: 'fieldset',
		icon: 'wb-widget-fieldset',
		description: 'description',
		groups: ['basic'],
		template: '<fieldset></fieldset>',
		help: 'http://dpq.co.ir/more-information-fieldset',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'figcaption',
		title: 'figcaption',
		label: 'figcaption',
		icon: 'wb-widget-figcaption',
		description: 'description',
		groups: ['basic'],
		template: '<figcaption></figcaption>',
		help: 'http://dpq.co.ir/more-information-figcaption',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'figure',
		title: 'figure',
		label: 'figure',
		icon: 'wb-widget-figure',
		description: 'description',
		groups: ['basic'],
		template: '<figure></figure>',
		help: 'http://dpq.co.ir/more-information-figure',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'footer',
		title: 'footer',
		label: 'footer',
		icon: 'wb-widget-footer',
		description: 'description',
		groups: ['basic'],
		template: '<footer></footer>',
		help: 'http://dpq.co.ir/more-information-footer',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'form',
		title: 'form',
		label: 'form',
		icon: 'wb-widget-form',
		description: 'description',
		groups: ['basic'],
		template: '<form></form>',
		help: 'http://dpq.co.ir/more-information-form',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'frame',
		title: 'frame',
		label: 'frame',
		icon: 'wb-widget-form',
		description: 'description',
		groups: ['basic'],
		template: '<frame></frame>',
		help: 'http://dpq.co.ir/more-information-frame',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'frameset',
		title: 'frameset',
		label: 'frameset',
		icon: 'wb-widget-frameset',
		description: 'description',
		groups: ['basic'],
		template: '<frameset></frameset>',
		help: 'http://dpq.co.ir/more-information-frameset',
		controller: 'StodioWidget',
		isLeaf: false
	});
	for (var i = 1; i < 7; i++) {
		var type = 'h' + i;
		$widget.newWidget({
			// widget description
			type: type,
			title: 'Header Level ' + i,
			description: 'A header widget',
			icon: 'wb-widget-h' + i,
			groups: ['basic'],
			model: {
				name: 'Header-' + i,
				style: {
					padding: '8px'
				}
			},
			// functional properties
			template: '<h' + i + '></h' + i + '>',
			controller: 'StodioWidget',
			isLeaf: true
		});
	}
	$widget.newWidget({
		type: 'header',
		title: 'header',
		label: 'header',
		icon: 'wb-widget-header',
		description: 'description',
		groups: ['basic'],
		template: '<header></header>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'hr',
		title: 'hr',
		label: 'hr',
		icon: 'wb-widget-hr',
		description: 'description',
		groups: ['basic'],
		template: '<hr></hr>',
		controller: 'StodioWidget',
		isLeaf: true,
	});
	$widget.newWidget({
		// widget description
		type: 'i',
		title: 'Italics',
		description: 'The widget defines a part of text in an alternate voice or mood.',
		icon: 'wb-widget-i',
		groups: ['basic'],
		model: {
			name: 'i',
			html: 'Text'
		},
		// help id
		help: 'http://dpq.co.ir',
		helpId: 'wb-widget-i',
		// functional properties
		template: '<i></i>',
		controllerAs: 'ctrl',
		controller: 'StodioWidget',
		isLeaf: true,
	});
	$widget.newWidget({
		// widget description
		type: 'iframe',
		title: 'Inline Frame',
		description: 'Add inline frame to show another document within current one.',
		icon: 'wb-widget-iframe',
		groups: ['basic'],
		model: {
			name: 'iframe',
			sandbox: 'allow-same-origin allow-scripts',
			src: 'https://www.google.com',
			style: {
				padding: '8px'
			}
		},
		// help id
		help: 'http://dpq.co.ir',
		helpId: 'wb-widget-iframe',
		// functional properties
		template: '<iframe>Frame Not Supported?!</iframe>',
		controllerAs: 'ctrl',
		controller: 'StodioWidget',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'img',
		title: 'Image',
		label: 'image',
		icon: 'wb-widget-img',
		description: 'A widget to insert an link to page.',
		groups: ['basic'],
		template: '<img></img>',
		model: {
			html: 'img',
			src: 'resources/wb-brand-3.0.png',
			style: {
				width: '80%',
				maxWidth: '500px'
			}
		},
		controllerAs: 'ctrl',
		controller: 'StodioWidget',
		isLeaf: true,
	});
	$widget.newWidget({
		// widget description
		type: 'input',
		title: 'Input field',
		description: 'A widget to get data from users.',
		icon: 'wb-widget-input',
		groups: ['basic'],
		model: {
			name: 'input',
			sandbox: 'allow-same-origin allow-scripts',
			src: 'https://www.google.com',
			style: {
				padding: '8px'
			}
		},
		// help id
		help: 'http://dpq.co.ir',
		helpId: 'wb-widget-input',
		// functional properties
		template: '<input></input>',
		controller: 'StodioWidget',
		controllerAs: 'ctrl',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'kbd',
		title: 'kbd',
		label: 'kbd',
		icon: 'wb-widget-kbd',
		description: 'description',
		groups: ['basic'],
		template: '<kbd></kbd>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'label',
		title: 'label',
		label: 'label',
		icon: 'wb-widget-label',
		description: 'description',
		groups: ['basic'],
		template: '<label></label>',
		controller: 'StodioWidget',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'legend',
		title: 'legend',
		label: 'legend',
		icon: 'wb-widget-legend',
		description: 'description',
		groups: ['basic'],
		template: '<legend></legend>',
		controller: 'StodioWidget',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'li',
		title: 'li',
		label: 'li',
		icon: 'wb-widget-li',
		description: 'description',
		groups: ['basic'],
		template: '<li></li>',
		controller: 'StodioWidget',
		isLeaf: false,
	});
	$widget.newWidget({
		type: 'link',
		title: 'Link',
		label: 'link',
		icon: 'wb-widget-link',
		description: 'A widget to insert an link to page.',
		groups: ['basic'],
		template: '<link></link>',
		model: {
			html: 'Link',
			url: 'http://www.gitlab.com/am-wb/am-wb-common'
		},
		controllerAs: 'ctrl',
		controller: 'StodioWidget',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'main',
		title: 'main',
		label: 'main',
		icon: 'wb-widget-main',
		description: 'A widget to insert an link to page.',
		groups: ['basic'],
		template: '<main></main>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'map',
		title: 'map',
		label: 'map',
		icon: 'wb-widget-map',
		description: 'description',
		groups: ['basic'],
		template: '<map></map>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		// widget description
		type: 'meta',
		title: 'Meta',
		description: 'A widget to add meta data.',
		icon: 'wb-widget-meta',
		groups: ['basic'],
		model: {
			name: 'name',
			content: 'content',
			style: {
				margin: '8px',
				background: {
					color: '#313131',
				},
				border: {
					style: 'dotted',
					color: '#afafaf'
				},
				color: '#ffffff',
				padding: '8px'
			}
		},
		// functional properties
		template: '<meta></meta>',
		controllerAs: 'ctrl',
		controller: 'StodioWidget'
	});
	$widget.newWidget({
		type: 'meter',
		title: 'meter',
		label: 'meter',
		icon: 'wb-widget-meter',
		description: 'description',
		groups: ['basic'],
		template: '<meter></meter>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'nav',
		title: 'nav',
		label: 'nav',
		icon: 'wb-widget-nav',
		description: 'description',
		groups: ['basic'],
		template: '<nav></nav>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'noscript',
		title: 'noscript',
		label: 'noscript',
		icon: 'wb-widget-noscript',
		description: 'description',
		groups: ['basic'],
		template: '<noscript></noscript>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'object',
		title: 'object',
		label: 'object',
		icon: 'wb-widget-object',
		description: 'description',
		groups: ['basic'],
		template: '<object></object>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'ol',
		title: 'ol',
		label: 'ol',
		icon: 'wb-widget-ol',
		description: 'description',
		groups: ['basic'],
		template: '<ol></ol>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'optgroup',
		title: 'optgroup',
		label: 'optgroup',
		icon: 'wb-widget-optgroup',
		description: 'description',
		groups: ['basic'],
		template: '<optgroup></optgroup>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'option',
		title: 'option',
		label: 'option',
		icon: 'wb-widget-option',
		description: 'description',
		groups: ['basic'],
		template: '<option></option>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'output',
		title: 'output',
		label: 'output',
		icon: 'wb-widget-output',
		description: 'description',
		groups: ['basic'],
		template: '<output></output>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		// widget description
		type: 'p',
		title: 'Paragraph',
		description: 'A widget to add paragraph.',
		icon: 'wb-widget-p',
		groups: ['basic'],
		model: {
			name: 'Pragraph',
			style: {
				padding: '8px'
			}
		},
		// functional properties
		template: '<p></p>',
		controllerAs: 'ctrl',
		controller: 'StodioWidget',
		isLeaf: true
	});
	$widget.newWidget({
		type: 'param',
		title: 'param',
		label: 'param',
		icon: 'wb-widget-param',
		description: 'description',
		groups: ['basic'],
		template: '<param></param>',
		controller: 'StodioWidget',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'picture',
		title: 'Picture',
		label: 'picture',
		icon: 'wb-widget-picture',
		description: 'This widget is used to add picture in the document.',
		groups: ['basic'],
		template: '<picture></picture>',
		model: {
			media: '(min-width: 650px)',
			src: 'http://www.gitlab.com/am-wb/am-wb-commonhttps://unsplash.com/photos/8emNXIvrCL8/download?force=true'
		},
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'pre',
		title: 'Preformatted',
		label: 'preformatted',
		icon: 'wb-widget-pre',
		description: 'A widget to insert an Preformatted text to page.',
		groups: ['basic'],
		template: '<pre></pre>',
		model: {
			html: 'class A {\n\tint a;\n}',
		},
		controller: 'StodioWidget',
		controllerAs: 'ctrl',
		isLeaf: true
	});
	$widget.newWidget({
		// widget description
		type: 'progress',
		title: 'Progress',
		description: 'A widget to add progress.',
		icon: 'wb-widget-progress',
		groups: ['basic'],
		model: {
			name: 'progress',
			style: {
				padding: '8px',
				margin: '8px',
				size: {
					height: '30px'
				}
			}
		},
		// functional properties
		template: '<progress value="22" max="100"></progress>',
		controller: 'StodioWidget'
	});
	$widget.newWidget({
		type: 'q',
		title: 'q',
		label: 'q',
		icon: 'wb-widget-q',
		description: 'description',
		groups: ['basic'],
		template: '<q></q>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 's',
		title: 'S',
		icon: 'wb-widget-s',
		description: 'The widget is used to define text that is no longer correct.',
		groups: ['basic'],
		template: '<s></s>',
		model: {
			html: 'Text'
		},
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'samp',
		title: 'Samp',
		icon: 'wb-widget-samp',
		description: 'It defines sample output from a computer program.',
		groups: ['basic'],
		template: '<samp></samp>',
		model: {
			html: 'Text'
		},
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'script',
		title: 'script',
		label: 'script',
		icon: 'wb-widget-script',
		description: 'description',
		groups: ['basic'],
		template: '<script></script>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'section',
		title: 'section',
		label: 'section',
		icon: 'wb-widget-section',
		description: 'description',
		groups: ['basic'],
		template: '<section></section>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'select',
		title: 'select',
		label: 'select',
		icon: 'wb-widget-select',
		description: 'description',
		groups: ['basic'],
		template: '<select></select>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'small',
		title: 'Small',
		icon: 'wb-widget-small',
		description: 'The widget defines smaller text.',
		groups: ['basic'],
		template: '<small></small>',
		model: {
			html: 'Small text'
		},
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'source',
		title: 'Source',
		label: 'source',
		icon: 'wb-widget-source',
		description: 'This widget is used to add source in the document.',
		groups: ['basic'],
		template: '<source></source>',
		model: {
			media: '(min-width: 650px)',
			src: 'http://www.gitlab.com/am-wb/am-wb-commonhttps://unsplash.com/photos/8emNXIvrCL8/download?force=true'
		},
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'span',
		title: 'Span',
		icon: 'wb-widget-span',
		description: 'The widget is used to group inline-elements in a document.',
		groups: ['basic'],
		template: '<span></span>',
		model: {
			html: 'Text'
		},
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'strong',
		title: 'Strong',
		icon: 'wb-widget-strong',
		description: 'The widget defines strong emphasized text.',
		groups: ['basic'],
		template: '<strong></strong>',
		model: {
			html: 'Text'
		},
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'style',
		title: 'style',
		label: 'style',
		icon: 'wb-widget-style',
		description: 'description',
		groups: ['basic'],
		template: '<style></style>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'summary',
		title: 'summary',
		label: 'summary',
		icon: 'wb-widget-summary',
		description: 'description',
		groups: ['basic'],
		template: '<summary></summary>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'svg',
		title: 'svg',
		label: 'svg',
		icon: 'wb-widget-svg',
		description: 'description',
		groups: ['basic'],
		template: '<svg></svg>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'template',
		title: 'template',
		label: 'template',
		icon: 'wb-widget-template',
		description: 'description',
		groups: ['basic'],
		template: '<template></template>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		// widget description
		type: 'textarea',
		title: 'Text Area field',
		description: 'A widget to get data from users.',
		icon: 'wb-widget-textarea',
		groups: ['basic'],
		model: {
			name: 'textarea',
			style: {
				padding: '8px'
			}
		},
		// help id
		help: 'http://dpq.co.ir',
		helpId: 'wb-widget-textarea',
		// functional properties
		template: '<textarea></textarea>',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'track',
		title: 'track',
		label: 'track',
		icon: 'wb-widget-track',
		description: 'description',
		groups: ['basic'],
		template: '<track></track>',
		help: 'http://dpq.co.ir/more-information-track',
		controller: 'StodioWidget',
	});
	$widget.newWidget({
		type: 'ul',
		title: 'ul',
		label: 'ul',
		icon: 'wb-widget-ul',
		description: 'description',
		groups: ['basic'],
		template: '<ul></ul>',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		type: 'video',
		title: 'Video',
		label: 'video',
		icon: 'wb-widget-video',
		description: 'This widget is used to add video in the document.',
		groups: ['basic'],
		template: '<video></video>',
		model: {
			media: '(min-width: 650px)',
			src: 'http://www.gitlab.com/am-wb/am-wb-commonhttps://unsplash.com/photos/8emNXIvrCL8/download?force=true'
		},
		controller: 'StodioWidget',
		isLeaf: false
	});

	$widget.newWidget({
		// widget description
		type: 'ObjectCollection',
		title: 'Object collection',
		description: 'A widget to show a collection of items',
		groups: ['seen'],
		icon: 'pages',
		model: '',
		// functional properties
		help: '',
		helpId: 'wb-seen-widget-collection',
		template: '<div></div>',
		controller: 'StudioSeenCollectionWidget'
	});

	$widget.newWidget({
		type: 'import',
		title: 'Import',
		description: 'Import a part of other content',
		groups: ['commons'],
		icon: 'import_export',
		setting: ['import'],
		// help
		help: '',
		helpId: '',
		// functional (page)
		template: '<div></div>',
		controller: 'StudioWidgetSeenImport'
	});



	//-----------------------------------------------------------------
	// Table
	//-----------------------------------------------------------------
	$widget.newWidget({
		title: 'Table',
		description: 'Table',
		groups: ['table'],
		icon: 'table',
		// help
		help: '',
		helpId: '',
		// functional (page)
		type: 'table',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		title: 'Table Header',
		description: 'Table Header',
		groups: ['table'],
		icon: 'table',
		// help
		help: '',
		helpId: '',
		// functional (page)
		type: 'thead',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		title: 'Table Body',
		description: 'Table Body',
		groups: ['table'],
		icon: 'table',
		// help
		help: '',
		helpId: '',
		// functional (page)
		type: 'tbody',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		title: 'Table Row',
		description: 'Table Body Row',
		groups: ['table'],
		icon: 'table',
		// help
		help: '',
		helpId: '',
		// functional (page)
		type: 'tr',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		title: 'Table Header Cell',
		description: 'Table Header Cell',
		groups: ['table'],
		icon: 'table',
		// help
		help: '',
		helpId: '',
		// functional (page)
		type: 'th',
		controller: 'StodioWidget',
		isLeaf: false
	});
	$widget.newWidget({
		title: 'Table Body Cell',
		description: 'Table Cell',
		groups: ['table'],
		icon: 'table',
		// help
		help: '',
		helpId: '',
		// functional (page)
		type: 'td',
		controller: 'StodioWidget',
		isLeaf: false
	});
});
