import React from 'react';

import AudioPlayer from './AudioPlayer';
import Modal from '../Modal';
import Icons from '../Icons';

class Audio extends React.Component {

	constructor( props ) {

		super( props );

		this.audioModal = React.createRef();

		this.openAudioPlayer = this.openAudioPlay.bind( this );

	}

	openAudioPlayer( e ) {

		e.preventDefault();

		this.audioModal.current.openModal();

	}

	render() {

		const { title, audio_file, description } = this.props.content;
		let image = this.props.content.image;

		if ( !image && this.props.stop.featured_images.full ) {
			image = {};
			image.url = this.props.stop.featured_images.full;
		}

		return(

			<div>

				<a className="flexible-block flexible-audio" href={audio_file.url} target="_blank" onClick={this.openAudioPlayer}>
					<Icons icon="audio" />
					{title}
				</a>

				<Modal ref={this.audioModal} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal}>
					<AudioPlayer audioFile={audio_file.url} audioTitle={title} audioDescription={description} audioImage={image} modal={this.props.modal} />
				</Modal>

			</div>

		);

	}

}

export default Audio;
