import { ThemeProvider } from 'styled-components';

export default function Theme( props ) {
	const isDarkMode = false; // elementorAppConfig...

	let theme = props.default;

	if ( isDarkMode && props.dark ) {
		theme = {
			...props.default,
			...props.dark,
		};
	}

	return (
		<ThemeProvider theme={ theme }>
			{ props.children }
		</ThemeProvider>
	);
}

Theme.propTypes = {
	children: PropTypes.any,
	default: PropTypes.object.isRequired,
};

Theme.defaultProps = {
	default: {},
};

