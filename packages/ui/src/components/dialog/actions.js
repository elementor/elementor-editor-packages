import React from 'react';
import PropTypes from 'prop-types';

export default function DialogActions(props) {
	return <div className="eps-dialog__buttons">{props.children}</div>;
}

DialogActions.propTypes = {
	children: PropTypes.any,
};
