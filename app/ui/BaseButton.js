import React from "react";

class BaseButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<button { ...this.props}>{this.props.children}</button>
		);
	}
}

export default BaseButton;
