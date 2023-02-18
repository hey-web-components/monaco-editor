import {LitElement, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import monacoLoader, {Monaco} from '@monaco-editor/loader';
import {editor} from 'monaco-editor';

const STYLES = css`
  :host {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  #main-container {
    all: initial;
  }

  #main-container,
  #editor-container {
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
    [propertyName: string]: (value: unknown) => void;
  };

  /**
   * @internal
   */
  protected readonly mainContainerRef = createRef<HTMLDivElement>();

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
    'https://unpkg.com/monaco-editor@0.35.0/dev/vs';

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
    return html`<div ${ref(this.mainContainerRef)} id="main-container"></div>`;
  }

  protected async initializeEditor() {
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
    this.mainContainerRef?.value?.replaceChildren(editorContainer);
    return editorContainer;
  }

  protected abstract loadEditor(editorContainer: HTMLDivElement): Promise<void>;

  protected abstract defineEvents(): void;
}
