import React from 'react';
import { Link, browserHistory } from 'react-router';

import Icons from './Icons';

const Header = React.createClass( {

	goToStop() {

		const stop = this.refs.stop;

		browserHistory.push( smartguide.guide_path + 'stop/' + stop.value );

		stop.value = '';

		stop.blur();

	},

	handleSearchSubmit(e) {

		e.preventDefault();

		const stop = this.refs.stop;

		if ( !stop.value ) {

			stop.focus();

			return;

		}

		this.goToStop();

	},

	handleBlur() {

		const stop = this.refs.stop;

		if ( !stop.value ) {
			return;
		}

		this.goToStop();

	},

	handleCloseModal(e) {

		e.preventDefault();

		this.props.closeModal();

	},

	getSearchClassNames() {

		let classNames = 'header-stop-search';

		if ( this.props.modal.open ) {
			classNames += ' hidden';
		}

		return classNames;

	},

	getModalCloseClassNames() {

		let classNames = 'modal-close';

		if ( !this.props.modal.open ) {
			classNames += ' hidden';
		}

		return classNames;

	},

	renderSearchForm() {

		return (

			<form className={this.getSearchClassNames()} onSubmit={this.handleSearchSubmit}>

				<button className="search-icon"><Icons icon="search" /></button>

				<input type="number" pattern="[0-9]*" ref="stop" className="header-stop-number" placeholder="Enter Stop #" onBlur={this.handleBlur} />

			</form>

		);

	},

	renderLogo() {

		if ( !smartguide.options.logo ) {
			return null;
		}

		return (

			<Link to={smartguide.guide_path} onClick={ () => {
				this.props.closeModal();
			} }>
				<img src={smartguide.options.logo.sizes.large} width="63" height="42" alt="smartguide" />
			</Link>

		);

	},

	render() {

		return(

			<header className="site-header">

				<h1 className="site-title">
					{this.renderLogo()}
				</h1>

				{this.renderSearchForm()}

				<button className={this.getModalCloseClassNames()} onClick={this.handleCloseModal}>
					Close
					<Icons icon="close" />
				</button>

			</header>

		);

	}

} );

export default Header;
