import React from 'react';
import PropTypes from 'prop-types';

export default function Select(props) {
	// TODO: fix eslint issue
	return (
		/* eslint-disable-next-line */
		<select
			multiple={props.multiple}
			className={props.className}
			value={props.value}
			onChange={props.onChange}
			ref={props.elRef}
		>
			{props.options.map((option) =>
				option.children ? (
					<optgroup label={option.label} key={option.label}>
						{option.children.map((childOption) => (
							<option
								key={childOption.value}
								value={childOption.value}
							>
								{childOption.label}
							</option>
						))}
					</optgroup>
				) : (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				)
			)}
		</select>
	);
}
Select.propTypes = {
	className: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.array,
	elRef: PropTypes.object,
	multiple: PropTypes.bool,
};
Select.defaultProps = {
	className: '',
	options: [],
};
