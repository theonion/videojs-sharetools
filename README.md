VideoJS Sharetools
==================

A customizable share tools plugin for videojs

## Usage

Include the plugin:

```html
<script src="videojs.sharetools.js"></script>
```

Initialize it, and add your share urls:

```js
plugins: {
  sharetools: {
    embed: function(settings) {
      return "<div>Whatever you want!</div>"
    }
  }
}
```

### Options

- `facebook` a function that will get called with the `options` object passed to it.
- `twitter` a function that will get called with the `options` object passed to it.
- `embed` a function that will get called with the `options` object passed to it.


### Using the Example

To run the testing platform:

```bash
$ bower install
$ cd example
$ npm install
$ node web.js
```
