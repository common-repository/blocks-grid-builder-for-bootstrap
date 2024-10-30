<?php
function bootstrap_blocks_builder_render_container( $attributes, $blocks ) {

	$unique_id = $attributes['uniqueID'];
	$style_id = 'bootstrap-blocks-builder' . esc_attr( $unique_id );
	$background_color = !empty( $attributes['background'] ) ? 'background-color:'.$attributes['background'].';' : '';
	$color = !empty( $attributes['color'] ) ? 'color:'.$attributes['color'].';' : '';
	$extra_css = array(
		'self' => $background_color.$color,
	);
	$fluid = $attributes['fluid'] ? '-fluid' : '';
	$section_id = ! empty( $attributes['sectionID'] ) ? 'id="'.esc_attr( $attributes['sectionID'] ).'"' : '';
    $content = '<div '.$section_id.' class="wp-block wp-block-bootstrap-blocks-container '.esc_attr($style_id).' '.esc_attr( $attributes['className'] ).'">';
    if( $attributes['bgImgID'] !== '' ) {
		$overlay = !empty( $attributes['overlayColor'] ) ? 'has-'.esc_attr( $attributes['overlayColor'] ).'-background-color' : '';
    	$gradient = !empty( $attributes['gradient'] ) ? 'has-'.esc_attr( $attributes['gradient'] ).'-gradient-background' : '';
    	$overlay_opacity = !empty( $attributes['dimRatio'] ) ? 'has-background-dim has-background-dim-'.esc_attr( $attributes['dimRatio'] ) : '';
    	$overlay_class = array(
			'block-overlay',
    		$overlay,
			$gradient,
			$overlay_opacity,
		);
    	$content .= '<div class="'.implode( " ", $overlay_class ).'"></div>';
	}
	$content .= '<div class="container'.$fluid.'">';
    $content .= '<div class="container-inner">';
    $content .= $blocks;
    $content .= '</div>';
    $content .= '</div>';
    $content .= '</div>';

    return $content;
}

function bootstrap_blocks_builder_container() {

    ob_start();
    include BOOTSTRAP_GRID_BUILDER_DIR . '/src/blocks/container/block.json';
    $metadata = json_decode( ob_get_clean(), true );

    register_block_type(
			'bootstrap-blocks/container', array(
				'attributes'      => $metadata['attributes'],
				'style'           => 'bootstrap-blocks_blocks-css',
				'editor_script'   => 'bootstrap-blocks_blocks_editor',
				'render_callback' => 'bootstrap_blocks_builder_render_container',
				'editor_style'    => 'bootstrap-blocks_blocks-block-editor-css',
        	)
        );
}
add_action( 'init', 'bootstrap_blocks_builder_container', 15 );
