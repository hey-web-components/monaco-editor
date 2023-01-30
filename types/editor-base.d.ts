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
     * @internal
     */
    protected editorContainerRef: import("lit-html/directives/ref").Ref<HTMLDivElement>;
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
    firstUpdated(): void;
    shouldUpdate(changedProperties: Map<string, any>): boolean;
    render(): import("lit-html").TemplateResult<1>;
    protected initialize(): Promise<void>;
    protected loadMonaco(): Promise<void>;
    protected loadEditorStyles(): Promise<void>;
    protected abstract loadEditor(): Promise<void>;
    protected abstract defineEvents(): void;
}
