import classnames from 'classnames';
import InspectorControl from './inspector';
import { Resizable } from "re-resizable";
import {toggler} from "./icon";
import extend from 'lodash/extend';
import {
	backgroundImageStyles,
	dimRatioToClass,
	isContentPositionCenter,
	getPositionClassName,
} from '../../util/helpers';

import {
	templates,
	getColumnsTemplateLock,
	getColumnsTemplate, RenderTemplates
} from "./templates";

const {
	createBlock,
} = wp.blocks;


const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

const {
	Component,
	Fragment,
	RawHTML
} = wp.element;

const {
	InnerBlocks,
	RichText,
	BlockControls,
	AlignmentToolbar,
	BlockAlignmentToolbar,
	getColorClassName,
	__experimentalGetGradientClass
} = wp.blockEditor || wp.editor;

const {
	Button,
	ButtonGroup,
	Tooltip,
	TabPanel,
	IconButton,
	Dashicon,
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	Disabled
} = wp.components;

const { __, sprintf } = wp.i18n;

const ALLOWED_BLOCKS = [ 'bootstrap-blocks/column' ];

class RowEdit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			listView: false,
			template: this.props.attributes.template
		};
		this.renderTemplates = this.renderTemplates.bind(this);
	}
	componentDidMount(){
		if( ! this.props.attributes.uniqueID ) {
			this.props.setAttributes({
				uniqueID: '_' + this.props.clientId.substr(2, 9)
			})
		}
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if( this.state.template !== this.props.attributes.template ) {
			this.setState({  template: this.props.attributes.template })
		}
	}
	listView() {
		this.setState({
			listView: ! this.state.listView
		})
	}

	renderTemplates() {
		const {
			attributes,
			className,
			setAttributes,
			updateBlockAttributes,
			columns
		} = this.props;

		return (
			<ul className="bootstrap-grid-builder-blocks-template-selector-list">
				<RenderTemplates {...this.props} />
			</ul>
		)
	}


	render() {
		const {
			attributes,
			className,
			setAttributes,
			updateBlockAttributes,
			columns
		} = this.props;
		const {
			template: selectedTemplateName,
			background,
			color,
			spacingUnit,
			gradient,
			customGradient,
			customOverlayColor,
			dimRatio,
			focalPoint,
			overlayColor,
			backgroundSize,
			backgroundRepeat,
			bgImg
		} = attributes;


		const overlayColorClass = getColorClassName(
			'background-color',
			overlayColor
		);
		const style = bgImg !== '' ? backgroundImageStyles(bgImg) : {};
		const overlayStyle = {};
		const gradientClass = __experimentalGetGradientClass(gradient);

		if (!overlayColorClass) {
			overlayStyle.backgroundColor = customOverlayColor;
		}

		if (customGradient && bgImg !== '') {
			overlayStyle.background = customGradient;
		}

		let positionValue;

		if (focalPoint) {
			positionValue = `${Math.round(focalPoint.x * 100)}% ${Math.round(
				focalPoint.y * 100
			)}%`;

			if (bgImg !== '') {
				style.backgroundPosition = positionValue;
				style.backgroundSize = backgroundSize;
				style.backgroundRepeat = backgroundRepeat;
			}

		}


		const classes = classnames(
			className
		);

		const overlayClasses = classnames(
			dimRatioToClass(dimRatio),
			'block-overlay',
			overlayColorClass,
			{
				'has-background-dim': dimRatio !== 0,
				'has-background-gradient': gradient || customGradient,
				[gradientClass]: bgImg !== '' && gradientClass
			},

		);

		const customStyle = {
			root: {
				backgroundColor: background,
				color: color
			}
		};

		const blockStyle = extend( style,
			customStyle.root,
		);

		return (
			<Fragment>
				<InspectorControl
					{...this.props}
				/>
					<div className={ classnames( 'bootstrap-blocks-row', { 'list-view': this.state.listView } ) }>
						<div className="row-toolbar">
							<div className={classnames( 'toggler', 'bs-badge', { 'is-active': this.state.listView } )} onClick={this.listView.bind(this)}>{toggler}</div>
							<div className="title bs-badge">{__( 'row', 'bootstrap-blocks-builder' )}</div>
						</div>
						<div className={ classes } style={blockStyle} >
							{ bgImg !== '' && dimRatio !== 0 && (
								<span
									aria-hidden="true"
									className={ overlayClasses }
									style={overlayStyle}
								/>
							) }
							{this.state.template !== '' ?
								<InnerBlocks
									allowedBlocks={ALLOWED_BLOCKS}
									template={getColumnsTemplate(selectedTemplateName)}
									templateLock={getColumnsTemplateLock(
										selectedTemplateName
									)}
									orientation="horizontal"
								/>
							: this.renderTemplates() }
						</div>
					</div>
			</Fragment>
		)
	}
}
const applyWithSelect = withSelect( ( select, { clientId } ) => {
	const { getBlocksByClientId } =
	select( 'core/block-editor' ) || select( 'core/editor' ); // Fallback to 'core/editor' for backwards compatibility

	const columns = getBlocksByClientId( clientId )[ 0 ]
		? getBlocksByClientId( clientId )[ 0 ].innerBlocks
		: [];

	return {
		columns,
	};
} );

const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { updateBlockAttributes } =
	dispatch( 'core/block-editor' ) || dispatch( 'core/editor' ); // Fallback to 'core/editor' for backwards compatibility

	return {
		updateBlockAttributes,
	};
} );

export default compose(
	applyWithSelect,
	applyWithDispatch
)( RowEdit );
