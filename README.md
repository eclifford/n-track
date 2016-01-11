# Overview

**n-track** is a simple library for the collation of custom tracking information on the firing of any DOM L3 event fired on an HTML element decorated with a **n-track** observable `data-attribute`. I got tired of bloating all of my JavaScript files with custom Omniture or Google Analytics code that was tightly coupled with the DOM, brittle and hard to test/mock.

Most of the time all we care about is interaction counts **n-track** allows you to keep the tracking logic in the markup where it belongs and makes no assumptions as to what you wish to do with those events. It's easy to write adapters for Omniture, GA, Mongo, Redis, Hive/Hadoop etc since *n-track* simply gives you back a the element that emitted the event, the event itself and a POJO containing the tracking object in whatever schema you put in the HTML.

## Example

```html
<body data-track-config='category: sign-up-form'>
  <form>
      <input type="text" id="username" data-track-item='{ "type": "change", "action": "change-username" }'>
      <input type="text" id="firstname" data-track-item='{ "type": "change", "action": "change-firstname" }'>
      <input type="text" id="lastname" data-track-item='{ "type": "change", "action": "change-lastname" }'>
      <input type="submit" id="btnSignUp" data-track-item='{ "type": "click", "action": "submit" }' />
  </form>
  <script src="track.js"></script>
  <script>
    Track.init();
    // overwrite to store event however you wish
    Track.onTrackedEvent = function(element, tracking, event) {
      // element: element that event emitted from
      // tracking: POJO containing data-track-item object merged with parent data-track-config
      // event: name of DOM L3 event
    };
  </script>
</body>
```

## Getting Started

### Installation

## Advanced

### Handling DOM changes

### Dynamic Interpolation

### Adapter Example
