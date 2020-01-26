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


angular.module('ngMaterialHome')


/***********************************************************************
 * Editors
 ***********************************************************************/
.run(function ($widget, $resource) {

	/*
	 * 
	 * meta.type: file, image, media
	 */
	function filePickerCallback(callback, value, meta) {
		// Provide file and text for the link dialog
		if (meta.filetype == 'file') {
			return $resource.get('url', {
				value: value
			})
			.then(function(url){
				callback(url, {
					text: 'My text'
				});
			});
		}

		// Provide image and alt text for the image dialog
		if (meta.filetype == 'image') {
			return $resource.get('image-url', {
				value: value
			})
			.then(function(url){
				callback(url, {
					alt: 'My text'
				});
			});
		}

		// Provide alternative source and posted for the media dialog
		if (meta.filetype == 'media') {
			return $resource.get('media', {
				value: value
			})
			.then(function(url){
				callback(url, {
					source2: 'alt.ogg', 
					poster: 'image.jpg'
				});
			});
		}
	}

	/***************************************
	 * Section editor
	 * 
	 *  A section is combination of blocks
	 * widgets such as h, p, and pre. This 
	 * is an editor to edit the section.
	 ***************************************/
	$widget.setEditor('section', {
		type: 'WidgetEditorTinymceSection',
		options:{
			inline: true,
			menubar: false,
			inline_boundaries: false,
			plugins: ['link', 'lists', 'powerpaste', 'autolink', 'code', 'image', 'fonticon', 'fullpage'],
			valid_elements: '*[*]',
			// Toolbar
			toolbar: ['close save code | image fonticon | undo redo | bold italic underline link | fontselect fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent | fullpage'],
			fixed_toolbar_container: '#demo-widget-editor-toolbar',
			toolbar_drawer: 'floating',
			// multimedia and file
			file_picker_callback: filePickerCallback,
			file_picker_types: 'file image media',
			// Image
			image_caption: true,
			image_advtab: true,
			image_description: true,
			image_dimensions: true,
			image_uploadtab: true,
//			image_list: imageList,
//			images_upload_handler: imagesUploadHandler
		}
	});

	/***************************************
	 * Single line editor
	 * 
	 *  Single line editor is used for nay widget
	 * with html property.
	 ***************************************/
	var lineWidgetsTypes = [
		'h1','h2','h3','h4','h5','h6', 
		'li',
		'button',
		'a',
		'p',
		'figcaption',
		'i', 'em', 
		's', 'samp', 'small', 'span', 'strong', 
		'mark', 'cite', 'dfn'
		];
	_.forEach(lineWidgetsTypes, function(type){
		$widget.setEditor(type, {
			type: 'WidgetEditorTinymceSingleLine',
			options:{
				property: 'html',
				inline: true,
				menubar: false,
				inline_boundaries: false,
				plugins: ['link', 'code', 'image', 'fonticon'],
				valid_elements: '*[*]',
				// Toolbar
				toolbar: 'close save code | image fonticon | undo redo | bold italic underline link| fontselect fontsizeselect | forecolor backcolor | widgetalignleft widgetaligncenter widgetalignjustify widgetalignright ',
				fixed_toolbar_container: '#demo-widget-editor-toolbar',
				toolbar_drawer: 'floating',
				// multimedia and file
				file_picker_callback: filePickerCallback,
				file_picker_types: 'file image media',
				// Image
				image_caption: true,
				image_advtab: true,
				image_description: true,
				image_dimensions: true,
				image_uploadtab: true,
//				image_list: imageList,
//				images_upload_handler: imagesUploadHandler
			}
		});
	});

	/************************************
	 * Code editor
	 * 
	 ************************************/
	$widget.setEditor('pre', {
		type: 'WidgetEditorCode',
		options: {}
	});
	$widget.setEditor('style', {
		type: 'WidgetEditorCode',
		options: {}
	});
});
