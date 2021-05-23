export default {
	create( context ) {
		return {
			JSXElement( node ) {
				node.children.forEach( ( childNode ) => {
					if ( childNode.type !== 'Literal' ) {
						return;
					}

					if ( ! childNode.value ) {
						return;
					}

					const sanitizeValue = childNode.value.trim();

					if ( sanitizeValue.search( /[a-zA-Z]/ ) < 0 ) {
						return;
					}

					context.report( {
						node: childNode,
						loc: childNode.loc.start,
						message: 'Please translate this sentence',
					} );
				} );
			},
		};
	},
};
