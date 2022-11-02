/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

import DisplaySettings from '../../utils/block-helpers';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		return (
			<div
				className={classnames(
					`timeline${DisplaySettings(this.props.attributes)}`
				)}
			>
				<div className={`timeline__content`}>
					<InnerBlocks.Content />
				</div>
				<div className="timeline__connector"></div>
			</div>
		);
	}
}
