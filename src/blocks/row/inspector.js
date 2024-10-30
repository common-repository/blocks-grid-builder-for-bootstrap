import {
	PanelBody,
	IconButton
} from '@wordpress/components';
import {RenderTemplates, renderTemplates, templates} from "./templates";

const {
	InnerBlocks,
	RichText,
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	InspectorControls
} = wp.blockEditor;

const { __, sprintf } = wp.i18n;

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
		columns,
		updateBlockAttributes,
	} = props;

	const {
		template: selectedTemplateName
	} = attributes;

	const templateSetting = (
		<PanelBody title={ __( 'Template', 'bootstrap-blocks-builder' ) }>
			<RenderTemplates {...props} />
		</PanelBody>
	)
	return (
		<InspectorControls>
			{ templateSetting }

		</InspectorControls>
	);
}
export default Inspector;
