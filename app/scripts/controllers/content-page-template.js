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


//Test controller
angular.module('vwStudio')
.controller('AmhContentTemplatesCtrl', function ($scope, $controller, $cms, $http, $navigator, $wbUtil) {

    /*
     * Extends collection controller
     */
    angular.extend(this, $controller('MbSeenAbstractCollectionCtrl', {
        $scope : $scope
    }));

    // Override the schema function
    this.getModelSchema = function () {
        return $cms.contentSchema();
    };

    // get contents
    this.getModels = function (parameterQuery) {
    	parameterQuery.setFilter('taxonomy', 'template');
    	parameterQuery.put('graphql', '{current_page,page_number,items{term{id,name},contents{id, name, title, description, media_type}}}');
        return $cms.getTermTaxonomies(parameterQuery);
    };

    // get a content
    this.getModel = function (id) {
        return $cms.getContent(id);
    };
    

	/**
	 * Shows a preview of a template
	 * 
	 * @memberof AmhMainPageTmplCtrl
	 * @param {type} template
	 * @return {promiss} to load preview
	 */
	this.showPreviewOf = function(page){
		// load content
		if ($scope.loadingTemplatePreview) {
			return $scope.loadingTemplatePreview;
		}
		var responseData;
		var ctrl = this;
		$scope.loadingTemplatePreview = $http.get('/api/v2/cms/contents/'+page.id+'/content') //
		.then(function(response) {
			responseData = $wbUtil.clean(response.data);
			return $navigator.openDialog({
				templateUrl: 'views/dialogs/amh-template-preview.html',
				config: {
					model: responseData,
					page: page
				}
			});
		})//
		.then(function(){
			if(angular.isFunction(ctrl.applyTemplate)){
				ctrl.applyTemplate(responseData);
			}
		})
		.finally(function(){
			delete $scope.loadingTemplatePreview;
		});
		return $scope.loadingTemplatePreview;
	};
	
    this.init({
    	eventType: '/cms/contents'
    });
    

    /*
     * Add store listener
     * 
     * This is an internal function, is overried to handle my-page condition
     */
    this.eventHandlerCallBack = function(){
        if(this._eventHandlerCallBack){
            return this._eventHandlerCallBack ;
        }
        var ctrl = this;
        this._eventHandlerCallBack = function($event){
        	// check values are a template. Then update the list
        };
        return this._eventHandlerCallBack;
    };
});