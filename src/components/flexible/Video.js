import React from 'react';
import ReactGA from 'react-ga';

import Modal from '../Modal';
import Icons from '../Icons';

const Video = React.createClass( {

	renderVideo( content ) {

		return { __html: content };

	},

	render() {

		return(

			<div>

				<a href="#" className="flexible-link flexible-block" onClick={ (e) => {

					ReactGA.event( {
						category: 'Video',
						action: 'Opened',
						label: this.props.video.title
					} );

					e.preventDefault();
					this.refs.videoModal.openModal();

				} }>
					<Icons icon="video" />
					{this.props.video.title}
				</a>

				<Modal ref="videoModal" modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal}>
					<div className="embed-video-holder" dangerouslySetInnerHTML={this.renderVideo( this.props.video.url )} />
				</Modal>

			</div>

		);

	}

} );

export default Video;
