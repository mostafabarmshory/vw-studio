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


angular.module('vwStudio')

/**
 * @ngdoc Directives
 * @name wb-event-panel
 * @description Widgets settings
 * 
 * Loads list of settings.
 * 
 */
.directive('wbEventPanel', function () {
    /**
     * Init settings
     */
    function postLink($scope, $element, $attrs, $ctrls) {
        // Load ngModel
        var ngModelCtrl = $ctrls[0];
        var widget = null;
        var eventTypes = [{
            key: 'init',
            title: 'Initialization'
        }, {
            key: 'click',
            title: 'Click'
        }, {
            key: 'dblclick',
            title: 'Double click'
        }, {
            key: 'mouseout',
            title: 'Mouse out'
        }, {
            key: 'mouseover',
            title: 'Mouse over'
        }, {
            key: 'mousedown',
            title: 'Mouse down'
        }, {
            key: 'mouseup',
            title: 'Mouse up'
        }, {
            key: 'mouseenter',
            title: 'Mouse enter'
        }, {
            key: 'mouseleave',
            title: 'Mouse leave'
        }, {
            key: 'resize',
            title: 'Resize'
        }, {
            key: 'intersection',
            title: 'Intersection'
        }, {
            key: 'success',
            title: 'Success'
        }, {
            key: 'error',
            title: 'Failure'
        }, {
            key: 'load',
            title: 'Load'
        }, {
            key: 'load',
            title: 'Load'
        }];

        ngModelCtrl.$render = function () {
            if (ngModelCtrl.$viewValue) {
                cleanEvents();
                widget = ngModelCtrl.$viewValue;
                if (angular.isArray(widget)) {
                    if(widget.length > 0){
                        widget = widget[0];
                    }else {
                        widget = null;
                    }
                }
                loadEvents();
            }
        };

        function cleanEvents() {
            $scope.events = [];
        }

        function loadEvents() {
            cleanEvents();
            if(!widget){
                return;
            }
            for (var i = 0; i < eventTypes.length; i++) {
                var event = eventTypes[i];
                event.code = widget.getModelProperty('on.' + event.key);
                $scope.events.push(event);
            }
        }

        function saveEvents() {
            if(!widget){
                return;
            }
            for (var i = 0; i < $scope.events.length; i++) {
                var event = $scope.events[i];
                if (event.code) {
                    widget.setModelProperty('on.' + event.key, event.code);
                } else {
                    widget.setModelProperty('on.' + event.key, undefined);
                }
            }
        }

        /**
         * Save events into the model
         */
        $scope.saveEvents = saveEvents;

        $element.on('keypress keyup keydown paste copy', function(event){
            event.stopPropagation();
        });
    }

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/directives/wb-event-panel.html',
        scope: {},
        link: postLink,
        require: ['ngModel'],
        controllerAs: 'ctrl',
        /*
         * @ngInject
         */
        controller: function ($scope, $resource) {

            var defaultLanguages = [{
                text: 'JavaScript',
                value: 'javascript'
            }];
            this.editEvent = function (event, $evn) {
                $evn.stopPropagation();
                $resource.get('script', {
                    data: {
                        language: 'javascript',
                        languages: defaultLanguages,
                        code: event.code
                    }
                }).then(function (value) {
                    event.code = value.code;
                    if (!value) {
                        delete event.code;
                    }
                    $scope.saveEvents();
                });
            };

            this.deleteEvent = function (event, $evn) {
                $evn.stopPropagation();
                delete event.code;
                $scope.saveEvents();
            };
        }
    };
});
