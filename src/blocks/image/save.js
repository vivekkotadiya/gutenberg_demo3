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
				imageId,
				altText,
				imageUrl,
				mdimageUrl,
				xsimageUrl,
				width,
				align,
				hideXS,
				hideMD,
				hideLG,
			},
		} = this.props;

		return (
			<>
				{(imageUrl || mdimageUrl || xsimageUrl) && (
					<picture
						className={`image image--width-${width} image--align-${align}${DisplaySettings(
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
			</>
		);
	}
}
