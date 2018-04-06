import React from 'react';

import scrollToComponent from 'react-scroll-to-component';

import Modal from '../Modal';
import Link from './Link';
import Gallery from './Gallery';
import ModalGallery from './ModalGallery';
import Audio from './Audio';
import HeaderBlock from './HeaderBlock';
import ContentBlock from './ContentBlock';
import StopLink from './StopLink';
import PieceBlock from './PieceBlock';
import Video from './Video';
import StopsList from './StopsList';
import Hotspots from './Hotspots';

const Section = React.createClass( {

	getInitialState() {

		return {
			open: false
		};

	},

	componentDidUpdate() {

		if ( this.state.open ) {

			// Scroll to section
			scrollToComponent( this.section, {
				align: 'top',
				duration: 500,
				offset: -60
			} );

		}

	},

	toggleOpen() {

		if ( this.state.open ) {

			this.setState( { open: false } );

		} else {

			this.setState( { open: true } );

		}

	},

	renderFlexBlock( flex, i ) {

		const type = flex.acf_fc_layout;
		const stops = this.props.stops;
		const stopNumber = this.props.stopNumber;

		switch( type ) {

			case 'gallery':
				if ( flex.display === 'modal' ) {
					return <ModalGallery key={i} photos={flex.photos} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} />
				}
				return <Gallery key={i} photos={flex.photos} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} />

			case 'link':
				return <Link key={i} link={flex} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} />

			case 'audio':
				return <Audio key={i} content={flex} stop={stops.posts[ stopNumber ]} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} />

			case 'header':
				return <HeaderBlock key={i} canToggle={true} toggleOpen={this.toggleOpen} sectionState={this.state}>{flex.header_text}</HeaderBlock>

			case 'content':
				return <ContentBlock key={i}>{flex.content}</ContentBlock>

			case 'stop':

				if ( flex.stop == undefined ) {
					return;
				}

				return <StopLink key={i} stopNumber={flex.stop_number} stopTitle={flex.stop.title} stopThumb={flex.stop.thumb} />

			case 'piece_information':
				return <PieceBlock key={i} piece_meta={flex.piece_meta} />

			case 'video':
				return <Video key={i} video={flex} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} />

			case 'stop_category':
				return <StopsList key={i} stops={this.props.stops} linkedStops={flex.stops} thisStop={stopNumber} />

			case 'hotspots':
				return <Hotspots key={i} hotspotsStyle={flex.hotspots_style} hotspotsImage={flex.hotspots_image} hotspots={flex.hotspots} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} />

		}

	},

	render() {

		const section = this.props.section;

		let sectionClasses = 'flexible-section';

		if ( section.collapsed && !this.state.open ) {
			sectionClasses += ' collapsed';
		}

		return (
			<div ref={ (ref) => this.section = ref } className={sectionClasses}>
				{section.blocks ? section.blocks.map(this.renderFlexBlock) : null}
			</div>
		);

	}

} );

export default Section;
