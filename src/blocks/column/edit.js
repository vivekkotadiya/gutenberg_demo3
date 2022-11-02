/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ToggleControl,
	SelectControl,
	RangeControl,
	Button,
} from '@wordpress/components';
import { Component } from '@wordpress/element';

/***
 * Interal dependencies
 */
import { theme_colors } from '../../utils/block-helpers';

export default class Edit extends Component {
	render() {
		const {
			attributes: {
				backgroundColor,
				colResponsiveMode,
				xlwidth,
				lgwidth,
				mdwidth,
				smwidth,
				xswidth,
				xloffset,
				lgoffset,
				mdoffset,
				smoffset,
				xsoffset,
				colPadding,
				xlalignH,
				lgalignH,
				mdalignH,
				smalignH,
				xsalignH,
				xlalignV,
				lgalignV,
				mdalignV,
				smalignV,
				xsalignV,
				hideLG,
				hideMD,
				hideXS,
			},
			setAttributes,
		} = this.props;

		const resMode = ['xs', 'sm', 'md', 'lg', 'xl'];

		const colSettings = {
			xs: {
				width: xswidth,
				offset: xsoffset,
				alignH: xsalignH,
				alignV: xsalignV,
			},
			sm: {
				width: smwidth,
				offset: smoffset,
				alignH: smalignH,
				alignV: smalignV,
			},
			md: {
				width: mdwidth,
				offset: mdoffset,
				alignH: mdalignH,
				alignV: mdalignV,
			},
			lg: {
				width: lgwidth,
				offset: lgoffset,
				alignH: lgalignH,
				alignV: lgalignV,
			},
			xl: {
				width: xlwidth,
				offset: xloffset,
				alignH: xlalignH,
				alignV: xlalignV,
			},
		};

		const onChangeWidth = (value) => {
			if (colResponsiveMode == 'xl') {
				setAttributes({
					xlwidth: value !== undefined ? value : 0,
				});
			}
			if (colResponsiveMode == 'lg') {
				setAttributes({
					lgwidth: value !== undefined ? value : 0,
				});
			}
			if (colResponsiveMode == 'md') {
				setAttributes({
					mdwidth: value !== undefined ? value : 0,
				});
			}
			if (colResponsiveMode == 'sm') {
				setAttributes({
					smwidth: value !== undefined ? value : 0,
				});
			}
			if (colResponsiveMode == 'xs') {
				setAttributes({
					xswidth: value !== undefined ? value : 0,
				});
			}
		};
		const onChangeOffset = (value) => {
			if (colResponsiveMode == 'xl') {
				setAttributes({
					xloffset: value !== undefined ? value : -1,
				});
			}
			if (colResponsiveMode == 'lg') {
				setAttributes({
					lgoffset: value !== undefined ? value : -1,
				});
			}
			if (colResponsiveMode == 'md') {
				setAttributes({
					mdoffset: value !== undefined ? value : -1,
				});
			}
			if (colResponsiveMode == 'sm') {
				setAttributes({
					smoffset: value !== undefined ? value : -1,
				});
			}
			if (colResponsiveMode == 'xs') {
				setAttributes({
					xsoffset: value !== undefined ? value : -1,
				});
			}
		};
		const onChangeAlignH = (value) => {
			if (colResponsiveMode == 'xl') {
				setAttributes({
					xlalignH: value,
				});
			}
			if (colResponsiveMode == 'lg') {
				setAttributes({
					lgalignH: value,
				});
			}
			if (colResponsiveMode == 'md') {
				setAttributes({
					mdalignH: value,
				});
			}
			if (colResponsiveMode == 'sm') {
				setAttributes({
					smalignH: value,
				});
			}
			if (colResponsiveMode == 'xs') {
				setAttributes({
					xsalignH: value,
				});
			}
		};
		const onChangeAlignV = (value) => {
			if (colResponsiveMode == 'xl') {
				setAttributes({
					xlalignV: value,
				});
			}
			if (colResponsiveMode == 'lg') {
				setAttributes({
					lgalignV: value,
				});
			}
			if (colResponsiveMode == 'md') {
				setAttributes({
					mdalignV: value,
				});
			}
			if (colResponsiveMode == 'sm') {
				setAttributes({
					smalignV: value,
				});
			}
			if (colResponsiveMode == 'xs') {
				setAttributes({
					xsalignV: value,
				});
			}
		};

		const resetColAlignH = (responsiveMode) => {
			if (responsiveMode == 'xl') {
				setAttributes({
					xlalignH: 'start',
				});
			}
			if (responsiveMode == 'lg') {
				setAttributes({
					lgalignH: 'start',
				});
			}
			if (responsiveMode == 'md') {
				setAttributes({
					mdalignH: 'start',
				});
			}
			if (responsiveMode == 'sm') {
				setAttributes({
					smalignH: 'start',
				});
			}
			if (responsiveMode == 'xs') {
				setAttributes({
					xsalignH: 'start',
				});
			}
		};

		const resetColAlignV = (responsiveMode) => {
			if (responsiveMode == 'xl') {
				setAttributes({
					xlalignV: '',
				});
			}
			if (responsiveMode == 'lg') {
				setAttributes({
					lgalignV: '',
				});
			}
			if (responsiveMode == 'md') {
				setAttributes({
					mdalignV: '',
				});
			}
			if (responsiveMode == 'sm') {
				setAttributes({
					smalignV: '',
				});
			}
			if (responsiveMode == 'xs') {
				setAttributes({
					xsalignV: '',
				});
			}
		};

		const SetColorClass = (value) => {
			theme_colors.filter(function (item) {
				if (item.color == value) {
					setAttributes({
						colbgClass: item.slug,
					});
				}
			});
		};

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'tabler')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label="Responsive Mode"
							className="block-togglegroup"
							value={colResponsiveMode}
							isBlock
							onChange={(value) => {
								setAttributes({
									colResponsiveMode: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="xs"
								label="XS"
								showTooltip={true}
								aria-label="Extra Small"
							/>
							<ToggleGroupControlOption
								value="sm"
								label="SM"
								showTooltip={true}
								aria-label="Small"
							/>
							<ToggleGroupControlOption
								value="md"
								label="MD"
								showTooltip={true}
								aria-label="Medium"
							/>
							<ToggleGroupControlOption
								value="lg"
								label="LG"
								showTooltip={true}
								aria-label="Large"
							/>
							<ToggleGroupControlOption
								value="xl"
								label="XL"
								showTooltip={true}
								aria-label="Extra Large"
							/>
						</ToggleGroupControl>
						{colResponsiveMode && (
							<div className="col-control">
								{resMode.map((item, index) => {
									let vAlign = colSettings[item]['alignV'];
									let width = colSettings[item]['width'];
									let offset = colSettings[item]['offset'];
									return (
										<div
											className="col-control-wrap"
											id={`col-${index}`}
										>
											{colResponsiveMode == item ? (
												<>
													<RangeControl
														label={__(
															'Width',
															'tabler'
														)}
														value={width}
														onChange={onChangeWidth}
														min={0}
														max={12}
														allowReset={true}
													/>
													<RangeControl
														label={__(
															'Offset',
															'tabler'
														)}
														value={offset}
														onChange={
															onChangeOffset
														}
														min={-1}
														max={11}
														allowReset={true}
													/>
													<div className="tb--row__settings">
														<SelectControl
															label={__(
																'Alignment - Vertical',
																'tabler'
															)}
															options={[
																{
																	value: '',
																	label: __(
																		'Not Set',
																		'tabler'
																	),
																},
																{
																	value: 'top',
																	label: __(
																		'Top',
																		'tabler'
																	),
																},
																{
																	value: 'middle',
																	label: __(
																		'Middle',
																		'tabler'
																	),
																},
																{
																	value: 'bottom',
																	label: __(
																		'Bottom',
																		'tabler'
																	),
																},
																{
																	value: 'init',
																	label: __(
																		'Inherited',
																		'tabler'
																	),
																},
															]}
															value={vAlign}
															onChange={
																onChangeAlignV
															}
														></SelectControl>
														<Button
															onClick={() =>
																resetColAlignV(
																	colResponsiveMode
																)
															}
															label={__(
																'Reset',
																'tabler'
															)}
															className="components-button components-range-control__reset is-secondary is-small"
														>
															{__(
																'Reset',
																'tabler'
															)}
														</Button>
													</div>
												</>
											) : (
												<></>
											)}
										</div>
									);
								})}
							</div>
						)}
						<div className="tb--row__settings">
							<ToggleGroupControl
								label="Padding"
								className="block-togglegroup"
								value={colPadding}
								isBlock
								onChange={(value) => {
									setAttributes({
										colPadding: Number(value),
									});
								}}
							>
								<ToggleGroupControlOption
									value="0"
									label="0"
									showTooltip={true}
									aria-label="Small"
								/>
								<ToggleGroupControlOption
									value="1"
									label="1"
									showTooltip={true}
									aria-label="Medium"
								/>
								<ToggleGroupControlOption
									value="2"
									label="2"
									showTooltip={true}
									aria-label="Large"
								/>
								<ToggleGroupControlOption
									value="3"
									label="3"
									showTooltip={true}
									aria-label="Extra Large"
								/>
							</ToggleGroupControl>
							<Button
								onClick={() =>
									setAttributes({
										colPadding: 1,
									})
								}
								label={__('Reset', 'tabler')}
								className="components-button components-range-control__reset is-secondary is-small"
							>
								{__('Reset', 'tabler')}
							</Button>
						</div>
						<PanelColorSettings
							title={__('Background color', 'tabler')}
							className={'block-color-setting'}
							colorSettings={[
								{
									colors: theme_colors,
									value: backgroundColor,
									onChange: (value) => {
										typeof value == 'undefined'
											? setAttributes({ colbgClass: '' })
											: SetColorClass(value);
										setAttributes({
											backgroundColor: value,
										});
									},
									label: __('Background Color'),
								},
							]}
						/>
					</PanelBody>
					<PanelBody
						title={__('Additional', 'tabler')}
						initialOpen={true}
					>
						<ToggleControl
							label="Hide on Smartphone"
							checked={hideXS}
							onChange={() =>
								setAttributes({
									hideXS: !hideXS,
								})
							}
						/>

						<ToggleControl
							label="Hide on Tablet"
							checked={hideMD}
							onChange={() =>
								setAttributes({
									hideMD: !hideMD,
								})
							}
						/>

						<ToggleControl
							label="Hide on Desktop"
							checked={hideLG}
							onChange={() =>
								setAttributes({
									hideLG: !hideLG,
								})
							}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	}
}
