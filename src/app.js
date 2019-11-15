import React, { useState, useRef } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { Grid } from '@material-ui/core';
import * as babel from '@babel/core';
import reactPreset from '@babel/preset-react';

function App() {
	const [isEditorReady, setIsEditorReady] = useState(false);
	const valueGetter = useRef();

	function handleEditorDidMount(_valueGetter) {
		setIsEditorReady(true);
		valueGetter.current = _valueGetter;
		handleEditorChange(
			null,
			`function Component() {
			return(
				<div>
					<h1>test</h1>
				</div>
			)
		}
		ReactDOM.render(<Component/>, document.getElementById('inner_root'));
		`
		);
	}

	function handleEditorChange(ev, value) {
		try {
			let parsedCode = babel.transform(value, {
				presets: [reactPreset]
			});
			document.getElementById('error_console').innerText = '';
			eval(parsedCode.code);
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
						value={`function Component() {
	return(
		<div>
			<h1>test</h1>
		</div>
	)
}
ReactDOM.render(<Component/>, document.getElementById('inner_root'));
`}
						editorDidMount={handleEditorDidMount}
						theme="vs-dark"
						onChange={(ev, value) => handleEditorChange(ev, value)}
					/>
				</Grid>
				<Grid container xs={6} direction="column">
					<Grid item id="inner_root"></Grid>
					<Grid item id="error_console" xs={4}></Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
