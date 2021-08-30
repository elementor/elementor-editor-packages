import styled from 'styled-components';
import { getVariant } from 'utils';
import { default as rotem } from '@elementor/styles';
import * as rotem2 from '@elementor/styles';
import breakpoints from '@elementor/styles';

console.log( '### rotem888', rotem );
console.log( '### rotem999-3', rotem2 );
console.log( '### breakpoints3', breakpoints );

const Heading = styled.h1`
	${ ( props ) => getVariant( props.variant, {} ) }
`;

export const StyledHeading = ( props ) => (
	<Heading { ...props } as={ props.tag }>{ props.children }</Heading>
);

StyledHeading.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any,
	tag: PropTypes.oneOf( [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ] ),
};

StyledHeading.defaultProps = {
	className: '',
};