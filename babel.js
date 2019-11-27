// import * as babel from '@babel/core';
// import reactPreset from '@babel/preset-react';
// import envPreset from '@babel/preset-env';
const babel = require('@babel/core');
const reactPreset = require('@babel/preset-react');
const envPreset = require('@babel/preset-env');

const entry = `
import { fibo } from './method';

const index = 5;
const result = fibo(index);

console.log(result);
`;

const factorial = `
export function factorial(number) {
	let result = 1;
	for (let i = 1; i <= number; i++) result * i;
	return result;
}
`;

const fibo = `
function fibo(index) {
    if (index <= 2) return 1;
    return fibo(index-1) + fibo(index-2);
}

export default fibo;

`;

const method = `
import factorial from './src/factorial';
import fibo from './src/fibo';

export { factorial, fibo };
`;

const tmp = `
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factorial = factorial;

function factorial(number) {
  var result = 1;

  for (var i = 1; i <= number; i++) {
    result * i;
  }

  return result;
}
`;

const react = `
import React from 'react';

function App() {
    return (
        <>
            <h1>React Test!!!</h1>
        </>
    )
}

export default App;
`;

let parsedCode = babel.transform(method, {
	presets: [envPreset, reactPreset]
});
console.log(parsedCode.code);
// eval(parsedCode.code);
