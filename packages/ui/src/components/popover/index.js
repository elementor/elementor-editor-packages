import React from 'react';
import PropTypes from 'prop-types';

export default function Popover(props) {
	// TODO: fix eslint issues.
	/* eslint-disable */
	return (
		<>
			<div
				className="eps-popover__background"
				onClick={props.closeFunction}
			/>
			<ul
				className={`eps-popover ${props.className}`}
				onClick={props.closeFunction}
			>
				{props.children}
			</ul>
		</>
	);
	/* eslint-enable */
}

Popover.propTypes = {
	children: PropTypes.any.isRequired,
	className: PropTypes.string,
	closeFunction: PropTypes.func,
};

Popover.defaultProps = {
	className: '',
};
