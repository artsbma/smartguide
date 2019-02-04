import React from 'react';

class Modal extends React.Component {

	constructor( props ) {

		super( props );

		this.state = {
			open: false
		};

		this.getClassNames = this.getClassNames.bind( this );
		this.getOverlayClassNames = this.getOverlayClassNames.bind( this );
		this.renderModalContent = this.renderModalContent.bind( this );
		this.openModal = this.openModal.bind( this );
		this.renderContent = this.renderContent.bind( this );

	}

	componentDidUpdate() {

		if ( !this.props.modal.open && this.state.open ) {
			this.setState( { open: false } );
		}

	}

	getClassNames() {

		let classNames = 'modal';

		if ( this.props.classes ) {
			classNames += ' ' + this.props.classes;
		}

		if ( this.state.open ) {
			classNames += ' open';
		}

		return classNames;

	}

	getOverlayClassNames() {

		let classNames = 'modal-overlay';

		if ( this.props.classes ) {
			classNames += ' ' + this.props.classes + '-overlay';
		}

		if ( this.state.open ) {
			classNames += ' open';
		}

		return classNames;

	}

	renderModalContent( content ) {

		return { __html: content };

	}

	openModal() {

		this.props.openModal();

		this.setState( { open: true } );

	}

	renderContent() {

		if ( !this.state.open ) {
			return null;
		}

		return this.props.children;

	}

	render() {

		return(

			<div>
				<div className={this.getOverlayClassNames()} onClick={ (e) => {
					this.props.closeModal();
				} }></div>
				<div className={this.getClassNames()}>
					{this.renderContent()}
					<button className="modal-close-button" onClick={ (e) => {
						e.preventDefault();
						this.props.closeModal();
					} }>Close</button>
				</div>
			</div>

		);

	}

}

export default Modal;
