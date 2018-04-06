import React from 'react';

import Header from './Header';
import Modal from './Modal';

const Main = React.createClass( {

	render() {

		return(

			<div className="site">

				<Header modal={this.props.modal} closeModal={this.props.closeModal} location={this.props.location} />

				<div className="main-container">

					{React.cloneElement(this.props.children, this.props)}

				</div>

			</div>

		);

	}

} );

export default Main;
