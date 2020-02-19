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

/**
 * Common actions on a page
 * 
 * Groups
 * - studio.pages: All actions about a lisf ot pages
 * - studio.pages.read: These actions read page content and display
 * - studio.pages.export:
 * - studio.pages.import:
 * - studio.pages.analysis:
 */
angular.module('vwStudio').run(function(
		/* mblowfish */ $actions, $navigator,
		/* angularjs */ $window
) {

	function canCreateContent() {
		return true;
	}

	$actions.newAction({
		id: 'studio.cms.contents.preview',
		type: 'action',
		priority: 11,
		icon: 'list',
		title: 'Preview',
		description: 'Open page with related application.',
		// @ngInject
		action: function($event) {
			var pages = $event.pages || [];
			_.forEach(pages, function(page) {
				// TODO: maso, 2020: check if meta is loaded
				var url;
				_.forEach(page.metas, function(meta) {
					if (meta.key === 'link.canonical') {
						url = meta.value;
					}
				});
				if (url) {
					$window.open(url, '_blank');
				} else {
					$window.alert('Canonical link is not defined');
				}
			});
		},
		groups: ['studio.pages', 'studio.pages.read']
	});

	$actions.newAction({
		id: 'studio.cms.contents.edit',
		type: 'action',
		priority: 11,
		icon: 'list',
		title: 'Edit',
		description: 'Edit selected pages',
		// @ngInject
		action: function($event) {
			// TODO: maso, 2020: support multiple pages
			var pages = $event.pages || [];
			$navigator.openPage('pages/' + pages[0].id);
		},
		groups: ['studio.pages', 'studio.pages.read']
	});

	$actions.newAction({
		id: 'studio.cms.contents.new',
		priority: 10,
		icon: 'add_box',
		title: 'New',
		description: 'Add a new page',
		visible: canCreateContent,
		// @ngInject
		action: function($event) {
			var config = {};
			config.name = $event.name;
			// open dialog to create the model
			return $navigator.openDialog({
				templateUrl: 'views/dialogs/amh-content-new.html',
				controller: 'AmhPageNewDialogCtrl',
				controllerAs: 'ctrl',
				config: config
			});
		},
		groups: ['studio.pages', 'studio.pages.create'],
	});
});