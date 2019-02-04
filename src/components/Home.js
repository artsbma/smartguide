import React from 'react';
import { Link } from 'react-router';

import Icons from './Icons';
import StopSearch from './StopSearch';

class Home extends React.Component {

	constructor( props ) {

		super( props );

		this.renderHomeStyles = this.renderHomeStyles.bind( this );

	}

	renderHomeStyles() {

		if ( null === smartguide.options.landing_bg || !smartguide.options.landing_bg.hasOwnProperty( 'sizes' ) || !smartguide.options.landing_bg.sizes.hasOwnProperty( 'large' ) ) {
			return null;
		}

		return {
			backgroundImage: 'url(' + smartguide.options.landing_bg.sizes.large + ')'
		}

	}

	render() {

		return(

			<div className="home-container wrap" style={this.renderHomeStyles()}>

				<div className="wrap">

					<p className="description">Enter the stop number from the label next to the artwork.</p>

					<StopSearch />

					<p className="landing-content">{smartguide.options.landing_content}</p>

				</div>

			</div>

		);

	}

}

export default Home;
