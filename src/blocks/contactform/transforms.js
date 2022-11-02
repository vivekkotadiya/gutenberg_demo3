import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'shortcode',
			tag: 'contact-form-7',
			attributes: {
				postType: {
					type: 'integer',
					shortcode: ({ named: { id } }) => {
						return parseInt(id);
					},
				},
				postTitle: {
					type: 'string',
					shortcode: ({ named: { title } }) => {
						return title;
					},
				},
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: ['core/shortcode'],
			transform: (attributes) => {
				return createBlock('core/shortcode', {
					text: `[contact-form-7 id="${attributes.postType}" title="${attributes.postTitle}"]`,
				});
			},
		},
	],
};

export default transforms;
