import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './wrapper';
import Content from './content';
import Title from './title';
import Text from './text';
import Actions from './actions';
import Button from './button';

export default function Dialog(props) {
	return (
		<Wrapper onSubmit={props.onSubmit} onClose={props.onClose}>
			<Content>
				{props.title && <Title>{props.title}</Title>}
				{props.text && <Text>{props.text}</Text>}
				{props.children}
			</Content>
			<Actions>
				<Button
					key="dismiss"
					text={props.dismissButtonText}
					onClick={props.dismissButtonOnClick}
					url={props.dismissButtonUrl}
					target={props.dismissButtonTarget}
					// TODO: eslint fix
					/* eslint-disable-next-line */
					tabIndex="2"
				/>
				<Button
					key="approve"
					text={props.approveButtonText}
					onClick={props.approveButtonOnClick}
					url={props.approveButtonUrl}
					target={props.approveButtonTarget}
					color={props.approveButtonColor}
					// TODO: eslint fix
					/* eslint-disable-next-line */
					tabIndex="1"
				/>
			</Actions>
		</Wrapper>
	);
}

Dialog.propTypes = {
	title: PropTypes.any,
	text: PropTypes.any,
	children: PropTypes.any,
	onSubmit: PropTypes.func,
	onClose: PropTypes.func,
	dismissButtonText: PropTypes.string.isRequired,
	dismissButtonOnClick: PropTypes.func,
	dismissButtonUrl: PropTypes.string,
	dismissButtonTarget: PropTypes.string,
	approveButtonText: PropTypes.string.isRequired,
	approveButtonOnClick: PropTypes.func,
	approveButtonUrl: PropTypes.string,
	approveButtonColor: PropTypes.string,
	approveButtonTarget: PropTypes.string,
};

Dialog.defaultProps = {};

Dialog.Wrapper = Wrapper;
Dialog.Content = Content;
Dialog.Title = Title;
Dialog.Text = Text;
Dialog.Actions = Actions;
Dialog.Button = Button;
