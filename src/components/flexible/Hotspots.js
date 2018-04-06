import React from 'react';
import ReactGA from 'react-ga';

import Modal from '../Modal';

const Hotspots = React.createClass( {

	getInitialState() {

		return {
			hasOpened: false
		};

	},

	renderContent( content ) {

		return { __html: content };

	},

	renderHotspot( hotspot, i ) {

		const styles = {
			left: hotspot.pos_x + '%',
			top: hotspot.pos_y + '%'
		};

		return(
			<div key={i}>
				<button className="hotspot" style={styles} onClick={ (e) => {
					e.preventDefault();
					ReactGA.event( {
						category: 'Hotspot',
						action: 'Expanded',
						label: hotspot.title
					} );
					this.refs['hotspotModal_' + i].openModal();
					this.setState( { hasOpened: true } );
				} } />

				<Modal ref={`hotspotModal_${i}`} modal={this.props.modal} openModal={this.props.openModal} closeModal={this.props.closeModal} classes="hotspot-modal">
					<div className="wrap">
						<h3>{hotspot.title}</h3>
						<div className="hotspot-content" dangerouslySetInnerHTML={this.renderContent(hotspot.content)}/>
					</div>
				</Modal>
			</div>
		);

	},

	render() {

		const hotspots = this.props.hotspots;

		let imageClasses = 'hotspots-image';

		if ( this.props.hotspotsStyle ) {
			imageClasses += ' hotspots-style-' + this.props.hotspotsStyle;
		}

		if ( !this.state.hasOpened ) {
			imageClasses += ' breathing-hotspots';
		}

		return(

			<div className="flexible-block flexible-hotspots">

				<div className={imageClasses}>
					<img src={this.props.hotspotsImage} />

					{hotspots.map(this.renderHotspot)}
				</div>

			</div>

		);

	}

} );

export default Hotspots;
