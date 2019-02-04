import React from 'react';

var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

class PieceBlock extends React.Component {

	constructor( props ) {

		super( props );

		this.renderMetaItem = this.renderMetaItem.bind( this );

	}

	renderMetaItem( item, i ) {

		if ( !item.value ) {
			return null;
		}

		return <li key={i}>{entities.decode(item.value)}</li>

	}

	render() {

		const piece_meta = this.props.piece_meta;

		return (

			<ul className="flexible-block flexible-piece-block">
				{ piece_meta ? piece_meta.map( this.renderMetaItem ) : null }
			</ul>

		);

	}

}

export default PieceBlock;
