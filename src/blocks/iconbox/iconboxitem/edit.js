/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * Wordpress dependencies
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';

import { IconI } from '../../../utils/block-icons';

export default function edit({ setAttributes, attributes, onReplace }) {
	const { borderLeft } = attributes;

	const blockProps = useBlockProps();

	const BLOCKS_TEMPLATE = [
		['tbblocks/headline', { level: 3, headStyle: 'three' }],
		['tbblocks/paragraph', {}],
	];

	const blockClass = classnames({
		iconbox: true,
		'iconbox--border-left': borderLeft,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'tbblocks')}
					initialOpen={true}
				>
					<ToggleControl
						label="Border Left"
						checked={borderLeft}
						onChange={() =>
							setAttributes({
								borderLeft: !borderLeft,
							})
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className={blockClass}>
					<div className="iconbox--icon">
						<IconI />
					</div>
					<div className="iconbox--content">
						<InnerBlocks
							template={BLOCKS_TEMPLATE}
							templateLock="all"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
