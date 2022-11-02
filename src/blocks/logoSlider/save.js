/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

import DisplaySettings from '../../utils/block-helpers';

const baseClass = 'wp-block-igb-logo-slider';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			autostart,
			navigationArrow,
			xlDisplayItem,
			lgDisplayItem,
			mdDisplayItem,
			smDisplayItem,
			xsDisplayItem,
		} = this.props.attributes;

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

		return (
			<div
				className={classnames(
					`slider-logo${DisplaySettings(this.props.attributes)}`
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
						<InnerBlocks.Content />
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
		);
	}
}
