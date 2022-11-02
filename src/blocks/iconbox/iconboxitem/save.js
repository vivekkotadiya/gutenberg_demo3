/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { IconI } from '../../../utils/block-icons';

export default function Save({ setAttributes, attributes, onReplace }) {
	const { borderLeft } = attributes;

	const blockClass = classnames({
		iconbox: true,
		'iconbox--border-left': borderLeft,
	});

	return (
		<>
			<div className={blockClass}>
				<div className="iconbox--icon">
					<IconI />
				</div>
				<div className="iconbox--content">
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	);
}
