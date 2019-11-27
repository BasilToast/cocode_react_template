import React, { useState, useRef } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { Grid } from '@material-ui/core';
import * as babel from '@babel/core';
import reactPreset from '@babel/preset-react';
import envPreset from '@babel/preset-env';
import * as Core from '../core';

const codeDumy = `
function Component() {
	return(
		<div>
			<h1>test</h1>
		</div>
	)
}

export default Component;
`;

const codeDom = `
import Component from './Component';

ReactDOM.render(<Component/>, document.getElementById('inner_root'));
`;

Core.exports['/index'] = babel.transform(codeDom, {
	presets: [envPreset, reactPreset]
}).code;
console.log(Core.exports['/index']);

function App() {
	const [isEditorReady, setIsEditorReady] = useState(false);
	const valueGetter = useRef();

	function handleEditorDidMount(_valueGetter) {
		setIsEditorReady(true);
		valueGetter.current = _valueGetter;
		handleEditorChange(null, codeDumy);
	}

	function handleEditorChange(ev, value) {
		try {
			let parsedCode = babel.transform(value, {
				presets: [envPreset, reactPreset]
			});
			Core.exports['/Component'] = parsedCode.code;
			document.getElementById('error_console').innerText = '';
			Core.require('./index');
		} catch (e) {
			document.getElementById('error_console').innerText = e.message;
		}
	}

	return (
		<div>
			<Grid container xs={12}>
				<Grid xs={6}>
					<ControlledEditor
						height="90vh"
						language="javascript"
						value={codeDumy}
						editorDidMount={handleEditorDidMount}
						theme="vs-dark"
						onChange={(ev, value) => handleEditorChange(ev, value)}
					/>
				</Grid>
				<Grid container xs={6} direction="column">
					<Grid item id="inner_root" style={{ flex: 1 }}></Grid>
					<Grid item id="error_console" style={{ flex: 1 }}></Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
