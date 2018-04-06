import React from 'react';
import { Link } from 'react-router';

const PageNotFound = React.createClass( {

	render() {

		return(

			<div className="page-not-found wrap">

				<h1>404 Page Not Found</h1>

				<p><Link to={smartguide.guide_path}>Return to the Guide</Link></p>

			</div>

		);

	}

} );

export default PageNotFound;
