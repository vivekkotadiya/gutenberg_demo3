/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * Wordpress dependencies
 */

import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function edit({ attributes, setAttributes, clientId }) {
	const blockProps = useBlockProps();

	const ALLOWED_BLOCKS = ['tbblocks/person'];

	const { hasInnerBlocks } = useSelect(
		(select) => {
			const { getBlock, getSettings } = select(blockEditorStore);
			const block = getBlock(clientId);
			return {
				hasInnerBlocks: !!(block && block.innerBlocks.length),
			};
		},
		[clientId]
	);

	const renderappender = hasInnerBlocks
		? undefined
		: () => <InnerBlocks.ButtonBlockAppender />;
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'cp--wrapper' },
		{ allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
	);

	return (
		<div {...blockProps}>
			<div class="container cp--row">
				<div {...innerBlocksProps} />
			</div>
		</div>
	);
}
