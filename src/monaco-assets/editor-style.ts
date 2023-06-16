import _ from 'monaco-editor/min/vs/editor/editor.main.css?inline';
import codicon from 'monaco-editor/min/vs/base/browser/ui/codicons/codicon/codicon.ttf?url';

const editorStyle = _.replace(
  /url(..\/base\/browser\/ui\/codicons\/codicon\/codicon.ttf)/g,
  `url(${codicon})`,
) as string;
export default editorStyle;
