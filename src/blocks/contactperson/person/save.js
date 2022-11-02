/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

export default class Save extends Component {
	render() {
		const {
			attributes: {
				imageId,
				imageUrl,
				xsimageUrl,
				mdimageUrl,
				altText,
				layoutStyle,
			},
		} = this.props;

		const createMarkup = (html) => {
			return { __html: html };
		};

		const cpLayoutClass = layoutStyle ? `cp--style-${layoutStyle}` : '';

		const blockClass = classnames(`cp`, `${cpLayoutClass}`);

		return (
			<div className={blockClass}>
				<div className={`cp--profile-image`}>
					<picture>
						{xsimageUrl && !mdimageUrl && !imageUrl ? (
							<>
								<source
									media="(min-width:1025px)"
									srcset={`${xsimageUrl}`}
								/>
								<source
									media="(min-width:481px)"
									srcset={`${xsimageUrl}`}
								/>
								<source
									media="(max-width:480px)"
									srcset={`${xsimageUrl}`}
								/>
							</>
						) : (
							''
						)}
						{xsimageUrl && mdimageUrl && !imageUrl ? (
							<>
								<source
									media="(min-width:1025px)"
									srcset={`${mdimageUrl}`}
								/>
								<source
									media="(min-width:481px)"
									srcset={`${mdimageUrl}`}
								/>
								<source
									media="(max-width:480px)"
									srcset={`${xsimageUrl}`}
								/>
							</>
						) : (
							''
						)}
						{xsimageUrl && !mdimageUrl && imageUrl ? (
							<>
								<source
									media="(min-width:1025px)"
									srcset={`${imageUrl}`}
								/>
								<source
									media="(min-width:481px)"
									srcset={`${xsimageUrl}`}
								/>
								<source
									media="(max-width:480px)"
									srcset={`${xsimageUrl}`}
								/>
							</>
						) : (
							''
						)}
						{!xsimageUrl && !mdimageUrl && imageUrl ? (
							<>
								<source
									media="(min-width:1025px)"
									srcset={`${imageUrl}`}
								/>
								<source
									media="(min-width:481px)"
									srcset={`${imageUrl}`}
								/>
								<source
									media="(max-width:480px)"
									srcset={`${imageUrl}`}
								/>
							</>
						) : (
							''
						)}
						{xsimageUrl && mdimageUrl && imageUrl ? (
							<>
								<source
									media="(min-width:1025px)"
									srcset={`${imageUrl}`}
								/>
								<source
									media="(min-width:481px)"
									srcset={`${mdimageUrl}`}
								/>
								<source
									media="(max-width:480px)"
									srcset={`${xsimageUrl}`}
								/>
							</>
						) : (
							''
						)}
						{xsimageUrl ? (
							<img src={`${xsimageUrl}`} alt={`${altText}`} />
						) : !xsimageUrl && mdimageUrl ? (
							<img src={`${mdimageUrl}`} alt={`${altText}`} />
						) : !xsimageUrl && !mdimageUrl && imageUrl ? (
							<img src={`${imageUrl}`} alt={`${altText}`} />
						) : (
							''
						)}
					</picture>
				</div>
				<div className={`cp--info`}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
