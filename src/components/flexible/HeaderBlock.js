import React from 'react';

const HeaderBlock = React.createClass( {

	toggleSection(e) {

		e.preventDefault();

		if ( !this.props.canToggle ) {
			return;
		}

		this.props.toggleOpen();

	},

	renderButton() {

		if ( !this.props.canToggle ) {
			return null;
		}

		return (

			<button className="toggle-button">
				<span className="toggle-open">+</span>
				<span className="toggle-close">-</span>
			</button>

		);

	},

	render() {

		return(

			<h3 className="flexible-block flexible-header section-toggle" onClick={this.toggleSection}>
				{this.props.children}

				{this.renderButton()}
			</h3>

		);

	}

} );

export default HeaderBlock;
