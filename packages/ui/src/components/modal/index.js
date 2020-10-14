import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';
import Grid from '../grid';
import Icon from '../icon';

export default class ModalProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hideModal: this.hideModal,
			show: false,
			showModal: this.showModal,
		};
	}

	hideModal = () => {
		this.setState({
			show: false,
		});
	};

	showModal = () => {
		this.setState({
			show: true,
		});
	};

	render() {
		return (
			<>
				<Button
					{...this.props.toggleButtonProps}
					onClick={this.state.showModal}
				/>
				<Modal modalProps={this.state} title={this.props.title}>
					{this.props.children}
				</Modal>
			</>
		);
	}
}

ModalProvider.propTypes = {
	children: PropTypes.node.isRequired,
	toggleButtonProps: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
};

class Modal extends React.Component {
	modalRef = React.createRef();
	closeRef = React.createRef();

	closeModal = (e) => {
		const { modalProps } = this.props;
		const node = this.modalRef.current,
			closeNode = this.closeRef.current,
			isInCloseNode = closeNode && closeNode.contains(e.target);
		// ignore if click is inside the modal
		if (node && node.contains(e.target) && !isInCloseNode) {
			return;
		}

		modalProps.hideModal();
	};

	componentDidMount() {
		document.addEventListener('mousedown', this.closeModal, false);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.closeModal, false);
	}

	render() {
		const { modalProps, children } = this.props;
		return modalProps.show ? (
			// TODO: Fix eslint issue
			/* eslint-disable-next-line */
			<div className="eps-modal__overlay" onClick={this.closeModal}>
				<div className="eps-modal" ref={this.modalRef}>
					<Grid
						container
						className="eps-modal__header"
						justify="space-between"
						alignItems="center"
					>
						<Grid item>
							<Icon className="eps-modal__icon eicon-info-circle" />
							{this.props.title}
						</Grid>
						<Grid item>
							<div
								className="eps-modal__close-wrapper"
								ref={this.closeRef}
							>
								<Button
									text="Close"
									hideText
									icon="eicon-close"
									onClick={this.closeModal}
								/>
							</div>
						</Grid>
					</Grid>
					<div className="eps-modal__body">{children}</div>
				</div>
			</div>
		) : null;
	}
}

Modal.propTypes = {
	modalProps: PropTypes.object.isRequired,
	children: PropTypes.any.isRequired,
	title: PropTypes.string.isRequired,
};
