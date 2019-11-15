const babel = require('@babel/core');

const code = babel.transform(
	`function App() {
    return(
        <div><h1>test</h1>
        <button>test</button></div>
    )
}
`,
	{
		presets: ['@babel/preset-react']
	}
);

console.log(code);
