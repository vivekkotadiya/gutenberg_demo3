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
	ToggleControl,
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
				xsmediaUrl,
				mdmediaUrl,
				mediaAlt,
				linkUrl,
				openNewTab,
				linkTitle,
			},
			setAttributes,
			backgroundImage,
		} = this.props;

		if (backgroundImage) {
			if (backgroundImage.media_details.sizes['md']) {
				setAttributes({
					mdmediaUrl:
						backgroundImage.media_details.sizes['md'].source_url,
				});
			} else {
				setAttributes({
					mdmediaUrl: '',
				});
			}
			if (backgroundImage.media_details.sizes['xs']) {
				setAttributes({
					xsmediaUrl:
						backgroundImage.media_details.sizes['xs'].source_url,
				});
			} else {
				setAttributes({
					xsmediaUrl: '',
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
				xsmediaUrl: '',
				mdmediaUrl: '',
			});
		};
		const instructions = (
			<p>
				{__(
					'To edit the logo, you need permission to upload media.',
					'tabler'
				)}
			</p>
		);

		const ALLOWED_MEDIA_TYPES = ['image'];

		const target = openNewTab == true ? '_blank' : '';

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'tabler')}
						initialOpen={true}
					>
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title={__('Add Logo', 'tabler')}
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
										{!mediaId && __('Set Logo', 'tabler')}
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
													alt={__('Logo', 'tabler')}
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
									title={__('Add Logo', 'tabler')}
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
											{__('Replace Logo', 'tabler')}
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
									{__('Remove Logo', 'tabler')}
								</Button>
							</MediaUploadCheck>
						) : (
							<></>
						)}
						<TextControl
							label={__('Logo Alt-Text', 'tabler')}
							type="text"
							placeholder="Overwrite default Alt-Text..."
							value={mediaAlt}
							onChange={(value) =>
								setAttributes({ mediaAlt: value })
							}
						/>
						<TextControl
							label={__('Link-URL', 'tabler')}
							type="text"
							placeholder="Type in URL…"
							value={linkUrl}
							onChange={(value) =>
								setAttributes({ linkUrl: value })
							}
						/>
						<ToggleControl
							label="Open in new Tab"
							checked={openNewTab}
							onChange={() =>
								setAttributes({
									openNewTab: !openNewTab,
								})
							}
						/>
						<TextControl
							label={__('Link-Title', 'tabler')}
							type="text"
							placeholder="Type in Title…"
							value={linkTitle}
							onChange={(value) =>
								setAttributes({ linkTitle: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={`glide__slide`}>
					{linkUrl ? (
						<a
							href={`${linkUrl}`}
							target={`${target}`}
							title={`${linkTitle}`}
						>
							{mediaUrl ? (
								<>
									<picture className={`logo-slide-image`}>
										{xsmediaUrl &&
										!mdmediaUrl &&
										!mediaUrl ? (
											<>
												<source
													media="(min-width:1025px)"
													srcset={`${xsmediaUrl}`}
												/>
												<source
													media="(min-width:481px)"
													srcset={`${xsmediaUrl}`}
												/>
												<source
													media="(max-width:480px)"
													srcset={`${xsmediaUrl}`}
												/>
											</>
										) : (
											''
										)}
										{xsmediaUrl &&
										mdmediaUrl &&
										!mediaUrl ? (
											<>
												<source
													media="(min-width:1025px)"
													srcset={`${mdmediaUrl}`}
												/>
												<source
													media="(min-width:481px)"
													srcset={`${mdmediaUrl}`}
												/>
												<source
													media="(max-width:480px)"
													srcset={`${xsmediaUrl}`}
												/>
											</>
										) : (
											''
										)}
										{xsmediaUrl &&
										!mdmediaUrl &&
										mediaUrl ? (
											<>
												<source
													media="(min-width:1025px)"
													srcset={`${mediaUrl}`}
												/>
												<source
													media="(min-width:481px)"
													srcset={`${xsmediaUrl}`}
												/>
												<source
													media="(max-width:480px)"
													srcset={`${xsmediaUrl}`}
												/>
											</>
										) : (
											''
										)}
										{!xsmediaUrl &&
										!mdmediaUrl &&
										mediaUrl ? (
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
										{xsmediaUrl &&
										mdmediaUrl &&
										mediaUrl ? (
											<>
												<source
													media="(min-width:1025px)"
													srcset={`${mediaUrl}`}
												/>
												<source
													media="(min-width:481px)"
													srcset={`${mdmediaUrl}`}
												/>
												<source
													media="(max-width:480px)"
													srcset={`${xsmediaUrl}`}
												/>
											</>
										) : (
											''
										)}
										{xsmediaUrl ? (
											<img
												src={`${xsmediaUrl}`}
												alt={`${mediaAlt}`}
											/>
										) : !xsmediaUrl && mdmediaUrl ? (
											<img
												src={`${mdmediaUrl}`}
												alt={`${mediaAlt}`}
											/>
										) : !xsmediaUrl &&
										  !mdmediaUrl &&
										  mediaUrl ? (
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
								<div className="placeholder__img">
									<img
										src={PlaceholderImg}
										alt="placeholder"
									/>
								</div>
							)}
						</a>
					) : (
						<>
							{mediaUrl ? (
								<>
									<picture className={`logo-slide-image`}>
										{xsmediaUrl &&
										!mdmediaUrl &&
										!mediaUrl ? (
											<>
												<source
													media="(min-width:1025px)"
													srcset={`${xsmediaUrl}`}
												/>
												<source
													media="(min-width:481px)"
													srcset={`${xsmediaUrl}`}
												/>
												<source
													media="(max-width:480px)"
													srcset={`${xsmediaUrl}`}
												/>
											</>
										) : (
											''
										)}
										{xsmediaUrl &&
										mdmediaUrl &&
										!mediaUrl ? (
											<>
												<source
													media="(min-width:1025px)"
													srcset={`${mdmediaUrl}`}
												/>
												<source
													media="(min-width:481px)"
													srcset={`${mdmediaUrl}`}
												/>
												<source
													media="(max-width:480px)"
													srcset={`${xsmediaUrl}`}
												/>
											</>
										) : (
											''
										)}
										{xsmediaUrl &&
										!mdmediaUrl &&
										mediaUrl ? (
											<>
												<source
													media="(min-width:1025px)"
													srcset={`${mediaUrl}`}
												/>
												<source
													media="(min-width:481px)"
													srcset={`${xsmediaUrl}`}
												/>
												<source
													media="(max-width:480px)"
													srcset={`${xsmediaUrl}`}
												/>
											</>
										) : (
											''
										)}
										{!xsmediaUrl &&
										!mdmediaUrl &&
										mediaUrl ? (
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
										{xsmediaUrl &&
										mdmediaUrl &&
										mediaUrl ? (
											<>
												<source
													media="(min-width:1025px)"
													srcset={`${mediaUrl}`}
												/>
												<source
													media="(min-width:481px)"
													srcset={`${mdmediaUrl}`}
												/>
												<source
													media="(max-width:480px)"
													srcset={`${xsmediaUrl}`}
												/>
											</>
										) : (
											''
										)}
										{xsmediaUrl ? (
											<img
												src={`${xsmediaUrl}`}
												alt={`${mediaAlt}`}
											/>
										) : !xsmediaUrl && mdmediaUrl ? (
											<img
												src={`${mdmediaUrl}`}
												alt={`${mediaAlt}`}
											/>
										) : !xsmediaUrl &&
										  !mdmediaUrl &&
										  mediaUrl ? (
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
								<div className="placeholder__img">
									<img
										src={PlaceholderImg}
										alt="placeholder"
									/>
								</div>
							)}
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
		const { mediaId } = props.attributes;

		return {
			backgroundImage: mediaId ? getMedia(mediaId) : null,
		};
	})
)(Edit);
