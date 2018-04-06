import React from 'react';

const ContentBlock = React.createClass( {

	renderContent( content ) {

		return { __html: content }

	},

	render() {

		return(

			<div className="flexible-block flexible-content" dangerouslySetInnerHTML={this.renderContent( this.props.children )}></div>

		);

	}

} );

export default ContentBlock;
