import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon';

export default class Button extends React.Component {
	static propTypes = {
		text: PropTypes.string.isRequired,
		hideText: PropTypes.bool,
		icon: PropTypes.string,
		tooltip: PropTypes.string,
		id: PropTypes.string,
		className: PropTypes.string,
		url: PropTypes.string,
		onClick: PropTypes.func,
		variant: PropTypes.string,
		color: PropTypes.string,
		size: PropTypes.string,
		target: PropTypes.string,
	};

	static defaultProps = {
		id: '',
		className: '',
		variant: '',
		target: '_parent',
	};

	getCssId() {
		return this.props.id;
	}

	getClassName() {
		const baseClassName = 'eps-button',
			classes = [baseClassName, this.props.className];

		return classes
			.concat(this.getStylePropsClasses(baseClassName))
			.filter((classItem) => '' !== classItem)
			.join(' ');
	}

	getStylePropsClasses(baseClassName) {
		const styleProps = ['color', 'size', 'variant'],
			stylePropClasses = [];

		styleProps.forEach((styleProp) => {
			const stylePropValue = this.props[styleProp];

			if (stylePropValue) {
				stylePropClasses.push(baseClassName + '--' + stylePropValue);
			}
		});

		return stylePropClasses;
	}

	getIcon() {
		if (this.props.icon) {
			const tooltip = this.props.tooltip || this.props.text;
			const icon = (
				<Icon
					className={this.props.icon}
					aria-hidden="true"
					title={tooltip}
				/>
			);
			let screenReaderText = '';

			if (this.props.hideText) {
				screenReaderText = <span className="sr-only">{tooltip}</span>;
			}

			return (
				<>
					{icon}
					{screenReaderText}
				</>
			);
		}
		return '';
	}

	getText() {
		return this.props.hideText ? '' : <span>{this.props.text}</span>;
	}

	render() {
		const attributes = {},
			id = this.getCssId(),
			className = this.getClassName();

		// Add attributes only if they are not empty.
		if (id) {
			attributes.id = id;
		}

		if (className) {
			attributes.className = className;
		}

		if (this.props.onClick) {
			attributes.onClick = this.props.onClick;
		}

		const buttonContent = (
			<>
				{this.getIcon()}
				{this.getText()}
			</>
		);

		if (this.props.url && 0 === this.props.url.indexOf('http')) {
			return (
				<a
					href={this.props.url}
					target={this.props.target}
					{...attributes}
				>
					{buttonContent}
				</a>
			);
		}

		return <div {...attributes}>{buttonContent}</div>;
	}
}
