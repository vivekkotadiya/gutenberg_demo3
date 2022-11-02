/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

import DisplaySettings from '../../utils/block-helpers';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const { innerItem, autostart, showNavigation, showDots } =
			this.props.attributes;
		const sliderClass = autostart == true ? ' slider--autoplay' : '';

		return (
			<section
				className={classnames(
					`slider${sliderClass}${DisplaySettings(
						this.props.attributes
					)}`
				)}
				data-autoplay={autostart}
			>
				<div
					className={`slider__content glide__track`}
					data-glide-el="track"
				>
					<div className="glide__slides">
						<InnerBlocks.Content />
					</div>
				</div>

				{innerItem && showNavigation == true && (
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

				{innerItem && showDots == true && (
					<div
						className="slider__nav glide__bullets"
						data-glide-el="controls[nav]"
					>
						{innerItem.map((item, index) => {
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
		);
	}
}
