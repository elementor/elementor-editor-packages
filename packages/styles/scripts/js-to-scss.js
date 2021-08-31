// const path = require( 'path' );
// const fs = require( 'fs' );
// const write = require('write');
//
// const variants = require( '../common/variants.js' ),
// 	styles = require( '../common/styles.js' ),
// 	{ base, dark } = styles.selectors,
// 	scssDestination = path.resolve( __dirname, '../scss' ),
// 	prefix = '.est-';
//

// if ( fs.existsSync( variantsFolder ) ) {
// 	fs.readdirSync( variantsFolder ).forEach( ( fileName ) => {
// 		const filePath = path.join( variantsFolder, fileName ),
// 			fileContent = fs.readFileSync( filePath );
//
// 		console.log( 'fileContent', fileContent );
// 		//write.sync( widgetScssRtlFileDest, this.getWidgetScssContent( widgetName, 'rtl' ) );
// 	} );
// }