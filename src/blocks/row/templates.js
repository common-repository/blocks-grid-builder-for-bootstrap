import { Path, SVG } from '@wordpress/components';
const { __, sprintf } = wp.i18n;
import {
	IconButton
} from '@wordpress/components';

export const templates = [
	{
		name: '1-1',
		title: __( '2 Columns (1:1)', 'bootstrap-blocks-builder' ),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"
				/>
			</SVG>
		),
		templateLock: 'all',
		template: [
			[
				'bootstrap-blocks/column',
				{
					lg: 6,
					md: 6,
					sm: 6,
					xs: 12,
					xl: 6
				},
			],
			[
				'bootstrap-blocks/column',
				{
					lg: 6,
					md: 6,
					sm: 6,
					xs: 12,
					xl: 6
				},
			],
		],
	},
	{
		name: '1-2',
		title: __( '2 Columns (1:2)', 'bootstrap-blocks-builder' ),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"
				/>
			</SVG>
		),
		templateLock: 'all',
		template: [
			[
				'bootstrap-blocks/column',
				{
					lg: 4,
					md: 4,
					xl: 4,
					sm: 12,
					xs: 12
				},
			],
			[
				'bootstrap-blocks/column',
				{
					lg: 8,
					md: 8,
					xl: 8,
					sm: 12,
					xs: 12
				},
			],
		],
	},
	{
		name: '2-1',
		title: __( '2 Columns (2:1)', 'bootstrap-blocks-builder' ),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"
				/>
			</SVG>
		),
		templateLock: 'all',
		template: [
			[
				'bootstrap-blocks/column',
				{
					lg: 8,
					md: 8,
					xl: 8,
					sm: 12,
					xs: 12
				},
			],
			[
				'bootstrap-blocks/column',
				{
					lg: 4,
					md: 4,
					xl: 4,
					sm: 12,
					xs: 12
				},
			],
		],
	},
	{
		name: '1-1-1',
		title: __( '3 Columns (1:1:1)', 'bootstrap-blocks-builder' ),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"
				/>
			</SVG>
		),
		templateLock: 'all',
		template: [
			[
				'bootstrap-blocks/column',
				{
					lg: 4,
					md: 4,
					xl: 4,
					sm: 12,
					xs: 12
				},
			],
			[
				'bootstrap-blocks/column',
				{
					lg: 4,
					md: 4,
					xl: 4,
					sm: 12,
					xs: 12
				},
			],
			[
				'bootstrap-blocks/column',
				{
					lg: 4,
					md: 4,
					xl: 4,
					sm: 12,
					xs: 12
				},
			],
		],
	},
	{
		name: 'custom',
		title: __( 'Custom', 'bootstrap-blocks-builder' ),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M23.58 26.28c0-.600003.1499985-1.099998.45-1.5.3000015-.400002.7433304-.8399976 1.33-1.32.5600028-.4533356.9833319-.8699981 1.27-1.25s.43-.8433306.43-1.39c0-.5466694-.1733316-1.0566643-.52-1.53s-.986662-.71-1.92-.71c-1.1066722 0-1.8533314.2766639-2.24.83-.3866686.5533361-.58 1.1766632-.58 1.87 0 .1466674.0033333.2666662.01.36.0066667.0933338.01.1533332.01.18h-1.78c-.0133334-.0533336-.0266666-.146666-.04-.28-.0133334-.133334-.02-.2733326-.02-.42 0-.7733372.1766649-1.4666636.53-2.08.3533351-.6133364.8899964-1.0999982 1.61-1.46.7200036-.3600018 1.5999948-.54 2.64-.54 1.2133394 0 2.2033295.3233301 2.97.97s1.15 1.5099946 1.15 2.59c0 .7066702-.1033323 1.3033309-.31 1.79-.2066677.4866691-.4533319.8799985-.74 1.18-.2866681.3000015-.6566644.6233316-1.11.97-.4800024.3866686-.8333322.7166653-1.06.99-.2266678.2733347-.34.6233312-.34 1.05v.82h-1.74zm-.14 2.56h2V31h-2zM39 12c1.1046 0 2 .8954 2 2v20c0 1.1046-.8954 2-2 2H9c-1.10457 0-2-.8954-2-2V14c0-1.1046.89543-2 2-2h30zm0 22V14H9v20h30z"
				/>
			</SVG>
		),
		templateLock: false,
		template: [
			[
				'bootstrap-blocks/column',
				{
					lg: 6,
					md: 6,
					xl: 6,
					sm: 12,
					xs: 12
				},
			]
		],
	},
];
const onTemplateChange = ( newSelectedTemplateName, columns, updateBlockAttributes, setAttributes ) => {
	const template = templates.find(
		( t ) => t.name === newSelectedTemplateName
	);
	console.log(template)
	if ( template ) {
		// Update sizes to fit with selected template
		columns.forEach( ( column, index ) => {
			if ( template.template.length > index ) {
				const newAttributes = template.template[ index ][ 1 ];
				updateBlockAttributes( column.clientId, newAttributes );
			}
		} );

		setAttributes( {
			template: newSelectedTemplateName,
		} );
	}
}
export const RenderTemplates = (props) => {
	const {
		attributes,
		setAttributes,
		columns,
		updateBlockAttributes
	} = props;

	return (
		<ul className="bootstrap-grid-builder-blocks-template-selector-list">
			{ templates.map( (
				template,
				index
			) => (
				<li
					className="bootstrap-grid-builder-blocks-template-selector-button"
					key={ index }
				>
					<IconButton
						label={ template.title }
						icon={ template.icon }
						onClick={ () => {
							onTemplateChange( template.name, columns, updateBlockAttributes, setAttributes );
						} }
						className={
							attributes.template ===
							template.name
								? 'is-active'
								: null
						}
					>
						<div className="bootstrap-grid-builder-template-selector-button-label">
							{ template.title }
						</div>
					</IconButton>
				</li>
			) ) }
		</ul>
	)
}
export const getColumnsTemplate = ( templateName ) => {
	const template = templates.find( ( t ) => t.name === templateName );
	return template ? template.template : [];
};
export const getColumnsTemplateLock = ( templateName ) => {
	const template = templates.find( ( t ) => t.name === templateName );
	return template ? template.templateLock : false;
};
