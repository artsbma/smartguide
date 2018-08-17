jQuery(document).ready( function($){

	var meta_image_frame,
		media_attachment,
		imageField = $( '.smartguide-hotspot-image-id'),
		container = $( '.smartguide-hotspots-container' ),
		imageHolder = $( '.smartguide-hotspot-image' ),
		editorModal = $( '.smartguide-hotspot-editor' ),
		editorTitle = $( '.smartguide-hotspot-title-input' );

	/**
	 * Open Editor
	 */
	function openEditor() {

		imageHolder.addClass( 'editor-open' );
		editorModal.addClass( 'open' );

	}

	/**
	 * Close Editor
	 */
	function closeEditor() {

		$( '.smartguide-hotspot' ).removeClass( 'editing' );
		imageHolder.removeClass( 'editor-open' );
		editorModal.removeClass( 'open' );

		tinyMCE.editors.smartguide_hotspot_editor.setContent( '' );
		editorTitle.val( '' );

	}

	/**
	 * Draggable hotspots
	 */
	function draggableHotspots() {

		$( '.smartguide-hotspot' ).draggable( {
			stop: function ( e, ui ) {

				var image = imageHolder.children( 'img' );

				var mouseX = ui.position.left,
					mouseY = ui.position.top,
					imageW = image.width(),
					imageH = image.height();

				var posX = mouseX / imageW,
					posY = mouseY / imageH,
					movedHotspot = $( e.target );

				movedHotspot.find( 'input[name="smartguide-hotspot-pos-x[]"]' ).val( posX * 100 );
				movedHotspot.find( 'input[name="smartguide-hotspot-pos-y[]"]' ).val( posY * 100 );

			},
			cursor: 'move',
			cursorAt: {
				left: 0,
				top: 0
			}
		} );

	}
	draggableHotspots();

	/**
	 * Click events
	 */
	$( 'body' ).on( 'click', '.js-hotspot-add-image', function(e){

		e.preventDefault();

		if ( meta_image_frame ) {
			meta_image_frame.open();
			return;
		}

		meta_image_frame = wp.media.frames.meta_image_frame = wp.media( {
			title: 'Select Image',
			button: { text: 'Use Image' },
			library: { type: 'image' }
		} );

		meta_image_frame.on( 'select', function(){

			media_attachment = meta_image_frame.state().get('selection').first().toJSON();

			var newImage = $( '<img>' );

			newImage.attr( 'src', media_attachment.url );

			imageField.val( media_attachment.id );
			container.addClass( 'with-image' );
			imageHolder.prepend( newImage );

		} );

		meta_image_frame.open();

	} ).on( 'click', '.js-hotspot-remove-image', function(e){

		e.preventDefault();

		imageField.val( '' );
		container.removeClass( 'with-image' );
		imageHolder.children( 'img' ).remove();
		imageHolder.children( '.smartguide-hotspot' ).remove();

	} ).on( 'click', '.smartguide-hotspot-image img', function(e){

		e.preventDefault();

		if ( imageHolder.hasClass( 'hotspot-open' ) ) {
			return;
		}

		var mouseX = e.pageX - $( this ).offset().left,
			mouseY = e.pageY - $( this ).offset().top,
			imageW = $( this ).width(),
			imageH = $( this ).height();

		var posX = mouseX / imageW,
			posY = mouseY / imageH;

		var newSpot = $( '<div class="smartguide-hotspot editing" />' ),
			newSpotFields = $( '<div class="smartguide-hotspot-fields" />' ),
			newSpotTitle = $( '<textarea name="smartguide-hotspot-title[]" class="smartguide-hotspot-title" />' ),
			newSpotContent = $( '<textarea name="smartguide-hotspot-content[]" class="smartguide-hotspot-content" />' ),
			newSpotInputX = $( '<input type="hidden" name="smartguide-hotspot-pos-x[]" />' ),
			newSpotInputY = $( '<input type="hidden" name="smartguide-hotspot-pos-y[]" />' );

		newSpot.css( {
			left: ( posX * 100 ) + '%',
			top: ( posY * 100 ) + '%'
		} );

		newSpotInputX.val( posX * 100 );
		newSpotInputY.val( posY * 100 );

		newSpotFields.append( newSpotTitle ).append( newSpotContent ).append( newSpotInputX ).append( newSpotInputY );
		newSpot.append( newSpotFields );

		imageHolder.append( newSpot );

		openEditor();
		draggableHotspots();

	} ).on( 'click', '.smartguide-hotspot', function(e){

		e.preventDefault();

		if ( imageHolder.hasClass( 'editor-open' ) ) {
			return;
		}

		$( this ).addClass( 'editing' );

		var title = $( this ).find( '.smartguide-hotspot-title' ).val(),
			content = $( this ).find( '.smartguide-hotspot-content' ).val();

		openEditor();

		editorTitle.val( title );

		tinyMCE.editors.smartguide_hotspot_editor.setContent( content );

	} ).on( 'click', '.js-smartguide-hotspot-update', function(e){

		e.preventDefault();

		var title = $( '.smartguide-hotspot-title-input' ).val(),
			content = tinyMCE.editors.smartguide_hotspot_editor.getContent();

		$( '.smartguide-hotspot.editing .smartguide-hotspot-title' ).val( title );
		$( '.smartguide-hotspot.editing .smartguide-hotspot-content' ).val( content );

		closeEditor();

	} ).on( 'click', '.js-smartguide-hotspot-cancel', function(e){

		e.preventDefault();

		closeEditor();

	} ).on( 'click', '.js-smartguide-hotspot-remove', function(e){

		e.preventDefault();

		$( '.smartguide-hotspot.editing' ).remove();

		closeEditor();

	} ).on( 'keypress', '.smartguide-hotspot-title-input', function(e){

		if ( 13 === e.keyCode ) {
			e.preventDefault();
			// todo - tab to editor
		}

	} ).on( 'change', '.smartguide-hotspot-style', function(){

		var classPrefix = 'smartguide-hotspot-style-';

		$( this ).children( 'option' ).each( function(){
			imageHolder.removeClass( classPrefix + $( this ).val() );
		} );

		imageHolder.addClass( classPrefix + $( this ).val() );

	} );

} );
