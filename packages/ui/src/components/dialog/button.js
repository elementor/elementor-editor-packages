import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

export default function DialogButton(props) {
	return (
		<Button
			{...props}
			className={`eps-dialog__button ${props.className}`}
		/>
	);
}

DialogButton.propTypes = {
	...Button.propTypes,
	tabIndex: PropTypes.string,
	type: PropTypes.string,
};

DialogButton.defaultProps = {
	...Button.defaultProps,
	tabIndex: '0',
	type: 'button',
};
