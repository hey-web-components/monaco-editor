import { editor } from 'monaco-editor';
import { EditorBase } from './editor-base';
export declare class HeyMonacoDiffEditor extends EditorBase<editor.IStandaloneDiffEditor> {
    /**
     * @internal
     */
    protected readonly PROPERTY_CHANGE_HANDLER_DICT: {
        [propertyName: string]: (value: any) => void;
    };
    /**
     * @internal
     */
    protected editorContainerRef: import("lit-html/directives/ref").Ref<HTMLDivElement>;
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
    original?: string;
    /**
     * The language of original model for the editor.
     */
    originalLanguage?: string;
    /**
     * The value of modified model for the editor.
     */
    modified?: string;
    /**
     * The language of modified model for the editor.
     */
    modifiedLanguage?: string;
    options?: editor.IDiffEditorOptions;
    protected loadEditor(): Promise<void>;
    protected defineEvents(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'hey-monaco-diff-editor': HeyMonacoDiffEditor;
    }
}
