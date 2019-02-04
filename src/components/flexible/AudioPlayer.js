import React from 'react';

import Icons from '../Icons';

class AudioPlayer extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			isLoaded: false
		};

		this.currentTime = React.createRef();
		this.scrubber = React.createRef();
		this.totalTime = React.createRef();
		this.player = React.createRef();

		this.formatTimestamp = this.formatTimestamp.bind( this );
		this.loadPlayer = this.loadPlayer.bind( this );
		this.renderControlButtonIcon = this.renderControlButtonIcon.bind( this );
		this.onScrubberChange = this.onScrubberChange.bind( this );
		this.renderContainerStyles = this.renderContainerStyles.bind( this );

	}

	formatTimestamp( timestamp ) {

		let hr = Math.floor( timestamp / 3600 );
		let min = Math.floor( ( timestamp - ( hr * 3600 ) ) / 60 );
		let sec = Math.floor( timestamp - ( hr * 3600 ) - ( min * 60 ) );

		if ( sec < 10 ) {
			sec = '0' + sec;
		}

		return min + ':' + sec;

	}

	loadPlayer() {

		const currentTime = this.currentTime.current;
		const scrubber = this.scrubber.current;
		const totalTime = this.totalTime.current;
		const player = this.player.current;

		scrubber.setAttribute( 'max', player.seekable.end(0) );

		player.addEventListener( 'timeupdate', () => {
			scrubber.value = player.currentTime;
			currentTime.textContent = this.formatTimestamp( player.currentTime );
		}, false )

		currentTime.textContent = '0:00';
		totalTime.textContent = this.formatTimestamp( player.seekable.end(0) );

		this.setState( { isLoaded: true } );

	}

	renderControlButtonIcon() {

		if ( this.state.isPlaying ) {
			return <Icons icon="pause" />
		}

		return <Icons icon="play" />

	}

	onScrubberChange() {

		this.player.current.currentTime = this.scrubber.current.value;

	}

	renderContainerStyles() {

		const image = this.props.audioImage;

		if ( !image ) {
			return null;
		}

		return {
			backgroundImage: 'url(' + image.url + ')'
		}

	}

	render() {

		return(

			<div className="audio-player wrap" style={this.renderContainerStyles()}>

				<div className="audio-content">

					<h2 className="audio-title">{this.props.audioTitle}</h2>

					<p className="audio-description">{this.props.audioDescription}</p>

					<div className="audio-controls">

						<button className="play-pause" onClick={(e)=>{

							e.preventDefault();

							if ( this.state.isPlaying ) {

								this.player.current.pause();
								this.setState( { isPlaying: false } );

								return;

							}

							this.player.current.play();
							this.setState( { isPlaying: true } );

							if ( !this.state.isLoaded ) {
								this.loadPlayer()
							}

						}}>
							{this.renderControlButtonIcon()}
						</button>

						<div className="timeline">

							<div className="timestamp current-time" ref={this.currentTime}>-:--</div>

							<div className="scrubber-holder">
								<input type="range" className="scrubber" ref={this.scrubber} defaultValue="0" onChange={this.onScrubberChange} />
							</div>

							<div className="timestamp total-time" ref={this.totalTime}>-:--</div>

						</div>

					</div>

				</div>

				<audio ref={this.player} src={this.props.audioFile} />

			</div>

		);

	}

}

export default AudioPlayer;
