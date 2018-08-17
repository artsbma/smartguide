<?php
/**
 * Hotspots
 */

class SmartguideHotspots {

	/**
	 * Init
	 */
	public function init() {

		// Post Type
		add_action( 'init', array( $this, 'hotspot_post_type' ) );

		// Meta box
		add_action( 'add_meta_boxes_hotspot', array( $this, 'hotspot_add_meta_boxes' ) );

		// Save meta
		add_action( 'save_post', array( $this, 'save_meta' ), 10, 2 );

		// Scripts and styles
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

	}

	/**
	 * Post Type
	 */
	public function hotspot_post_type() {

		$args = array(
			'label' => __( 'Hotspots', 'smartguide' ),
			'labels' => array(
				'singular_name' => __( 'Hotspot', 'smartguide' ),
				'add_new_item' => __( 'Add New Hotspot', 'smartguide' ),
				'edit_item' => __( 'Edit Hotspot', 'smartguide' ),
				'new_item' => __( 'New Hotspot', 'smartguide' ),
				'view_item' => __( 'View Hotspot', 'smartguide' ),
				'search_item' => __( 'Search Hotspots', 'smartguide' ),
				'not_found' => __( 'No hotspots found.', 'smartguide' ),
				'not_found_in_trash' => __( 'No hotspots found in trash.', 'smartguide' ),
				'parent_item_colon' => __( 'Parent Hotspot:', 'smartguide' ),
				'all_items' => __( 'Hotspots', 'smartguide' ),
				'archives' => __( 'Hotspots', 'smartguide' ),
				'insert_into_item' => __( 'Insert into hotspot', 'smartguide' ),
				'uploaded_to_this_item' => __( 'Uploaded to this hotspot', 'smartguide' ),
			),
			'public' => true,
			'menu_position' => 20,
			'menu_icon' => 'dashicons-marker',
			'hierarchical' => false,
			'supports' => array( 'title', 'revisions' ),
			'has_archive' => false,
			'rewrite' => array(
				'slug' => 'hotspot',
				'with_front' => false,
			),
            'show_in_menu' => 'edit.php?post_type=guide_stop',
			'show_in_rest' => true,
			'rest_base' => 'hotspot',
		);

		register_post_type( 'hotspot', $args );

	}

	/**
	 * Add meta boxes
	 */
	public function hotspot_add_meta_boxes() {

		add_meta_box(
			'hotspot_meta',
			__( 'Hotspot', 'smartguide' ),
			array( $this, 'meta_box' ),
			'hotspot',
			'normal',
			'high'
		);

	}

	/**
	 * Meta Box
	 *
	 * @param object $post
	 */
	public function meta_box( $post ) {

		wp_nonce_field( basename( __FILE__ ), 'smartguide_hotspots_nonce' );

		$image_id = get_post_meta( $post->ID, 'hotspot_image_id', true );
		if ( $image_id ) {

			$image_tag = wp_get_attachment_image( $image_id, 'full' );

		}

		$hotspots = get_post_meta( $post->ID, 'hotspots', true );
		if ( $hotspots ) {

			$hotspots_output = '';

			foreach ( $hotspots as $hotspot ) {

				$pos_x = $hotspot['pos_x'];
				$pos_y = $hotspot['pos_y'];

				$hotspots_output .= '<div class="smartguide-hotspot" style="left: ' . $pos_x . '%; top: ' . $pos_y . '%;">';

				$hotspots_output .= '<div class="smartguide-hotspot-fields">';
				$hotspots_output .= '<textarea name="smartguide-hotspot-title[]" class="smartguide-hotspot-title">' . $hotspot['title'] . '</textarea>';
				$hotspots_output .= '<textarea name="smartguide-hotspot-content[]" class="smartguide-hotspot-content">' . $hotspot['content'] . '</textarea>';
				$hotspots_output .= '<input type="hidden" name="smartguide-hotspot-pos-x[]" value="' . esc_attr( $hotspot['pos_x'] ) . '">';
				$hotspots_output .= '<input type="hidden" name="smartguide-hotspot-pos-y[]" value="' . esc_attr( $hotspot['pos_y'] ) . '">';
				$hotspots_output .= '</div>';

				$hotspots_output .= '</div>';

			}

		}

		$hotspot_style = get_post_meta( $post->ID, 'hotspot_style', true );
		if ( $hotspot_style ) {
			$hotspot_style_class = 'smartguide-hotspot-style-' . esc_attr( $hotspot_style );
		}
		?>

		<input type="hidden" name="hotspot_image_id" class="smartguide-hotspot-image-id" <?php if ( $image_id ) echo 'value="' . $image_id . '"'; ?>>

		<div class="smartguide-hotspots-container <?php if ( $image_id ) echo 'with-image'; ?>">

			<div class="smartguide-hotspots-controls">

				<div class="hotspot-style-selection">
					<label><?php _e( 'Hotspot Color', 'smartguide' ); ?>
					<select name="hotspot_style" class="smartguide-hotspot-style">
						<option value="light" <?php selected( $hotspot_style, 'light' ); ?>>Light</option>
						<option value="medium" <?php selected( $hotspot_style, 'medium' ); ?>>Medium</option>
						<option value="dark" <?php selected( $hotspot_style, 'dark' ); ?>>Dark</option>
					</select>
					</label>
				</div> <!-- /.hotspot-style-selection -->

				<div class="hotspot-image-controls">
					<button class="button hotspot-add-image js-hotspot-add-image"><?php _e( 'Add Image', 'smartguide' ); ?></button>
					<button class="button hotspot-remove-image js-hotspot-remove-image"><?php _e( 'Remove Image', 'smartguide' ); ?></button>
				</div> <!-- /.hotspot-image-controls -->

			</div> <!-- /.smartguide-hotspots-controls -->

			<div class="smartguide-hotspot-image-holder">
				<div class="smartguide-hotspot-image <?php if ( !empty( $hotspot_style_class ) ) echo $hotspot_style_class; ?>">
					<?php if ( isset( $image_tag ) ) echo $image_tag; ?>
					<?php if ( !empty( $hotspots_output ) ) echo $hotspots_output; ?>

					<div class="smartguide-hotspot-editor">
						<input type="text" name="smartguide-hotspot-title-temp" placeholder="Title" class="smartguide-hotspot-title-input">
						<?php wp_editor( '', 'smartguide_hotspot_editor' ); ?>
						<div class="smartguide-hotspot-editor-controls">

							<button class="button button-primary smartguide-hotspot-update js-smartguide-hotspot-update"><?php _e( 'Update', 'smartguide_hotspot' ); ?></button>
							<button class="button smartguide-hotspot-cancel js-smartguide-hotspot-cancel"><?php _e( 'Cancel', 'smartguide_hotspot' ); ?></button>
							<button class="button smartguide-hotspot-remove js-smartguide-hotspot-remove"><?php _e( 'Remove Hotspot', 'smartguide_hotspot' ); ?></button>

						</div> <!-- /.smartguide-hotspot-editor-controls -->
					</div> <!-- /.smartguide-hotspot-editor -->

				</div> <!-- /.smartguide-hotspot-image -->
			</div> <!-- /.smartguide-hotspot-image-holder -->

		</div> <!-- /.smartguide-hotspots-container -->

		<?php

	}

	/**
	 * Save meta
	 *
	 * @param int $post_id
	 * @param object $post
	 */
	public function save_meta( $post_id, $post ) {

		if ( !isset( $_POST['smartguide_hotspots_nonce'] ) || !wp_verify_nonce( $_POST['smartguide_hotspots_nonce'], basename( __FILE__ ) ) ) {
			return;
		}

		if ( !current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$image_id = ( isset( $_POST['hotspot_image_id'] ) ) ? intval( $_POST['hotspot_image_id'] ) : '';
		$image_meta_key = 'hotspot_image_id';

		if ( '' == $image_id ) {

			delete_post_meta( $post_id, $image_meta_key );

		} else {

			update_post_meta( $post_id, $image_meta_key, $image_id );

		}

		$hotspot_style = ( isset( $_POST['hotspot_style'] ) ) ? $_POST['hotspot_style'] : '';
		$hotspot_style_key = 'hotspot_style';

		if ( '' == $hotspot_style ) {

			delete_post_meta( $post_id, $hotspot_style_key );

		} else {

			update_post_meta( $post_id, $hotspot_style_key, $hotspot_style );

		}

		$hotspot_x = ( isset( $_POST['smartguide-hotspot-pos-x'] ) ) ? $_POST['smartguide-hotspot-pos-x'] : false;
		$hotspot_y = ( isset( $_POST['smartguide-hotspot-pos-y'] ) ) ? $_POST['smartguide-hotspot-pos-y'] : false;
		$titles = ( isset( $_POST['smartguide-hotspot-title'] ) ) ? $_POST['smartguide-hotspot-title'] : '';
		$contents = ( isset( $_POST['smartguide-hotspot-content'] ) ) ? $_POST['smartguide-hotspot-content'] : '';

		$hotspots = array();

		if ( $hotspot_x && $hotspot_y ) {

			for ( $i = 0; $i <= count( $hotspot_x ); $i ++ ) {

				if ( '' == $hotspot_y[ $i ] || '' == $hotspot_y ) {
					continue;
				}

				$hotspots[] = array(
					'pos_x'   => $hotspot_x[ $i ],
					'pos_y'   => $hotspot_y[ $i ],
					'title'   => $titles[ $i ],
					'content' => wp_kses_post( $contents[ $i ] ),
				);

			}

		}

		if ( count( $hotspots ) > 0 ) {

			update_post_meta( $post_id, 'hotspots', $hotspots );

		} else {

			delete_post_meta( $post_id, 'hotspots' );

		}

	}

	/**
	 * Enqueue scripts and styles
	 *
	 * @param string $hook
	 */
	public function enqueue_scripts( $hook ) {

		$current_screen = get_current_screen();
		$version = 1.2;

		if ( 'post.php' != $hook && 'post-new.php' != $hook ) {
			return;
		}

		if ( empty( $current_screen ) || 'hotspot' != $current_screen->post_type ) {
			return;
		}

		// Enqueue scripts
		wp_enqueue_script( 'hotspots-js', SMARTGUIDE_URL . 'js/hotspots.js', array( 'jquery', 'jquery-ui-draggable', 'media-upload' ), $version, true );

		// Enqueue styles
		wp_enqueue_style( 'hotspots-css', SMARTGUIDE_URL . 'css/hotspots.css', array(), $version );

	}

}

$smartguide_hotspots = new SmartguideHotspots();
$smartguide_hotspots->init();
