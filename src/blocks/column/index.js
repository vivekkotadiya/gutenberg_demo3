/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */

import Edit from './edit';
import metadata from './block.json';

import classnames from 'classnames';
import colClasses from './colClasses';
import { stack } from '../../utils/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: stack,
	/**
	 * @see ./edit.js
	 */
	edit: (props) => {
		const ALLOWED_BLOCKS = [
			'tbblocks/button',
			'tbblocks/headline',
			'tbblocks/paragraph',
			'tbblocks/list',
			'tbblocks/video',
			'tbblocks/image',
			'tbblocks/preview',
			'tbblocks/map',
		];

		const bgclass = props.attributes.colbgClass
			? `col--bg-${props.attributes.colbgClass}`
			: '';

		const { getBlockOrder } = useSelect((select) => {
			return select('core/block-editor') || select('core/editor');
		});

		props.hasChildBlocks = getBlockOrder(props.clientId).length;

		const renderappender = props.hasChildBlocks
			? undefined
			: () => <InnerBlocks.ButtonBlockAppender />;
		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'col__content' },
			{ allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
		);

		const blockProps = useBlockProps({
			className: classnames(
				`col ${bgclass}`,
				...colClasses(props.attributes)
			),
		});
		return (
			<div {...blockProps}>
				<Edit {...props} />
				<div {...innerBlocksProps} />
			</div>
		);
	},
	save: (props) => {
		const bgclass = props.attributes.colbgClass
			? `col--bg-${props.attributes.colbgClass}`
			: '';
		return (
			<div
				className={classnames(
					`col ${bgclass}`,
					...colClasses(props.attributes)
				)}
			>
				<div className="col__content">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};
