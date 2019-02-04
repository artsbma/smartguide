import React from 'react';

import Modal from '../Modal';
import Icons from '../Icons';

class Video extends React.Component {

	constructor( props ) {

		super( props );

		this.videoModal = React.createRef();

		this.renderVideo = this.renderVideo.bind( this );

	}

	renderVideo( content ) {

		return { __html: content };

	}

	render() {

		return(

			<div>

				<a href="#" className="flexible-link flexible-block" onClick={ (e) => {

					e.preventDefault();
					this.videoModal.current.openModal();

				} }>
					<Icons icon="video" />
					{this.props.video.title}
				</a>

				<Modal ref={this.videoModal} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal}>
					<div className="embed-video-holder" dangerouslySetInnerHTML={this.renderVideo( this.props.video.url )} />
				</Modal>

			</div>

		);

	}

}

export default Video;
