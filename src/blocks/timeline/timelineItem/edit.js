/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, Component } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import DisplaySettings from '../../../utils/block-helpers';

export default class Edit extends Component {
	render() {
		const {
			attributes: { orientation, year, hideXS, hideMD, hideLG },
			setAttributes,
		} = this.props;
		const ALLOWED_BLOCKS = [
			'tbblocks/paragraph',
			'tbblocks/list',
			'tbblocks/video',
		];

		const headlineClass =
			orientation == 'left'
				? 'headline--align-right'
				: 'headline--align-left';

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Settings')} initialOpen={true}>
						<TextControl
							label={__('Year')}
							type="text"
							placeholder="Overwrite default Alt-Text..."
							value={year}
							onChange={(value) => setAttributes({ year: value })}
						/>
						<SelectControl
							label={__('Orientation')}
							options={[
								{
									value: 'left',
									label: __('Left'),
								},
								{
									value: 'right',
									label: __('Right'),
								},
							]}
							value={orientation}
							onChange={(value) => {
								setAttributes({
									orientation: value,
								});
							}}
						></SelectControl>
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
				<div
					className={`timeline__item timeline--align-${orientation}${DisplaySettings(
						this.props.attributes
					)}`}
				>
					{year ? (
						<div className="timeline--item-wrap">
							<div className="timeline--view">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="33.553"
									height="23.965"
									viewBox="0 0 33.553 23.965"
								>
									<path
										id="check-solid"
										d="M32.851,96.713a2.391,2.391,0,0,1,0,3.385L13.677,119.273a2.391,2.391,0,0,1-3.385,0L.7,109.686a2.4,2.4,0,0,1,3.39-3.385l7.825,7.887L29.466,96.713a2.389,2.389,0,0,1,3.385,0Z"
										transform="translate(0 -96.01)"
										fill="#d33"
									/>
								</svg>
							</div>
							<div className="timeline--details-wrap">
								<div className="timeline--info">
									<div className="timeline--year-wrap">
										<h6
											className={`headline headline--style-three headline--color-one ${headlineClass}`}
										>
											{year}
										</h6>
									</div>
									<div className="timeline--detail">
										<InnerBlocks
											templateLock={false}
											templateInsertUpdatesSelection={
												true
											}
											allowedBlocks={ALLOWED_BLOCKS}
										/>
									</div>
									<div className="timeline--arrow">
										{orientation == 'left' ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="11"
												height="12"
												viewBox="0 0 11 12"
											>
												<path
													id="Polygon_1"
													data-name="Polygon 1"
													d="M6,0l6,11H0Z"
													transform="translate(11) rotate(90)"
													fill="#d33"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="11"
												height="12"
												viewBox="0 0 11 12"
											>
												<path
													id="Polygon_1"
													data-name="Polygon 1"
													d="M6,0l6,11H0Z"
													transform="translate(0 12) rotate(-90)"
													fill="#d33"
												/>
											</svg>
										)}
									</div>
								</div>
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</Fragment>
		);
	}
}
