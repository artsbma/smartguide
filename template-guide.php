<!DOCTYPE html>
<?php $version = '0.0.1'; ?>
<html <?php language_attributes(); ?>>
<head>

	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="apple-mobile-web-app-title" content="smartguide">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">

	<?php
	$startup_image = plugin_dir_url( __FILE__ ) . 'images/home-bg.jpg';
	$landing_bg = get_field( 'landing_bg', 'option' );
	if ( !empty( $landing_bg ) && !empty( $landing_bg['sizes'] ) && !empty( $landing_bg['sizes']['large'] ) ) {
		$startup_image = $landing_bg['sizes']['large'];
	}
	?>
	<link rel="apple-touch-startup-image" href="<?php echo $startup_image; ?>">

	<title>smartguide</title>

	<link rel="stylesheet" href="<?php echo plugin_dir_url( __FILE__ ); ?>style.css?v=<?php echo $version; ?>" type="text/css" media="all" />

</head>
<body>

<div id="main"></div>

<script>
	var smartguide = {
		plugin_url: '<?php echo esc_js( plugin_dir_url( __FILE__ ) ); ?>',
		api_url: '<?php echo esc_js( get_rest_url() ) . 'wp/v2/'; ?>',
		guide_path: '/guide/',
		options: {
			landing_bg: <?php echo json_encode( get_field( 'landing_bg', 'option' ) ); ?>,
			landing_content: '<?php echo esc_js( get_field( 'landing_content', 'option' ) ); ?>',
			logo: <?php echo json_encode( get_field( 'smartguide_logo', 'option' ) ); ?>
		}
	};
</script>
<script type="text/javascript" src="<?php echo plugin_dir_url( __FILE__ ); ?>main.js?v=<?php echo $version; ?>"></script>

</body>
</html>
