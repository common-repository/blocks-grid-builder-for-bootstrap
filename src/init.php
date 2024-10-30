<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package bootstrap-blocks-builder
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function bootstrap_blocks_builder_get_theme_colors_names() {
	$names = array(
		'primary'      => esc_html__( 'Primary', 'bootstrap-blocks-builder' ),
		'secondary'    => esc_html__( 'Secondary', 'bootstrap-blocks-builder' ),
		'success'  	=> esc_html__( 'Success', 'bootstrap-blocks-builder' ),
		'danger'       => esc_html__( 'Danger', 'bootstrap-blocks-builder' ),
		'warning'    => esc_html__( 'Warning', 'bootstrap-blocks-builder' ),
		'info'       => esc_html__( 'Info', 'bootstrap-blocks-builder' ),
		'light'     => esc_html__( 'Light', 'bootstrap-blocks-builder' ),
		'dark'    => esc_html__( 'Dark', 'bootstrap-blocks-builder' ),
		'white'      => esc_html__( 'White', 'bootstrap-blocks-builder' ),

	);

	return apply_filters( 'bootstrap_blocks_builder_theme_colors_names', $names );
}


function bootstrap_blocks_builder_get_theme_colors_values() {
	$values = array(
		'#007bff',
		'#6c757d',
		'#28a745',
		'#dc3545',
		'#ffc107',
		'#17a2b8',
		'#f8f9fa',
		'#343a40',
		'#FFF',

	);

	return apply_filters( 'bootstrap_blocks_builder_theme_colors_values', $values );
}
function bootstrap_blocks_builder_get_theme_palette() {
	$names  = bootstrap_blocks_builder_get_theme_colors_names();
	$values = bootstrap_blocks_builder_get_theme_colors_values();
	$rt     = array();
	$x      = 0;
	foreach ( $names as $slug => $name ) {
		$rt[] = array(
			'name'  => esc_html( $name ),
			'slug'  => esc_attr( $slug ),
			'color' => esc_attr( $values[ $x ] ),
		);

		$x++;
	}

	return $rt;
}

function bootstrap_blocks_builder_load_blocks_server() {
	global $pagenow;
	if( $pagenow === 'widgets.php' ) {
		return;
	}
    foreach ( glob( dirname( dirname( __FILE__ ) ) . '/src/blocks/*/block.php' ) as $bst_block_logic ) {
    	if( file_exists( $bst_block_logic ) ) {
			require_once $bst_block_logic;
		}
    }
}
add_action( 'plugin_loaded', 'bootstrap_blocks_builder_load_blocks_server', 99 );


function bootstrap_blocks_builder_cgb_block_assets() {
	wp_register_style(
		'bootstrap-blocks_blocks-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' ),
		null
	);

	wp_register_style(
		'bootstrap-blocks_blocks-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' ),
		null
	);

	wp_register_script(
		'bootstrap-blocks_editor',
		plugins_url( '/dist/editor.blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null,
		true
	);

	wp_register_script(
		'bootstrap-blocks_styles',
		plugins_url( '/dist/style.blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null,
		true
	);

	wp_register_script(
		'bootstrap-blocks_blocks_editor',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'bootstrap-blocks_editor', 'bootstrap-blocks_styles' ),
		null,
		true
	);

	wp_localize_script(
		'bootstrap-blocks_blocks_editor',
		'bsBootstrapBlocksGlobal',
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			'colors'		=> json_encode( bootstrap_blocks_builder_get_theme_palette() )
		]
	);

}
add_action( 'init', 'bootstrap_blocks_builder_cgb_block_assets', 11 );

function bootstrap_blocks_builder_category( $categories, $post ) {
    return array_merge(
        array(
            array(
                'slug'  => 'bootstrap-blocks',
                'title' => __( 'Bootstrap Grid Builder', 'bootstrap-blocks-builder' ),
            ),
        ),
        $categories
    );
}
add_filter( 'block_categories_all', 'bootstrap_blocks_builder_category', 10, 2 );
