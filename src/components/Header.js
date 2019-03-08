import React from 'react';
import { Link, browserHistory } from 'react-router';
import { CSSTransition } from 'react-transition-group';

import Icons from './Icons';

class Header extends React.Component {

	constructor( props ) {

		super( props );

		this.stopInput = React.createRef();

		this.goToStop = this.goToStop.bind( this );
		this.handleSearchSubmit = this.handleSearchSubmit.bind( this );
		this.handleBlur = this.handleBlur.bind( this );
		this.handleCloseModal = this.handleCloseModal.bind( this );
		this.renderLogo = this.renderLogo.bind( this );

	}

	goToStop() {

		const stop = this.stopInput.current;

		browserHistory.push( smartguide.guide_path + 'stop/' + stop.value );

		stop.value = '';

		stop.blur();

	}

	handleSearchSubmit(e) {

		e.preventDefault();

		const stop = this.stopInput.current;

		if ( !stop.value ) {

			stop.focus();

			return;

		}

		this.goToStop();

	}

	handleBlur() {

		const stop = this.stopInput.current;

		if ( !stop.value ) {
			return;
		}

		this.goToStop();

	}

	handleCloseModal(e) {

		e.preventDefault();

		this.props.closeModal();

	}

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

	}

	render() {

		return(

			<header className="site-header">

				<h1 className="site-title">
					{this.renderLogo()}
				</h1>

				<CSSTransition in={!this.props.modal.open} timeout={1000} classNames="slide" unmountOnExit>
					{ (state) => (

						<form className="header-stop-search" onSubmit={this.handleSearchSubmit}>

							<button className="search-icon"><Icons icon="search" /></button>

							<input type="number" pattern="[0-9]*" ref={this.stopInput} className="header-stop-number" placeholder="Enter Stop #" onBlur={this.handleBlur} />

						</form>

					) }
				</CSSTransition>

				<CSSTransition in={this.props.modal.open} timeout={1000} classNames="slide" unmountOnExit>
					{ (state) => (
						<button className="modal-close" onClick={this.handleCloseModal}>
							Close
							<Icons icon="close" />
						</button>
					) }
				</CSSTransition>

			</header>

		);

	}

}

export default Header;
