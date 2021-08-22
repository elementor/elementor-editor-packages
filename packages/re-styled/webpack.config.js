const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	resolve: {
		alias: {
			'utils': path.resolve( __dirname, './src/utils/' ),
			'theme': path.resolve( __dirname, './src/components/theme' ),
			'styles': '@elementor/styles',
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
