/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { stack } from '../../utils/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
	attributes: {
		sliderArrays: {
			type: 'string',
			default: '["Slide 1"]',
		},
		slideCount: {
			type: 'number',
			default: 1,
		},
		autostart: {
			type: 'boolean',
			default: false,
		},
		showNavigation: {
			type: 'boolean',
			default: false,
		},
		showDots: {
			type: 'boolean',
			default: false,
		},
		innerItem: {
			type: 'array',
		},
		hideXS: {
			type: 'boolean',
			default: false,
		},
		hideMD: {
			type: 'boolean',
			default: false,
		},
		hideLG: {
			type: 'boolean',
			default: false,
		},
	},
	icon: stack,
	/**
	 * @see ./edit.js
	 */
	edit: (props) => {
		return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
	},
	save: (props) => {
		return <Save {...props} />;
	},
};
