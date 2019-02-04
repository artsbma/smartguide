import React from 'react';
import { Link } from 'react-router';

class PageNotFound extends React.Component {

	render() {

		return(

			<div className="page-not-found wrap">

				<h1>404 Page Not Found</h1>

				<p><Link to={smartguide.guide_path}>Return to the Guide</Link></p>

			</div>

		);

	}

}

export default PageNotFound;
