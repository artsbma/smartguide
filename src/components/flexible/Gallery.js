import React from 'react';
import {PinchView} from 'react-pinch-zoom-pan';
import ReactGA from 'react-ga';

import Modal from '../Modal';
import Icons from '../Icons';

const Gallery = React.createClass( {

	getInitialState() {

		return {
			active: 0,
			expanded: false
		};

	},

	toggleDescription(e) {

		e.preventDefault();

		let newState;

		if ( this.state.expanded ) {

			newState = false;

		} else {

			newState = true;

		}

		this.setState( { expanded: newState } );

	},

	renderPhotoDescription( photo ) {

		let descriptionHolderClasses = 'description-holder';
		let toggleText = 'Expand';

		if ( this.state.expanded ) {

			descriptionHolderClasses += ' expanded';
			toggleText = 'Close';

		}

		let titleClasses = 'title';
		let captionClasses = 'caption';
		let descriptionClasses = 'description';

		if ( photo.description ) {

			descriptionClasses += ' show-collapsed';

		} else if ( photo.caption ) {

			captionClasses += ' show-collapsed';

		} else if ( photo.title ) {

			titleClasses += ' show-collapsed';

		} else {

			return;

		}

		return (

			<div className={descriptionHolderClasses}>

				<div className="inner">

					<div className={titleClasses}>{photo.title}</div>

					<div className={captionClasses}>{photo.caption}</div>

					<div className={descriptionClasses}>{photo.description}</div>

					<button className="button-transparent button-white expand-toggle" onClick={this.toggleDescription}>{toggleText}</button>

				</div>

			</div>

		);

	},

	renderPhoto( photo, i ) {

		let holderClasses = 'photo';

		if ( this.state.active == i ) {
			holderClasses += ' active';
		}

		return (

			<div key={i}>

				<div key={i} className={holderClasses}>

					<button className="button-magnify-image" onClick={ (e) => {
						e.preventDefault();
						ReactGA.event( {
							category: 'Image',
							action: 'Expanded',
							label: photo.title
						} );
						this.refs['imageModal_' + i].openModal();
					} }>
						<Icons icon="zoom" />
					</button>

					<img src={photo.url} alt={photo.alt} />

					{this.renderPhotoDescription( photo )}

				</div>

				<Modal ref={`imageModal_${i}`} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} classes="image-zoom-modal">
					<PinchView backgroundColor="#000">
						<img src={photo.url} className="stop-featured-image" />
					</PinchView>
				</Modal>

			</div>

		);

	},

	changePhoto( e, i ) {

		e.preventDefault();

		ReactGA.event( {
			category: 'Image',
			action: 'Viewed',
			label: this.props.photos[i].title
		} );

		this.setState( {
			active: i,
			expanded: false
		} );

	},

	renderThumb( photo, i ) {

		let thumbClasses = 'thumb';

		if ( this.state.active == i ) {
			thumbClasses += ' active';
		}

		return (

			<a key={i} href={photo.url} onClick={(e)=>this.changePhoto(e, i)} className={thumbClasses}>
				<img src={photo.sizes['thumbnail']} />
			</a>

		);

	},

	renderThumbs( photos ) {

		if ( photos.length <= 1 ) {

			return;

		}

		return <div className="thumbs-holder">{photos.map(this.renderThumb)}</div>

	},

	render() {

		const photos = this.props.photos;

		if ( !photos || undefined == photos ) {
			return null;
		}

		return(

			<div className="flexible-block flexible-gallery">

				<div className="photo-holder">
					{photos.map(this.renderPhoto)}
				</div>

				{this.renderThumbs( photos )}

			</div>

		);

	}

} );

export default Gallery;
