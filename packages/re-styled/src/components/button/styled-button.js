import styled from 'styled-components';
import Theme from 'theme';
import { themeColors } from 'utils';

const defaultTheme = {
	backgroundColor: themeColors( 'info' ),
};

const darkTheme = {
	backgroundColor: themeColors( 'warning' ),
};

const Button = styled.div`
	display: inline-flex;
	color: white;
	background-color: ${ ( props ) => props.theme.backgroundColor };
	line-height: 1;
	cursor: pointer;
	padding: 10px;
`;

export const StyledButton = ( props ) => (
	<Theme default={ defaultTheme } dark={ darkTheme }>
		<Button { ...props } className="eps-button">{ props.children }</Button>
	</Theme>
);

export const Element = Button;

StyledButton.propTypes = {
	children: PropTypes.any,
};
