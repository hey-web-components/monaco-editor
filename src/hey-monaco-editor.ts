import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import {until} from 'lit/directives/until.js';
import monacoLoader, {Monaco} from '@monaco-editor/loader';
import {editor} from 'monaco-editor';

type EditorOptions = editor.IEditorOptions & editor.IGlobalEditorOptions;

const STYLES = css`
  :host {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  #editor-container {
    width: 100%;
    height: 100%;
  }
`;

@customElement('hey-monaco-editor')
export class HeyMonacoEditor extends LitElement {
  static styles = STYLES;

  private readonly PROPERTY_CHANGE_HANDLER_DICT: {
    [propertyName: string]: (value: any) => void;
  } = {
    value: (value?: string) => {
      if (value !== this.editor?.getValue()) {
        this.editor?.setValue(value ?? '');
      }
    },
    language: (value?: string) => {
      const model = this.editor?.getModel();
      if (model) {
        this.monaco?.editor.setModelLanguage(model, value ?? '');
      }
    },
    options: (value?: EditorOptions) => this.editor?.updateOptions(value ?? {}),
  };

  private editorContainerRef = createRef<HTMLDivElement>();

  monaco?: Monaco;
  editor?: editor.IStandaloneCodeEditor;

  @property({attribute: 'vs-path', reflect: true}) vsPath: string =
    'https://unpkg.com/monaco-editor/min/vs';
  @property({attribute: 'value', reflect: true}) value?: string;
  @property({attribute: 'language', reflect: true}) language?: string;
  @property() options?: EditorOptions;

  firstUpdated() {
    this.initialize();
  }

  shouldUpdate(changedProperties: Map<string, any>) {
    changedProperties.forEach((_, key) =>
      this.PROPERTY_CHANGE_HANDLER_DICT[key]?.((this as any)[key])
    );
    return true;
  }

  render() {
    return html`
      <style>
        ${html`${until(this.obtainEditorCSSString())}`}
      </style>
      <div ${ref(this.editorContainerRef)} id="editor-container"></div>
    `;
  }

  private async initialize() {
    await this.loadMonaco();
    await this.loadEditor();
    this.defineEvents();
  }

  private async loadMonaco() {
    if (this.vsPath) {
      monacoLoader.config({
        paths: {
          vs: this.vsPath,
        },
      });
    }
    this.monaco = await monacoLoader.init();
  }

  private async obtainEditorCSSString() {
    const response = await fetch(`${this.vsPath}/editor/editor.main.css`);
    if (response.ok) {
      const result = await response.text();
      return result;
    }
    return '';
  }

  private async loadEditor() {
    const editorContainer = this.editorContainerRef.value;
    if (editorContainer) {
      this.editor = this.monaco?.editor.create(editorContainer, {
        value: this.value,
        language: this.language,
        automaticLayout: true,
      });
      this.editor?.updateOptions(this.options ?? {});
    }
  }

  private defineEvents() {
    this.editor?.onDidChangeModelContent((event) => {
      this.value = this.editor?.getValue();
      this.dispatchEvent(
        new CustomEvent('didChangeModelContent', {
          detail: event,
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hey-monaco-editor': HeyMonacoEditor;
  }
}
