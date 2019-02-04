import React from 'react';
import { browserHistory } from 'react-router';

import Icons from './Icons';

class StopSearch extends React.Component {

	constructor( props ) {

		super( props );

		this.stopInput = React.createRef();

		this.handleSubmit = this.handleSubmit.bind( this );

	}

	handleSubmit(e) {

		e.preventDefault();

		const stop = this.stopInput.current;

		if ( !stop.value ) {

			stop.focus();

			return;

		}

		browserHistory.push( smartguide.guide_path + 'stop/' + stop.value );

		stop.value = '';

		stop.blur();

	}

	render() {

		return(

			<form className="stop-search" onSubmit={this.handleSubmit}>

				<label className="stop-number-label">
					<Icons icon="search" />
					<input type="number" pattern="[0-9]*" className="stop-number transparent" name="stop-number" ref={this.stopInput} placeholder="Stop Number" />
				</label>

				<input type="submit" value="Enter" className="stop-submit button button-big" />

			</form>

		);

	}

}

export default StopSearch;
