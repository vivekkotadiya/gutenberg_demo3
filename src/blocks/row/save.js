/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

import rowClasses from './rowClasses';

export default class Save extends Component {
	render() {
		return (
			<div
				className={classnames(
					`row-wrapper`,
					this.props.attributes.contentwidth == true
						? ' row-wrapper--ct-wd'
						: ''
				)}
			>
				<div
					className={classnames(
						`row`,
						...rowClasses(this.props.attributes)
					)}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
