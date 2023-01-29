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
    originalModel?: editor.ITextModel;
    modifiedModel?: editor.ITextModel;
    original?: string;
    originalLanguage?: string;
    modified?: string;
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
