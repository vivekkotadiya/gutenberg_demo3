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
		const { innerItem, autostart } = this.props.attributes;
		const sliderClass = autostart == true ? ' slider--autoplay' : '';

		return (
			<div
				className={classnames(
					`tabSlider${sliderClass}${DisplaySettings(
						this.props.attributes
					)}`
				)}
				data-autoplay={autostart}
			>
				<div className={`tab--image-slider`}>
					<div
						className={`tab-slider__content glide__track`}
						data-glide-el="track"
					>
						<div className="glide__slides">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
				<div className="tab--text-slider">
					{innerItem && (
						<>
							<div
								className={`tab--text-slider__content glide__track`}
								data-glide-el="track"
							>
								<div className="glide__slides">
									{innerItem.map((item, index) => {
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
													{item.innerBlocks.length !=
													0 ? (
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
									})}
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
		);
	}
}
