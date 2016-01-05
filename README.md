# Overview

## Features

- Decorate HTML elements with contextual tracking information
- Capture DOM level 3 (UI Events)
- Allow for on DOM Event Eval Execution
- Don't hard code implementation (use adapter for Hive/Hadoop)
- Mutation Observer for changes in the DOM post page load

## Todo
- Events exposed as an Observable Stream to allow for custom logic (adapter) in Events


```html
<body data-track-config='category: test, action: test'>
  <fieldset data-track-config='sub-category: foo'>
    <div>
      <input type="button" data-track-item="type: click, action: die to bees, prop1: {this.innerHTML}, prop2: {"window", username}></input>
      <input type="button" data-track-item='{"type": "click", "action": "die to bees", "prop1": "innerHTML", "prop2": "{window, username}"}'></input>
    </div>
  </fieldset>
</body>
```
