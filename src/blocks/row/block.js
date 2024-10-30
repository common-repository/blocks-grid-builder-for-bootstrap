import './editor.scss';
import './style.scss';
import edit from './edit';
import icon from './icon';
import transform from './transform';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor || wp.editor;

registerBlockType( 'bootstrap-blocks/row', {

	title: __( 'Row' ),
	icon,
	category: 'bootstrap-blocks',
	keywords: [
		__( 'row' ),
		__( 'wrapper' ),
		__( 'bootstrap' ),
		__( 'bootstrap-blocks' ),
	],
	supports: {
		align: false,
		html: false
	},
	transform,
	edit,
	save() {
		return <InnerBlocks.Content />;
	}
} );
