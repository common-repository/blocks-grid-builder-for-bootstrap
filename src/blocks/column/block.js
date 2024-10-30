import './editor.scss';
import './style.scss';
import edit from './edit';
import icon from './icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor || wp.editor;

registerBlockType( 'bootstrap-blocks/column', {

	title: __( 'Column' ),
	icon,
	category: 'bootstrap-blocks',
	keywords: [
		__( 'column' ),
		__( 'wrapper' ),
		__( 'bootstrap' ),
		__( 'bootstrap-blocks' ),
	],
	parent: [ 'bootstrap-blocks/row' ],
	supports: {
		align: false,
		html: false
	},
	getEditWrapperProps(attributes) {
		const {
			xs,
			sm,
			md,
			lg,
			xl,
			activeScreen
		} = attributes;
		return {
			'data-bs-xs': xs,
			'data-bs-sm': sm,
			'data-bs-md': md,
			'data-bs-lg': lg,
			'data-bs-xl': xl,
			'data-bs-active': attributes.activeScreen
		};
	},

	edit,
	save() {
		return <InnerBlocks.Content />;
	}
} );
