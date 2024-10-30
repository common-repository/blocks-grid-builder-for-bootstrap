import classnames from 'classnames';
import InspectorControl from './inspector';
import extend from 'lodash/extend';
import { toggler } from "./icon";
import {
	backgroundImageStyles,
	dimRatioToClass,
	isContentPositionCenter,
	getPositionClassName,
} from '../../util/helpers';

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

class ContainerEdit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			toggle: false
		}
	}
	componentDidMount(){
		if( ! this.props.attributes.uniqueID ) {
			this.props.setAttributes({
				uniqueID: '_' + this.props.clientId.substr(2, 9)
			})
		}
	}

	toggler() {
		this.setState({
			toggle: ! this.state.toggle
		})
	}

	render() {
		const {
			attributes,
			className,
			setAttributes,
			hasChildBlocks
		} = this.props;
		const {
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
					<div className={classnames( "container-wrap", {'is-toggled': this.state.toggle} )}>
						<div className="container-toolbar">
							<div className={classnames( 'toggler', 'bs-badge', { 'is-active': this.state.toggle } )} onClick={this.toggler.bind(this)}>{toggler}</div>
							<div className="cont-title bs-badge">{__( 'container', 'bootstrap-blocks-builder' )}</div>
						</div>
					<div className={ classes } style={blockStyle}>
						{ bgImg !== '' && dimRatio !== 0 && (
							<span
								aria-hidden="true"
								className={ overlayClasses }
								style={overlayStyle}
							/>
						) }
							<InnerBlocks
								renderAppender={
									hasChildBlocks
										? undefined
										: () => <InnerBlocks.ButtonBlockAppender />
								}
							/>
						</div>
					</div>
				</Fragment>
		)
	}
}
export default compose(
	withSelect( ( select, ownProps ) => {
		const { clientId } = ownProps;
		const { getBlockOrder } =
		select( 'core/block-editor' ) || select( 'core/editor' ); // Fallback to 'core/editor' for backwards compatibility

		return {
			hasChildBlocks: getBlockOrder( clientId ).length > 0,
		};
	} )
)( ContainerEdit );
