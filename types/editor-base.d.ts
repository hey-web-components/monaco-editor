import { LitElement } from 'lit';
import { Monaco } from '@monaco-editor/loader';
import { editor } from 'monaco-editor';
export declare abstract class EditorBase<T extends editor.IStandaloneCodeEditor | editor.IStandaloneDiffEditor> extends LitElement {
    static styles: import("lit").CSSResult;
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
    vsPath: string;
    /**
     * The `options` for the editor.
     */
    abstract options?: editor.IEditorOptions;
    shouldUpdate(changedProperties: Map<string, any>): boolean;
    protected initialize(): Promise<void>;
    protected loadMonaco(): Promise<void>;
    protected loadEditorStyles(): Promise<void>;
    protected initializeEditorContainer(): HTMLDivElement;
    protected abstract loadEditor(editorContainer: HTMLDivElement): Promise<void>;
    protected abstract defineEvents(): void;
}
