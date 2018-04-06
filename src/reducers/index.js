import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import stops from './stops';
import modal from './modal';

const rootReducer = combineReducers( { stops, modal, routing: routerReducer } );

export default rootReducer;
