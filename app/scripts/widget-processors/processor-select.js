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
 * @ngdoc Processor
 * @name WbProcessorSelect
 * @description Widget processor
 * 
 */
.factory('WbProcessorSelect', function ($rootScope, $widget, WbProcessorAbstract) {
	var EVENT_TYPE_SELECTION_CHANGE = 'selectionChange';

	function Processor(){
		WbProcessorAbstract.apply(this, arguments);
		this.selectedWidgets = [];

		var ctrl = this;
		this.clickListener = function($event){
			try{
				$event.preventDefault();
				$event.stopPropagation();
			} catch(ex){
				log.error({
					source: 'WbProcessorSelect',
					message: 'fail to stop event propagation (click)',
					error: ex
				});
			}
			var widget = $event.source;
			if(ctrl.lock || widget.isSilent() || widget.isSelected()){
				return;
			}
			ctrl.lock = true;
			try{
				if($event.shiftKey){
					ctrl.addSelectedWidgets(widget);
				} else {
					ctrl.setSelectedWidgets(widget);
				}

				$rootScope.$digest();
			} catch(ex){
				log.error({
					source: 'WbProcessorSelect',
					message: 'fail to selec a widget type:' + widget.getType(),
					error: ex
				});
			} finally {
				delete ctrl.lock;
			}
		};

		this.dblclickListener = function($event){
			var widget = $event.source;
			if(ctrl.lock || widget.isSilent()){
				return;
			}
			ctrl.lock = true;
			try{
				ctrl.setSelectedWidgets(widget);
				// Open an editor 
				var editor = $widget.getEditor(widget);
				editor.show();

				$event.preventDefault();
				$event.stopPropagation();

				$rootScope.$digest();
			} catch(ex){
				log.error({
					source: 'WbProcessorSelect',
					message: 'fail to open editor for a widget of type:' + widget.getType(),
					error: ex
				});
			} finally {
				delete ctrl.lock;
			}
		};

		this.selectionListener = function($event){
			var widget = $event.source;
			if(ctrl.lock || widget.isSilent()){
				return;
			}
			ctrl.setSelectedWidgets(widget);
		};
	}
	Processor.prototype = new WbProcessorAbstract();

	/**
	 * Processes the widget based on event
	 * 
	 * @memberof WbProcessorSelect
	 */
	Processor.prototype.process = function(widget, event){
		if(event.type !== 'stateChanged') {
			return;
		}
		if(widget.state === 'edit') {
			widget.on('click', this.clickListener);
			widget.on('dblclick', this.dblclickListener);
			widget.on('select', this.selectionListener);
		} else {
			widget.off('click', this.clickListener);
			widget.off('dblclick', this.dblclickListener);
			widget.off('select', this.selectionListener);
		}
	};

	/**
	 * Enable the processor
	 * 
	 * @memberof WbProcessorSelect
	 */
	Processor.prototype.setEnable = function(enable){
		this.enable = enable;
	};

	/**
	 * Sets selected widgets
	 * 
	 * @memberof WbProcessorSelect
	 */
	Processor.prototype.setSelectedWidgets = function(widgets){
		if(!_.isArray(widgets)){
			widgets = [...arguments];
		}

		try{
			this.lock = true;
			_.forEach(this.selectedWidgets, function(widget){
				if(!_.includes(widgets, widget)){
					widget.setSelected(false);
				}
			});

			// clear selection
			// TODO: maso, 2019: check if shift key is hold
			this.selectedWidgets = widgets;
			_.forEach(this.selectedWidgets, function(widget){
				widget.setSelected(true);
			});
		} finally{
			this.lock = false;
		}

		this.fire(EVENT_TYPE_SELECTION_CHANGE, {
			widgets: this.selectedWidgets
		});
	};

	Processor.prototype.addSelectedWidgets = function(widgets){
		if(!_.isArray(widgets)){
			widgets = [...arguments];
		}
		this.setSelectedWidgets(_.concat(this.selectedWidgets, widgets));
	};

	Processor.prototype.getSelectedWidgets = function(){
		return _.clone(this.selectedWidgets || []);
	};

	return Processor;
});
