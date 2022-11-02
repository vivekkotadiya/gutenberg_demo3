/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import { Consumer } from '../edit';

/**
 * Module Constants
 */
const baseClass = 'wp-block-tb-tab-slider-slide';

/**
 * Internal dependencies
 */

import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { stack } from '../../../utils/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: stack,
	getEditWrapperProps(attributes) {
		const currentId =
			typeof attributes.slideId != 'undefined'
				? attributes.slideId
				: attributes.id;
		return { 'data-slide': currentId };
	},
	/**
	 * @see ./edit.js
	 */
	edit: (props) => (
		<div {...useBlockProps()}>
			<Consumer>
				{({ updateContentAttributes }) => (
					<Edit
						{...{
							...props,
							...{ updateContentAttributes },
							baseClass,
						}}
					/>
				)}
			</Consumer>
		</div>
	),
	save: (props) => (
		<Save
			{...{
				...props,
				baseClass,
			}}
		/>
	),
};
