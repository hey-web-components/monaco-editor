import {LitElement, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import monacoLoader, {Monaco} from '@monaco-editor/loader';
import {editor} from 'monaco-editor';

type EditorInstance =
  | editor.IStandaloneCodeEditor
  | editor.IStandaloneDiffEditor;

const STYLES = css`
  :host {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
  }

  [part~='inner-container'] {
    all: initial;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

/**
 * @fires {CustomEvent<{monaco?: Monaco; editor?: EditorInstance}>} editorInitialized - Fires when the editor is initialized.
 */
export abstract class EditorBase<T extends EditorInstance> extends LitElement {
  static styles = STYLES;

  /**
   * @internal
   */
  protected abstract readonly PROPERTY_CHANGE_HANDLER_DICT: {
    [propertyName: string]: (value: unknown) => void;
  };

  /**
   * @internal
   */
  protected readonly innerContainerRef = createRef<HTMLDivElement>();

  /**
   * After component loaded, the `Monaco` instance can be obtained using this property.
   */
  monaco?: Monaco;

  /**
   * After component loaded, the editor instance can be obtained using this property.
   */
  editor?: T;

  /**
   * The `vs` path of the monaco editor (`AMD` version). Default to the CDN url.
   */
  @property({attribute: 'vs-path', reflect: true}) vsPath =
    'https://cdn.jsdelivr.net/npm/monaco-editor@0.35.0/min/vs';

  /**
   * The `options` for the editor.
   */
  @property() abstract options?: editor.IEditorOptions;

  firstUpdated() {
    this.initializeEditor();
  }

  shouldUpdate(changedProperties: Map<string, unknown>) {
    changedProperties.forEach((_, key) => {
      switch (key) {
        case 'vsPath':
          break;
        default:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.PROPERTY_CHANGE_HANDLER_DICT[key]?.((this as any)[key]);
          break;
      }
    });
    return true;
  }

  render() {
    return html`<div
      ${ref(this.innerContainerRef)}
      part="inner-container"
    ></div>`;
  }

  protected async initializeEditor() {
    await this.loadEditorStyles();
    await this.loadMonaco();
    await this.loadEditor(this.innerContainerRef.value);
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

  protected async loadEditorStyles() {
    const styleSheet = new CSSStyleSheet();
    const response = await fetch(`${this.vsPath}/editor/editor.main.css`);
    if (response.ok) {
      const result = await response.text();
      await styleSheet.replace(result);
    }
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [
        ...this.shadowRoot.adoptedStyleSheets,
        styleSheet,
      ];
    }
  }

  protected defineEvents() {
    this.dispatchEvent(
      new CustomEvent<{monaco?: Monaco; editor?: EditorInstance}>(
        'editorInitialized',
        {
          detail: {monaco: this.monaco, editor: this.editor},
          bubbles: true,
          composed: true,
          cancelable: true,
        }
      )
    );
  }

  protected abstract loadEditor(
    editorContainer?: HTMLDivElement
  ): Promise<void>;
}
