/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */

import metadata from './block.json';

import { stack } from '../../../utils/block-icons';

const { name, category, supports, description, keywords, attributes } =
	metadata;

export { metadata, name };

export const settings = {
	description,
	keywords,
	attributes,
	category,
	icon: stack,
	supports,
	/**
	 * @see ./edit.js
	 */
	edit: (props) => {
		return (
			<div {...useBlockProps()}>
				<ServerSideRender block={name} attributes={props.attributes} />
			</div>
		);
	},
	/**
	 * @see ./save.js
	 */
	save: (props) => {
		return null;
	},
};
