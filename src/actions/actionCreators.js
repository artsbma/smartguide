import fetch from 'isomorphic-fetch';
import _ from 'lodash';

export function requestStops() {
	return {
		type: 'REQUEST_STOPS'
	}
}

export function receiveStops( stops ) {
	return {
		type: 'RECEIVE_STOPS',
		stops
	}
}

export function fetchStop( stopNumber ) {

	return function( dispatch ) {

		dispatch( requestStops() );

		return fetch( smartguide.api_url + 'stop?filter[meta_key]=stop_number&filter[meta_value]=' + stopNumber, { credentials: 'same-origin' } )
			.then( response => response.json() )
			.then( json => {

				const stop = {};

				if ( _.isEmpty( json ) ) {

					stop[stopNumber] = 404;

				} else {

					stop[stopNumber] = json[0];

				}

				return dispatch( receiveStops( stop ) );

			} );

	}

}

export function openModal() {
	return {
		type: 'OPEN_MODAL'
	}
}

export function closeModal() {
	return {
		type: 'CLOSE_MODAL'
	}
}
