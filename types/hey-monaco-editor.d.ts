import { editor } from 'monaco-editor';
import { EditorBase } from './editor-base';
type EditorOptions = editor.IEditorOptions & editor.IGlobalEditorOptions;
export declare class HeyMonacoEditor extends EditorBase<editor.IStandaloneCodeEditor> {
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
    value?: string;
    language?: string;
    options?: EditorOptions;
    protected loadEditor(): Promise<void>;
    protected defineEvents(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'hey-monaco-editor': HeyMonacoEditor;
    }
}
export {};
