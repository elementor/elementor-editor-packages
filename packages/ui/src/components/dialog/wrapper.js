import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

export default function DialogWrapper(props) {
	let WrapperTag = 'div';

	if (props.onSubmit) {
		WrapperTag = 'form';
	}

	return (
		<section className="eps-modal__overlay">
			{props.onClose && (
				<Button
					onClick={props.onClose}
					text="Close"
					hideText={true}
					icon="eicon-close"
					className="eps-dialog__close-button"
				/>
			)}
			<WrapperTag
				className="eps-modal eps-dialog"
				onSubmit={props.onSubmit}
			>
				{props.children}
			</WrapperTag>
		</section>
	);
}

DialogWrapper.propTypes = {
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	children: PropTypes.any,
};
