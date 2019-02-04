import React from 'react';

class ContentBlock extends React.Component {

	constructor( props ) {

		super( props );

		this.renderContent = this.renderContent.bind( this );

	}

	renderContent( content ) {

		return { __html: content }

	}

	render() {

		return(

			<div className="flexible-block flexible-content" dangerouslySetInnerHTML={this.renderContent( this.props.children )}></div>

		);

	}

}

export default ContentBlock;
