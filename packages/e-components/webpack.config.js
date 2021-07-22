const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		library: '@elementor/e-components',
		libraryTarget: 'umd',
		path: path.resolve( __dirname, 'lib' ),
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
						},
					},
				],
			},
		],
	},
};
