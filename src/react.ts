import React from 'react';
import {EventName, createComponent} from '@lit/react';
import * as monaco from 'monaco-editor';
import {HeyMonacoEditor, HeyMonacoDiffEditor} from './index';

export const MonacoEditor = createComponent({
  tagName: 'hey-monaco-editor',
  elementClass: HeyMonacoEditor,
  react: React,
  events: {
    oneditorInitialized: 'editorInitialized' as EventName<
      CustomEvent<{
        monaco?: typeof monaco;
        editor?: monaco.editor.IStandaloneCodeEditor;
      }>
    >,
    ondidChangeModelContent: 'didChangeModelContent' as EventName<
      CustomEvent<monaco.editor.IModelContentChangedEvent>
    >,
  },
});

export const MonacoDiffEditor = createComponent({
  tagName: 'hey-monaco-diff-editor',
  elementClass: HeyMonacoDiffEditor,
  react: React,
  events: {
    oneditorInitialized: 'editorInitialized' as EventName<
      CustomEvent<{
        monaco?: typeof monaco;
        editor?: monaco.editor.IStandaloneDiffEditor;
      }>
    >,
    ondidUpdateDiff: 'didUpdateDiff' as EventName<CustomEvent>,
  },
});
