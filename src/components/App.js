import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
	return {
		stops: state.stops,
		modal: state.modal
	};
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators( actionCreators, dispatch );
}

const App = connect( mapStateToProps, mapDispatchToProps )( Main );

export default App;
