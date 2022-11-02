/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { textAlign, headColorClass, content, level, headStyle } = attributes;

	const TagName = 'h' + level;

	const colorClass =
		headColorClass && headColorClass != 'five'
			? `headline--color-${headColorClass}`
			: '';
	const styleClass = headStyle ? `headline--style-${headStyle}` : '';
	const headlineAlign =
		textAlign && textAlign != 'left' ? `headline--align-${textAlign}` : '';

	const className = classnames(
		`${headlineAlign}`,
		`${styleClass}`,
		`${colorClass}`
	);

	return (
		<TagName className={className}>
			<RichText.Content value={content} />
		</TagName>
	);
}
