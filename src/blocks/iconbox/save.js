/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default function Save({ setAttributes, attributes, onReplace }) {
	return (
		<>
			<div class="container">
				<div className="iconbox--wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	);
}
