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
			document.getElementById('inner_root').innerText = '';
			eval(parsedCode.code);
		} catch (e) {
			document.getElementById('inner_root').innerText = e.message;
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
				<Grid id="inner_root" xs={6}></Grid>
			</Grid>
		</div>
	);
}

export default App;
