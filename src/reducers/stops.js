import _ from 'lodash';

const defaultState = {
	posts: {},
	isFetching: false
};

function stops( state = defaultState, action ) {

	switch ( action.type ) {

		case 'REQUEST_STOPS':
			return _.assign( {}, state, {
				isFetching: true
			} );

		case 'RECEIVE_STOPS':
			return _.assign( {}, state, {
				isFetching: false,
				posts: _.assign( {}, state.posts, action.stops )
			} );

		default:
			return state;

	}

}

export default stops;
