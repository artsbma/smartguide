import React from 'react';
import ReactGA from 'react-ga';

import Modal from '../Modal';
import Icons from '../Icons';

const Link = React.createClass( {

	render() {

		const link = this.props.link;

		return (

			<div>

				<a className="flexible-block flexible-link" href={link.url} target="_blank" onClick={ (e) => {

					ReactGA.event( {
						category: 'Link',
						action: 'Opened',
						label: link.label
					} );

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
