<?php

function bootstrap_blocks_builder_render_row( $attributes, $blocks ) {
	$unique_id = $attributes['uniqueID'];
	$style_id = 'bootstrap-blocks-builder' . esc_attr( $unique_id );
	$section_id = ! empty( $attributes['sectionID'] ) ? 'id="'.esc_attr( $attributes['sectionID'] ).'"' : '';

	$content = '<div '.$section_id.' class="wp-block wp-block-bootstrap-blocks-row '.esc_attr($style_id).' '.esc_attr( $attributes['className'] ).'">';
	$content .= '<div class="row">';
	$content .= $blocks;
	$content .= '</div>';
	$content .= '</div>';

	return $content;
}

function bootstrap_blocks_builder_row() {

	ob_start();
	include BOOTSTRAP_GRID_BUILDER_DIR . '/src/blocks/row/block.json';
	$metadata = json_decode( ob_get_clean(), true );

	register_block_type(
		'bootstrap-blocks/row', array(
			'attributes'      => $metadata['attributes'],
			'style'           => 'bootstrap-blocks_blocks-css',
			'editor_script'   => 'bootstrap-blocks_blocks_editor',
			'render_callback' => 'bootstrap_blocks_builder_render_row',
			'editor_style'    => 'bootstrap-blocks_blocks-block-editor-css',
		)
	);
}
add_action( 'init', 'bootstrap_blocks_builder_row', 15 );
