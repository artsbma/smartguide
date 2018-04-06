import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

const store = createStore( rootReducer, applyMiddleware( thunkMiddleware ) );

export const history = syncHistoryWithStore( browserHistory, store );

export default store;
