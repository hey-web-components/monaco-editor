import {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';

import '../../../src/hey-monaco-diff-editor';

export default {
  title: 'Components/Diff Editor',
  component: 'hey-monaco-diff-editor',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onDidUpdateDiff: {action: 'onDidUpdateDiff'},
  },
  render: (args) =>
    html`<hey-monaco-diff-editor
      style="height: 80vh; width: 80vw; border: 1px solid black;"
      .vsPath=${args.vsPath}
      .original=${args.original}
      .originalLanguage=${args.originalLanguage}
      .modified=${args.modified}
      .modifiedLanguage=${args.modifiedLanguage}
      .options=${args.options}
      @didUpdateDiff=${args.onDidUpdateDiff}
    ></hey-monaco-diff-editor>`,
} as Meta;

export const Default: StoryObj = {
  // name: 'Default',
  args: {
    vsPath: 'https://unpkg.com/monaco-editor@0.34.1/min/vs',
    original: 'var x = 0;\nvar y = 0;\nvar z = 0;',
    originalLanguage: 'typescript',
    modified: 'var x = 0;\nvar y = 1;\nvar z = 0;',
    modifiedLanguage: 'typescript',
    options: {
      theme: 'vs',
      readOnly: false,
    },
  },
};
