/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Spinner,
	Button,
	PanelBody,
	ToggleControl,
	TextControl,
	TextareaControl,
	ResponsiveWrapper,
} from '@wordpress/components';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import DisplaySettings from '../../utils/block-helpers';
import PlaceholderImg from '../../assets/images/placeholder.jpg';

class Edit extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				imageId,
				altText,
				imageUrl,
				mdimageUrl,
				xsimageUrl,
				title,
				link,
				textOverlay,
				hideXS,
				hideMD,
				hideLG,
			},
			Image,
			setAttributes,
		} = this.props;

		const instructions = (
			<p>
				{__(
					'To edit the background image, you need permission to upload media.',
					'tabler'
				)}
			</p>
		);

		const ALLOWED_MEDIA_TYPES = ['image'];

		const onUpdateImage = (image) => {
			setAttributes({
				imageId: image.id,
				imageUrl: image.url,
				altText: image.alt ? image.alt : title,
			});
		};

		const onRemoveImage = () => {
			setAttributes({
				imageId: undefined,
				imageUrl: '',
				xsimageUrl: '',
				mdimageUrl: '',
			});
		};

		if (Image) {
			if (Image.media_details.sizes['md']) {
				setAttributes({
					mdimageUrl: Image.media_details.sizes['md'].source_url,
				});
			} else {
				setAttributes({
					mdimageUrl: '',
				});
			}
			if (Image.media_details.sizes['xs']) {
				setAttributes({
					xsimageUrl: Image.media_details.sizes['xs'].source_url,
				});
			} else {
				setAttributes({
					xsimageUrl: '',
				});
			}
		}

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'tabler')}
						initialOpen={true}
					>
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title={__('Image', 'tabler')}
								onSelect={onUpdateImage}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={imageId}
								render={({ open }) => (
									<Button
										className={
											!imageId
												? 'editor-post-featured-image__toggle'
												: 'editor-post-featured-image__preview'
										}
										onClick={open}
									>
										{!!imageId && !Image && <Spinner />}
										{!imageId && __('Add image', 'tabler')}
										{!!imageId && Image && (
											<ResponsiveWrapper
												naturalWidth={
													Image.media_details.width
												}
												naturalHeight={
													Image.media_details.height
												}
											>
												<img
													src={Image.source_url}
													alt={__('Image', 'tabler')}
												/>
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{!!imageId && Image ? (
							<MediaUploadCheck>
								<MediaUpload
									title={__('Image', 'tabler')}
									onSelect={onUpdateImage}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={imageId}
									render={({ open }) => (
										<Button
											onClick={open}
											isDefault
											isLarge
											isLink
											className="tb--image-attr tb-background-image-replace"
										>
											{__('Replace image', 'tabler')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						) : (
							<></>
						)}
						{!!imageId ? (
							<MediaUploadCheck>
								<Button
									onClick={onRemoveImage}
									isLink
									isDestructive
									className="tb--image-attr tb-background-image-remove"
								>
									{__('Remove image', 'tabler')}
								</Button>
							</MediaUploadCheck>
						) : (
							<></>
						)}
						<TextControl
							label={__('Title', 'tabler')}
							type="text"
							placeholder="Overwrite default title text..."
							value={title}
							onChange={(value) =>
								setAttributes({ title: value })
							}
						/>
						<TextareaControl
							label={__('Text Overlay', 'tabler')}
							type="text"
							placeholder="Overwrite default overlay text..."
							value={textOverlay}
							onChange={(value) =>
								setAttributes({ textOverlay: value })
							}
						/>
						<TextControl
							label={__('Link', 'tabler')}
							type="link"
							placeholder="Link"
							value={link}
							onChange={(value) => setAttributes({ link: value })}
						/>
					</PanelBody>
					<PanelBody
						title={__('Display', 'tbblocks')}
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
					className={`preview__card ${DisplaySettings(
						this.props.attributes
					)}`}
				>
					{imageUrl || xsimageUrl || mdimageUrl ? (
						<picture className={`image`}>
							{xsimageUrl && !mdimageUrl && !imageUrl ? (
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
							{xsimageUrl && mdimageUrl && !imageUrl ? (
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
							{xsimageUrl && !mdimageUrl && imageUrl ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${imageUrl}`}
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
							{!xsimageUrl && !mdimageUrl && imageUrl ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${imageUrl}`}
									/>
									<source
										media="(min-width:481px)"
										srcset={`${imageUrl}`}
									/>
									<source
										media="(max-width:480px)"
										srcset={`${imageUrl}`}
									/>
								</>
							) : (
								''
							)}
							{xsimageUrl && mdimageUrl && imageUrl ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${imageUrl}`}
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
								<img src={`${xsimageUrl}`} alt={`${altText}`} />
							) : !xsimageUrl && mdimageUrl ? (
								<img src={`${mdimageUrl}`} alt={`${altText}`} />
							) : !xsimageUrl && !mdimageUrl && imageUrl ? (
								<img src={`${imageUrl}`} alt={`${altText}`} />
							) : (
								''
							)}
						</picture>
					) : (
						<></>
					)}
					<div className="preview__content">
						{title ? (
							<h4 className="headline--style-one headline--color-four headline--align-center">
								{title}
							</h4>
						) : (
							<></>
						)}
						{textOverlay != '' ? (
							<div className="preview__description">
								<p className="text--color-one text--align-center">
									{textOverlay}
								</p>
							</div>
						) : (
							<></>
						)}
						{link ? (
							<a href={`${link}`} alt={`${title}`}></a>
						) : (
							<></>
						)}
					</div>
				</div>
			</>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const { getMedia } = select('core');
		const { imageId } = props.attributes;

		return {
			Image: imageId ? getMedia(imageId) : null,
		};
	})
)(Edit);
