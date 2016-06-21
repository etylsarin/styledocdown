# styledocdown
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Parse style-doc comment tags and output as a markdown document

## Usage

Add [styledocdown] to your build tool:

```bash
npm install styledocdown --save-dev
```

#### Node

```js
require('styledocdown').process(YOUR_CSS, { /* options */ });
```

#### Gulp

Use existing [gulp-styledocdown](https://github.cometylsarin/gulp-styledocdown) plugin.

## Options

### options.root (optional)
Type: `String`  
Default: File directory

Set the location where the linked files are hosted.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/styledocdown
[npm-image]: https://badge.fury.io/js/styledocdown.png

[travis-url]: http://travis-ci.org/etylsarin/styledocdown
[travis-image]: https://secure.travis-ci.org/etylsarin/styledocdown.png?branch=master
