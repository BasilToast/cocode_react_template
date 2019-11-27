const exports = {};
// entry path
const PATH_STACK = ['/'];
function require(path) {
	const [parsedPath, stack] = pathResolver(
		PATH_STACK[PATH_STACK.length - 1],
		path
	);
	PATH_STACK.push(stack);
	const code = exports[parsedPath];
	// push Path
	const result = eval(`
    (() => {
      const exports = {};
      ${code}
      return exports;
    })();`);
	// pop Path
	PATH_STACK.pop();
	return result;
}

const NODE_PATH = 'node_modules';
function pathResolver(prePath = '/', path) {
	const resolvedPath = [];
	const pathSplit = path.split('/').filter(val => val !== '');
	if (pathSplit[0] !== '.' && pathSplit[0] !== '..') {
		resolvedPath.push(NODE_PATH);
	} else {
		Object.assign(
			resolvedPath,
			prePath.split('/').filter(val => val !== '')
		);
	}
	pathSplit.forEach(dir => {
		if (dir === '.') return;
		if (dir === '..') {
			if (resolvedPath.length === 0) throw new Error('path error');
			resolvedPath.pop();
		} else resolvedPath.push(dir);
	});
	const result = resolvedPath.reduce((acc, current) => {
		if (current === '') return acc;
		acc += `/${current}`;
		return acc;
	}, '');
	resolvedPath.pop();
	const result_absol = resolvedPath.reduce((acc, current) => {
		if (current === '') return acc;
		acc += `/${current}`;
		return acc;
	}, '');
	if (exports[result] !== undefined) {
		return [result, result_absol];
	} else if (exports[`${result}/index`] !== undefined)
		return [`${result}/index`, result];
	else throw new Error('path error');
}

export { exports, require, pathResolver };
