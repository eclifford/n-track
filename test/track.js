describe("Track", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-track-group='{ "category": "foo" }'>
        <input id='test' type='button' data-track-item='{ "action": "test" }'></input>
        <input type='button' data-namespace-item='{ "action": "test" }'></input>
        <input id='interpolatedInput' type='text' value='foo' data-track-item='{ "type": "change", "prop1": "#{value}"}'
      </div>
    `;
  });

  describe("init()", () => {
    it("should handle config options", () => {
      Track.init({'namespace': 'track'});
      expect(Track.options.namespace).to.equal('track');
    });
  });

  describe("getTrackedElements()", () => {
    it("should find and return any elements set to be tracked", () => {
      let itemsToTrack = Track.getTrackedElements();
      expect(itemsToTrack.length).to.equal(2);
    });
    it("should not find elements that don't exist", () => {
      let cache = document.body.innerHTML;
      document.body.innerHTML = '';
      let itemsToTrack = Track.getTrackedElements();
      expect(itemsToTrack.length).to.equal(0);
      document.body.innerHTML = cache;
    });
  });

  describe("getConfig()", () => {
    it("should find the nearest config element", () => {
      let childElement = document.getElementById('test');
      let configAttrs = Track.getConfig(childElement);
      expect(configAttrs).to.deep.equal({ category: 'foo'});
    });
    it("should handle no config node gracefully", () => {
      document.body.innerHTML = `
        <input id='test' type='button' data-track-item='{ "action": "test" }'></input>
        <input type='button' data-namespace-item='{ "action": "test" }'></input>
      `;
      let childElement = document.getElementById('test');
      expect(function() {
        let configAttrs = Track.getConfig(childElement);
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
