import {LitElement, css} from 'lit';
import {property} from 'lit/decorators.js';
import monacoLoader, {Monaco} from '@monaco-editor/loader';
import {editor} from 'monaco-editor';

const STYLES = css`
  :host {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  #editor-container {
    all: initial;
    position: relative;
    display: block;
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
   * After component loaded, the `Monaco` instance can be obtained using this property.
   */
  monaco?: Monaco;

  /**
   * After component loaded, the editor instance can be obtained using this property.
   */
  editor?: T;

  /**
   * The `vs` path of the monaco editor. Default to the CDN url.
   */
  @property({attribute: 'vs-path', reflect: true}) vsPath: string =
    'https://unpkg.com/monaco-editor@0.34.1/min/vs';

  /**
   * The `options` for the editor.
   */
  @property() abstract options?: editor.IEditorOptions;

  shouldUpdate(changedProperties: Map<string, any>) {
    changedProperties.forEach((_, key) => {
      switch (key) {
        case 'vsPath':
          this.initialize();
          break;
        default:
          this.PROPERTY_CHANGE_HANDLER_DICT[key]?.((this as any)[key]);
          break;
      }
    });
    return true;
  }

  protected async initialize() {
    await this.loadEditorStyles();
    await this.loadMonaco();
    await this.loadEditor(this.initializeEditorContainer());
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

  protected initializeEditorContainer() {
    const editorContainer = document.createElement('div');
    editorContainer.id = 'editor-container';
    this.shadowRoot?.replaceChildren(editorContainer);
    return editorContainer;
  }

  protected abstract loadEditor(editorContainer: HTMLDivElement): Promise<void>;

  protected abstract defineEvents(): void;
}
