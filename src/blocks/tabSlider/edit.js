/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { times, isEqual, isEmpty } from 'lodash';
import { Button, PanelBody, ToggleControl } from '@wordpress/components';
import { Component, Fragment, createContext } from '@wordpress/element';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import memize from 'memize';

import DisplaySettings from '../../utils/block-helpers';

const baseClass = 'wp-block-tb-tab-slider';

/**
 * Module Constants
 */
const { Consumer, Provider } = createContext();

const ALLOWED_BLOCKS = ['tbblocks/tabslideritem'];

const getPanesTemplate = memize((panes) =>
	times(panes, (index) => ['tbblocks/tabslideritem', { slideId: ++index }])
);

class Edit extends Component {
	constructor() {
		super(...arguments);

		this.changeState = this.changeState.bind(this);
		this.addNewSlide = this.addNewSlide.bind(this);
		this.removeNewSlide = this.removeNewSlide.bind(this);
		this.getState = this.getState.bind(this);

		this.updateContentAttributes = this.updateContentAttributes.bind(this);

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

	setInnerBlocksAttributes(callFrom = 'mount', prevProps, prevState) {
		const { select, dispatch } = window.wp.data;

		const { autostart } = this.props.attributes;
		const InnerBlocksProps = {
			attributes: {
				autostart,
			},
		};

		if (callFrom == 'Update') {
			if (isEqual(this.props.attributes, prevProps.attributes)) {
				return;
			}
		}

		const { getBlock } = select('core/block-editor');
		const block = getBlock(this.props.clientId);

		let innerBlocksOuter;
		if (block) {
			innerBlocksOuter = block.innerBlocks;
		}
		if (innerBlocksOuter) {
			if (innerBlocksOuter.length) {
				innerBlocksOuter.forEach(function (item, index) {
					if (
						(callFrom == 'Mount' &&
							isEmpty(item.attributes.outerParent)) ||
						callFrom == 'Update'
					) {
						//Inner blocks
						dispatch('core/block-editor').updateBlockAttributes(
							item.clientId,
							{ outerParent: InnerBlocksProps }
						);
					}
				});
			}
		}
	}

	updateContentAttributes(contentBlockId) {
		const { dispatch, select } = window.wp.data;
		const { clientId } = this.props;

		const innerBlocksOuter =
			select('core/block-editor').getBlock(clientId).innerBlocks;

		const { autostart } = this.props.attributes;

		const InnerBlocksProps = {
			attributes: {
				autostart,
			},
		};

		innerBlocksOuter.forEach(function (item, index) {
			if (isEqual(contentBlockId, item.innerBlocks[0].clientId)) {
				dispatch('core/block-editor').updateBlockAttributes(
					contentBlockId,
					{ innerParent: InnerBlocksProps }
				);
			}
		});
	}

	addNewSlide(nextSlide) {
		const { setAttributes } = this.props;
		const { sliderArrays } = this.props.attributes;

		const slides = JSON.parse(sliderArrays);
		const { changeState, getState } = this;

		if (slides.length < nextSlide) {
			const amount = Math.abs(nextSlide - slides.length);

			times(amount, (index) => {
				const slideNumber = nextSlide - index;

				slides.push(
					//translators: %d is a counter 1, 2, 3
					sprintf(__('Tab Slide %d', 'tabler'), slideNumber)
				);
			});

			setAttributes({
				sliderArrays: JSON.stringify(slides),
				slideCount: nextSlide,
			});
		} else {
			if (nextSlide - 1 < getState('selectedSlide')) {
				changeState('selectedSlide', nextSlide - 1);
				changeState('currentSlide', nextSlide);
			}

			setAttributes({
				sliderArrays: JSON.stringify(slides.slice(0, nextSlide)),
				slideCount: nextSlide,
			});
		}
	}

	removeNewSlide(currentSlide) {
		const { setAttributes } = this.props;
		const { sliderArrays } = this.props.attributes;

		const slides = JSON.parse(sliderArrays);

		const { changeState, getState } = this;

		if (slides.length == currentSlide) {
			const amount = Math.abs(currentSlide - slides.length);

			times(amount, (index) => {
				const slideNumber = currentSlide - index;

				slides.push(
					//translators: %d is a counter 1, 2, 3
					sprintf(__('Tab Slide %d', 'tabler'), slideNumber)
				);
			});

			setAttributes({
				sliderArrays: JSON.stringify(slides),
				slideCount: currentSlide,
			});
		} else {
			if (currentSlide - 1 < getState('selectedSlide')) {
				changeState('selectedSlide', currentSlide - 1);
				changeState('currentSlide', currentSlide);
			}

			setAttributes({
				sliderArrays: JSON.stringify(slides.slice(0, currentSlide)),
				slideCount: currentSlide,
			});
		}
	}

	componentDidMount() {
		this.setInnerBlocksAttributes('Mount');
	}

	componentDidUpdate(prevProps, prevState) {
		this.setInnerBlocksAttributes('Update', prevProps, prevState);
	}

	render() {
		const { changeState, getState } = this;
		const {
			slideCount,
			autostart,
			sliderArrays,
			innerItem,
			hideXS,
			hideMD,
			hideLG,
		} = this.props.attributes;

		const sliderArraysParsed = JSON.parse(sliderArrays);

		const { setAttributes, childInnerBlocks } = this.props;

		if (JSON.stringify(innerItem) !== JSON.stringify(childInnerBlocks)) {
			setAttributes({ innerItem: [...childInnerBlocks] });
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
									? typeof sliderArraysParsed[index].text !==
									  'undefined'
										? sliderArraysParsed[index].text
										: sliderArraysParsed[index]
									: __('Slide', 'tabler')}
							</span>
						</li>
					</Fragment>
				);
			}
		};

		const { addNewSlide, removeNewSlide } = this;

		const { select } = window.wp.data;
		const { getBlock } = select('core/block-editor');
		const block = getBlock(this.props.clientId);
		console.log(block.innerBlocks);
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'tabler')}
						initialOpen={true}
					>
						<ToggleControl
							label="Autostart"
							checked={autostart}
							onChange={() =>
								setAttributes({
									autostart: !autostart,
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
								onClick={() => addNewSlide(slideCount + 1)}
								label={__('Add Slide', 'tabler')}
							/>
							<Button
								icon="dismiss"
								onClick={() => removeNewSlide(slideCount - 1)}
								label={__('Remove Slide', 'tabler')}
							/>
						</li>
					</Fragment>
				</ul>
				<div
					className={classnames(
						`tabSlider ${baseClass}--current-slide-${getState(
							'currentSlide'
						)}${DisplaySettings(this.props.attributes)}`
					)}
					data-autoplay={autostart}
				>
					<div className={`tab--image-slider`}>
						<div
							className={`tab-slider__content glide__track`}
							data-glide-el="track"
						>
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
					</div>
					<div className="tab--text-slider">
						{block && (
							<>
								<div
									className={`tab--text-slider__content glide__track`}
									data-glide-el="track"
								>
									<div className="glide__slides">
										{block.innerBlocks.map(
											(item, index) => {
												let i = '=' + index;
												return (
													<div
														className="tab-slider__nav-item glide__slide"
														data-index={index}
													>
														<div className="tab-slider__nav">
															<div className="tab-slider__nav-icon">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="31.877"
																	height="31.877"
																	viewBox="0 0 31.877 31.877"
																>
																	<path
																		id="circle-info-solid"
																		d="M15.938,0A15.938,15.938,0,1,0,31.877,15.938,15.937,15.937,0,0,0,15.938,0Zm0,7.969a1.992,1.992,0,1,1-1.992,1.992A1.993,1.993,0,0,1,15.938,7.969Zm2.49,15.938H13.448a1.494,1.494,0,0,1,0-2.988h1V16.935h-.5a1.494,1.494,0,1,1,0-2.988h1.992a1.5,1.5,0,0,1,1.494,1.494v5.479h1a1.494,1.494,0,0,1,0,2.988Z"
																		fill="#b6b6b6"
																	/>
																</svg>
															</div>
															{item.innerBlocks
																.length != 0 ? (
																<h5 className="tab-slider__nav-content headline headline--align-center headline--style-three">
																	{
																		item
																			.innerBlocks[0]
																			.attributes
																			.content
																	}
																</h5>
															) : (
																<></>
															)}
															<div className="tab-slider__activeIcon">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="166.957"
																	height="166.957"
																	viewBox="0 0 166.957 166.957"
																>
																	<path
																		id="circle-info-solid"
																		d="M83.478,0a83.478,83.478,0,1,0,83.478,83.478A83.472,83.472,0,0,0,83.478,0Zm0,41.739A10.435,10.435,0,1,1,73.043,52.174,10.436,10.436,0,0,1,83.478,41.739Zm13.043,83.478H70.435a7.826,7.826,0,1,1,0-15.652h5.217V88.7H73.043a7.826,7.826,0,0,1,0-15.652H83.478A7.828,7.828,0,0,1,91.3,80.87v28.7h5.217a7.826,7.826,0,0,1,0,15.652Z"
																		fill="#ededed"
																	/>
																</svg>
															</div>
														</div>
													</div>
												);
											}
										)}
									</div>
								</div>
								<div
									data-glide-el="controls"
									className="tab-slider-controls glide__arrows"
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
												fill="#fff"
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
												fill="#fff"
											/>
										</svg>
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</Fragment>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const { getBlocks } = select('core/block-editor');

		return {
			childInnerBlocks: getBlocks(props.clientId),
		};
	})
)(Edit);

export { Consumer };
