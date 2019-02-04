import React from 'react';
import {PinchView} from 'react-pinch-zoom-pan';

import Modal from '../Modal';
import Icons from '../Icons';

class Gallery extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			active: 0,
			expanded: false
		};

		this.toggleDescription = this.toggleDescription.bind( this );
		this.renderPhotoDescription = this.renderPhotoDescription.bind( this );
		this.renderPhoto = this.renderPhoto.bind( this );
		this.changePhoto = this.changePhoto.bind( this );
		this.renderThumb = this.renderThumb.bind( this );
		this.renderThumbs = this.renderThumbs.bind( this );

	}

	toggleDescription(e) {

		e.preventDefault();

		let newState;

		if ( this.state.expanded ) {

			newState = false;

		} else {

			newState = true;

		}

		this.setState( { expanded: newState } );

	}

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

	}

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

	}

	changePhoto( e, i ) {

		e.preventDefault();

		this.setState( {
			active: i,
			expanded: false
		} );

	}

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

	}

	renderThumbs( photos ) {

		if ( photos.length <= 1 ) {

			return;

		}

		return <div className="thumbs-holder">{photos.map(this.renderThumb)}</div>

	}

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

}

export default Gallery;
