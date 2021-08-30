const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {
	mode: 'production',
	entry: {
		'./lib/index': path.resolve( __dirname, './src/index.js' ),
		'/variants/index': path.resolve( __dirname, './src/variants' ),
	},
	resolve: {
		alias: {},
	},
	output: {
		filename: '[name].js',
		library: '@elementor/styles',
		libraryTarget: 'umd',
		path: path.resolve( __dirname, './' ),
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
							presets: [ [ '@babel/preset-env', { "useBuiltIns": "usage", "corejs": 3 } ], '@babel/preset-react' ],
						},
					},
				],
			},
		],
	},
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
