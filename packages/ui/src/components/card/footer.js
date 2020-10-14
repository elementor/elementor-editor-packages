import React from 'react';
import PropTypes from 'prop-types';

export default function CardFooter(props) {
	return (
		<footer className={`eps-card__footer ${props.className}`}>
			{props.children}
		</footer>
	);
}

CardFooter.propTypes = {
	className: PropTypes.string,
	children: PropTypes.object.isRequired,
};

CardFooter.defaultProps = {
	className: '',
};
