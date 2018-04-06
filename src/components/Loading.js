import React from 'react';

const Loading = React.createClass( {

	render() {

		return(

			<div className="loading-component">

				<img src={`${smartguide.plugin_url}/images/button-loader.gif`} alt="loading" className="loading-gif" />

			</div>

		);

	}

} );

export default Loading;
