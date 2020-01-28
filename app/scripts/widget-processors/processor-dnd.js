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
 * @ngdoc Processor
 * @name WbProcessorDnd
 * @description Widget processor
 * 
 */
angular.module('vwStudio').factory('WbProcessorDnd', function(WbProcessorAbstract, $widget) {

	// In standard-compliant browsers we use a custom mime type and also encode the dnd-type in it.
	// However, IE and Edge only support a limited number of mime types. The workarounds are described
	// in https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
	//    var MIME_TYPE = 'application/x-dnd';
	//    var EDGE_MIME_TYPE = 'application/json';
	var MSIE_MIME_TYPE = 'Text';

	// All valid HTML5 drop effects, in the order in which we prefer to use them.
	var ALL_EFFECTS = ['move', 'copy', 'link'];

	// While an element is dragged over the list, this placeholder element is inserted
	// at the location where the element would be inserted after dropping.
	var placeholder = angular.element('<div class="wbDndPlaceholder"></div>');
	var placeholderNode = placeholder[0];
	placeholder.remove();


    /**
     * We use the position of the placeholder node to determine at which position of the array the
     * object needs to be inserted
     */
	function getPlaceholderIndex(widget) {
		var listNode = widget.getElement()[0];
		return Array.prototype.indexOf.call(listNode.children, placeholderNode);
	}

    /**
     * Small helper function that cleans up if we aborted a drop.
     */
	function stopDragover() {
		placeholder.remove();
		return true;
	}

    /**
     * Filters an array of drop effects using a HTML5 effectAllowed string.
     */
	function filterEffects(effects, effectAllowed) {
		if (effectAllowed === 'all') {
			return effects;
		}
		return effects.filter(function(effect) {
			return effectAllowed.toLowerCase().indexOf(effect) !== -1;
		});
	}

    /**
     * Given the types array from the DataTransfer object, returns the first valid mime type.
     * A type is valid if it starts with MIME_TYPE, or it equals MSIE_MIME_TYPE or EDGE_MIME_TYPE.
     */
	function getMimeType(types) {
		if (!types) {
			return MSIE_MIME_TYPE; // IE 9 workaround.
		}
		var converters = $widget.getConverters();
		for (var i = 0; i < converters.length; i++) {
			var converter = converters[i];
			if (_.includes(types, converter.getMimetype())) {
				return converter.getMimetype();
			}
		}
		return null;
	}


	//  /**
	//  * Determines the type of the item from the dndState, or from the mime type for items from
	//  * external sources. Returns undefined if no item type was set and null if the item type could
	//  * not be determined.
	//  */
	//  function getItemType(mimeType) {
	////if (dndState.isDragging){
	////return dndState.itemType || undefined;
	////}
	//  if (mimeType == MSIE_MIME_TYPE || mimeType == EDGE_MIME_TYPE){
	//  return null;
	//  }
	//  return (mimeType && mimeType.substr(MIME_TYPE.length + 1)) || undefined;
	//  }


    /**
     * Determines which drop effect to use for the given event. In Internet Explorer we have to
     * ignore the effectAllowed field on dataTransfer, since we set a fake value in dragstart.
     * In those cases we rely on dndState to filter effects. Read the design doc for more details:
     * https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
     */
	function getDropEffect(event, ignoreDataTransfer) {
		var effects = ALL_EFFECTS;
		if (!ignoreDataTransfer) {
			effects = filterEffects(effects, event.dataTransfer.effectAllowed);
		}
		//      if (dndState.isDragging) {
		//      effects = filterEffects(effects, dndState.effectAllowed);
		//      }
		//      if (attr.dndEffectAllowed) {
		//      effects = filterEffects(effects, attr.dndEffectAllowed);
		//      }
		// MacOS automatically filters dataTransfer.effectAllowed depending on the modifier keys,
		// therefore the following modifier keys will only affect other operating systems.
		if (!effects.length) {
			return 'none';
		} else if (event.ctrlKey && effects.indexOf('copy') !== -1) {
			return 'copy';
		} else if (event.altKey && effects.indexOf('link') !== -1) {
			return 'link';
		} else {
			return effects[0];
		}
	}

	function dragstart(event) {
		event = event.originalEvent || event;
		// 1 - load state, data and etc.
		var widget = $widget.widgetFromElement(event.currentTarget);

		widget.$$dndState = widget.$$dndState || {};

		// Initialize global state.
		widget.$$dndState.isDragging = true;
		widget.$$dndState.itemType = widget.getType();

		// Set the allowed drop effects. See below for special IE handling.
		widget.$$dndState.dropEffect = 'none';
		widget.$$dndState.effectAllowed = /*dndEffectAllowed ||*/ ALL_EFFECTS[0];

		// 2 - convert and put data
		event.dataTransfer.effectAllowed = widget.$$dndState.effectAllowed;
		var converters = $widget.getConverters();
		_.forEach(converters, function(converter) {
			try {
				event.dataTransfer.setData(converter.getMimetype(), converter.encode(widget));
			} catch (e) {
				// TODO: maso, 2019: log errors
				//                console.log('fail to convert to :' + converter.getMimetype(), e);
			}
		});

		// Internet Explorer and Microsoft Edge don't support custom mime types, see design doc:
		// https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
		////    var item = scope.$eval(attr.dndDraggable);
		////    var mimeType = MIME_TYPE + (dndState.itemType ? ('-' + dndState.itemType) : '');
		////    try {
		////    event.dataTransfer.setData(mimeType, angular.toJson(item));
		////    } catch (e) {
		////    // Setting a custom MIME type did not work, we are probably in IE or Edge.
		////    var data = angular.toJson({item: item, type: dndState.itemType});
		////    try {
		////    event.dataTransfer.setData(EDGE_MIME_TYPE, data);
		////    } catch (e) {
		////    // We are in Internet Explorer and can only use the Text MIME type. Also note that IE
		////    // does not allow changing the cursor in the dragover event, therefore we have to choose
		////    // the one we want to display now by setting effectAllowed.
		////    var effectsAllowed = filterEffects(ALL_EFFECTS, dndState.effectAllowed);
		////    event.dataTransfer.effectAllowed = effectsAllowed[0];
		////    event.dataTransfer.setData(MSIE_MIME_TYPE, data);
		////    }
		////    }

		// Try setting a proper drag image if triggered on a dnd-handle (won't work in IE).
		if (event._dndHandle && event.dataTransfer.setDragImage) {
			event.dataTransfer.setDragImage(widget.getElement()[0], 0, 0);
		}

		event.stopPropagation();
	}

	function dragend(event) {
		// Clean up
		placeholder.remove();
		event = event.originalEvent || event;
		var widget = $widget.widgetFromElement(event.currentTarget);
		widget.$$dndState.isDragging = false;
		widget.$$dndState.callback = undefined;

		// do action
		var effect = event.dataTransfer.dropEffect;
		switch (effect) {
			case 'move':
				widget.delete();
				break;
			case 'copy':
			case 'link':
			case 'canceled':
				//            console.log('not supported');
				break;
		}

		event.stopPropagation();
	}

	function dragenter(event) {
		// Calculate list properties, so that we don't have to repeat this on every dragover event.
		event = event.originalEvent || event;
		var widget = $widget.widgetFromElement(event.currentTarget);
		if (widget.isLeaf()) {
			return true;
		}
		var mimeType = getMimeType(event.dataTransfer.types);
		if (!mimeType) {
			return true;
		}
		event.preventDefault();
	}

	function dragover(event) {
		event = event.originalEvent || event;
		var widget = $widget.widgetFromElement(event.currentTarget);

		if (widget.isLeaf()) {
			return true;
		}
		// Check whether the drop is allowed and determine mime type.
		var mimeType = getMimeType(event.dataTransfer.types);
		//      var itemType = getItemType(mimeType);
		if (!mimeType) {
			return true;
		}

		var element = widget.getElement();
		var listNode = element[0];

		// Make sure the placeholder is shown, which is especially important if the list is empty.
		if (placeholderNode.parentNode !== listNode) {
			element.append(placeholder);
		}

		var listItemNode = null;
		var horizontal;
		var rect;
		if (widget.isLeaf()) {
			// Try to find the node direct directly below the list node.
			listItemNode = event.target;
			while (listItemNode.parentNode !== listNode && listItemNode.parentNode) {
				listItemNode = listItemNode.parentNode;
			}

			if (listItemNode.parentNode === listNode && listItemNode !== placeholderNode) {
				// If the mouse pointer is in the upper half of the list item element,
				// we position the placeholder before the list item, otherwise after it.
				rect = listItemNode.getBoundingClientRect();
				horizontal = true; // TODO:
				var isFirstHalf;
				if (horizontal) {
					isFirstHalf = event.clientX < rect.left + rect.width / 2;
				} else {
					isFirstHalf = event.clientY < rect.top + rect.height / 2;
				}
				listNode.insertBefore(placeholderNode,
					isFirstHalf ? listItemNode : listItemNode.nextSibling);
			}
		} else {
			horizontal = widget.isHorizontal();
			for (var i = 0; i < listNode.childNodes.length; i++) {
				var node = listNode.childNodes[i];
				rect = node.getBoundingClientRect();
				if (horizontal) {
					if (rect.left > event.clientX) {
						listItemNode = node;
						break;
					}
				} else {
					if (rect.top > event.clientY) {
						listItemNode = node;
						break;
					}
				}
			}
			if (listItemNode) {
				listNode.insertBefore(placeholderNode, listItemNode);
			}
		}

		// In IE we set a fake effectAllowed in dragstart to get the correct cursor, we therefore
		// ignore the effectAllowed passed in dataTransfer. We must also not access dataTransfer for
		// drops from external sources, as that throws an exception.
		var ignoreDataTransfer = mimeType === MSIE_MIME_TYPE;
		var dropEffect = getDropEffect(event, ignoreDataTransfer);
		if (dropEffect === 'none') {
			return stopDragover();
		}

		// Set dropEffect to modify the cursor shown by the browser, unless we're in IE, where this
		// is not supported. This must be done after preventDefault in Firefox.
		event.preventDefault();
		if (!ignoreDataTransfer) {
			event.dataTransfer.dropEffect = dropEffect;
		}

		event.stopPropagation();
		return false;
	}

	function drop(event) {
		event = event.originalEvent || event;

		// Check whether the drop is allowed and determine mime type.
		var mimeType = getMimeType(event.dataTransfer.types);
		//      var itemType = getItemType(mimeType);
		if (!mimeType) {
			return true;
		}

		// The default behavior in Firefox is to interpret the dropped element as URL and
		// forward to it. We want to prevent that even if our drop is aborted.
		event.preventDefault();

		// Unserialize the data that was serialized in dragstart.
		var data;
		try {
			var converter = $widget.getConverter(mimeType);
			data = converter.decode(event.dataTransfer.getData(mimeType));
		} catch (e) {
			placeholder.remove();
			return false;
		}

		// Drops with invalid types from external sources might not have been filtered out yet.
		//      if (mimeType === MSIE_MIME_TYPE || mimeType === EDGE_MIME_TYPE) {
		//      itemType = data.type || undefined;
		//      data = data.item;
		//      if (!isDropAllowed(itemType)) return stopDragover();
		//      }

		// Special handling for internal IE drops, see dragover handler.
		var ignoreDataTransfer = mimeType === MSIE_MIME_TYPE;
		var dropEffect = getDropEffect(event, ignoreDataTransfer);
		if (dropEffect === 'none') {
			return stopDragover();
		}

		// Invoke the callback, which can transform the transferredObject and even abort the drop.
		var widget = $widget.widgetFromElement(event.currentTarget);
		var index = getPlaceholderIndex(widget);
		widget.addChildrenModel(index, data);

		// Clean up
		placeholder.remove();
		event.stopPropagation();
		return false;
	}

	function dragleave(event) {
		event = event.originalEvent || event;
		var widget = $widget.widgetFromElement(event.currentTarget);

		var listNode = widget.getElement()[0];

		var newWidget = $widget.widgetFromPoint(event.clientX, event.clientY);
		if (!newWidget) {
			return;
		}
		var newTarget = newWidget.getElement()[0];
		if (!event._dndPhShown && listNode.contains(newTarget) && newWidget.isLeaf()) {
			// Signalize to potential parent lists that a placeholder is already shown.
			event._dndPhShown = true;
		} else {
			placeholder.remove();
		}
	}

    /**
     * Creates new instance of DND processor
     * 
     * @memberof WbProcessorDnd
     */
	function Processor() {
		WbProcessorAbstract.apply(this);
	}

	// extend functionality
	Processor.prototype = new WbProcessorAbstract();
	Processor.prototype.process = function(widget, event) {
		if (event.type !== 'stateChanged') {
			return;
		}
		var element = widget.getElement();
		if (widget.state === 'edit') {

            /*
             * Groups must handle:
             * - dragstart
             * - dragend
             */
			if (!widget.isRoot()) {
                /*
                 * Set the HTML5 draggable attribute on the element.
                 */
				element.attr('draggable', 'true');

                /*
                 * When the drag operation is started we have to prepare the dataTransfer object,
                 * which is the primary way we communicate with the target element
                 */
				element.on('dragstart', dragstart);

                /*
                 * The dragend event is triggered when the element was dropped or when the drag
                 * operation was aborted (e.g. hit escape button). Depending on the executed action
                 * we will invoke the callbacks specified with the dnd-moved or dnd-copied attribute.
                 */
				element.on('dragend', dragend);
			}

            /*
             * Groups must handle:
             * - dragenter
             * - dragover
             * - dragleave
             * - drop
             */
			if (!widget.isLeaf()) {
                /**
                 * The dragenter event is fired when a dragged element or text selection enters a valid drop
                 * target. According to the spec, we either need to have a dropzone attribute or listen on
                 * dragenter events and call preventDefault(). It should be noted though that no browser seems
                 * to enforce this behaviour.
                 */
				element.on('dragenter', dragenter);


                /**
                 * The dragover event is triggered "every few hundred milliseconds" while an element
                 * is being dragged over our list, or over an child element.
                 */
				element.on('dragover', dragover);

                /**
                 * We have to remove the placeholder when the element is no longer dragged over our list. The
                 * problem is that the dragleave event is not only fired when the element leaves our list,
                 * but also when it leaves a child element. Therefore, we determine whether the mouse cursor
                 * is still pointing to an element inside the list or not.
                 */
				element.on('dragleave', dragleave);

                /**
                 * When the element is dropped, we use the position of the placeholder element as the
                 * position where we insert the transferred data. This assumes that the list has exactly
                 * one child element per array element.
                 */
				element.on('drop', drop);
			}
		} else {
			element.removeAttr('draggable');
			element.off('dragstart', dragstart);
			element.off('dragend', dragend);
			if (!widget.isLeaf()) {
				element.off('dragenter', dragenter);
				element.off('dragover', dragover);
				element.off('dragleave', dragleave);
				element.off('drop', drop);
			}
		}
	};
	return Processor;
});
