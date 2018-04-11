import React from 'react';
import {PinchView} from 'react-pinch-zoom-pan';

import Modal from '../Modal';

const ModalGallery = React.createClass( {

	renderThumb( photo, i ) {

		return (

			<div key={i} className="thumb-holder">

                <a href={photo.url} onClick={(e)=> {

                    e.preventDefault();

                    this.refs['imageModal_' + i].openModal();

                } } className="thumb">
    				<img src={photo.sizes['medium_large']} />
    			</a>

                <Modal ref={`imageModal_${i}`} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} classes="image-zoom-modal">
                    <PinchView backgroundColor="#000">
                        <img src={photo.url} className="stop-featured-image" />
                    </PinchView>
                </Modal>

            </div>

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

			<div className="flexible-block flexible-modal-gallery">

				{this.renderThumbs( photos )}

			</div>

		);

	}

} );

export default ModalGallery;
