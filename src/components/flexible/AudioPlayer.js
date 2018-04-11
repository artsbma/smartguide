import React from 'react';

import Icons from '../Icons';

const AudioPlayer = React.createClass( {

	getInitialState() {

		return {
			isLoaded: false
		};

	},

	formatTimestamp( timestamp ) {

		let hr = Math.floor( timestamp / 3600 );
		let min = Math.floor( ( timestamp - ( hr * 3600 ) ) / 60 );
		let sec = Math.floor( timestamp - ( hr * 3600 ) - ( min * 60 ) );

		if ( sec < 10 ) {
			sec = '0' + sec;
		}

		return min + ':' + sec;

	},

	loadPlayer() {

		const { player, scrubber, currentTime, totalTime } = this.refs;

		scrubber.setAttribute( 'max', player.seekable.end(0) );

		player.addEventListener( 'timeupdate', () => {
			scrubber.value = player.currentTime;
			currentTime.textContent = this.formatTimestamp( player.currentTime );
		}, false )

		currentTime.textContent = '0:00';
		totalTime.textContent = this.formatTimestamp( player.seekable.end(0) );

		this.setState( { isLoaded: true } );

	},

	renderControlButtonIcon() {

		if ( this.state.isPlaying ) {
			return <Icons icon="pause" />
		}

		return <Icons icon="play" />

	},

	onScrubberChange() {

		this.refs.player.currentTime = this.refs.scrubber.value;

	},

	renderContainerStyles() {

		const image = this.props.audioImage;

		if ( !image ) {
			return null;
		}

		return {
			backgroundImage: 'url(' + image.url + ')'
		}

	},

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

								this.refs.player.pause();
								this.setState( { isPlaying: false } );

								return;

							}

							this.refs.player.play();
							this.setState( { isPlaying: true } );

							if ( !this.state.isLoaded ) {
								this.loadPlayer()
							}

						}}>
							{this.renderControlButtonIcon()}
						</button>

						<div className="timeline">

							<div className="timestamp current-time" ref="currentTime">-:--</div>

							<div className="scrubber-holder">
								<input type="range" className="scrubber" ref="scrubber" defaultValue="0" onChange={this.onScrubberChange} />
							</div>

							<div className="timestamp total-time" ref="totalTime">-:--</div>

						</div>

					</div>

				</div>

				<audio ref="player" src={this.props.audioFile} />

			</div>

		);

	}

} );

export default AudioPlayer;
