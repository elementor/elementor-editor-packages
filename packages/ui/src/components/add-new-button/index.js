import PropTypes from 'prop-types';

import Button from '../button';

export default class AddNewButton extends Button {
	getClassName() {
		let className = this.props.className;

		if (this.props.size) {
			className += ' eps-add-new-button--' + this.props.size;
		}

		return className;
	}

	static propTypes = {
		...Button.propTypes,
		text: PropTypes.string,
		size: PropTypes.string,
	};

	static defaultProps = {
		...Button.defaultProps,
		className: 'eps-add-new-button',
		icon: 'eicon-plus',
	};
}
