import includes from 'lodash/includes';
import { colors } from '../../util/colors';
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";

import {
	desktop,
	mobile,
	tablet,
	tabletSmall,
	laptop
} from "../../util/icons";

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
		fluid,
		viewXs,
		viewSm,
		viewMd,
		viewLg,
		viewXl,
		xs,
		sm,
		md,
		lg,
		xl
	} = attributes;
	const breakpoints = [
		{ value: 1, label: 1 },
		{ value: 2, label: 2 },
		{ value: 3, label: 3 },
		{ value: 4, label: 4 },
		{ value: 5, label: 5 },
		{ value: 6, label: 6 },
		{ value: 7, label: 7 },
		{ value: 8, label: 8 },
		{ value: 9, label: 9 },
		{ value: 10, label: 10 },
		{ value: 11, label: 11 },
		{ value: 12, label: 12 }
	]
	const mainSettings = (
		<PanelBody title={ __( 'Breakpoints Settings', 'bootstrap-blocks-builder' ) }>
			<table className='bs-column-breakpoint'>
				<tr>
					<td>
						<div className='bs-breakpoint-view' onClick={() => {
							setAttributes({
								viewXs: viewXs === 0 ? 1 : 0
							})
						}}> {!viewXs ? <FaEye /> : <FaEyeSlash /> }{__( 'xs', 'bootstrap-blocks-builder' )}</div>
					</td>
					<td>
						<div className='bs-breakpoint-view' onClick={() => {
							setAttributes({
								viewSm: viewSm === 0 ? 1 : 0
							})
						}}> {!viewSm ? <FaEye /> : <FaEyeSlash /> }{__( 'sm', 'bootstrap-blocks-builder' )}</div>
					</td>
					<td>
						<div className='bs-breakpoint-view'onClick={() => {
							setAttributes({
								viewMd: viewMd === 0 ? 1 : 0
							})
						}}> {!viewMd ? <FaEye /> : <FaEyeSlash /> }{__( 'md', 'bootstrap-blocks-builder' )}</div>
					</td>
					<td>
						<div className='bs-breakpoint-view' onClick={() => {
							setAttributes({
								viewLg: viewLg === 0 ? 1 : 0
							})
						}}> {!viewLg ? <FaEye /> : <FaEyeSlash /> }{__( 'lg', 'bootstrap-blocks-builder' )}</div>
					</td>
					<td>
						<div className='bs-breakpoint-view' onClick={() => {
							setAttributes({
								viewXl: viewXl === 0 ? 1 : 0
							})
						}}> {!viewXl ? <FaEye /> : <FaEyeSlash /> }{__( 'xl', 'bootstrap-blocks-builder' )}</div>
					</td>
				</tr>
				<tr>
					<td>
						<div className='bs-breakpoint-value'>
							{mobile}
							<SelectControl
								value={ xs }
								onChange={ ( val ) => {
									setAttributes({ xs: parseInt(val) })
								} }
								options={breakpoints}
							/>
						</div>
					</td>
					<td>
						<div className='bs-breakpoint-value'>
							{tabletSmall}
							<SelectControl
								value={ sm }
								onChange={ ( val ) => {
									setAttributes({ sm: parseInt(val) })
								} }
								options={breakpoints}
							/>
						</div>
					</td>
					<td>
						<div className='bs-breakpoint-value'>
							{tablet}
							<SelectControl
								value={ md }
								onChange={ ( val ) => {
									setAttributes({ md: parseInt(val) })
								} }
								options={breakpoints}
							/>
						</div>
					</td>
					<td>
						<div className='bs-breakpoint-value'>
							{laptop}
							<SelectControl
								value={ lg }
								onChange={ ( val ) => {
									setAttributes({ lg: parseInt(val) })
								} }
								options={breakpoints}
							/>
						</div>
					</td>
					<td>
						<div className='bs-breakpoint-value'>
							{desktop}
							<SelectControl
								value={ xl }
								onChange={ ( val ) => {
									setAttributes({ xl: parseInt(val) })
								} }
								options={breakpoints}
							/>
						</div>
					</td>
				</tr>
			</table>
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
