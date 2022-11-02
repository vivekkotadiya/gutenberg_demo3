/**
 * WordPress dependencies
 */
import { registerBlockCollection, getCategories } from '@wordpress/blocks';
import { Icon } from '@wordpress/components';

/**
 * Determine if the block attributes are empty.
 *
 * @param {Object} attributes The block attributes to check.
 * @return {boolean} The empty state of the attributes passed.
 */
export const hasEmptyAttributes = (attributes) => {
	return !Object.entries(attributes)
		.map(([, value]) => {
			if (typeof value === 'string') {
				value = value.trim();
			}

			if (value instanceof Array) {
				value = value.length;
			}

			if (value instanceof Object) {
				value = Object.entries(value).length;
			}

			return !!value;
		})
		.filter((value) => value === true).length;
};

/**
 * Return bool depending on registerBlockCollection compatibility.
 *
 * @return {boolean} Value to indicate function support.
 */
export const supportsCollections = () => {
	if (typeof registerBlockCollection === 'function') {
		return true;
	}
	return false;
};

/**
 * Check for which category to assign.
 *
 * @return {boolean} Value to indicate function support.
 */
export const hasFormattingCategory = getCategories().some(function (category) {
	return category.slug === 'formatting';
});

export const theme_colors = [
	{
		name: 'White',
		slug: 'one',
		color: '#ffffff',
	},
	{
		name: 'Extra light Gray',
		slug: 'two',
		color: '#EDEDED',
	},
	{
		name: 'Dark Grey',
		slug: 'three',
		color: '#B6B6B6',
	},
	{
		name: 'Grey',
		slug: 'four',
		color: '#3F3F3F',
	},
	{
		name: 'Extra Light Red',
		slug: 'five',
		color: '#DD3333',
	},
	{
		name: 'Light Red',
		slug: 'six',
		color: '#D10E0E',
	},
	{
		name: 'Red',
		slug: 'seven',
		color: '#B30E0E',
	},
	{
		name: 'Black',
		slug: 'eight',
		color: '#000000',
	},
];

export const button_colors = [
	{
		name: 'Red',
		slug: 'one',
		color: '#DD3333',
	},
	{
		name: 'Extra Dark Gray',
		slug: 'two',
		color: '#3F3F3F',
	},
	{
		name: 'Grey',
		slug: 'three',
		color: '#B6B6B6',
	},
	{
		name: 'Light Grey',
		slug: 'five',
		color: '#EDEDED',
	},
	{
		name: 'White',
		slug: 'four',
		color: '#FFFFFF',
	},
];

export const SmartphoneIcon = () => (
	<Icon
		icon={() => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="11.92"
				height="19.37"
				viewBox="0 0 11.92 19.37"
			>
				<g
					id="Group_146"
					data-name="Group 146"
					transform="translate(-8 -3)"
				>
					<path
						id="Path_6"
						data-name="Path 6"
						d="M18.058,3h-8.2A1.863,1.863,0,0,0,8,4.863V20.508A1.863,1.863,0,0,0,9.863,22.37h8.2a1.863,1.863,0,0,0,1.863-1.863V4.863A1.863,1.863,0,0,0,18.058,3Zm1.118,17.508a1.118,1.118,0,0,1-1.118,1.118h-8.2a1.118,1.118,0,0,1-1.118-1.118V4.863A1.118,1.118,0,0,1,9.863,3.745h8.2a1.118,1.118,0,0,1,1.118,1.118Z"
						fill="#fff"
					/>
					<path
						id="Path_7"
						data-name="Path 7"
						d="M10,19.665h8.94V7H10Zm.745-11.92H18.2V18.92h-7.45Z"
						transform="translate(-0.51 -1.02)"
						fill="#fff"
					/>
					<rect
						id="Rectangle_8"
						data-name="Rectangle 8"
						width="3"
						height="1"
						transform="translate(12 4.37)"
						fill="#fff"
					/>
				</g>
			</svg>
		)}
	/>
);

export default function DisplaySettings(attributes) {
	const { hideXS, hideMD, hideLG } = attributes;
	let displayClass = '';
	if (hideXS == true) {
		displayClass += ' block--xs-hide';
	}
	if (hideMD == true) {
		displayClass += ' block--md-hide';
	}
	if (hideLG == true) {
		displayClass += ' block--lg-hide';
	}
	return displayClass;
}
