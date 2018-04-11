import React from 'react';

import Modal from '../Modal';
import Icons from '../Icons';

const Link = React.createClass( {

	render() {

		const link = this.props.link;

		return (

			<div>

				<a className="flexible-block flexible-link" href={link.url} target="_blank" onClick={ (e) => {

					if ( link.new_window ) {
						return;
					}

					e.preventDefault();

					this.refs.linkModal.openModal();

				} }>
					<Icons icon={ link.icon ? link.icon.toLowerCase() : 'link' } />
					{link.label}
				</a>

				<Modal ref="linkModal" modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal}>
					<iframe className="link-iframe" src={link.url} />
				</Modal>

			</div>

		);

	}

} );

export default Link;
