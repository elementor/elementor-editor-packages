import styled from 'styled-components';
import { default as Rotem } from '@elementor/styles';
import breakpoints from '@elementor/styles';

console.log( '### Rotem 444', Rotem );
console.log( '### breakpoints 444 - deconstruct', breakpoints );

const Heading = styled.h1`
	color: red;
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