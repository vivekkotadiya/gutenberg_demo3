/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function edit({ setAttributes, attributes }) {
	const { videoId } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'tbBlocks')}
					initialOpen={true}
				>
					<TextControl
						label={__('Video ID', 'tbBlocks')}
						type="text"
						value={videoId}
						onChange={(value) => setAttributes({ videoId: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<iframe
					class="tb-video"
					width="765"
					height="431"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen="allowfullscreen"
					src={`https://www.youtube-nocookie.com/embed/${videoId}`}
				></iframe>
			</div>
		</>
	);
}
