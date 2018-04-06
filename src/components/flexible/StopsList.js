import React from 'react';

import StopLink from './StopLink';

const StopsList = React.createClass( {

	renderStopLink( stopNumber, i ) {

		const stop = this.props.linkedStops[ stopNumber ];

		return <StopLink key={i} stopNumber={stopNumber} stopTitle={stop.title} stopThumb={stop.thumb} />

	},

	render() {

		const linkedStops = this.props.linkedStops;

		if ( linkedStops.length == 0 ) {
			return null;
		}

		return (

			<div>

				{Object.keys( linkedStops ).map( this.renderStopLink )}

			</div>

		);

	}

} );

export default StopsList;
