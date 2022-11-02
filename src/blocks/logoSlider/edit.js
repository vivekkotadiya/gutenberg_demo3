/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { times, isEqual } from 'lodash';
import {
	Button,
	PanelBody,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	RangeControl,
} from '@wordpress/components';
import { Component, Fragment, createContext } from '@wordpress/element';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import memize from 'memize';

const baseClass = 'wp-block-tb-logo-slider';

import DisplaySettings from '../../utils/block-helpers';

/**
 * Module Constants
 */
const { Consumer, Provider } = createContext();

const ALLOWED_BLOCKS = ['tbblocks/logoslideritem'];

const getPanesTemplate = memize((panes) =>
	times(panes, (index) => ['tbblocks/logoslideritem', { slideId: ++index }])
);

export default class Edit extends Component {
	constructor() {
		super(...arguments);

		this.changeState = this.changeState.bind(this);
		this.addNewSlide = this.addNewSlide.bind(this);
		this.removeNewSlide = this.removeNewSlide.bind(this);
		this.getState = this.getState.bind(this);

		this.updateLogoSliderContentAttributes =
			this.updateLogoSliderContentAttributes.bind(this);

		this.state = {
			currentSlide: 1,
			selectedSlide: 0,
			isLockedPaddings: false,
		};
	}

	changeState(param, value) {
		this.setState({ [param]: value });
	}

	getState(value) {
		return this.state[value];
	}

	updateLogoSliderContentAttributes(contentBlockId) {
		const { dispatch, select } = window.wp.data;
		const { clientId } = this.props;

		const innerBlocksOuter =
			select('core/block-editor').getBlock(clientId).innerBlocks;

		const {
			autostart,
			navigationArrow,
			SliderResponsiveMode,
			xlDisplayItem,
			lgDisplayItem,
			mdDisplayItem,
			smDisplayItem,
			xsDisplayItem,
		} = this.props.attributes;

		const InnerBlocksProps = {
			attributes: {
				autostart,
				navigationArrow,
				SliderResponsiveMode,
				xlDisplayItem,
				lgDisplayItem,
				mdDisplayItem,
				smDisplayItem,
				xsDisplayItem,
			},
		};

		innerBlocksOuter.forEach((index, item) => {
			if (isEqual(contentBlockId, item.innerBlocks[0].clientId)) {
				dispatch('core/block-editor').updateBlockAttributes(
					contentBlockId,
					{ innerParent: InnerBlocksProps }
				);
			}
		});
	}

	addNewSlide = (nextSlide) => {
		const { sliderArrays } = this.props.attributes;

		const slides = JSON.parse(sliderArrays);
		const { changeState, getState } = this;

		if (slides.length < nextSlide) {
			const amount = Math.abs(nextSlide - slides.length);

			times(amount, (index) => {
				const slideNumber = nextSlide - index;
				slides.push(
					//translators: %d is a counter 1, 2, 3
					sprintf(__('Logo Slide %d', 'tabler'), slideNumber)
				);
			});

			this.props.setAttributes({
				sliderArrays: JSON.stringify(slides),
				slideCount: nextSlide,
			});
		} else {
			if (nextSlide - 1 < getState('selectedSlide')) {
				changeState('selectedSlide', nextSlide - 1);
				changeState('currentSlide', nextSlide);
			}

			this.props.setAttributes({
				sliderArrays: JSON.stringify(slides.slice(0, nextSlide)),
				slideCount: nextSlide,
			});
		}
	};

	removeNewSlide = (currentSlide) => {
		const { sliderArrays } = this.props.attributes;

		const slides = JSON.parse(sliderArrays);

		const { changeState, getState } = this;

		if (slides.length == currentSlide) {
			const amount = Math.abs(currentSlide - slides.length);

			times(amount, (index) => {
				const slideNumber = currentSlide - index;

				slides.push(
					//translators: %d is a counter 1, 2, 3
					sprintf(__('Logo Slide %d', 'tabler'), slideNumber)
				);
			});

			this.props.setAttributes({
				sliderArrays: JSON.stringify(slides),
				slideCount: currentSlide,
			});
		} else {
			if (currentSlide - 1 < getState('selectedSlide')) {
				changeState('selectedSlide', currentSlide - 1);
				changeState('currentSlide', currentSlide);
			}

			this.props.setAttributes({
				sliderArrays: JSON.stringify(slides.slice(0, currentSlide)),
				slideCount: currentSlide,
			});
		}
	};

	render() {
		const { changeState, getState } = this;
		const {
			slideCount,
			autostart,
			sliderArrays,
			navigationArrow,
			SliderResponsiveMode,
			xlDisplayItem,
			lgDisplayItem,
			mdDisplayItem,
			smDisplayItem,
			xsDisplayItem,
			hideXS,
			hideMD,
			hideLG,
		} = this.props.attributes;

		const sliderArraysParsed = JSON.parse(sliderArrays);

		const { setAttributes } = this.props;

		let xlAttr = 0,
			lgAttr = 0,
			mdAttr = 0,
			smAttr = 0,
			xsAttr = 0;
		if (
			xlDisplayItem == lgDisplayItem &&
			lgDisplayItem == mdDisplayItem &&
			mdDisplayItem == smDisplayItem &&
			smDisplayItem == xsDisplayItem
		) {
			xsAttr += xsDisplayItem;
		} else if (
			xlDisplayItem == lgDisplayItem &&
			lgDisplayItem == mdDisplayItem &&
			mdDisplayItem == smDisplayItem
		) {
			xsAttr += xsDisplayItem;
			smAttr += smDisplayItem;
		} else if (
			xlDisplayItem == lgDisplayItem &&
			lgDisplayItem == mdDisplayItem
		) {
			xsAttr += xsDisplayItem;
			smAttr += smDisplayItem;
			mdAttr += mdDisplayItem;
		} else if (xlDisplayItem == lgDisplayItem) {
			xsAttr += xsDisplayItem;
			smAttr += smDisplayItem;
			mdAttr += mdDisplayItem;
			lgAttr += lgDisplayItem;
		} else {
			xsAttr += xsDisplayItem;
			smAttr += smDisplayItem;
			mdAttr += mdDisplayItem;
			lgAttr += lgDisplayItem;
			xlAttr += xlDisplayItem;
		}

		const renderEditTitles = (index) => {
			if (typeof sliderArraysParsed[index] !== 'undefined') {
				return (
					<Fragment>
						<li
							className={`${baseClass}__title-wrapper ${baseClass}__title-wrapper-${index} ${baseClass}__title-wrapper--${
								1 + index === getState('currentSlide')
									? 'active'
									: 'inactive'
							}`}
						>
							<span
								className={`${baseClass}__title ${baseClass}__title-${
									1 + index
								}`}
								onClick={() => {
									changeState('currentSlide', 1 + index);
									changeState('selectedSlide', index);
								}}
							>
								{sliderArraysParsed[index]
									? sliderArraysParsed[index]
									: __('Logo Slide', 'tabler')}
							</span>
						</li>
					</Fragment>
				);
			}
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'tabler')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label="Responsive Mode"
							className="togglegroup"
							value={SliderResponsiveMode}
							isBlock
							onChange={(value) => {
								setAttributes({
									SliderResponsiveMode: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="xl"
								label="XL"
								showTooltip={true}
								aria-label="Extra Large"
							/>
							<ToggleGroupControlOption
								value="lg"
								label="LG"
								showTooltip={true}
								aria-label="Large"
							/>
							<ToggleGroupControlOption
								value="md"
								label="MD"
								showTooltip={true}
								aria-label="Medium"
							/>
							<ToggleGroupControlOption
								value="sm"
								label="SM"
								showTooltip={true}
								aria-label="Small"
							/>
							<ToggleGroupControlOption
								value="xs"
								label="XS"
								showTooltip={true}
								aria-label="Extra Small"
							/>
						</ToggleGroupControl>
						{SliderResponsiveMode == 'xl' && (
							<RangeControl
								label={__('Displayed items', 'tabler')}
								value={xlDisplayItem}
								onChange={(value) =>
									setAttributes({
										xlDisplayItem:
											value !== undefined ? value : 3,
									})
								}
								min={1}
								max={12}
							/>
						)}
						{SliderResponsiveMode == 'lg' && (
							<RangeControl
								label={__('Displayed items', 'tabler')}
								value={lgDisplayItem}
								onChange={(value) =>
									setAttributes({
										lgDisplayItem:
											value !== undefined ? value : 3,
									})
								}
								min={1}
								max={12}
							/>
						)}
						{SliderResponsiveMode == 'md' && (
							<RangeControl
								label={__('Displayed items', 'tabler')}
								value={mdDisplayItem}
								onChange={(value) =>
									setAttributes({
										mdDisplayItem:
											value !== undefined ? value : 3,
									})
								}
								min={1}
								max={12}
							/>
						)}
						{SliderResponsiveMode == 'sm' && (
							<RangeControl
								label={__('Displayed items', 'tabler')}
								value={smDisplayItem}
								onChange={(value) =>
									setAttributes({
										smDisplayItem:
											value !== undefined ? value : 2,
									})
								}
								min={1}
								max={12}
							/>
						)}
						{SliderResponsiveMode == 'xs' && (
							<RangeControl
								label={__('Displayed items', 'tabler')}
								value={xsDisplayItem}
								onChange={(value) =>
									setAttributes({
										xsDisplayItem:
											value !== undefined ? value : 1,
									})
								}
								min={1}
								max={12}
							/>
						)}
						<ToggleControl
							label="Autostart"
							checked={autostart}
							onChange={() =>
								setAttributes({
									autostart: !autostart,
								})
							}
						/>
						<ToggleControl
							label="Show navigation arrows"
							checked={navigationArrow}
							onChange={() =>
								setAttributes({
									navigationArrow: !navigationArrow,
								})
							}
						/>
					</PanelBody>
					<PanelBody
						title={__('Display', 'tabler')}
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
				<ul className={`tb-slider__titles`}>
					<Fragment>
						{times(slideCount, (index) => renderEditTitles(index))}
						<li className={`tb-slider__add-item`}>
							<Button
								icon="insert"
								onClick={() => this.addNewSlide(slideCount + 1)}
								label={__('Add Item', 'tabler')}
							/>
							<Button
								icon="dismiss"
								onClick={() =>
									this.removeNewSlide(slideCount - 1)
								}
								label={__('Remove Item', 'tabler')}
							/>
						</li>
					</Fragment>
				</ul>
				<div className={`${baseClass}__tb-logo-slider_container`}>
					<div
						className={classnames(
							`slider-logo ${baseClass}--current-slide-${getState(
								'currentSlide'
							)}${DisplaySettings(this.props.attributes)}`
						)}
						data-autoplay={autostart}
						{...(xsAttr != 0 && { 'data-xs': xsAttr })}
						{...(smAttr != 0 && { 'data-sm': smAttr })}
						{...(mdAttr != 0 && { 'data-md': mdAttr })}
						{...(lgAttr != 0 && { 'data-lg': lgAttr })}
						{...(xlAttr != 0 && { 'data-xl': xlAttr })}
					>
						<div className={`glide__track`} data-glide-el="track">
							<div className="glide__slides">
								<Provider value={this}>
									<InnerBlocks
										template={getPanesTemplate(slideCount)}
										templateLock="all"
										templateInsertUpdatesSelection={true}
										allowedBlocks={ALLOWED_BLOCKS}
									/>
								</Provider>
							</div>
						</div>
						{navigationArrow && (
							<div
								data-glide-el="controls"
								className="logo-slider-controls glide__arrows"
							>
								<button
									data-glide-dir="<"
									className="glide__arrow glide__arrow--left prev-slide"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18.698"
										height="32.056"
										viewBox="0 0 18.698 32.056"
									>
										<path
											id="angle-right-solid"
											d="M34.676,96.031a2.671,2.671,0,0,1-1.888-4.56L44.258,80,32.788,68.535a2.671,2.671,0,0,1,3.777-3.777L49.92,78.113a2.67,2.67,0,0,1,0,3.777L36.565,95.246A2.648,2.648,0,0,1,34.676,96.031Z"
											transform="translate(50.703 96.031) rotate(180)"
											fill="#d33"
										/>
									</svg>
								</button>
								<button
									data-glide-dir=">"
									className="next-slide glide__arrow glide__arrow--right"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18.698"
										height="32.056"
										viewBox="0 0 18.698 32.056"
									>
										<path
											id="angle-right-solid"
											d="M34.676,96.031a2.671,2.671,0,0,1-1.888-4.56L44.258,80,32.788,68.535a2.671,2.671,0,0,1,3.777-3.777L49.92,78.113a2.67,2.67,0,0,1,0,3.777L36.565,95.246A2.648,2.648,0,0,1,34.676,96.031Z"
											transform="translate(-32.005 -63.975)"
											fill="#d33"
										/>
									</svg>
								</button>
							</div>
						)}
					</div>
				</div>
			</Fragment>
		);
	}
}

export { Consumer };
