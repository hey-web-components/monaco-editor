import {customElement, property} from 'lit/decorators.js';
import {createRef} from 'lit/directives/ref.js';
import {editor} from 'monaco-editor';
import {EditorBase} from './editor-base';

/**
 * @fires {CustomEvent} didUpdateDiff - Fires when the diff is updated.
 */
@customElement('hey-monaco-diff-editor')
export class HeyMonacoDiffEditor extends EditorBase<editor.IStandaloneDiffEditor> {
  /**
   * @internal
   */
  protected readonly PROPERTY_CHANGE_HANDLER_DICT: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [propertyName: string]: (value: any) => void;
  } = {
    original: (value?: string) => {
      if (value !== this.originalModel?.getValue()) {
        this.originalModel?.setValue(value ?? '');
      }
    },
    originalLanguage: (value?: string) => {
      if (this.originalModel) {
        this.monaco?.editor.setModelLanguage(this.originalModel, value ?? '');
      }
    },
    modified: (value?: string) => {
      if (value !== this.modifiedModel?.getValue()) {
        this.modifiedModel?.setValue(value ?? '');
      }
    },
    modifiedLanguage: (value?: string) => {
      if (this.modifiedModel) {
        this.monaco?.editor.setModelLanguage(this.modifiedModel, value ?? '');
      }
    },
    options: (value?: editor.IDiffEditorOptions) =>
      this.editor?.updateOptions(value ?? {}),
  };

  /**
   * @internal
   */
  protected editorContainerRef = createRef<HTMLDivElement>();

  /**
   * After component loaded, the model for the orignal can be obtained using this property.
   */
  originalModel?: editor.ITextModel;

  /**
   * After component loaded, the model for the modified can be obtained using this property.
   */
  modifiedModel?: editor.ITextModel;

  /**
   * The value of original model for the editor.
   */
  @property({attribute: 'original', reflect: true}) original?: string;

  /**
   * The language of original model for the editor.
   */
  @property({attribute: 'original-language', reflect: true})
  originalLanguage?: string;

  /**
   * The value of modified model for the editor.
   */
  @property({attribute: 'modified', reflect: true}) modified?: string;

  /**
   * The language of modified model for the editor.
   */
  @property({attribute: 'modified-language', reflect: true})
  modifiedLanguage?: string;

  @property() options?: editor.IDiffEditorOptions;

  protected async loadEditor(editorContainer?: HTMLDivElement) {
    if (editorContainer) {
      this.originalModel = this.monaco?.editor.createModel(
        this.original ?? '',
        this.originalLanguage
      );
      this.modifiedModel = this.monaco?.editor.createModel(
        this.modified ?? '',
        this.modifiedLanguage
      );
      this.editor = this.monaco?.editor.createDiffEditor(editorContainer, {
        automaticLayout: true,
        fontLigatures: '', // TODO This is temporary fix for the incorrect cursor position
      });
      if (this.originalModel && this.modifiedModel) {
        this.editor?.setModel({
          original: this.originalModel,
          modified: this.modifiedModel,
        });
      }
      this.editor?.updateOptions(this.options ?? {});
    }
  }

  protected override defineEvents() {
    super.defineEvents();
    this.editor?.onDidUpdateDiff(() => {
      this.dispatchEvent(
        new CustomEvent('didUpdateDiff', {
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
    'hey-monaco-diff-editor': HeyMonacoDiffEditor;
  }
}
