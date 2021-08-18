const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	externals: {
		react: 'React',
	},
	resolve: {
		alias: {
			'utils': path.resolve( __dirname, './src/utils/' ),
			'theme': path.resolve( __dirname, './src/components/theme' ),
		},
	},
	output: {
		filename: 'index.js',
		library: '@elementor/re-styled',
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
							presets: [ [ '@babel/preset-env', { "useBuiltIns": "usage", "corejs": 3 } ], '@babel/preset-react' ],
						},
					},
				],
			},
		],
	},
};
