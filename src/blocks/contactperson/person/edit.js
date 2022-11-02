/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * Wordpess dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Spinner,
	Button,
	PanelBody,
	ResponsiveWrapper,
	SelectControl,
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
				imageId,
				imageUrl,
				xsimageUrl,
				mdimageUrl,
				altText,
				layoutStyle,
			},
			setAttributes,
			Image,
		} = this.props;

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

		const onUpdateImage = (image) => {
			setAttributes({
				imageId: image.id,
				imageUrl: image.url,
				altText: image.alt,
			});
		};

		const onRemoveImage = (image) => {
			setAttributes({
				imageId: undefined,
				imageUrl: '',
				xsimageUrl: '',
				mdimageUrl: '',
			});
		};

		const ALLOWED_BLOCKS = ['tbblocks/paragraph'];

		const BLOCK_TEMPLATE = [
			[
				'tbblocks/paragraph',
				{
					textColor: '#DD3333',
					textColorClass: 'five',
					textStyle: 'two',
					extraClass: 'cp--title',
				},
			],
			['tbblocks/paragraph', { extraClass: 'cp--name' }],
			['tbblocks/paragraph', { extraClass: 'cp--links' }],
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
		const createMarkup = (html) => {
			return { __html: html };
		};

		const cpLayoutClass = layoutStyle ? `cp--style-${layoutStyle}` : '';

		const blockClass = classnames(`cp`, `${cpLayoutClass}`);

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
										{!imageId && __('Set Image', 'tabler')}
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
									title={__('Add Image', 'tabler')}
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
											{__('Replace Image', 'tabler')}
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
									{__('Remove Image', 'tabler')}
								</Button>
							</MediaUploadCheck>
						) : (
							<></>
						)}

						<SelectControl
							className="style_select"
							label={__('Style')}
							options={[
								{
									value: 'small',
									label: __('Small'),
								},
								{
									value: 'big',
									label: __('Big'),
								},
							]}
							value={layoutStyle}
							onChange={(value) => {
								setAttributes({
									layoutStyle: value,
								});
							}}
						></SelectControl>
					</PanelBody>
				</InspectorControls>
				<div className={blockClass}>
					{imageUrl || xsimageUrl || mdimageUrl ? (
						<div className={`cp--profile-image`}>
							<picture>
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
									<img
										src={`${xsimageUrl}`}
										alt={`${altText}`}
									/>
								) : !xsimageUrl && mdimageUrl ? (
									<img
										src={`${mdimageUrl}`}
										alt={`${altText}`}
									/>
								) : !xsimageUrl && !mdimageUrl && imageUrl ? (
									<img
										src={`${imageUrl}`}
										alt={`${altText}`}
									/>
								) : (
									''
								)}
							</picture>
						</div>
					) : (
						<div className="cp--profile-image placeholder__img">
							<img src={PlaceholderImg} alt="placeholder" />
						</div>
					)}

					<div className={`cp--info`}>
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
		const { imageId } = props.attributes;

		return {
			Image: imageId ? getMedia(imageId) : null,
		};
	})
)(Edit);
