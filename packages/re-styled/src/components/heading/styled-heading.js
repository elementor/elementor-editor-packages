import styled from 'styled-components';
import { breakpoints } from '@elementor/styles';

console.log( '### breakpoints 999 - deconstruct', breakpoints );

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