import {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';

import '../../../src/hey-monaco-editor';

export default {
  title: 'Components/Standard Editor',
  component: 'hey-monaco-editor',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onEditorInitialized: {action: 'editorInitialized'},
    onDidChangeModelContent: {action: 'didChangeModelContent'},
  },
  render: (args) =>
    html`<hey-monaco-editor
      style="height: 360px; width: 480px; border: 1px solid grey;"
      .value=${args.value}
      .language=${args.language}
      .options=${args.options}
      @editorInitialized=${args.onEditorInitialized}
      @didChangeModelContent=${args.onDidChangeModelContent}
    ></hey-monaco-editor>`,
} as Meta;

export const Default: StoryObj = {
  name: 'Default',
  args: {
    value: 'var x = 0;',
    language: 'typescript',
    options: {
      theme: 'vs',
      readOnly: false,
    },
  },
};
