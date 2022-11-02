/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	Spinner,
	Button,
	PanelBody,
	ResponsiveWrapper,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

import PlaceholderImg from '../../../assets/images/placeholder.jpg';

class Edit extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				outerParent,
				itemResponsiveMode,
				mediaId,
				mediaUrl,
				xsmediaId,
				xsimageUrl,
				mdmediaId,
				mdimageUrl,
				mediaAlt,
			},
			setAttributes,
			xsSlideImage,
			mdSlideImage,
			SlideImage,
		} = this.props;

		let autostart = false;

		if (typeof outerParent.attributes != 'undefined') {
			let { attributes } = outerParent;
			autostart = attributes.autostart;
		}

		const onUpdateImage = (image) => {
			if (itemResponsiveMode == 'xl') {
				setAttributes({
					mediaId: image.id,
					mediaUrl: image.url,
				});
			}
			if (itemResponsiveMode == 'md') {
				setAttributes({
					mdmediaId: image.id,
					mdimageUrl: image.url,
				});
			}
			if (itemResponsiveMode == 'xs') {
				setAttributes({
					xsmediaId: image.id,
					xsimageUrl: image.url,
				});
			}
			setAttributes({ mediaAlt: image.alt });
		};

		const onRemoveImage = () => {
			if (itemResponsiveMode == 'xl') {
				setAttributes({
					mediaId: undefined,
					mediaUrl: '',
				});
			}
			if (itemResponsiveMode == 'md') {
				setAttributes({
					mdmediaId: undefined,
					mdimageUrl: '',
				});
			}
			if (itemResponsiveMode == 'xs') {
				setAttributes({
					xsmediaId: undefined,
					xsimageUrl: '',
				});
			}
		};

		const resMode = ['xs', 'md', 'xl'];

		const responsiveBgImage = {
			xs: {
				BgId: xsmediaId,
				BgImage: xsSlideImage,
			},
			md: {
				BgId: mdmediaId,
				BgImage: mdSlideImage,
			},
			xl: {
				BgId: mediaId,
				BgImage: SlideImage,
			},
		};

		const instructions = (
			<p>
				{__(
					'To edit the background image, you need permission to upload media.',
					'tabler'
				)}
			</p>
		);

		const ALLOWED_MEDIA_TYPES = ['image'];
		const createMarkup = (html) => {
			return { __html: html };
		};
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Image', 'tabler')} initialOpen={true}>
						<ToggleGroupControl
							label="Responsive Mode"
							className="block-togglegroup block-toggle"
							value={itemResponsiveMode}
							isBlock
							onChange={(value) => {
								setAttributes({
									itemResponsiveMode: value,
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
								value="md"
								label="SM - MD"
								showTooltip={true}
								aria-label="Small & Medium"
							/>
							<ToggleGroupControlOption
								value="xl"
								label="LG - XL"
								showTooltip={true}
								aria-label="Large & Extra Large"
							/>
						</ToggleGroupControl>
						{itemResponsiveMode && (
							<div className="media-control">
								{resMode.map((item, index) => {
									return (
										<div
											className="media-control-wrap"
											id={`media-${index}`}
										>
											{itemResponsiveMode == item ? (
												<MediaUploadCheck
													fallback={instructions}
												>
													<MediaUpload
														title={__(
															'Image',
															'tabler'
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
																		'tabler'
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
																					'tabler'
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
											{itemResponsiveMode == item &&
											!!responsiveBgImage[item]['BgId'] &&
											responsiveBgImage[item][
												'BgImage'
											] ? (
												<MediaUploadCheck>
													<MediaUpload
														title={__(
															'Background Image',
															'tabler'
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
																className="tb--image-attr tb-background-image-replace"
															>
																{__(
																	'Replace background image',
																	'tabler'
																)}
															</Button>
														)}
													/>
												</MediaUploadCheck>
											) : (
												<></>
											)}
											{itemResponsiveMode == item &&
											!!responsiveBgImage[item][
												'BgId'
											] ? (
												<MediaUploadCheck>
													<Button
														id={`media-removebtn-${index}`}
														onClick={onRemoveImage}
														isLink
														isDestructive
														className="tb--image-attr tb-background-image-remove"
													>
														{__(
															'Remove background image',
															'tabler'
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
						<TextControl
							label={__('Alt text', 'tabler')}
							type="text"
							placeholder="Overwrite default Alt-Text..."
							value={mediaAlt}
							onChange={(value) =>
								setAttributes({ mediaAlt: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={`slider__frame glide__slide`}>
					{mediaUrl || xsimageUrl || mdimageUrl ? (
						<>
							<picture className={`slide__image`}>
								{xsimageUrl && !mdimageUrl && !mediaUrl ? (
									<>
										<source
											media="(min-width:1025px)"
											srcset={`${xsimageUrl}`}
										/>
										<source
											media="(min-width:481px)"
											srcset={`${xsimageUrl}`}
										/>
										<source
											media="(max-width:480px)"
											srcset={`${xsimageUrl}`}
										/>
									</>
								) : (
									''
								)}
								{xsimageUrl && mdimageUrl && !mediaUrl ? (
									<>
										<source
											media="(min-width:1025px)"
											srcset={`${mdimageUrl}`}
										/>
										<source
											media="(min-width:481px)"
											srcset={`${mdimageUrl}`}
										/>
										<source
											media="(max-width:480px)"
											srcset={`${xsimageUrl}`}
										/>
									</>
								) : (
									''
								)}
								{xsimageUrl && !mdimageUrl && mediaUrl ? (
									<>
										<source
											media="(min-width:1025px)"
											srcset={`${mediaUrl}`}
										/>
										<source
											media="(min-width:481px)"
											srcset={`${xsimageUrl}`}
										/>
										<source
											media="(max-width:480px)"
											srcset={`${xsimageUrl}`}
										/>
									</>
								) : (
									''
								)}
								{!xsimageUrl && !mdimageUrl && mediaUrl ? (
									<>
										<source
											media="(min-width:1025px)"
											srcset={`${mediaUrl}`}
										/>
										<source
											media="(min-width:481px)"
											srcset={`${mediaUrl}`}
										/>
										<source
											media="(max-width:480px)"
											srcset={`${mediaUrl}`}
										/>
									</>
								) : (
									''
								)}
								{xsimageUrl && mdimageUrl && mediaUrl ? (
									<>
										<source
											media="(min-width:1025px)"
											srcset={`${mediaUrl}`}
										/>
										<source
											media="(min-width:481px)"
											srcset={`${mdimageUrl}`}
										/>
										<source
											media="(max-width:480px)"
											srcset={`${xsimageUrl}`}
										/>
									</>
								) : (
									''
								)}
								{xsimageUrl ? (
									<img
										src={`${xsimageUrl}`}
										alt={`${mediaAlt}`}
									/>
								) : !xsimageUrl && mdimageUrl ? (
									<img
										src={`${mdimageUrl}`}
										alt={`${mediaAlt}`}
									/>
								) : !xsimageUrl && !mdimageUrl && mediaUrl ? (
									<img
										src={`${mediaUrl}`}
										alt={`${mediaAlt}`}
									/>
								) : (
									''
								)}
							</picture>
						</>
					) : (
						<>
							<div className="placeholder__img">
								<img src={PlaceholderImg} alt="placeholder" />
							</div>
						</>
					)}
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withSelect((select, props) => {
		const { getMedia } = select('core');
		const { mediaId, xsmediaId, mdmediaId } = props.attributes;

		return {
			SlideImage: mediaId ? getMedia(mediaId) : null,
			mdSlideImage: mdmediaId ? getMedia(mdmediaId) : null,
			xsSlideImage: xsmediaId ? getMedia(xsmediaId) : null,
		};
	})
)(Edit);
