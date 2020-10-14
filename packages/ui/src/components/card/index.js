import React from 'react';
import PropTypes from 'prop-types';
import Body from './body';
import Footer from './footer';
import Header from './header';
import Image from './image';
import Overlay from './overlay';

const Card = React.forwardRef((props, ref) => {
	return (
		<article className={`eps-card ${props.className}`} ref={ref}>
			{props.children}
		</article>
	);
});

Card.propTypes = {
	type: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.any,
};

Card.defaultProps = {
	className: '',
};

Card.displayName = 'Card';

Card.Body = Body;
Card.Footer = Footer;
Card.Header = Header;
Card.Image = Image;
Card.Overlay = Overlay;

export default Card;
