import {customElement, property} from 'lit/decorators.js';
import {createRef} from 'lit/directives/ref.js';
import {editor} from 'monaco-editor';
import {EditorBase} from './editor-base';

type EditorOptions = editor.IEditorOptions & editor.IGlobalEditorOptions;

/**
 * @fires {CustomEvent<editor.IModelContentChangedEvent>} didChangeModelContent - Fires when model content of the editor is changed.
 */
@customElement('hey-monaco-editor')
export class HeyMonacoEditor extends EditorBase<editor.IStandaloneCodeEditor> {
  /**
   * @internal
   */
  protected readonly PROPERTY_CHANGE_HANDLER_DICT: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  /**
   * @internal
   */
  protected editorContainerRef = createRef<HTMLDivElement>();

  /**
   * The value for the editor.
   */
  @property({attribute: 'value', reflect: true}) value?: string;

  /**
   * The language for the editor.
   */
  @property({attribute: 'language', reflect: true}) language?: string;

  @property() options?: EditorOptions;

  protected async loadEditor(editorContainer?: HTMLDivElement) {
    if (editorContainer) {
      this.editor = this.monaco?.editor.create(editorContainer, {
        value: this.value,
        language: this.language,
        automaticLayout: true,
      });
      this.editor?.updateOptions(this.options ?? {});
    }
  }

  protected override defineEvents() {
    super.defineEvents();
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
