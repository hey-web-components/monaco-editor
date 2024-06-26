# Introduction

`@hey-web-components/monaco-editor` is a web component wrapper for [monaco-editor](https://microsoft.github.io/monaco-editor/).

Getting started to use [monaco-editor](https://microsoft.github.io/monaco-editor/) with code as simple as:
```html
<script type="module" src="https://unpkg.com/@hey-web-components/monaco-editor"></script>
<hey-monaco-editor></hey-monaco-editor>
```

See [demos and docs](https://hey-web-components.github.io/monaco-editor/).

## How to install

### Install with NPM

```bash
npm i @hey-web-components/monaco-editor
```

## How to import

### From HTML

To obtain it directly from the CDN, it can be imported by simply adding a `script` tag like this:

```html
<script
  type="module"
  src="https://unpkg.com/@hey-web-components/monaco-editor"
></script>
```

If it is installed locally, then it can be imported by adding a `script` tag like this:

```html
<script
  type="module"
  src="node_modules/@hey-web-components/monaco-editor/dist/cdn/index.js"
></script>
```

### From JavaScript

Assuming it is installed locally by using NPM, then it can be imported like this:

```js
import '@hey-web-components/monaco-editor';
```

This `import` statement would define the custom elements automatically.

## How to use

For standard editor:

```html
<hey-monaco-editor></hey-monaco-editor>
```

For diff editor:

```html
<hey-monaco-diff-editor></hey-monaco-diff-editor>
```

More details can be found from [demos and docs](https://hey-web-components.github.io/monaco-editor/).

### Config `vs` path (optional)

This wrapper does not contain the [monaco-editor](https://microsoft.github.io/monaco-editor/) library, it will fetch the library accroding to the `vs` path (from the AMD bundle of the [monaco-editor](https://microsoft.github.io/monaco-editor/) library). Thus, different versions of `monaco-editor` can be used. The default `vs` path value is set to a CDN url but it can be replaced with a custom path.

To set a custom `vs` path, simply import and call `setVsPath()` function before loading the components.

```js
import {setVsPath} from '@hey-web-components/monaco-editor';
setVsPath('the/custom/path');
```

Alternatively, the `vs` path can be set by setting `__MONACO_VS_PATH__` property of the `window` object.

```js
window.__MONACO_VS_PATH__ = 'the/custom/path';
```

### Notes

* For React, it is recommended to use [@lit-labs/react](https://www.npmjs.com/package/@lit-labs/react) to convert the web elements into React components.
