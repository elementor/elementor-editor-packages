import React from 'react';
import PropTypes from 'prop-types';

export default function CardBody(props) {
	return (
		<main className={`eps-card__body ${props.className}`}>
			{props.children}
		</main>
	);
}

CardBody.propTypes = {
	className: PropTypes.string,
	children: PropTypes.object.isRequired,
};

CardBody.defaultProps = {
	className: '',
};
