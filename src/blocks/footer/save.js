/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	return (
		<div class="footer--wrapper">
			<div class="container">
				{attributes.copyright != '' && attributes.copyright != '' ? (
					<div class="footer--copyright footer--col">
						{attributes.copyright}
					</div>
				) : (
					''
				)}
				<div class="footer--menu footer--col">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
