import React from 'react';
import { browserHistory } from 'react-router';

import Icons from './Icons';

const StopSearch = React.createClass( {

	handleSubmit(e) {

		e.preventDefault();

		const stop = this.refs.stop;

		if ( !stop.value ) {

			stop.focus();

			return;

		}

		browserHistory.push( smartguide.guide_path + 'stop/' + stop.value );

		stop.value = '';

		stop.blur();

	},

	render() {

		return(

			<form className="stop-search" onSubmit={this.handleSubmit}>

				<label className="stop-number-label">
					<Icons icon="search" />
					<input type="number" pattern="[0-9]*" className="stop-number transparent" name="stop-number" ref="stop" placeholder="Stop Number" />
				</label>

				<input type="submit" value="Enter" className="stop-submit button button-big" />

			</form>

		);

	}

} );

export default StopSearch;
