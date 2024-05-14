import {LitElement, css, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {createRef, ref} from 'lit/directives/ref.js';
import * as monaco from 'monaco-editor';
import monacoCSS from 'monaco-editor/min/vs/editor/editor.main.css?inline';

type EditorInstance =
  | monaco.editor.IStandaloneCodeEditor
  | monaco.editor.IStandaloneDiffEditor;

const STYLES = [
  css`
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
  `,
  unsafeCSS(monacoCSS),
];

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
  get monaco() {
    return monaco;
  }

  /**
   * After component loaded, the editor instance can be obtained using this property.
   */
  editor?: T;

  /**
   * The `options` for the editor.
   */
  @property() abstract options?: monaco.editor.IEditorOptions;

  firstUpdated() {
    this.initializeEditor();
  }

  shouldUpdate(changedProperties: Map<string, unknown>) {
    changedProperties.forEach((_, key) => {
      switch (key) {
        default:
          this.PROPERTY_CHANGE_HANDLER_DICT[key]?.(
            (this as Record<string, unknown>)[key]
          );
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
    await this.loadMonaco();
    await this.loadEditor(this.innerContainerRef.value);
    this.defineEvents();
  }

  protected async loadMonaco() {
    self.MonacoEnvironment = {
      getWorker: function (_workerId, label) {
        const getWorkerModule = (moduleUrl: string, label: string) => {
          return new Worker(
            self.MonacoEnvironment?.getWorkerUrl?.(moduleUrl, label) ?? '',
            {
              name: label,
              type: 'module',
            }
          );
        };
        switch (label) {
          case 'json':
            return getWorkerModule(
              '/monaco-editor/esm/vs/language/json/json.worker?worker',
              label
            );
          case 'css':
          case 'scss':
          case 'less':
            return getWorkerModule(
              '/monaco-editor/esm/vs/language/css/css.worker?worker',
              label
            );
          case 'html':
          case 'handlebars':
          case 'razor':
            return getWorkerModule(
              '/monaco-editor/esm/vs/language/html/html.worker?worker',
              label
            );
          case 'typescript':
          case 'javascript':
            return getWorkerModule(
              '/monaco-editor/esm/vs/language/typescript/ts.worker?worker',
              label
            );
          default:
            return getWorkerModule(
              '/monaco-editor/esm/vs/editor/editor.worker?worker',
              label
            );
        }
      },
    };
  }

  protected defineEvents() {
    this.dispatchEvent(
      new CustomEvent<{monaco?: typeof monaco; editor?: EditorInstance}>(
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
