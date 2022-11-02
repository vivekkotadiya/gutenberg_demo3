/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import Edit from './edit';
import metadata from './block.json';
import { stack } from '../../../utils/block-icons';
const { name, category, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
	description: __('Render classic menu data as a block', 'tbblocks'),
	keywords: [
		__('classic', 'tbblocks'),
		__('menu', 'tbblocks'),
		__('navigation', 'tbblocks'),
	],
	category,
	attributes,
	supports,
	icon: stack,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
};
