import includes from 'lodash/includes';
import { colors } from '../../util/colors';
import {
	PanelBody,
	QueryControls,
	RadioControl,
	SelectControl,
	RangeControl,
	ColorPalette,
	ToggleControl, TextControl,
} from '@wordpress/components';

const {
	InnerBlocks,
	RichText,
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	InspectorControls
} = wp.blockEditor;

const {
	Component,
	Fragment,
	RawHTML
} = wp.element;
const { __, sprintf } = wp.i18n;

const Inspector = ( props ) => {
	const {
		setAttributes,
		attributes
	} = props;

	const {
		background,
		color,
		sectionID,
		fluid
	} = attributes;
	const mainSettings = (
		<PanelBody title={ __( 'Settings', 'bootstrap-blocks-builder' ) }>
			<ToggleControl
				label={ __( 'Fluid Width', 'bootstrap-blocks-builder' ) }
				checked={ fluid }
				onChange={ () => setAttributes( { fluid: ! fluid } ) }
			/>
			<TextControl label={ __( 'Section ID:' ) }
						 value={ sectionID }
						 onChange={ ( sectionID ) => { setAttributes( { sectionID } ) } }
			/>
		</PanelBody>
	);
	const colorSettings = (
			<PanelBody title={ __( 'Color Settings', 'bootstrap-blocks-builder' ) }>
					<label style={{marginBottom: '8px', display: 'block'}} className="blocks-base-control__label">{ __( 'Background Color', 'bootstrap-blocks-builder' ) }</label>
					<ColorPalette
					label={ __( 'Background Color', 'bootstrap-blocks-builder' ) }
					colors={ colors }
		            value={ background }
					onChange={ ( value ) => setAttributes({ background: value }) }
		            />

					<label style={{marginBottom: '8px', display: 'block'}} className="blocks-base-control__label">{ __( 'Color', 'bootstrap-blocks-builder' ) }</label>
					<ColorPalette
						label={ __( 'Color', 'bootstrap-blocks-builder' ) }
						colors={ colors }
						value={ color }
						onChange={ ( value ) => setAttributes({ color: value }) }
					/>
			</PanelBody>
	);
	return (
		<InspectorControls>
			{ mainSettings }
			{ colorSettings }

		</InspectorControls>
	);

}
export default Inspector;
