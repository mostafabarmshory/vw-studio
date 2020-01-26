///*
// * Copyright (c) 2015-2025 Phoinex Scholars Co. http://dpq.co.ir
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
//
//// TODO: hadi: move it to new module angular-material-home-seo
//angular.module('ngMaterialHome')
//
///**
// * @ngdoc service
// * @name $page
// * @description A page management service
// * 
// * 
// * 
// */
//.service('$page', function($rootScope, $rootElement) {
//
//
//
//	/*
//	 * <!-- OG -->
//	 * <meta property="og:site_name" content="$title">
//	 */
//
//	$rootScope.page = {
//		title: '',
//		description: '',
//		keywords: [],
//		links:[]
//	};
//	var page = $rootScope.page;
//
//	/**
//	 * 
//	 * @param title
//	 * @returns
//	 */
//	function setTitle(title){
//		page.title = title;
//		var head = $rootElement.find('head');
//		var elements = head.find('title');
//		var metaElement;
//		if(elements.length === 0){
//			// title element not found
//			metaElement = angular.element('<title></title>');
//			head.append(metaElement);
//		} else {
//			metaElement = angular.element(elements[0]);
//		}
//		metaElement.text(title);
//		setMeta('twitter:title', title);
//		setMetaOg('og:title', title);
//		return this;
//	}
//
//	/**
//	 * 
//	 * @returns
//	 */
//	function getTitle(){
//		return page.title;
//	}
//
//	/**
//	 * 
//	 * @param description
//	 * @returns
//	 */
//	function setDescription(description){
//		page.description = description;
//		setMeta('description', description);
//		setMeta('twitter:description', description);
//		setMetaOg('og:description', description);
//		return this;
//	}
//
//	/**
//	 * 
//	 * @returns
//	 */
//	function getDescription(){
////		return getMeta('description');
//		return page.description;
//	}
//
//	/**
//	 * 
//	 * @param keywords
//	 * @returns
//	 */
//	function setKeywords(keywords){
//		page.keywords = keywords;
//		setMeta('keywords', keywords);
//		return this;
//	}
//
//	/**
//	 * 
//	 * @returns
//	 */
//	function getKeywords(){
////		return getMeta('keywords');
//		return page.keywords;
//	}
//	
//	function setFavicon(favicon){
//		updateLink('favicon-link', {
//			href: favicon,
//			rel: 'icon'
//		});
//		setMeta('twitter:image', favicon);
//		setMetaOg('og:image', favicon);
//		return this;
//	}
//
//	function updateLink(key, data){
//		var searchkey = key.replace(new RegExp(':', 'g'), '\\:');
//		var head = $rootElement.find('head');
//		var elements = head.find('link[key='+searchkey+']');
//		var metaElement;
//		if(elements.length === 0){
//			// title element not found
//			metaElement = angular.element('<link key=\''+key+'\' />');
//			head.append(metaElement);
//		} else {
//			metaElement = angular.element(elements[0]);
//		}
//		for (var property in data) {
//			metaElement.attr(property, data[property]);
//		}
//		return this;
//	}
//
//	function setMeta(key, value){
//		var searchkey = key.replace(new RegExp(':', 'g'), '\\:');
//		var head = $rootElement.find('head');
//		var elements = head.find('meta[name='+searchkey+']');
//		var metaElement;
//		if(elements.length === 0){
//			// title element not found
//			metaElement = angular.element('<meta name=\''+key+'\' content=\'\' />');
//			head.append(metaElement);
//		} else {
//			metaElement = angular.element(elements[0]);
//		}
//		metaElement.attr('content', value);
//		return this;
//	}
//	
//	/**
//	 * Adds or set an OG meta tag to document.
//	 * Note: OG meta tag is differ than usual meta tags. Attributes of an OG meta tag are: property and content
//	 * while attributes of an usual meta tag are: name and content. 
//	 */
//	function setMetaOg(key, value){
//		var searchkey = key.replace(new RegExp(':', 'g'), '\\:');
//		var head = $rootElement.find('head');
//		var elements = head.find('meta[name='+searchkey+']');
//		var metaElement;
//		if(elements.length === 0){
//			// title element not found
//			metaElement = angular.element('<meta property=\''+key+'\' content=\'\' />');
//			head.append(metaElement);
//		} else {
//			metaElement = angular.element(elements[0]);
//		}
//		metaElement.attr('content', value);
//		return this;
//	}
//
//	/**
//	 * Adds or set an OG meta tag to document.
//	 * Note: OG meta tag is differ than usual meta tags. Attributes of an OG meta tag are: property and content
//	 * while attributes of an usual meta tag are: name and content. 
//	 */
//	function setMetaOg(key, value){
//		var searchkey = key.replace(new RegExp(':', 'g'), '\\:');
//		var head = $rootElement.find('head');
//		var elements = head.find('meta[name='+searchkey+']');
//		var metaElement;
//		if(elements.length === 0){
//			// title element not found
//			metaElement = angular.element('<meta property=\''+key+'\' content=\'\' />');
//			head.append(metaElement);
//		} else {
//			metaElement = angular.element(elements[0]);
//		}
//		metaElement.attr('content', value);
//		return this;
//	}
//	
//	/*
//	 * Service struct
//	 */
//	return {
//		// Init
//		setTitle: setTitle,
//		getTitle: getTitle,
//		setDescription: setDescription,
//		getDescription: getDescription,
//		setKeywords: setKeywords,
//		getKeywords: getKeywords,
//		setFavicon: setFavicon,
//		setMeta: setMeta,
//		setLink: updateLink
//	};
//});
