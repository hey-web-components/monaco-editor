import {LitElement, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import {until} from 'lit/directives/until.js';
import monacoLoader, {Monaco} from '@monaco-editor/loader';
import {editor} from 'monaco-editor';

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

export abstract class EditorBase<
  T extends editor.IStandaloneCodeEditor | editor.IStandaloneDiffEditor
> extends LitElement {
  static styles = STYLES;

  /**
   * @internal
   */
  protected abstract readonly PROPERTY_CHANGE_HANDLER_DICT: {
    [propertyName: string]: (value: any) => void;
  };

  /**
   * @internal
   */
  protected editorContainerRef = createRef<HTMLDivElement>();

  monaco?: Monaco;
  editor?: T;

  @property({attribute: 'vs-path', reflect: true}) vsPath: string =
    'https://unpkg.com/monaco-editor/min/vs';
  @property() abstract options?: editor.IEditorOptions;

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

  protected async initialize() {
    await this.loadMonaco();
    await this.loadEditor();
    this.defineEvents();
  }

  protected async loadMonaco() {
    if (this.vsPath) {
      monacoLoader.config({
        paths: {
          vs: this.vsPath,
        },
      });
    }
    this.monaco = await monacoLoader.init();
  }

  protected async obtainEditorCSSString() {
    const response = await fetch(`${this.vsPath}/editor/editor.main.css`);
    if (response.ok) {
      const result = await response.text();
      return result;
    }
    return '';
  }

  protected abstract loadEditor(): Promise<void>;

  protected abstract defineEvents(): void;
}
