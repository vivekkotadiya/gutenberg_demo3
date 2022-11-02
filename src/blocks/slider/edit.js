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

const baseClass = 'wp-block-tb-media-text-slider';

/**
 * Module Constants
 */
const { Consumer, Provider } = createContext();

const ALLOWED_BLOCKS = ['tbblocks/slider-item'];

const getPanesTemplate = memize((panes) =>
	times(panes, (index) => ['tbblocks/slider-item', { slideId: ++index }])
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
					sprintf(__('Slide %d', 'tabler'), slideNumber)
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
					sprintf(__('Slide %d', 'tabler'), slideNumber)
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
			showNavigation,
			showDots,
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
						<ToggleControl
							label="Show Navigation Dots"
							checked={showDots}
							onChange={() =>
								setAttributes({
									showDots: !showDots,
								})
							}
						/>
						<ToggleControl
							label="Show Navigation Arrow"
							checked={showNavigation}
							onChange={() =>
								setAttributes({
									showNavigation: !showNavigation,
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
								label={__('Add Item', 'tabler')}
							/>
							<Button
								icon="dismiss"
								onClick={() => removeNewSlide(slideCount - 1)}
								label={__('Remove Item', 'tabler')}
							/>
						</li>
					</Fragment>
				</ul>
				<section
					className={classnames(
						`slider ${baseClass}--current-slide-${getState(
							'currentSlide'
						)}${DisplaySettings(this.props.attributes)}`
					)}
					data-autoplay={autostart}
				>
					<div
						className={`slider__content glide__track`}
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

					{block && showNavigation == true && (
						<div
							data-glide-el="controls"
							className="slider__controls glide__arrows"
						>
							<button
								data-glide-dir="<"
								className="glide__arrow glide__arrow--left prev-slide"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="10.8"
									height="18.515"
									viewBox="0 0 10.8 18.515"
								>
									<path
										id="angle-right-solid"
										d="M33.548,82.49a1.543,1.543,0,0,1-1.091-2.634l6.626-6.623-6.626-6.625a1.543,1.543,0,0,1,2.182-2.182l7.714,7.714a1.542,1.542,0,0,1,0,2.182l-7.714,7.714A1.53,1.53,0,0,1,33.548,82.49Z"
										transform="translate(-32.005 -63.975)"
										fill="#3f3f3f"
									/>
								</svg>
							</button>
							<button
								data-glide-dir=">"
								className="glide__arrow glide__arrow--right next-slide"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="10.8"
									height="18.515"
									viewBox="0 0 10.8 18.515"
								>
									<path
										id="angle-right-solid"
										d="M33.548,82.49a1.543,1.543,0,0,1-1.091-2.634l6.626-6.623-6.626-6.625a1.543,1.543,0,0,1,2.182-2.182l7.714,7.714a1.542,1.542,0,0,1,0,2.182l-7.714,7.714A1.53,1.53,0,0,1,33.548,82.49Z"
										transform="translate(-32.005 -63.975)"
										fill="#3f3f3f"
									/>
								</svg>
							</button>
						</div>
					)}

					{block && showDots == true && (
						<div
							className="slider__nav glide__bullets"
							data-glide-el="controls[nav]"
						>
							{block.innerBlocks.map((item, index) => {
								let i = '=' + index;
								return (
									<button
										className="slider__nav-item glide__bullet"
										data-glide-dir={i}
									></button>
								);
							})}
						</div>
					)}
				</section>
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
