/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */

import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { stack } from '../../utils/block-icons';

const { name, category, supports, description, keywords, attributes } =
	metadata;

export { metadata, name };

export const settings = {
	icon: stack,
	edit: (props) => {
		return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
	},
	/**
	 * @see ./save.js
	 */
	save: (props) => {
		return <Save {...props} />;
	},
};
