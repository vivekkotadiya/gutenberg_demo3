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
    icon : stack,
    /**
	 * @see ./edit.js
	 */
	edit: edit,
    save: (props) => {

        const {
            attributes: {
                style,
                paddingTop,
                paddingBottom,
            },
        } = props;  
		return (
            <hr class={`divider divider--style-${style} divider--pd-top-${paddingTop} divider--pd-bottom-${paddingBottom}`} />
		);

	}
}