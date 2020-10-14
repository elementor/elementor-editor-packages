import React from 'react';
import PropTypes from 'prop-types';

export default function Checkbox(props) {
	return (
		<input
			type="checkbox"
			disabled={props.disabled}
			className={`eps-checkbox ${props.className}`}
			checked={props.checked}
			onChange={props.onChange}
		/>
	);
}

Checkbox.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
};

Checkbox.defaultProps = {
	className: '',
	disabled: false,
};
