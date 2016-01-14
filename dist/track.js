'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*!
 * n-track
 * http://github.com/eclifford/n-track
 *
 * Author: Eric Clifford
 * Email: ericgclifford@gmail.com
 * Date: 12.07.2015
 *
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], function () {
      return root.Track = factory();
    });
  } else {
    // Browser globals (root is window)
    root.Track = factory();
  }
})(window, function () {
  'use strict';

  var Track = {
    version: '0.0.1',

    options: {
      'attribute': 'track-item'
    },

    events: [],

    /**
     * init()
     *
     * @param {Object} config
     *
     * @example
     *     Track.init()
     */
    init: function init(config) {
      // setup
      this.options = _extends({}, this.options, config);
      this.reset();
    },

    /**
     * reset()
     *
     * @example
     *     Track.reset()
     */
    reset: function reset() {
      this.removeTrackingEvents();
      this.elements = this.getTrackedElements();
      this.setupTrackingEvents(this.elements);
    },

    /**
     * getTrackedElements()
     *
     * @return {Array[HTMLElement]}
     *
     * @example
     *     Track.getTrackedElements()
     */
    getTrackedElements: function getTrackedElements() {
      return [].slice.call(document.querySelectorAll('[data-' + this.options.attribute + ']'));
    },

    /**
     * setupTrackingEvents()
     *
     * @param {Array[HTMLElement]} elements
     *
     * @example
     *     Track.setupTrackingElements([HTMLElement, HTMLElement])
     */
    setupTrackingEvents: function setupTrackingEvents(elements) {
      var _this = this;

      elements.forEach(function (element) {
        var tracking = _this.getElementTracking(element);

        tracking.forEach(function (track) {
          _this.addTrackingEvent(element, track.type);
        });
      });
    },

    /**
     * addTrackingEvent()
     *
     * @param {HTMLElement} element
     * @param {String} type
     *
     * @example
     *     Track.addTrackingEvent(HTMLElement, String)
     */
    addTrackingEvent: function addTrackingEvent(element, type) {
      var _this2 = this;

      if (!(element && element instanceof HTMLElement)) {
        throw new Error("Track.addTrackingEvent(): expects parameter element to an HTMLElement");
      }

      var handler = function handler(e) {
        _this2.handleTrackingEvent(element, e);
      };

      $(element).on(type, handler);

      this.events.push({ 'element': element, 'type': type, 'handler': handler });
    },

    /**
     * removeTrackingEvents()
     *
     * @example
     *     Track.removeTrackingEvents()
     */
    removeTrackingEvents: function removeTrackingEvents() {
      var _this3 = this;

      this.events.forEach(function (event) {
        _this3.removeTrackingEvent(event.element, event.type, event.handler);
      });
    },

    /**
     * removeTrackingEvent()
     *
     * @param {HTMLElement} element
     * @param {DOMEvent} event
     * @param {Function} handler
     *
     * @example
     *     Track.removeTrackingEvent()
     */
    removeTrackingEvent: function removeTrackingEvent(element, event, handler) {
      if (!(element && element instanceof HTMLElement)) {
        throw new Error("Track.addTrackingEvent(): expects parameter element to an HTMLElement");
      }

      // remove stored tracking event
      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i].element === element) {
          this.events.splice(i, 1);
          break;
        }
      }

      // remove event listener
      $(element).off(event, handler);
    },

    /**
     * parseTrackingFromElement()
     *
     * @param {HTMLElement} element
     * @return {Array[Object]}
     *
     * @example
     *     Track.parseTrackingFromElement()
     */
    getElementTracking: function getElementTracking(element) {
      var attributes = element.getAttribute('data-' + this.options.attribute);
      var trackingJSON = undefined;
      try {
        attributes = attributes.replace(/\#{(.+?)\}/g, function (match, p1) {
          return evalInElementScope.call(element);
          function evalInElementScope() {
            // TODO: fix this hack by properly HTML encoding and decoding where appropriate
            var exp = p1.replace(/\\/g, "");
            return eval(exp);
          }
        });
        trackingJSON = JSON.parse(attributes);
      } catch (e) {
        throw new Error('getElementTracking(): there was an error while parsing data attributes');
      }
      return Array.isArray(trackingJSON) ? trackingJSON : [trackingJSON];
    },

    /**
     * getConfig()
     *
     * @param {HTMLElement} element
     * @return {Object}
     *
     * @example
     *     Track.parseTrackingFromElement()
     */
    getTrackingConfig: function getTrackingConfig(element) {
      if (!(element instanceof HTMLElement)) {
        return {};
      }
      var attr = element.getAttribute('data-track-group');
      if (attr) {
        return JSON.parse(attr);
      } else {
        return this.getTrackingConfig(element.parentNode);
      }
    },

    /**
     * handleTrackingEvent()
     *
     * @param {HTMLElement} element
     * @param {DOMEvent} event
     *
     * @example
     *     Track.handleTrackingEvent()
     */
    handleTrackingEvent: function handleTrackingEvent(element, event) {
      var tracking = this.getElementTracking(element)[0];
      var config = this.getTrackingConfig(element);
      tracking = _extends({}, tracking, config);

      this.onTrackedEvent(element, tracking, event);
    },

    /**
     * onTrackedEvent()
     *
     * @param {HTMLElement} element
     * @param {Object} tracking
     * @param {DOMEvent} event
     *
     * @example
     *     Track.onTrackedEvent()
     */
    onTrackedEvent: function onTrackedEvent(element, tracking, event) {
      // overload me
    }
  };
  return Track;
});
