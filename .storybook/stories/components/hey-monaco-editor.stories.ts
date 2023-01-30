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
    onDidChangeModelContent: {action: 'didChangeModelContent'},
  },
  render: (args) =>
    html`<hey-monaco-editor
      style="height: 80vh; width: 80vw; border: 1px solid black;"
      .vsPath=${args.vsPath}
      .value=${args.value}
      .language=${args.language}
      .options=${args.options}
      @didChangeModelContent=${args.onDidChangeModelContent}
    ></hey-monaco-editor>`,
} as Meta;

export const Default: StoryObj = {
  name: 'Default',
  args: {
    vsPath: 'https://unpkg.com/monaco-editor@0.34.1/min/vs',
    value: 'var x = 0;',
    language: 'typescript',
    options: {
      theme: 'vs',
      readOnly: false,
    },
  },
};