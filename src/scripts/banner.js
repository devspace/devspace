import React from 'react';
import Icon from './icon';

class Banner extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.isOnline !== this.props.isOnline;
	}

	render() {
		if (this.props.isOnline === false) {
			return (
				<div className="banner banner-danger">
					<strong><Icon name="thumbsdown" /></strong> It seems like you lost internet connection.
				</div>
			)
		}
		else if (this.props.isOnline === true) {
			return (
				<div className="banner banner-success">
					<strong><Icon name="thumbsup" /></strong> You've connected to the internet again.
				</div>
			)
		} else {
			return false;
		}
	}
}

export default Banner;