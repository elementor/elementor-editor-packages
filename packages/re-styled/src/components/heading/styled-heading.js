import styled from 'styled-components';
import { heading } from '@elementor/styles/variants';
import { themeColors } from '@elementor/styles';

console.log( '### variants 123', heading );
console.log( '### themeColors', themeColors( 'primary' ) );

const Heading = styled.h1`
	color: aqua;
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