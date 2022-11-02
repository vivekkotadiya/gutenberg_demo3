/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import edit from './edit';
import metadata from './block.json';
import { stack } from '../../utils/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: stack,
	edit,
	save: (props) => {
		const {
			attributes: { videoId },
		} = props;

		return (
			<iframe
				class="tb-video"
				width="765"
				height="431"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen="allowfullscreen"
				src={`https://www.youtube-nocookie.com/embed/${videoId}`}
			></iframe>
		);
	},
};
