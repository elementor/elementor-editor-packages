import React from 'react';

import Text from '../text';

export default function DialogText(props) {
	return (
		<Text
			variant="xs"
			{...props}
			className={`eps-dialog__text ${props.className}`}
		/>
	);
}

DialogText.propTypes = {
	...Text.propTypes,
};

DialogText.defaultProps = {
	...Text.defaultProps,
	tag: 'p',
	variant: 'sm',
};
