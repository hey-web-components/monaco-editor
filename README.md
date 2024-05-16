# Introduction

`@hey-web-components/monaco-editor` is a web component wrapper for [monaco-editor](https://microsoft.github.io/monaco-editor/).

See [demos and docs](https://hey-web-components.github.io/monaco-editor/).

## How to install

### Install with NPM

```bash
npm i @hey-web-components/monaco-editor
```

## How to import

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

### Notes
* When using Vite, add the following into the Vite config:
  ```js
  {
    optimizeDeps: {
      exclude: ["@hey-web-components/monaco-editor"],
    }
  }
  ```
* For React:
  ```js
  import { MonacoEditor, MonacoDiffEditor } '@hey-web-components/monaco-editor/react';
  <MonacoEditor></MonacoEditor>
  <MonacoDiffEditor></MonacoDiffEditor>
  ```
