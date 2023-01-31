import {LitElement, css, html} from 'lit';
import {property} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import monaco, {editor} from 'monaco-editor';

type Monaco = typeof monaco;

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

  protected static monaco?: Monaco;

  /**
   * @internal
   */
  protected abstract readonly PROPERTY_CHANGE_HANDLER_DICT: {
    [propertyName: string]: (value: any) => void;
  };

  /**
   * @internal
   */
  protected readonly mainContainerRef = createRef<HTMLDivElement>();

  /**
   * After component loaded, the `Monaco` instance can be obtained using this property.
   */
  get monaco() {
    return EditorBase.monaco;
  }

  /**
   * After component loaded, the editor instance can be obtained using this property.
   */
  editor?: T;

  /**
   * The `vs` path of the monaco editor. Default to the CDN url. It cannot be modified after the component is loaded.
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
          this.initializeEditor();
          break;
        default:
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
    if (!EditorBase.monaco) {
      EditorBase.monaco = await new Promise<Monaco>((resolve) => {
        const script = document.createElement('script');
        script.addEventListener('load', () => {
          script.remove();
          const require = (window as any).require;
          require.config({paths: {vs: this.vsPath}});
          require(['vs/editor/editor.main'], (monaco: Monaco) => {
            resolve(monaco);
          });
        });
        script.src = this.vsPath + '/loader.js';
        this.append(script);
      });
    }
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
