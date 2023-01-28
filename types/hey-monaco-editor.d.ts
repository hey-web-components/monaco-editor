import { LitElement } from 'lit';
import { Monaco } from '@monaco-editor/loader';
import { editor } from 'monaco-editor';
type EditorOptions = editor.IEditorOptions & editor.IGlobalEditorOptions;
export declare class HeyMonacoEditor extends LitElement {
    static styles: import("lit").CSSResult;
    private readonly PROPERTY_CHANGE_HANDLER_DICT;
    private editorContainerRef;
    monaco?: Monaco;
    editor?: editor.IStandaloneCodeEditor;
    vsPath: string;
    value?: string;
    language?: string;
    options?: EditorOptions;
    firstUpdated(): void;
    shouldUpdate(changedProperties: Map<string, any>): boolean;
    render(): import("lit-html").TemplateResult<1>;
    private initialize;
    private loadMonaco;
    private obtainEditorCSSString;
    private loadEditor;
    private defineEvents;
}
declare global {
    interface HTMLElementTagNameMap {
        'hey-monaco-editor': HeyMonacoEditor;
    }
}
export {};
