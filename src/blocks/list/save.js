/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { values, listStyle, listColorClass } = attributes;

	const colorClass = listColorClass ? `list--color-${listColorClass}` : '';

	return (
		<ul className={`list list--style-${listStyle} ${colorClass} igb-lists`}>
			<RichText.Content value={values} multiline="li" />
		</ul>
	);
}
