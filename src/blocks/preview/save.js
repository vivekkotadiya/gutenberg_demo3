/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

import DisplaySettings from '../../utils/block-helpers';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				altText,
				imageUrl,
				mdimageUrl,
				xsimageUrl,
				title,
				textOverlay,
				link,
			},
		} = this.props;

		return (
			<div
				className={`preview__card ${DisplaySettings(
					this.props.attributes
				)}`}
			>
				{(imageUrl || mdimageUrl || xsimageUrl) && (
					<picture
						className={`image ${DisplaySettings(
							this.props.attributes
						)}`}
					>
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
				)}
				<div className="preview__content">
					{title ? (
						<h4 className="headline--style-one headline--color-four headline--align-center">
							{title}
						</h4>
					) : (
						<></>
					)}
					{textOverlay != '' ? (
						<div className="preview__description">
							<p className="text--color-one text--align-center">
								{textOverlay}
							</p>
						</div>
					) : (
						<></>
					)}
					{link ? <a href={`${link}`} alt={`${title}`}></a> : <></>}
				</div>
			</div>
		);
	}
}
