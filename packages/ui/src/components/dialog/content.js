import React from 'react';
import PropTypes from 'prop-types';

export default function DialogContent(props) {
	return <div className="eps-dialog__content">{props.children}</div>;
}

DialogContent.propTypes = {
	children: PropTypes.any,
};
