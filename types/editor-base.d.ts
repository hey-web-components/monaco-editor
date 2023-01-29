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
    monaco?: Monaco;
    editor?: T;
    vsPath: string;
    abstract options?: editor.IEditorOptions;
    firstUpdated(): void;
    shouldUpdate(changedProperties: Map<string, any>): boolean;
    render(): import("lit-html").TemplateResult<1>;
    protected initialize(): Promise<void>;
    protected loadMonaco(): Promise<void>;
    protected obtainEditorCSSString(): Promise<string>;
    protected abstract loadEditor(): Promise<void>;
    protected abstract defineEvents(): void;
}
