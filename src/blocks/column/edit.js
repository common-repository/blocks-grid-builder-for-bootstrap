import classnames from 'classnames';
import InspectorControl from './inspector';
import { Resizable } from "re-resizable";
import extend from 'lodash/extend';
import {
	backgroundImageStyles,
	dimRatioToClass,
	isContentPositionCenter,
	getPositionClassName,
} from '../../util/helpers';

import {
	desktop,
	mobile,
	tablet,
	tabletSmall,
	laptop
} from "../../util/icons";

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

const devices = [
	{
		icon: desktop,
		title: __( 'Desktop', 'bootstrap-blocks-builder' ),
		align: 'xl',
	},
	{
		icon: laptop,
		title: __( 'Laptop', 'bootstrap-blocks-builder' ),
		align: 'lg',
	},
	{
		icon: tablet,
		title: __( 'Tablet', 'bootstrap-blocks-builder' ),
		align: 'md',
	},
	{
		icon: tabletSmall,
		title: __( 'Small Tablet', 'bootstrap-blocks-builder' ),
		align: 'sm',
	},
	{
		icon: mobile,
		title: __( 'Mobile', 'bootstrap-blocks-builder' ),
		align: 'xs',
	},
];

const CustomResizeHandle = wp.element.forwardRef((props, ref) => {
	const {handleAxis, ...restProps} = props;
	return (
		<div className={`custom-handle custom-handle-${handleAxis} custom-resize-handle-component`}
			 ref={ref}
			 {...restProps}
		></div>
	);
});

class ColumnEdit extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			height: 100,
			width: 100,
			snaps: [],
			blocksWidth: 600,
			defaultWidth: 0,
			isResizing: false,
			md: '6',
			lg: '6',
			xl: '6',
			sm: '12',
			xs: '12',
			currentDevice: 'lg',
		};
		this.onResizeStop = this.onResizeStop.bind(this);
		this.onResize = this.onResize.bind(this);
		this.createSnaps = this.createSnaps.bind(this);
		this.updateColSize = this.updateColSize.bind(this);
	}
	componentDidMount(){
		if( ! this.props.attributes.uniqueID ) {
			this.props.setAttributes({
				uniqueID: '_' + this.props.clientId.substr(2, 9)
			})
		}
		this.props.setAttributes({ activeScreen: this.props.attributes.lg })
		this.createSnaps();
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		const that = this;
		const {
			attributes,
			setAttributes
		} = this.props;
		if( prevProps.attributes[this.state.currentDevice] !== this.props.activeScreen ) {
			setTimeout( () => {
				setAttributes({
					activeScreen: attributes[that.state.currentDevice]
				})
			}, 800)
		}
	}
	createSnaps() {

		if( ! window.bsBlocksWidth ) {
			this.getRootWidth();
		} else {
			window.bsBlocksWidth
		}
		let blocksWidth = window.bsBlocksWidth;
		let snap = [blocksWidth];
		let colWidth = parseInt( blocksWidth ) / 12;
		for (let i = 1; i < 12; i++) {
			snap.push( Math.floor(parseInt(blocksWidth) - ( colWidth * i ) ) )
		}

		this.setState({
			snaps: snap,
			defaultWidth: colWidth * this.props.attributes.lg,
			snapGap: colWidth,
			blocksWidth: blocksWidth + 'px'
		})

	}

	getRootWidth() {
		if( document.querySelector(".edit-site-visual-editor__editor-canvas") ) {
			var iframe = document.querySelector(".edit-site-visual-editor__editor-canvas");
			window.bsBlocksWidth = iframe.contentWindow.document.querySelector('.row-toolbar').offsetWidth - 10;
		} else {
			window.bsBlocksWidth = document.querySelector('.row-toolbar').offsetWidth - 10;
		}
	}

	updateColSize( node ) {
		const {
			attributes,
			setAttributes
		} = this.props;

		node.parentNode.classList.remove( 'resize-active' );
		let colStyle = node.getAttribute('style'),
			inlineWidth = colStyle.substring( colStyle.indexOf("width:")+6, colStyle.indexOf('px') ),
			colValues = {0:12, 1:11, 2:10, 3:9, 4:8, 5:7, 6:6, 7:5, 8:4, 9:3, 10:2, 11:1},
			width;
		if( this.state.snaps.includes( parseInt(inlineWidth) ) ) {
			this.state.snaps.map( (snap, i) => {
				if( snap === parseInt(inlineWidth) ) {
					width = colValues[i];
				}
			} );
		} else if( inlineWidth.indexOf( 'auto' ) !== 0 ) {
			width = 6;
		} else {
			width = 1;
		}
		this.setState({
			[this.state.currentDevice]: width
		}, () => {
			setAttributes({
				activeScreen: width,
				[this.state.currentDevice] : width
			})
		});
	}
	onResizeStop( element, dir, node ) {
		const {
			attributes,
			setAttributes
		} = this.props;
		this.setState({
			isResizing: false
		});
		this.updateColSize( node )
	}

	onResize(element, dir, node) {
		node.parentNode.classList.add( 'resize-active' );
		this.setState({
			isResizing: true
		})
		this.updateColSize(node)
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
			bgImg,
			xs,
			sm,
			md,
			lg,
			xl
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
		const that = this;

		return (
			<Fragment>
				<InspectorControl
					{...this.props}
				/>
				<BlockControls>
					<AlignmentToolbar
						value={that.state.currentDevice || 'lg'}
						label={ __(
							'Device',
							'bootstrap-blocks-builder'
						) }
						onChange={ ( device ) => {
							let _device = device || 'lg';
							that.setState( {currentDevice: _device }, () => {
								setAttributes({ activeScreen:  attributes[_device]});
							});

						} }
						alignmentControls={ devices }
					/>
				</BlockControls>
				<div className="col-wrapper">
					<div className={ classes } style={blockStyle} >
						{ bgImg !== '' && dimRatio !== 0 && (
							<span
								aria-hidden="true"
								className={ overlayClasses }
								style={overlayStyle}
							/>
						) }
					<div className="col-toolbar">

						<div className="sizer">
							<span className="col-sizer">xs-{xs}</span>
							<span className="col-sizer">sm-{sm}</span>
							<span className="col-sizer">md-{md}</span>
							<span className="col-sizer">lg-{lg}</span>
							<span className="col-sizer">xl-{xl}</span>
						</div>
						<div className="col-title bs-badge">{__( 'column', 'bootstrap-blocks-builder' )}</div>
					</div>
					<Resizable className={classnames('bs-resizable-col', { 'resize-active': this.state.isResizing })} enable={{
						top: false,
						right: true,
						bottom: false,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false
					}} onResizeStop={this.onResizeStop} defaultSize={{
						width: this.state.defaultWidth
					}} onResize={this.onResize} snapGap={this.state.snapGap} maxWidth={this.state.blocksWidth} minWidth="8.3333333%" snap={{x: this.state.snaps}}>
						<div className={`bs-column`}>
								<InnerBlocks
									templateLock={ false }
									renderAppender={
										hasChildBlocks
											? undefined
											: () => <InnerBlocks.ButtonBlockAppender />
									}
								/>
						</div>
					</Resizable>
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
)( ColumnEdit );
