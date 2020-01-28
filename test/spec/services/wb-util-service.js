/* 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 weburger
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use strict';
var testDataW1 = {
		'type' : 'Group',
		'version' : 'wb1',
		'id' : 'main',
		'label' : 'main',
		'description' : 'main',
		'category' : 'http://schema.org/ImageObject',
		'event' : {
			'init' : 'var a = 10;',
			'click' : 'var a = 10;',
			'dblclick' : 'var a = 10;',
			'mouseout' : 'var a = 10;',
			'mouseover' : 'var a = 10;',
			'mousedown' : 'var a = 10;',
			'mouseup' : 'var a = 10;',
			'mouseenter' : 'var a = 10;',
			'resize' : 'var a = 10;',
			'mouseleave' : 'var a = 10;',
			'intersection' : 'var a = 10;',
			'success' : 'var a = 10;',
			'failure' : 'var a = 10;'
		},
		'style' : {
			'layout' : {
				'direction' : 'column',
				'align' : 'center',
				'justify' : 'space-around',
				'wrap' : true,
				'align_self' : 'stretch',
				'order' : 3,
				'basis' : '0px',
				'shrink' : 2,
				'grow' : 2
			},
			'size' : {
				'minHeight' : '1vh',
				'width' : '2%',
				'minWidth' : '3%',
				'maxWidth' : '4%',
				'height' : '5vh',
				'maxHeight' : '6vh'
			},
			'background' : {
				'image' : '/api/v2/cms/contents/3437/content',
				'color' : '#ad91e2',
				'size' : 'length',
				'repeat' : 'no-repeat',
				'attachment' : 'fixed',
				'origin' : 'border-box',
				'position' : 'left center'
			},
			'border' : {
				'style' : 'solid',
				'color' : '#f2a272',
				'width' : '2px 2px 2px 2px',
				'radius' : '11px 11px 11px 11px'
			},
			'align' : {},
			'direction' : 'rtl',
			'color' : '#1d7745',
			'cursor' : 'grab',
			'opacity' : '0.8',
			'overflow' : {
				'x' : 'hidden',
				'y' : 'hidden'
			},
			'margin' : '1px 1px 1px 1px',
			'padding' : '17px 17px 17px 17px',
			'shadows' : [ {
				'hShift' : '1px',
				'vShift' : '2px',
				'blur' : '3px',
				'spread' : '4px',
				'color' : 'red',
				'inset' : true
			}, {
				'hShift' : '5px',
				'vShift' : '60px',
				'blur' : '7px',
				'spread' : '8px',
				'color' : 'black',
				'inset' : false
			} ]
		},
		'contents' : [ {
			'name' : 'Header-1',
			'type' : 'h1',
			'version' : 'wb1',
			'html' : 'Test Site'
		}, {
			'name' : 'Pragraph',
			'type' : 'p',
			'version' : 'wb1'
		} ]
};
//var testDataW2 = {};
//var testDataW3 = {};


describe('Service $wbUtil ', function () {
	// instantiate service
	var $wbUtil;


	// load the service's module
	beforeEach(function(){
		module('vwStudio');
		inject(function (_$wbUtil_) {
			$wbUtil = _$wbUtil_;
		});
	});

	it('should not change model type if the model has type; Otherwise the type is set to "Group"', function () {
		var model1 = {
				type : 'section'
		};
		var model2 = {
		};

		var newModel = $wbUtil.clean(model1);
		expect(newModel.type).toBe('section');

		newModel = $wbUtil.clean(model2);
		expect(newModel.type).toBe('div');

		newModel = $wbUtil.clean({
			type: 'Group'
		});
		expect(newModel.type).toBe('div');

		newModel = $wbUtil.clean({
			type: 'Page'
		});
		expect(newModel.type).toBe('div');
	});

	it('should convert events of w1 to w4', function(){
		var newModel = $wbUtil.clean(_.cloneDeep(testDataW1));
		expect(angular.isDefined(newModel.on)).toBe(true);
		expect(angular.isDefined(newModel.event)).toBe(false);
		expect(newModel.on.click.indexOf(testDataW1.event.click) >= 0).toBe(true);
	});

	it('should convert style.size of w1 to w4', function(){
		var newModel = $wbUtil.clean(_.cloneDeep(testDataW1));
		expect(angular.isDefined(newModel.style)).toBe(true);
		expect(angular.isDefined(newModel.style.size)).toBe(false);

		expect(testDataW1.style.size.width).toBe(newModel.style.width);
		expect(testDataW1.style.size.minWidth).toBe(newModel.style.minWidth);
		expect(testDataW1.style.size.maxWidth).toBe(newModel.style.maxWidth);

		expect(testDataW1.style.size.height).toBe(newModel.style.height);
		expect(testDataW1.style.size.minHeight).toBe(newModel.style.minHeight);
		expect(testDataW1.style.size.maxHeight).toBe(newModel.style.maxHeight);
	});


	it('should convert style.background from w1 to w4', function(){
		var newModel = $wbUtil.clean(_.cloneDeep(testDataW1));

		// TODO: maso, 2019: support all type of background image
		expect(newModel.style.backgroundImage).toBe('url("'+testDataW1.style.background.image+'")');
		expect(newModel.style.backgroundColor).toBe(testDataW1.style.background.color);
		expect(newModel.style.backgroundSize).toBe(testDataW1.style.background.size);
		expect(newModel.style.backgroundRepeat).toBe(testDataW1.style.background.repeat);
		expect(newModel.style.backgroundOrigin).toBe(testDataW1.style.background.origin);
		expect(newModel.style.backgroundPosition).toBe(testDataW1.style.background.position);
	});

	it('should convert style.border from w1 to w4', function(){
		var newModel = $wbUtil.clean(_.cloneDeep(testDataW1));

		// TODO: maso, 2019: support all type of background image
		expect(newModel.style.borderStyle).toBe(testDataW1.style.border.style);
		expect(newModel.style.borderColor).toBe(testDataW1.style.border.color);
		expect(newModel.style.borderWidth).toBe(testDataW1.style.border.width);
		expect(newModel.style.borderRadius).toBe(testDataW1.style.border.radius);
	});

	it('should convert style.shadows from w1 to w4', function(){
		var newModel = $wbUtil.clean(_.cloneDeep(testDataW1));
		var shadow = '1px 2px 3px 4px red inset,5px 60px 7px 8px black';
		expect(newModel.style.boxShadow).toBe(shadow);
	});

	it('should convert style.layout from w1 to w4', function(){
		var newModel = $wbUtil.clean(_.cloneDeep(testDataW1));

		expect(newModel.style.display).toBe('flex');
		expect(newModel.style.flexGrow).toBe(testDataW1.style.layout.grow);
		expect(newModel.style.flexShrink).toBe(testDataW1.style.layout.shrink);
		expect(newModel.style.flexBasis).toBe(testDataW1.style.layout.basis);

		expect(newModel.style.flexDirection).toBe(testDataW1.style.layout.direction);
		expect(newModel.style.flexWrap).toBe('wrap');
		expect(newModel.style.justifyContent).toBe(testDataW1.style.layout.justify);

		expect(newModel.style.order).toBe(testDataW1.style.layout.order);
	});


	it('should find widget model by id', function(){
		var newModel = {
				type: 'div',
				id: 'a',
				key: 'a',
				children:[{
					type: 'div',
					id: 'b',
					key: 'b',
					children:[{
						type: 'div',
						id: 'c',
						key: 'c',
					}]
				}]
		};

		expect($wbUtil.findWidgetModelById(newModel, 'xxx')).toBe(null);

		expect($wbUtil.findWidgetModelById(newModel, 'a')).not.toBe(null);
		expect($wbUtil.findWidgetModelById(newModel, 'b')).not.toBe(null);
		expect($wbUtil.findWidgetModelById(newModel, 'c')).not.toBe(null);

		expect($wbUtil.findWidgetModelById(newModel, 'a').key).toBe('a');
		expect($wbUtil.findWidgetModelById(newModel, 'b').key).toBe('b');
		expect($wbUtil.findWidgetModelById(newModel, 'c').key).toBe('c');
	});

	it('should replace template with model', function(){
		var template = {
				type: 'div',
				id: 'a',
				key: 'a',
				children:[{
					type: 'div',
					id: 'b',
					key: 'b'
				}]
		};

		var newModel = {
				type: 'div',
				id: 'b',
				key: 'b',
				children:[{
					type: 'div',
					id: 'c',
					key: 'c',
				}]
		};
		
		$wbUtil.replaceWidgetModelById(template, 'b', newModel);

		expect($wbUtil.findWidgetModelById(template, 'xxx')).toBe(null);

		expect($wbUtil.findWidgetModelById(template, 'a')).not.toBe(null);
		expect($wbUtil.findWidgetModelById(template, 'b')).not.toBe(null);
		expect($wbUtil.findWidgetModelById(template, 'c')).not.toBe(null);

		expect($wbUtil.findWidgetModelById(template, 'a').key).toBe('a');
		expect($wbUtil.findWidgetModelById(template, 'b').key).toBe('b');
		expect($wbUtil.findWidgetModelById(template, 'c').key).toBe('c');
	});
});
