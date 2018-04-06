import _ from 'lodash';

const defaultState = {
	open: false,
	content: ''
};

function modal( state = defaultState, action ) {

	switch ( action.type ) {

		case 'OPEN_MODAL':
			return _.assign( {}, state, {
				open: true,
				content: action.content
			} );

		case 'CLOSE_MODAL':
			return _.assign( {}, state, {
				open: false
			} );

		default:
			return state;

	}

}

export default modal;
