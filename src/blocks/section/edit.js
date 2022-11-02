/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import {
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	Spinner,
	Button,
	PanelBody,
	ResponsiveWrapper,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';

/***
 * Interal dependencies
 */

import { theme_colors } from '../../utils/block-helpers';

class Edit extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				backgroundColor,
				backgroundColorClass,
				xlbackgroundImageId,
				mdbackgroundImageId,
				xsbackgroundImageId,
				padding,
				bgResponsiveMode,
				anchor,
				hideLG,
				hideMD,
				hideXS,
			},
			xlbackgroundImage,
			mdbackgroundImage,
			xsbackgroundImage,
			setAttributes,
			hasChildBlocks,
		} = this.props;

		const instructions = (
			<p>
				{__(
					'To edit the background image, you need permission to upload media.',
					'tbblocks'
				)}
			</p>
		);

		const ALLOWED_MEDIA_TYPES = ['image'];

		const ALLOWED_BLOCKS = ['tbblocks/paregraph'];

		const onUpdateImage = (image) => {
			if (bgResponsiveMode == 'xl') {
				setAttributes({
					xlbackgroundImageId: image.id,
					xlbackgroundImagesrc: image.url,
				});
			}

			if (bgResponsiveMode == 'md') {
				setAttributes({
					mdbackgroundImageId: image.id,
					mdbackgroundImagesrc: image.url,
				});
			}
			if (bgResponsiveMode == 'xs') {
				setAttributes({
					xsbackgroundImageId: image.id,
					xsbackgroundImagesrc: image.url,
				});
			}
		};

		const onRemoveImage = () => {
			if (bgResponsiveMode == 'xl') {
				setAttributes({
					xlbackgroundImageId: undefined,
					xlbackgroundImagesrc: '',
				});
			}
			if (bgResponsiveMode == 'md') {
				setAttributes({
					mdbackgroundImageId: undefined,
					mdbackgroundImagesrc: '',
				});
			}
			if (bgResponsiveMode == 'xs') {
				setAttributes({
					xsbackgroundImageId: undefined,
					xsbackgroundImagesrc: '',
				});
			}
		};

		const resMode = ['xs', 'md', 'xl'];

		const responsiveBgImage = {
			xs: {
				BgId: xsbackgroundImageId,
				BgImage: xsbackgroundImage,
			},
			md: {
				BgId: mdbackgroundImageId,
				BgImage: mdbackgroundImage,
			},
			xl: {
				BgId: xlbackgroundImageId,
				BgImage: xlbackgroundImage,
			},
		};

		const SetColorClass = (value) => {
			theme_colors.filter(function (item) {
				if (item.color == value) {
					setAttributes({
						backgroundColorClass: item.slug,
					});
				}
			});
		};
		const bgclass = backgroundColorClass
			? `section--bg-${backgroundColorClass}`
			: '';

		let hideSection = '';
		if (hideLG == true) {
			hideSection += ' section--lg-hide';
		}
		if (hideMD == true) {
			hideSection += ' section--md-hide';
		}
		if (hideXS == true) {
			hideSection += ' section--xs-hide';
		}

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Background Image', 'tbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label=""
							className="responsive_buttons"
							value={bgResponsiveMode}
							isBlock
							onChange={(value) => {
								setAttributes({
									bgResponsiveMode: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="xs"
								label="Mobile"
								showTooltip={true}
								aria-label="Device (min. 460px - max. 768px) "
							/>
							<ToggleGroupControlOption
								value="md"
								label="Tablet"
								showTooltip={true}
								aria-label="Device (min. 768px - max. 1440px)"
							/>
							<ToggleGroupControlOption
								value="xl"
								label="Desktop"
								showTooltip={true}
								aria-label="Device > 1440px"
							/>
						</ToggleGroupControl>
						{bgResponsiveMode && (
							<div className="media-control">
								{resMode.map((item, index) => {
									return (
										<div
											className="media-control-wrap"
											id={`media-${index}`}
										>
											{bgResponsiveMode == item ? (
												<MediaUploadCheck
													fallback={instructions}
												>
													<MediaUpload
														title={__(
															'Background Image',
															'tbblocks'
														)}
														onSelect={onUpdateImage}
														allowedTypes={
															ALLOWED_MEDIA_TYPES
														}
														value={
															responsiveBgImage[
																item
															]['BgId']
														}
														render={({ open }) => (
															<Button
																id={`media-imgbtn-${index}`}
																className={
																	!responsiveBgImage[
																		item
																	]['BgId']
																		? 'editor-post-featured-image__toggle'
																		: 'editor-post-featured-image__preview'
																}
																onClick={open}
															>
																{!!responsiveBgImage[
																	item
																]['BgId'] &&
																	!responsiveBgImage[
																		item
																	][
																		'BgImage'
																	] && (
																		<Spinner />
																	)}
																{!responsiveBgImage[
																	item
																]['BgId'] &&
																	__(
																		'Set image',
																		'tbblocks'
																	)}
																{!!responsiveBgImage[
																	item
																]['BgId'] &&
																	responsiveBgImage[
																		item
																	][
																		'BgImage'
																	] && (
																		<ResponsiveWrapper
																			naturalWidth={
																				responsiveBgImage[
																					item
																				][
																					'BgImage'
																				]
																					.media_details
																					.width
																			}
																			naturalHeight={
																				responsiveBgImage[
																					item
																				][
																					'BgImage'
																				]
																					.media_details
																					.height
																			}
																		>
																			<img
																				src={
																					responsiveBgImage[
																						item
																					][
																						'BgImage'
																					]
																						.source_url
																				}
																				alt={__(
																					'Background image',
																					'tbblocks'
																				)}
																			/>
																		</ResponsiveWrapper>
																	)}
															</Button>
														)}
													/>
												</MediaUploadCheck>
											) : (
												<></>
											)}
											{bgResponsiveMode == item &&
											!!responsiveBgImage[item]['BgId'] &&
											responsiveBgImage[item][
												'BgImage'
											] ? (
												<MediaUploadCheck>
													<MediaUpload
														title={__(
															'Background Image',
															'tbblocks'
														)}
														onSelect={onUpdateImage}
														allowedTypes={
															ALLOWED_MEDIA_TYPES
														}
														value={
															responsiveBgImage[
																item
															]['BgId']
														}
														render={({ open }) => (
															<Button
																id={`media-replacebtn-${index}`}
																onClick={open}
																isDefault
																isLarge
																isLink
																className="ix-section-background-image-replace"
															>
																{__(
																	'Replace background image',
																	'tbblocks'
																)}
															</Button>
														)}
													/>
												</MediaUploadCheck>
											) : (
												<></>
											)}
											{bgResponsiveMode == item &&
											!!responsiveBgImage[item][
												'BgId'
											] ? (
												<MediaUploadCheck>
													<Button
														id={`media-removebtn-${index}`}
														onClick={onRemoveImage}
														isLink
														isDestructive
														className="ix-section-background-image-remove"
													>
														{__(
															'Remove background image',
															'tbblocks'
														)}
													</Button>
												</MediaUploadCheck>
											) : (
												<></>
											)}
										</div>
									);
								})}
							</div>
						)}
					</PanelBody>
					<PanelBody
						title={__('Settings', 'tbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label="Padding"
							className="block-togglegroup"
							value={padding}
							isBlock
							onChange={(value) => {
								setAttributes({
									padding: Number(value),
								});
							}}
						>
							<ToggleGroupControlOption
								value="0"
								label="0"
								showTooltip={true}
								aria-label="0px"
							/>
							<ToggleGroupControlOption
								value="1"
								label="1"
								showTooltip={true}
								aria-label="Top:50px, Bottom:50px"
							/>
							<ToggleGroupControlOption
								value="2"
								label="2"
								showTooltip={true}
								aria-label="Top:80px, Bottom:80px"
							/>
							<ToggleGroupControlOption
								value="3"
								label="3"
								showTooltip={true}
								aria-label="Top:100px, Bottom:100px"
							/>
						</ToggleGroupControl>
						<PanelColorSettings
							title={__('Background color', 'tbblocks')}
							className={'block-color-setting'}
							colorSettings={[
								{
									colors: theme_colors,
									value: backgroundColor,
									onChange: (value) => {
										typeof value == 'undefined'
											? setAttributes({
													backgroundColorClass: '',
											  })
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
						title={__('Display', 'tbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Anchor', 'tbblocks')}
							help="Specify link ID…"
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
						<ToggleControl
							label="Hide on SmartPhone"
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

				<section
					id={anchor}
					className={`section section--pd-${padding}${hideSection} ${bgclass}`}
				>
					{(xsbackgroundImage ||
						mdbackgroundImage ||
						xlbackgroundImage) && (
						<div className="section__background">
							<picture>
								{xsbackgroundImage &&
								!mdbackgroundImage &&
								!xlbackgroundImage ? (
									<>
										<source
											media="(min-width:1025px)"
											srcset={`${xsbackgroundImage.source_url}`}
										/>
										<source
											media="(min-width:481px)"
											srcset={`${xsbackgroundImage.source_url}`}
										/>
										<source
											media="(max-width:480px)"
											srcset={`${xsbackgroundImage.source_url}`}
										/>
									</>
								) : (
									''
								)}
								{xsbackgroundImage &&
								mdbackgroundImage &&
								!xlbackgroundImage ? (
									<>
										<source
											media="(min-width:1025px)"
											srcset={`${mdbackgroundImage.source_url}`}
										/>
										<source
											media="(min-width:481px)"
											srcset={`${mdbackgroundImage.source_url}`}
										/>
										<source
											media="(max-width:480px)"
											srcset={`${xsbackgroundImage.source_url}`}
										/>
									</>
								) : (
									''
								)}
								{xsbackgroundImage &&
								mdbackgroundImage &&
								xlbackgroundImage ? (
									<>
										<source
											media="(min-width:1025px)"
											srcset={`${xlbackgroundImage.source_url}`}
										/>
										<source
											media="(min-width:481px)"
											srcset={`${mdbackgroundImage.source_url}`}
										/>
										<source
											media="(max-width:480px)"
											srcset={`${xsbackgroundImage.source_url}`}
										/>
									</>
								) : (
									''
								)}
								{xsbackgroundImage ? (
									<img
										src={`${xsbackgroundImage.source_url}`}
										alt=""
										width="auto"
										height="auto"
									/>
								) : !xsbackgroundImage && mdbackgroundImage ? (
									<img
										src={`${mdbackgroundImage.source_url}`}
										alt=""
										width="auto"
										height="auto"
									/>
								) : !xsbackgroundImage &&
								  !mdbackgroundImage &&
								  xlbackgroundImage ? (
									<img
										src={`${xlbackgroundImage.source_url}`}
										alt=""
										width="auto"
										height="auto"
									/>
								) : (
									''
								)}
							</picture>
						</div>
					)}
					<div className={`section__content`}>
						<InnerBlocks
							allowedBlocks={ALLOWED_BLOCKS}
							renderAppender={
								hasChildBlocks
									? undefined
									: () => <InnerBlocks.ButtonBlockAppender />
							}
						/>
					</div>
				</section>
			</>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const { getMedia } = select('core');
		const {
			xlbackgroundImageId,
			mdbackgroundImageId,
			xsbackgroundImageId,
		} = props.attributes;

		const { clientId } = props;
		const { getBlockOrder } =
			select('core/block-editor') || select('core/editor'); // Fallback to 'core/editor' for backwards compatibility

		return {
			xlbackgroundImage: xlbackgroundImageId
				? getMedia(xlbackgroundImageId)
				: null,
			mdbackgroundImage: mdbackgroundImageId
				? getMedia(mdbackgroundImageId)
				: null,
			xsbackgroundImage: xsbackgroundImageId
				? getMedia(xsbackgroundImageId)
				: null,
			hasChildBlocks: getBlockOrder(clientId).length > 0,
		};
	})
)(Edit);
