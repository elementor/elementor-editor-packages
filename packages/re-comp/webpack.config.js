const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		library: '@elementor/re-comp',
		libraryTarget: 'umd',
		path: path.resolve( __dirname, 'lib' ),
		umdNamedDefine: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [ [ '@babel/preset-env', { "useBuiltIns": "usage" } ], '@babel/preset-react' ],
							plugins: [ '@babel/plugin-transform-react-jsx' ],
						},
					},
				],
			},
		],
	},
	target: 'node',
	externals: {
		// Don't bundle react or react-dom
		react: {
			commonjs: "react",
			commonjs2: "react",
			amd: "React",
			root: "React"
		},
		"react-dom": {
			commonjs: "react-dom",
			commonjs2: "react-dom",
			amd: "ReactDOM",
			root: "ReactDOM"
		}
	}
};
