/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
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
				mediaId,
				mediaUrl,
				xsimageUrl,
				mdimageUrl,
				mediaAlt,
				slideId,
			},
			setAttributes,
			backgroundImage,
		} = this.props;

		if (backgroundImage) {
			if (backgroundImage.media_details.sizes['md']) {
				setAttributes({
					mdimageUrl:
						backgroundImage.media_details.sizes['md'].source_url,
				});
			} else {
				setAttributes({
					mdimageUrl: '',
				});
			}
			if (backgroundImage.media_details.sizes['xs']) {
				setAttributes({
					xsimageUrl:
						backgroundImage.media_details.sizes['xs'].source_url,
				});
			} else {
				setAttributes({
					xsimageUrl: '',
				});
			}
		}

		const onUpdateImage = (image) => {
			setAttributes({
				mediaId: image.id,
				mediaUrl: image.url,
				mediaAlt: image.alt,
			});
		};

		const onRemoveImage = (image) => {
			setAttributes({
				mediaId: undefined,
				mediaUrl: '',
				xsimageUrl: '',
				mdimageUrl: '',
			});
		};

		const ALLOWED_BLOCKS = ['tbblocks/headline', 'tbblocks/paragraph'];
		const BLOCK_TEMPLATE = [
			[
				'tbblocks/headline',
				{
					level: 4,
					textAlign: 'center',
					headColorClass: 'four',
					headColor: '#ffffff',
					headStyle: 'one',
				},
			],
			[
				'tbblocks/paragraph',
				{
					tag: 'p',
					textAlign: 'center',
					textColor: '#ffffff',
					textColorClass: 'one',
					textStyle: 'two',
				},
			],
		];

		const instructions = (
			<p>
				{__(
					'To edit the background image, you need permission to upload media.',
					'tabler'
				)}
			</p>
		);

		const ALLOWED_MEDIA_TYPES = ['image'];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'tabler')}
						initialOpen={true}
					>
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title={__('Add Image', 'tabler')}
								onSelect={onUpdateImage}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={mediaId}
								render={({ open }) => (
									<Button
										className={
											!mediaId
												? 'editor-post-featured-image__toggle'
												: 'editor-post-featured-image__preview'
										}
										onClick={open}
									>
										{!!mediaId && !backgroundImage && (
											<Spinner />
										)}
										{!mediaId && __('Set Image', 'tabler')}
										{!!mediaId && backgroundImage && (
											<ResponsiveWrapper
												naturalWidth={
													backgroundImage
														.media_details.width
												}
												naturalHeight={
													backgroundImage
														.media_details.height
												}
											>
												<img
													src={
														backgroundImage.source_url
													}
													alt={__('Image', 'tabler')}
												/>
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{!!mediaId && backgroundImage ? (
							<MediaUploadCheck>
								<MediaUpload
									title={__('Add Image', 'tabler')}
									onSelect={onUpdateImage}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={mediaId}
									render={({ open }) => (
										<Button
											onClick={open}
											isDefault
											isLarge
											isLink
											className="tb--image-attr tb-background-image-replace"
										>
											{__('Replace Image', 'tabler')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						) : (
							<></>
						)}
						{!!mediaId ? (
							<MediaUploadCheck>
								<Button
									onClick={onRemoveImage}
									isLink
									isDestructive
									className="tb--image-attr tb-background-image-remove"
								>
									{__('Remove Image', 'tabler')}
								</Button>
							</MediaUploadCheck>
						) : (
							<></>
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
				<div
					className={`tab-slider__frame glide__slide`}
					data-index={slideId - 1}
				>
					{mediaUrl || xsimageUrl || mdimageUrl ? (
						<>
							<picture className={`tab-slide__image`}>
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
					<div className={`tab-slide__content`}>
						<InnerBlocks
							template={BLOCK_TEMPLATE}
							templateLock={true}
							templateInsertUpdatesSelection={true}
							allowedBlocks={ALLOWED_BLOCKS}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withSelect((select, props) => {
		const { getMedia } = select('core');
		const { mediaId } = props.attributes;

		return {
			backgroundImage: mediaId ? getMedia(mediaId) : null,
		};
	})
)(Edit);
