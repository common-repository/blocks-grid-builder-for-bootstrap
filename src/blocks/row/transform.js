import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

const MIN_COLUMN_SIZE = 1;
const CUSTOM_TEMPLATE_NAME = 'custom';

const transforms =
	createBlocksFromInnerBlocksTemplate
		? {
			from: [
				{
					type: 'block',
					isMultiBlock: true,
					blocks: [ '*' ],
					__experimentalConvert: ( blocks ) => {
						const columnSize = Math.max(
							Math.round( 12 / blocks.length ),
							MIN_COLUMN_SIZE
						);
						const innerBlocksTemplate = blocks.map(
							( { name, attributes, innerBlocks } ) => [
								'bootstrap-blocks/column',
								{
									lg: columnSize,
								},
								[
									[
										name,
										{ ...attributes },
										innerBlocks,
									],
								],
							]
						);
						return createBlock(
							'bootstrap-blocks/row',
							{ template: CUSTOM_TEMPLATE_NAME },
							createBlocksFromInnerBlocksTemplate(
								innerBlocksTemplate
							)
						);
					},
				},
			],
		}
		: {};

export default transforms;
