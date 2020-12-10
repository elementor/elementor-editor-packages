module.exports = ( { path, plugins: { commonjs, shebang } } ) => {
	return {
		input: path.resolve( __dirname, 'src/index.js' ),
		output: {
			file: path.resolve( __dirname, 'bin/index.js' ),
			format: 'cjs',
			sourcemap: true,
		},
		plugins: [ shebang(), commonjs() ],
		external: [ 'lodash', 'chalk', 'shelljs' ],
	};
};
