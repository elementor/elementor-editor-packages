import styled from 'styled-components';

const Button = styled.div`
	display: inline-flex;
	color: orange;
	background-color: blue;
	line-height: 1;
	cursor: pointer;
	padding: 10px;
`;

export const StyledButton = ( props ) => (
	<Button { ...props } className="eps-button">{ props.children }</Button>
);
