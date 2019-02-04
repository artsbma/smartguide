import React from 'react';
import _ from 'lodash';
import {PinchView} from 'react-pinch-zoom-pan';

var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

import Home from './Home';
import Loading from './Loading';
import StopNotFound from './StopNotFound';
import Modal from './Modal';
import Icons from './Icons';
import Section from './flexible/Section';

class Stop extends React.Component {

	constructor( props ) {

		super( props );

		this.featuredImageModal = React.createRef();

		this.renderContent = this.renderContent.bind( this );
		this.renderFlexContent = this.renderFlexContent.bind( this );
		this.renderFeaturedImage = this.renderFeaturedImage.bind( this );

	}

	componentDidUpdate() {

		if ( !this.props.stops.isFetching && this.props.stops.posts[ this.props.params.stopNumber ] == undefined ) {

			this.props.fetchStop( this.props.params.stopNumber );

		}

	}

	componentDidMount() {

		if ( !this.props.stops.isFetching && this.props.stops.posts[ this.props.params.stopNumber ] == undefined ) {

			this.props.fetchStop( this.props.params.stopNumber );

		}

	}

	renderContent( content ) {

		return { __html: content };

	}

	renderFlexContent( section, i ) {

		const stopNumber = this.props.params.stopNumber;

		return <Section key={stopNumber + '_' + i} section={section} stops={this.props.stops} stopNumber={stopNumber}  modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} closeModal={this.props.closeModal} />

	}

	renderFeaturedImage( stop ) {

		if ( !stop.stop_meta.show_featured_image || !stop.featured_images.full ) {
			return;
		}

		return (

			<div className="stop-featured-image-holder">

				<button className="button-magnify-image" onClick={ (e) => {
					e.preventDefault();
					this.featuredImageModal.openModal();
				} }>
					<Icons icon="zoom" />
				</button>

				<img src={stop.featured_images.full} className="stop-featured-image" />

				<Modal ref={this.featuredImageModal} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} classes="image-zoom-modal">
					<PinchView backgroundColor="#000" maxScale={5}>
						<img src={stop.featured_images.full} className="stop-featured-image" />
					</PinchView>
				</Modal>

			</div>

		);

	}

	render() {

		const stopNumber = this.props.params.stopNumber;
		const stop = this.props.stops.posts[ stopNumber ];

		if ( this.props.stops.isFetching ) {

			return (

				<div className="wrap">
					<Loading />
				</div>

			);

		}

		if ( '00' === stopNumber ) {

			return <Home {...this.props} />

		}

		if ( stop == undefined || stop == 404 ) {

			return (

				<div className="wrap">
					<StopNotFound stopNumber={stopNumber} />
				</div>

			);

		}

		return (

			<div className="stop-container">

				<div className="wrap">

					<h3 className="stop-number">Stop # {stopNumber}</h3>

					<h1 className="stop-title">{entities.decode(stop.title.rendered)}</h1>

					{this.renderFeaturedImage( stop )}

					<div className="stop-content" dangerouslySetInnerHTML={this.renderContent( stop.content.rendered )} />

				</div>

				{stop.stop_meta.flexible_content ? stop.stop_meta.flexible_content.map(this.renderFlexContent) : null}

			</div>

		);

	}

}

export default Stop;
