/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';

import classnames from 'classnames';

/**
 * Internal dependencies
 */

import edit from './edit';
import metadata from './block.json';
import { stack } from '../../utils/block-icons';
import { IconForward } from '../../utils/block-icons';

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
	edit: edit,
	save: (props) => {
		const {
			attributes: {
				style,
				align,
				bgcolor,
				bgcolorClass,
				width,
				url,
				linkTarget,
				text,
				buttonicon,
				rel,
			},
		} = props;

		const Element = ({ tagName, htmlAttrs, children }) => {
			return createElement(tagName, htmlAttrs, children);
		};

		const relAttributes = [];

		if (linkTarget) {
			relAttributes.push('noopener');
		}

		const className = `button--cta button--style-${style} button--align-${align} button--width-${width} button--color-${bgcolorClass}`;

		let htmlAttributes = {
			className: classnames({
				'button--text': !buttonicon,
				[`${className}`]: undefined !== className,
			}),
			href: !!url ? url : null,
			target: !!linkTarget ? '_blank' : null,
			rel:
				relAttributes && relAttributes.length > 0
					? relAttributes.join(' ')
					: null,
		};

		return (
			<>
				<Element tagName={'a'} htmlAttrs={htmlAttributes}>
					<RichText.Content
						value={text}
						tagName={!!buttonicon ? 'span' : null}
						className={!!buttonicon ? 'button--text' : null}
					/>

					{!!buttonicon && <IconForward />}
				</Element>
			</>
		);
	},
};
