<?php

function bootstrap_blocks_column_view( $attributes ) {
	$views = array( 'Xs', 'Sm', 'Md', 'Lg', 'Xl' );
	$has_view = false;
	$class = '';
	foreach ( $views as $view ) {
		if( $attributes['view'.$view] === 1 ) {
			$has_view = true;
		}
	}
	if( $has_view ) {
		foreach ( $views as $view ) {
			$display = $attributes['view'.$view] === 1 ? 'none' : 'block';
			if( $view === 'Xs' ) {
				$class .= ' d-'.$display;
			} else {
				$class .= ' d-'.strtolower($view).'-'.$display;
			}

		}
	}

	return $class;
}
function bootstrap_blocks_builder_render_column( $attributes, $blocks ) {
	$unique_id = $attributes['uniqueID'];
	$style_id = 'bootstrap-blocks-builder' . esc_attr( $unique_id );
	$section_id = ! empty( $attributes['sectionID'] ) ? 'id="'.esc_attr( $attributes['sectionID'] ).'"' : '';
	$md = $attributes['md'];
	$xs = $attributes['xs'];
	$sm = $attributes['sm'];
	$lg = $attributes['lg'];
	$xl = $attributes['xl'];
	$classes = 'col-xs-'.$xs. ' col-sm-'.$sm. ' col-md-'.$md . ' col-lg-'.$lg . ' col-xl-'.$xl . bootstrap_blocks_column_view( $attributes );
	$background_color = !empty( $attributes['background'] ) ? 'background-color:'.$attributes['background'].';' : '';
	$color = !empty( $attributes['color'] ) ? 'color:'.$attributes['color'].';' : '';
	$extra_css = array(
		'self' => $background_color.$color,
	);
	$content = '<div '.$section_id.' class="'.esc_attr( $classes ).' '.esc_attr( $attributes['className'] ).'">';
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
	$content .= '<div class="bs-column-wrapper '.esc_attr($style_id).' ">';
	$content .= $blocks;
	$content .= '</div>';
	$content .= '</div>';

	return $content;
}

function bootstrap_blocks_builder_column() {

	ob_start();
	include BOOTSTRAP_GRID_BUILDER_DIR . '/src/blocks/column/block.json';
	$metadata = json_decode( ob_get_clean(), true );

	register_block_type(
		'bootstrap-blocks/column', array(
			'attributes'      => $metadata['attributes'],
			'style'           => 'bootstrap-blocks_blocks-css',
			'editor_script'   => 'bootstrap-blocks_blocks_editor',
			'render_callback' => 'bootstrap_blocks_builder_render_column',
			'editor_style'    => 'bootstrap-blocks_blocks-block-editor-css',
		)
	);
}
add_action( 'init', 'bootstrap_blocks_builder_column', 15 );
