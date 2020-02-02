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
		// widget description
		type: 'a',
		title: 'A link',
		description: 'A widget to add external link. It is used as block item.',
		icon: 'wb-widget-a',
		groups: ['basic'],
		// functional properties
		template: '<a></a>',
		model: {
			html: 'Link title'
		},
		controller: 'WbWidgetA',
		isLeaf: true
	});
	$widget.newWidget({
		// widget description
		type: 'address',
		title: 'address',
		description: 'description.',
		icon: 'wb-widget-address',
		groups: ['basic'],
		// functional properties
		template: '<address></address>',
		controller: 'WbWidgetAddress',
		isLeaf: false
	});
	$widget.newWidget({
		// widget description
		type: 'applet',
		title: 'applet',
		description: 'applet.',
		icon: 'wb-widget-applet',
		groups: ['basic'],
		// functional properties
		template: '<applet></applet>',
		controller: 'WbWidgetApplet',
		isLeaf: true
	});
	$widget.newWidget({
		// widget description
		type: 'area',
		title: 'area',
		description: 'area',
		icon: 'wb-widget-area',
		groups: ['basic'],
		// functional properties
		template: '<area></area>',
		controller: 'WbWidgetArea'
	});
	$widget.newWidget({
		// widget description
		type: 'article',
		title: 'article',
		description: 'article',
		icon: 'wb-widget-article',
		groups: ['basic'],
		// functional properties
		template: '<article></article>',
		controller: 'WbWidgetArticle'
	});
	$widget.newWidget({
		// widget description
		type: 'aside',
		title: 'aside',
		description: 'aside',
		icon: 'wb-widget-aside',
		groups: ['basic'],
		// functional properties
		template: '<aside></aside>',
		controller: 'WbWidgetAside'
	});
	$widget.newWidget({
		type: 'audio',
		title: 'Audio',
		label: 'audio',
		icon: 'wb-widget-audio',
		description: 'This widget is used to add audio in the document.',
		groups: ['basic'],
		template: '<audio></audio>',
		model: {
			media: '(min-width: 650px)',
			src: 'http://www.gitlab.com/am-wb/am-wb-commonhttps://unsplash.com/photos/8emNXIvrCL8/download?force=true'
		},
		controller: 'WbWidgetAudio',
		isLeaf: false,
	});
	$widget.newWidget({
		type: 'blockquote',
		title: 'blockquote',
		label: 'blockquote',
		icon: 'wb-widget-blockquote',
		description: 'description',
		groups: ['basic'],
		template: '<blockquote></blockquote>',
		controller: 'WbWidgetBlockquote',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'button',
		title: 'button',
		label: 'button',
		icon: 'wb-widget-button',
		description: 'description',
		groups: ['basic'],
		template: '<button></button>',
		controller: 'WbWidgetButton',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'canvas',
		title: 'canvas',
		label: 'canvas',
		icon: 'wb-widget-canvas',
		description: 'description',
		groups: ['basic'],
		template: '<canvas></canvas>',
		controller: 'WbWidgetCanvas',
		isLeaf: true,
	});
	$widget.newWidget({
		type: 'datalist',
		title: 'datalist',
		label: 'datalist',
		icon: 'wb-widget-datalist',
		description: 'description',
		groups: ['basic'],
		template: '<datalist></datalist>',
		controller: 'WbWidgetDatalist',
	});
	$widget.newWidget({
		type: 'dd',
		title: 'dd',
		label: 'dd',
		icon: 'wb-widget-dd',
		description: 'description',
		groups: ['basic'],
		template: '<dd></dd>',
		controller: 'WbWidgetDd',
	});
	$widget.newWidget({
		type: 'details',
		title: 'details',
		label: 'details',
		icon: 'wb-widget-details',
		description: 'description',
		groups: ['basic'],
		template: '<details></details>',
		controller: 'WbWidgetDetails',
	});
	$widget.newWidget({
		type: 'dialog',
		title: 'dialog',
		label: 'dialog',
		icon: 'wb-widget-dialog',
		description: 'description',
		groups: ['basic'],
		template: '<dialog></dialog>',
		controller: 'WbWidgetDialog',
	});
	$widget.newWidget({
		type: 'div',
		title: 'div',
		label: 'div',
		icon: 'wb-widget-div',
		description: 'description',
		groups: ['basic'],
		template: '<div></div>',
		controller: 'WbWidgetDiv',
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
		controller: 'WbWidgetDl',
	});
	$widget.newWidget({
		type: 'dt',
		title: 'dt',
		label: 'dt',
		icon: 'wb-widget-dt',
		description: 'description',
		groups: ['basic'],
		template: '<dt></dt>',
		controller: 'WbWidgetDt',
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
		controller: 'WbWidgetEmbed',
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
		controller: 'WbWidgetFieldset',
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
		controller: 'WbWidgetFigcaption',
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
		controller: 'WbWidgetFigure',
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
		controller: 'WbWidgetFooter',
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
		controller: 'WbWidgetForm',
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
		controller: 'WbWidgetFrame',
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
		controller: 'WbWidgetFrameset',
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
			controller: 'WbWidgetH',
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
		controller: 'WbWidgetHeader',
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
		controller: 'WbWidgetHr',
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
		controller: 'WbWidgetI',
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
		controller: 'WbWidgetIframe',
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
		controller: 'WbWidgetImg',
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
		controller: 'WbWidgetInput',
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
		controller: 'WbWidgetKbd',
	});
	$widget.newWidget({
		type: 'label',
		title: 'label',
		label: 'label',
		icon: 'wb-widget-label',
		description: 'description',
		groups: ['basic'],
		template: '<label></label>',
		controller: 'WbWidgetLabel',
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
		controller: 'WbWidgetLegend',
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
		controller: 'WbWidgetLi',
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
		controller: 'WbWidgetLink',
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
		controller: 'WbWidgetMain',
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
		controller: 'WbWidgetMap',
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
		controller: 'WbWidgetMeta'
	});
	$widget.newWidget({
		type: 'meter',
		title: 'meter',
		label: 'meter',
		icon: 'wb-widget-meter',
		description: 'description',
		groups: ['basic'],
		template: '<meter></meter>',
		controller: 'WbWidgetMeter',
	});
	$widget.newWidget({
		type: 'nav',
		title: 'nav',
		label: 'nav',
		icon: 'wb-widget-nav',
		description: 'description',
		groups: ['basic'],
		template: '<nav></nav>',
		controller: 'WbWidgetNav',
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
		controller: 'WbWidgetNoscript',
	});
	$widget.newWidget({
		type: 'object',
		title: 'object',
		label: 'object',
		icon: 'wb-widget-object',
		description: 'description',
		groups: ['basic'],
		template: '<object></object>',
		controller: 'WbWidgetObject',
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
		controller: 'WbWidgetOl',
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
		controller: 'WbWidgetOptgroup',
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
		controller: 'WbWidgetOption',
	});
	$widget.newWidget({
		type: 'output',
		title: 'output',
		label: 'output',
		icon: 'wb-widget-output',
		description: 'description',
		groups: ['basic'],
		template: '<output></output>',
		controller: 'WbWidgetOutput',
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
		controller: 'WbWidgetP',
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
		controller: 'WbWidgetParam',
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
		controller: 'WbWidgetPicture',
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
		controller: 'WbWidgetPre',
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
		controller: 'WbWidgetProgress'
	});
	$widget.newWidget({
		type: 'q',
		title: 'q',
		label: 'q',
		icon: 'wb-widget-q',
		description: 'description',
		groups: ['basic'],
		template: '<q></q>',
		controller: 'WbWidgetQ',
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
		controller: 'WbWidgetS',
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
		controller: 'WbWidgetSamp',
	});
	$widget.newWidget({
		type: 'script',
		title: 'script',
		label: 'script',
		icon: 'wb-widget-script',
		description: 'description',
		groups: ['basic'],
		template: '<script></script>',
		controller: 'WbWidgetScript',
	});
	$widget.newWidget({
		type: 'section',
		title: 'section',
		label: 'section',
		icon: 'wb-widget-section',
		description: 'description',
		groups: ['basic'],
		template: '<section></section>',
		controller: 'WbWidgetSection',
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
		controller: 'WbWidgetSelect',
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
		controller: 'WbWidgetSmall',
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
		controller: 'WbWidgetSource',
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
		controller: 'WbWidgetSpan',
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
		controller: 'WbWidgetStrong',
	});
	$widget.newWidget({
		type: 'style',
		title: 'style',
		label: 'style',
		icon: 'wb-widget-style',
		description: 'description',
		groups: ['basic'],
		template: '<style></style>',
		controller: 'WbWidgetStyle',
	});
	$widget.newWidget({
		type: 'summary',
		title: 'summary',
		label: 'summary',
		icon: 'wb-widget-summary',
		description: 'description',
		groups: ['basic'],
		template: '<summary></summary>',
		controller: 'WbWidgetSummary',
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
		controller: 'WbWidgetSvg',
	});
	$widget.newWidget({
		type: 'template',
		title: 'template',
		label: 'template',
		icon: 'wb-widget-template',
		description: 'description',
		groups: ['basic'],
		template: '<template></template>',
		controller: 'WbWidgetTemplate',
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
		controller: 'WbWidgetTextarea',
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
		controller: 'WbWidgetTrack',
	});
	$widget.newWidget({
		type: 'ul',
		title: 'ul',
		label: 'ul',
		icon: 'wb-widget-ul',
		description: 'description',
		groups: ['basic'],
		template: '<ul></ul>',
		controller: 'WbWidgetUl',
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
		controller: 'WbWidgetVideo',
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
		controller: 'AmWbSeenCollectionWidget'
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
		controller: 'WbWidgetSeenImport'
	});
});
