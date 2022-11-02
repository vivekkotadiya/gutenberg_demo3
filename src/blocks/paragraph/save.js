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
	const { textAlign, textColorClass, content, tag, textStyle, extraClass } =
		attributes;

	const TagName = tag;

	const colorClass =
		textColorClass && textColorClass != 'eight'
			? `text--color-${textColorClass}`
			: '';
	const styleClass = textStyle ? `text--style-${textStyle}` : '';
	const extraParegraphClass = extraClass ? `${extraClass}` : '';
	const paregraphAlignClass =
		textAlign && textAlign != 'left' ? `text--align-${textAlign}` : '';

	const className = classnames(
		`${paregraphAlignClass}`,
		`${colorClass}`,
		`${styleClass}`,
		`${extraParegraphClass}`
	);

	return (
		<TagName className={className}>
			<RichText.Content value={content} />
		</TagName>
	);
}
