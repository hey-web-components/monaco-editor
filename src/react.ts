import React from 'react';
import {EventName, createComponent} from '@lit/react';
import * as monaco from 'monaco-editor';
import {HeyMonacoEditor, HeyMonacoDiffEditor} from './index';
import {EditorInstance} from './editor-base';

export const MonacoEditor = createComponent({
  tagName: 'hey-monaco-editor',
  elementClass: HeyMonacoEditor,
  react: React,
  events: {
    oneditorInitialized: 'editorInitialized' as EventName<
      CustomEvent<{monaco?: typeof monaco; editor?: EditorInstance}>
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
      CustomEvent<{monaco?: typeof monaco; editor?: EditorInstance}>
    >,
    ondidUpdateDiff: 'didUpdateDiff' as EventName<CustomEvent>,
  },
});
