import React from 'react';
import ReactGA from 'react-ga';

const HeaderBlock = React.createClass( {

	toggleSection(e) {

		e.preventDefault();

		if ( !this.props.canToggle ) {
			return;
		}

		ReactGA.event( {
			category: 'Header',
			action: this.props.sectionState.open ? 'Collapsed' : 'Expanded',
			label: this.props.children
		} );

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
