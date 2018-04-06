import React from 'react';

import StopSearch from './StopSearch';

const StopNotFound = React.createClass( {

	render() {

		return(

			<div className="stop-not-found">

				<h1 className="page-title">Stop # {this.props.stopNumber} Not Found</h1>

				<StopSearch />

			</div>

		);

	}

} );

export default StopNotFound;
