/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * External dependencies
 */

import classnames from 'classnames';

const TEMPLATE = [['tbblocks/navigation']];

export default function edit({ setAttributes, attributes }) {
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Footer Information', 'tbblocks')}
					initialOpen={true}
				>
					<TextControl
						label={__('CopyRight Text', 'tbblocks')}
						type="text"
						value={attributes.copyright}
						onChange={(value) =>
							setAttributes({ copyright: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div class="footer--wrapper">
				<div class="container">
					{attributes.copyright != '' &&
					attributes.copyright != '' ? (
						<div class="footer--copyright footer--col">
							{attributes.copyright}
						</div>
					) : (
						''
					)}
					<div class="footer--menu footer--col">
						<InnerBlocks template={TEMPLATE} />
					</div>
				</div>
			</div>
		</>
	);
}
