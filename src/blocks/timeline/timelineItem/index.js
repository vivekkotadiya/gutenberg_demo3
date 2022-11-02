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
import classnames from 'classnames';
import { Consumer } from '../edit';

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
			typeof attributes.itemId != 'undefined'
				? attributes.itemId
				: attributes.id;
		return { 'data-item': currentId };
	},
	/**
	 * @see ./edit.js
	 */
	edit: (props) => {
		return (
			<div {...useBlockProps()}>
				<Consumer>
					{({ updateLogoSliderContentAttributes }) => (
						<Edit
							{...{
								...props,
								...{ updateLogoSliderContentAttributes },
							}}
						/>
					)}
				</Consumer>
			</div>
		);
	},
	save: (props) => (
		<Save
			{...{
				...props,
			}}
		/>
	),
};
