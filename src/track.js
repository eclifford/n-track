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
    define([], factory);
  } else {
    // Browser globals (root is window)
    root.Track = factory();
  }
}(window, function () {
  'use strict';

  let Track = {
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
    init(config) {
      // setup
      this.options = Object.assign({}, this.options, config);
      this.elements = this.getTrackedElements();
      this.setupTrackingEvents(this.elements);
    },

    /**
     * reset()
     *
     * @example
     *     Track.reset()
     */
    reset() {
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
    getTrackedElements() {
      return [].slice.call(document.querySelectorAll(`[data-${this.options.attribute}]`));
    },

    /**
     * setupTrackingEvents()
     *
     * @param {Array[HTMLElement]} elements
     *
     * @example
     *     Track.setupTrackingElements([HTMLElement, HTMLElement])
     */
    setupTrackingEvents(elements) {
      elements.forEach((element) => {
        let tracking = this.getElementTracking(element);

        tracking.forEach((track) => {
          this.addTrackingEvent(element, track.type);
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
    addTrackingEvent(element, type) {
      if (!(element && element instanceof HTMLElement)) {
        throw new Error("Track.addTrackingEvent(): expects parameter element to an HTMLElement");
      }

      let handler = (e) => {
        this.handleTrackingEvent(element, e);
      };

      element.addEventListener(type, handler, false);

      this.events.push({ 'element': element, 'event': type, 'handler': handler});
    },

    /**
     * removeTrackingEvents()
     *
     * @example
     *     Track.removeTrackingEvents()
     */
    removeTrackingEvents() {
      this.events.forEach((event) => {
        this.removeTrackingEvent(event.element, event.type, event.handler);
      });
      this.events = [];
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
    removeTrackingEvent(element, event, handler) {
      element.removeEventListener(event, handler, false);
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
    getElementTracking(element) {
      let attributes = element.getAttribute(`data-${this.options.attribute}`);
      let trackingJSON;
      try {
        attributes = attributes.replace(/\#{(.+?)\}/g, function(match, p1) {
          return evalInElementScope.call(element);
          function evalInElementScope() {
            // TODO: fix this hack by properly HTML encoding and decoding where appropriate
            let exp = p1.replace(/\\/g, "");
            return eval(exp);
          }
        });
        trackingJSON = JSON.parse(attributes);
      } catch (e) {
        console.log(e);
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
    getTrackingConfig(element) {
      if (!(element instanceof HTMLElement)) {
        return {};
      }
      let attr = element.getAttribute('data-track-group');
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
    handleTrackingEvent(element, event) {
      let tracking = this.getElementTracking(element)[0];
      let config = this.getTrackingConfig(element);
      tracking = Object.assign({}, tracking, config);

      this.onTrackedEvent(element, tracking, event);
    },

    _htmlEscape(str) {
      return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
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
    onTrackedEvent(element, tracking, event) {
      console.log(Object.assign({}, tracking, {
        created_at: new Date(event.timeStamp),
        prop1: 'eclifford@pandora.com',
        prop2: "Sales Operation Manager",
        prop3: 'r7chhpaedj9fxv6pt4i942cplao9tldq',
        prop4: window.location.href
      }));
      // adapter overloads this function
    }
  };
  return Track;
}));
