const webpack = require( 'webpack' );
const path = require( 'path' );
const glob = require('glob');
const fs = require( 'fs' );

const entries = {
	'./lib/index': path.resolve( __dirname, './src/index.js' )
};

const variantsFolder = path.resolve( __dirname, './src/variants/' );

	fs.readdirSync( variantsFolder ).forEach( ( fileName ) => {
		const filePath = path.join( variantsFolder, fileName );

		if ( ! filePath.includes( '.' ) ) {
			entries[ './variants/' + fileName ] = path.resolve( __dirname, './src/variants/' + fileName );
		}
		//write.sync( widgetScssRtlFileDest, this.getWidgetScssContent( widgetName, 'rtl' ) );
	} );

	console.log( 'entries', entries );

const libraryConfig = {
	mode: 'production',
	entry: entries,
	resolve: {
		alias: {
			styles: path.resolve( __dirname, './src/index.js' ),
			//variants: path.resolve( __dirname, './src/variants/index.js' ),
		},
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

// const commonConfig = {
// 	mode: 'production',
// 	entry: {
// 		styles: path.resolve( __dirname, './src/index.js' ),
// 		variants: path.resolve( __dirname, './src/variants' ),
// 	},
// 	resolve: {
// 		alias: {
// 			styles: path.resolve( __dirname, './src/index.js' ),
// 			variants: path.resolve( __dirname, './src/variants/index.js' ),
// 		},
// 	},
// 	output: {
// 		filename: '[name].js',
// 		path: path.resolve( __dirname, './common' ),
// 		libraryTarget: 'commonjs2',
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
// 				use: [
// 					{
// 						loader: 'babel-loader',
// 						options: {
// 							plugins: [
// 								[ '@babel/plugin-transform-modules-commonjs', { importInterop: 'babel', allowTopLevelThis: true } ]
// 							]
// 						},
// 					},
// 				],
// 			},
// 		],
// 	},
// };

module.exports = [
	libraryConfig,
	//commonConfig
];
