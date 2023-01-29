import {customElement, property} from 'lit/decorators.js';
import {createRef} from 'lit/directives/ref.js';
import {editor} from 'monaco-editor';
import {EditorBase} from './editor-base';

@customElement('hey-monaco-diff-editor')
export class HeyMonacoDiffEditor extends EditorBase<editor.IStandaloneDiffEditor> {
  /**
   * @internal
   */
  protected readonly PROPERTY_CHANGE_HANDLER_DICT: {
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

  originalModel?: editor.ITextModel;
  modifiedModel?: editor.ITextModel;

  @property({attribute: 'original', reflect: true}) original?: string;
  @property({attribute: 'original-language', reflect: true})
  originalLanguage?: string;
  @property({attribute: 'modified', reflect: true}) modified?: string;
  @property({attribute: 'modified-language', reflect: true})
  modifiedLanguage?: string;
  @property() options?: editor.IDiffEditorOptions;

  protected async loadEditor() {
    const editorContainer = this.editorContainerRef.value;
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

  protected defineEvents() {
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
