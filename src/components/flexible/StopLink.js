import React from 'react';
import { Link } from 'react-router';

var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

const StopLink = React.createClass( {

	showThumb( stopThumb ) {

		if ( stopThumb == undefined || !stopThumb ) {
			return;
		}

		return <img src={stopThumb} className="thumb" />

	},

	render() {

		const { stopNumber, stopTitle, stopThumb } = this.props;

		return(

			<Link to={`${smartguide.guide_path}stop/${stopNumber}`} className="flexible-block flexible-link flexible-stop-link">
				{this.showThumb( stopThumb )}
				<div>
					<span className="stop-title">{entities.decode(stopTitle)}</span>
					<span className="stop-number">{stopNumber}</span>
				</div>
			</Link>

		);

	}

} );

export default StopLink;
