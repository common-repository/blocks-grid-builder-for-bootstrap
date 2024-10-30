import './editor.scss';
import './style.scss';
import edit from './edit';
import icon from './icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor || wp.editor;

registerBlockType( 'bootstrap-blocks/container', {

	title: __( 'Container' ),
	icon,
	category: 'bootstrap-blocks',
	keywords: [
		__( 'Container' ),
		__( 'wrapper' ),
		__( 'bootstrap' ),
		__( 'bootstrap-blocks' ),
	],
	supports: {
		align: false,
		html: false
	},
	edit,
	save() {
		return <InnerBlocks.Content />;
	}
} );
