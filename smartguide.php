<?php
/**
 * Plugin Name: Smartguide
 * Description: Museum Smartguide
 * Author: Birmingham Museum of Art and Range
 * Author URI: http://artsbma.org
 */

define( 'SMARTGUIDE_URL', plugin_dir_url( __FILE__ ) );

// Advanced Custom Fields
require( plugin_dir_path( __FILE__ ) . 'inc/acf-fields.php' );

// Hotspots
require( plugin_dir_path( __FILE__ ) . 'inc/class-smartguide-hotspots.php' );

/**
 * Add guide query var
 *
 * @param array $query_vars
 *
 * @return array $query_vars
 */
function smartguide_query_var( $query_vars ) {

	$query_vars[] = 'guide';

	return $query_vars;

}
add_filter( 'query_vars', 'smartguide_query_var' );

/**
 * Add rewrite rule for /guide
 */
function smartguide_add_guide_rewrite_rule() {

	add_rewrite_rule( 'guide/?', 'index.php?guide=true', 'top' );

}
add_action( 'init', 'smartguide_add_guide_rewrite_rule' );

/**
 * Load Guide Template
 *
 * @param string $template
 *
 * @return string $template
 */
function smartguide_load_guide_template( $template ) {

	if ( 'true' == get_query_var( 'guide' ) ) {

		return plugin_dir_path( __FILE__ ) . '/template-guide.php';

	}

	return $template;

}
add_filter( 'template_include', 'smartguide_load_guide_template' );

/**
 * Guide Stop post type and taxonomy
 */
function smartguide_stop_post_type() {

	$args = array(
		'label' => __( 'Stops', 'smartguide' ),
		'labels' => array(
			'singular_name' => __( 'Stop', 'smartguide' ),
			'add_new_item' => __( 'Add New Stop', 'smartguide' ),
			'edit_item' => __( 'Edit Stop', 'smartguide' ),
			'new_item' => __( 'New Stop', 'smartguide' ),
			'view_item' => __( 'View Stop', 'smartguide' ),
			'search_items' => __( 'Search Stops', 'search_items' ),
			'not_found' => __( 'No stops found', 'smartguide' ),
			'not_found_in_trash' => __( 'No stops found in trash', 'smartguide' ),
			'parent_item_colon' => __( 'Parent Stop:', 'smartguide' ),
			'all_items' => __( 'All Stops', 'smartguide' ),
			'archives' => __( 'Stop Archives', 'smartguide' ),
			'insert_into_item' => __( 'Insert into stop', 'smartguide' ),
			'uploaded_to_this_item' => __( 'Uploaded to this stop', 'smartguide' ),
			'menu_name' => __( 'Guide', 'smartguide' ),
		),
		'public' => true,
		'show_in_nav_menus' => false,
		'show_in_admin_bar' => false,
		'menu_position' => 10,
		'menu_icon' => 'dashicons-lightbulb',
		'hierarchical' => true,
		'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions' ),
		'taxonomies' => array( 'guide_stop_category' ),
		'has_archive' => false,
		'rewrite' => array(
			'slug' => 'guide/stop',
			'with_front' => false,
		),
		'show_in_rest' => true,
		'rest_base' => 'stop',
	);

	register_post_type( 'guide_stop', $args );

	$args = array(
		'label' => __( 'Categories', 'smartguide' ),
		'labels' => array(
			'singular_name' => __( 'Category', 'smartguide' ),
			'all_items' => __( 'All Categories', 'smartguide' ),
			'edit_item' => __( 'Edit Category', 'smartguide' ),
			'view_item' => __( 'View Category', 'smartguide' ),
			'update_item' => __( 'Update Category', 'smartguide' ),
			'add_new_item' => __( 'Add New Category', 'smartguide' ),
			'new_item_name' => __( 'New Category', 'smartguide' ),
			'parent_item' => __( 'Parent Category', 'smartguide' ),
			'parent_item_colon' => __( 'Parent Category:', 'smartguide' ),
			'search_items' => __( 'Search Categories', 'smartguide' ),
			'popular_items' => __( 'Popular Categories', 'smartguide' ),
			'separate_items_with_commas' => __( 'Separate categories with commas', 'smartguide' ),
			'add_or_remove_items' => __( 'Add or remove categories', 'smartguide' ),
			'choose_from_most_used' => __( 'Choose from the most used categories', 'smartguide' ),
			'not_found' => __( 'No categories found.', 'smartguide' ),
		),
		'public' => true,
		'show_admin_column' => true,
		'description' => __( 'Stop Categories', 'smartguide' ),
		'hierarchical' => true,
		'rewrite' => array(
			'slug' => 'stop_category',
			'with_front' => false,
		),
	);

	register_taxonomy( 'guide_stop_category', 'guide_stop', $args );

	$args = array(
		'label' => __( 'Tags', 'smartguide' ),
		'labels' => array(
			'singular_name' => __( 'Tag', 'smartguide' ),
			'all_items' => __( 'All Tags', 'smartguide' ),
			'edit_item' => __( 'Edit Tag', 'smartguide' ),
			'view_item' => __( 'View Tag', 'smartguide' ),
			'update_item' => __( 'Update Tag', 'smartguide' ),
			'add_new_item' => __( 'Add New Tag', 'smartguide' ),
			'new_item_name' => __( 'New Tag', 'smartguide' ),
			'parent_item' => __( 'Parent Tag', 'smartguide' ),
			'parent_item_colon' => __( 'Parent Tag:', 'smartguide' ),
			'search_items' => __( 'Search Tags', 'smartguide' ),
			'popular_items' => __( 'Popular Tags', 'smartguide' ),
			'separate_items_with_commas' => __( 'Separate tags with commas', 'smartguide' ),
			'add_or_remove_items' => __( 'Add or remove tags', 'smartguide' ),
			'choose_from_most_used' => __( 'Choose from the most used tags', 'smartguide' ),
			'not_found' => __( 'No tags found.', 'smartguide' ),
		),
		'public' => true,
		'show_admin_column' => false,
		'description' => __( 'Stop Tags', 'smartguide' ),
		'hierarchical' => false,
		'rewrite' => array(
			'slug' => 'stop_tag',
			'with_front' => false,
		),
		'show_in_rest' => true,
		'rest_base' => 'stop_tag',
	);

	register_taxonomy( 'guide_stop_tag', 'guide_stop', $args );

}
add_action( 'init', 'smartguide_stop_post_type' );

/**
 * Plugin Activation
 * register post type and flush rewrite rules
 */
function smartguide_plugin_activation() {

	smartguide_stop_post_type();

	flush_rewrite_rules();

}
register_activation_hook( __FILE__, 'smartguide_plugin_activation' );

// Flush rewrite rules on plugin deactivation
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );

/**
 * Add Stop Column to Guide Stops post type
 *
 * @param array $columns
 *
 * @return array $columns
 */
function smartguide_add_stop_column( $columns ) {

	array_splice( $columns, 2, 0, array(
		'stop_number' => __( 'Stop', smartguide ),
	) );

	return $columns;

}
add_filter( 'manage_guide_stop_posts_columns', 'smartguide_add_stop_column' );

/**
 * Content for the Stop Column
 *
 * @param string $column
 * @param int $post_id
 */
function smartguide_stop_column_content( $column, $post_id ) {

	if ( 'stop_number' != $column ) {
		return;
	}

	echo '<div style="text-align: center;">' . get_field( 'stop_number', $post_id ) . '</div>';

}
add_action( 'manage_guide_stop_posts_custom_column', 'smartguide_stop_column_content', 10, 2 );

/**
 * REST API init
 */
function smartguide_rest_api_init() {

	// Add guide meta that we need to the REST API
	register_rest_field( 'guide_stop', 'stop_meta', array(
		'get_callback' => 'smartguide_get_meta_for_rest',
		'update_callback' => null,
		'schema' => null,
	) );

	// Add featured image to REST API
	register_rest_field( 'guide_stop', 'featured_images', array(
		'get_callback' => 'smartguide_get_featured_images_for_rest',
		'update_callback' => null,
		'schema' => null,
	) );

}
add_action( 'rest_api_init', 'smartguide_rest_api_init' );

/**
 * Return select meta fields for REST API
 */
function smartguide_get_meta_for_rest( $object, $field_name, $request ) {

	$meta = array();

	// Stop Number
	$meta['stop_number'] = get_field( 'stop_number', $object['id'] );

	// Show Featured Image
	$meta['show_featured_image'] = get_field( 'show_featured_image', $object['id'] );

	// Piece
	$piece = get_field( 'guide_stop_piece', $object['id'] );
	$meta['piece'] = $piece;

	// Flexible content
	$flexible_contents = get_field( 'flexible_content', $object['id'] );

	$flexible_content = array();

	$i = 0;
	$sections_started = false;

	// Loop through flex content to see if we need to change the values
	if ( !empty( $flexible_contents ) && is_array( $flexible_contents ) ) {

		foreach ( $flexible_contents as $content ) {

			// Hotspots
			if ( 'hotspots' == $content['acf_fc_layout'] && isset( $content['hotspots_id'] ) ) {

				$hotspots_id = $content['hotspots_id'];
				$hotspot_image_id = get_post_meta( $hotspots_id, 'hotspot_image_id', true );
				$hotspot_style = get_post_meta( $hotspots_id, 'hotspot_style', true );
				$hotspots = get_post_meta( $hotspots_id, 'hotspots', true );

				if ( !$hotspot_image_id || !$hotspots ) {
					continue;
				}

				$hotspots_data = array();

				foreach( $hotspots as $hotspot ) {
					$hotspot['content'] = apply_filters( 'the_content', $hotspot['content'] );
					$hotspots_data[] = $hotspot;
				}

				$content['hotspots_image'] = wp_get_attachment_image_url( $hotspot_image_id, 'full' );
				$content['hotspots_style'] = $hotspot_style;
				$content['hotspots'] = $hotspots_data;

			}

			// Stop
			if ( 'stop' == $content['acf_fc_layout'] && isset( $content['stop_number'] ) ) {

				$stops = get_posts( array(
					'post_type' => 'guide_stop',
					'posts_per_page' => 1,
					'meta_query' => array(
						array(
							'key' => 'stop_number',
							'value' => $content['stop_number'],
						),
					),
				) );

				if ( $stops ) {

					$stop = $stops[0];

					if ( has_post_thumbnail( $stop ) ) {
						$thumb = get_the_post_thumbnail_url( $stop, 'square-thumb' );
					} else {
						$thumb = false;
					}

					$content['stop'] = array(
						'title' => $stop->post_title,
						'thumb' => $thumb,
					);

				}

			}

			// Category
			if ( 'stop_category' == $content['acf_fc_layout'] && isset( $content['category'] ) ) {

				$stop_links = array();

				$stops = get_posts( array(
					'post_type' => 'guide_stop',
					'posts_per_page' => -1,
					'tax_query' => array(
						array(
							'taxonomy' => 'guide_stop_category',
							'field' => 'id',
							'terms' => $content['category'],
						),
					),
				) );

				if ( $stops ) {

					foreach ( $stops as $stop ) {

						$stop_number = get_field( 'stop_number', $stop->ID );

						if ( $stop_number ) {

							if ( has_post_thumbnail( $stop ) ) {
								$thumb = get_the_post_thumbnail_url( $stop, 'square-thumb' );
							} else {
								$thumb = false;
							}

							$stop_links[ $stop_number ] = array(
								'title' => $stop->post_title,
								'thumb' => $thumb,
							);

						}

					}

				}

				$content['stops'] = $stop_links;

			}

			if ( 'header' == $content['acf_fc_layout'] ) {

				if ( $sections_started ) {
					$i++;
				}

				$flexible_content[$i]['collapsed'] = true;

			}

			$flexible_content[$i]['blocks'][] = $content;
			$sections_started = true;

		}

	}

	$meta['flexible_content'] = $flexible_content;

	return $meta;

}

/**
 * Return an array of featured image sizes
 */
function smartguide_get_featured_images_for_rest( $object, $field_name, $request ) {

	$featured_images = array();

	if ( has_post_thumbnail( $object['id'] ) ) {

		foreach( get_intermediate_image_sizes() as $size ) {

			$image_src = wp_get_attachment_image_src( get_post_thumbnail_id( $object['id'] ), $size );

			$featured_images[ $size ] = $image_src[0];

		}

		$full_src = $image_src = wp_get_attachment_image_src( get_post_thumbnail_id( $object['id'] ), 'full' );

		$featured_images['full'] = $full_src[0];

	}

	return $featured_images;

}

/**
 * Add options page through Advanced Custom Fields
 */
if ( function_exists( 'acf_add_options_page' ) ) {

	acf_add_options_page( array(
		'page_title'  => __( 'Guide Settings', 'smartguide' ),
		'menu_title'  => __( 'Settings', 'smartguide' ),
		'menu_slug'   => 'smartguide_settings',
		'capability'  => 'manage_options',
		'parent_slug' => 'edit.php?post_type=guide_stop',
	) );

}

/**
 * Remove related YouTube videos at the end of embedded videos through oembed
 *
 * @param string $data
 * @param string $url
 * @param array $args
 *
 * @return string $data
 */
function smartguide_hide_related_youtube_videos( $data, $url, $args ) {

	if ( !strpos( $data, 'youtube.com' ) ) {
		return $data;
	}

	$data = str_replace( 'feature=oembed', 'feature=oembed&amp;rel=0', $data );

	return $data;

}
add_filter( 'oembed_result', 'smartguide_hide_related_youtube_videos', 10, 3 );

add_action( 'rest_api_init', 'rest_api_filter_add_filters' );

/**
 * Add the necessary filter to each post type
 **/
function rest_api_filter_add_filters() {
	foreach ( get_post_types( array( 'show_in_rest' => true ), 'objects' ) as $post_type ) {
		add_filter( 'rest_' . $post_type->name . '_query', 'rest_api_filter_add_filter_param', 10, 2 );
	}
}

/**
 * Add the filter parameter
 *
 * @param  array           $args    The query arguments.
 * @param  WP_REST_Request $request Full details about the request.
 * @return array $args.
 **/
function rest_api_filter_add_filter_param( $args, $request ) {
	// Bail out if no filter parameter is set.
	if ( empty( $request['filter'] ) || ! is_array( $request['filter'] ) ) {
		return $args;
	}

	$filter = $request['filter'];

	if ( isset( $filter['posts_per_page'] ) && ( (int) $filter['posts_per_page'] >= 1 && (int) $filter['posts_per_page'] <= 100 ) ) {
		$args['posts_per_page'] = $filter['posts_per_page'];
	}

	global $wp;
	$vars = apply_filters( 'rest_query_vars', $wp->public_query_vars );

	function allow_meta_query( $valid_vars ) {
		$valid_vars = array_merge( $valid_vars, array( 'meta_query', 'meta_key', 'meta_value', 'meta_compare' ) );
 		return $valid_vars;
 	}
 	$vars = allow_meta_query( $vars );

	foreach ( $vars as $var ) {
		if ( isset( $filter[ $var ] ) ) {
			$args[ $var ] = $filter[ $var ];
		}
	}
	return $args;
}
