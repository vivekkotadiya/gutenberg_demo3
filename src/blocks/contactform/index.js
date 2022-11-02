import { __ } from '@wordpress/i18n';

window.wpcf7 = window.wpcf7 ?? {
	contactForms: [],
};

import { stack } from '../../utils/block-icons';
import edit from './edit';
import transforms from './transforms';
import metadata from './block.json';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: stack,

	transforms,

	edit,

	save: ({ attributes }) => {
		attributes = {
			id: attributes.id ?? window.wpcf7.contactForms[0]?.id,
			title: attributes.title ?? window.wpcf7.contactForms[0]?.title,
		};

		return (
			<div>
				[contact-form-7 id="{attributes.id}" title="{attributes.title}"]
			</div>
		);
	},
};
