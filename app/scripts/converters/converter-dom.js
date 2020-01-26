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

angular.module('vwStudio')//

/**
 * @ngdoc Converter
 * @name WbConverterDom
 * @description Widget converter
 * 
 * A converter are responsible to encode and decode a widget.
 * 
 */
.factory('WbConverterDom', function (WbConverterAbstract, $widget) {
	function cssNameToJsName(name)
	{
		var split = name.split('-');
		var output = '';
		for(var i = 0; i < split.length; i++)
		{
			if (i > 0 && split[i].length > 0 && !(i === 1 && split[i] === 'ms'))
			{
				split[i] = split[i].substr(0, 1).toUpperCase() + split[i].substr(1);
			}
			output += split[i];
		}
		return output;
	}

	function convertElementToModel(element){
		var name = element.tagName;
		if(!name){
			return null;
		}
		name = name.toLowerCase();
		if(!$widget.hasWidget(name)){
			return null;
		}
		var model = {
				style:{}
		};
		model.type = name;
		// attributes
		_.forEach(element.attributes, function(attr){
			if(attr.name == 'style'){
				return;
			}
			if(attr.name == 'type'){
				model[model.type+'Type'] = attr.value;
				return;
			}
			model[attr.name] = attr.value;
		});
		//style
		for(var i = 0; i < element.style.length; i++){
			var sname = element.style.item(i);
			model.style[cssNameToJsName(sname)] = element.style.getPropertyValue(sname);
		}
		if($widget.isWidgetLeaf(name)){
			// html
			model.html = element.innerHTML;
			if(model.type === 'pre'){
				model.text = element.innerText;
			}
		} else {
			model.children = [];
			_.forEach(element.children, function(childelement){
				var childWidget = convertElementToModel(childelement);
				if(childWidget){
					model.children.push(childWidget);
				}
			});
			if(model.type === 'li' && model.children.length === 0){
				model.children.push({
					type: 'p',
					html: element.innerText
				});
			}
		}
		return model;
	}

	function Converter(){
		WbConverterAbstract.apply(this, ['text/html']);
	}
	Converter.prototype = new WbConverterAbstract();

	Converter.prototype.encode = function(){
		var widgets = Array.prototype.slice.call(arguments) || [];
		var data = '';
		while(widgets.length){
			var widget = widgets.pop();
			data += widget.getElement().prop('outerHTML') + '\n';
		}
		return data;
	};

	Converter.prototype.decode = function(data){
		var widgets = [];
		try{
			var element = angular.element(data);
			for(var i = 0; i < element.length; i++){
				var model = convertElementToModel(element[i]);
				if(model){
					widgets.push(model);
				}
			}
		} catch(ex){
//			console.error(ex);
		}
		return widgets;
	};


	return Converter;
});

