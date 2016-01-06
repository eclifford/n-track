describe("Track", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-track-group='{ "category": "foo" }'>
        <input id='test' type='button' data-track-item='{ "action": "test" }'></input>
        <input type='button' data-namespace-item='{ "action": "test" }'></input>
      </div>
    `;
    Track.init({'attribute': 'track-item'});
  });

  describe("init()", () => {
    it("should handle config options", () => {
      Track.init({'attribute': 'custom'});
      expect(Track.options.attribute).to.equal('custom');
    });
  });

  describe("getTrackedElements()", () => {
    it("should find and return any elements set to be tracked", () => {
      let itemsToTrack = Track.getTrackedElements();
      expect(itemsToTrack.length).to.equal(1);
    });
    it("should not find elements that do not exist", () => {
      let cache = document.body.innerHTML;
      document.body.innerHTML = '';
      let itemsToTrack = Track.getTrackedElements();
      expect(itemsToTrack.length).to.equal(0);
      document.body.innerHTML = cache;
    });
  });

  describe("addTrackingEvent()", () => {
    it("should throw if not provided an HTMLElement", () => {
      expect(() => {
        Track.addTrackingEvent({}, "click");
      }).to.throw();
    });
    it("should add an event to the events list", () => {
      let prevNumEvents = Track.events.length;
      let testElement = document.getElementById('test');
      Track.addTrackingEvent(testElement, 'click');
      expect(Track.events.length).to.equal(prevNumEvents + 1);
    });
  });

  describe("removeTrackingEvent()", () => {
    it("should throw if not provided an HTMLElement", () => {
      expect(() => {
        Track.removeTrackingEvent({}, "click", function() {});
      }).to.throw();
    });
    it("should remove an event from the events list", () => {
      let prevNumEvents = Track.events.length;
      let testElement = document.getElementById('test');
      Track.removeTrackingEvent(testElement, 'click', function() {});
      expect(Track.events.length).to.equal(prevNumEvents - 1);
    });
  });

  describe("removeTrackingEvents()", () => {
    it("should remove all tracking events", () => {
      expect(Track.events.length).to.equal(1);
      Track.removeTrackingEvents();
      expect(Track.events.length).to.equal(0);
    });
  });

  describe("getTrackingConfig()", () => {
    it("should find the nearest config element", () => {
      let childElement = document.getElementById('test');
      let configAttrs = Track.getTrackingConfig(childElement);
      expect(configAttrs).to.deep.equal({ category: 'foo'});
    });
    it("should handle no config node gracefully", () => {
      document.body.innerHTML = `
        <input id='test' type='button' data-track-item='{ "action": "test" }'></input>
        <input type='button' data-namespace-item='{ "action": "test" }'></input>
      `;
      let childElement = document.getElementById('test');
      expect(function() {
        let configAttrs = Track.getTrackingConfig(childElement);
      }).to.not.throw();
    });
  });

  describe.skip("parseAttributes", () => {
    it("should parse string interpolated values", () => {
      let element = document.getElementById('interpolatedInput');
      Track.parseAttribute(element);

      // Track.parseAttribute('{"action": "foo", "prop5": "${1+1}"}');
    });
  });

});
