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
			default: '["Logo Slide 1"]',
		},
		slideCount: {
			type: 'number',
			default: 1,
		},
		autostart: {
			type: 'boolean',
			default: false,
		},
		navigationArrow: {
			type: 'boolean',
			default: false,
		},
		SliderResponsiveMode: {
			type: 'string',
			default: 'xl',
		},
		xlDisplayItem: {
			type: 'number',
			default: 3,
		},
		lgDisplayItem: {
			type: 'number',
			default: 3,
		},
		mdDisplayItem: {
			type: 'number',
			default: 3,
		},
		smDisplayItem: {
			type: 'number',
			default: 2,
		},
		xsDisplayItem: {
			type: 'number',
			default: 1,
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
