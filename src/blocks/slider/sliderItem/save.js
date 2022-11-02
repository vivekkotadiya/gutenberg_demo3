/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

export default class Save extends Component {
	render() {
		const {
			attributes: {
				mediaAlt,
				mediaUrl,
				xsimageUrl,
				mdimageUrl,
				outerParent,
			},
		} = this.props;

		let autostart;
		if (typeof outerParent.attributes != 'undefined') {
			const { attributes } = outerParent;
			autostart = attributes.autostart;
		}

		return (
			<div className={`slider__frame glide__slide`}>
				<picture className={`slide__image`}>
					{xsimageUrl && !mdimageUrl && !mediaUrl ? (
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
					{xsimageUrl && mdimageUrl && !mediaUrl ? (
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
					{xsimageUrl && !mdimageUrl && mediaUrl ? (
						<>
							<source
								media="(min-width:1025px)"
								srcset={`${mediaUrl}`}
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
					{!xsimageUrl && !mdimageUrl && mediaUrl ? (
						<>
							<source
								media="(min-width:1025px)"
								srcset={`${mediaUrl}`}
							/>
							<source
								media="(min-width:481px)"
								srcset={`${mediaUrl}`}
							/>
							<source
								media="(max-width:480px)"
								srcset={`${mediaUrl}`}
							/>
						</>
					) : (
						''
					)}
					{xsimageUrl && mdimageUrl && mediaUrl ? (
						<>
							<source
								media="(min-width:1025px)"
								srcset={`${mediaUrl}`}
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
						<img src={`${xsimageUrl}`} alt={`${mediaAlt}`} />
					) : !xsimageUrl && mdimageUrl ? (
						<img src={`${mdimageUrl}`} alt={`${mediaAlt}`} />
					) : !xsimageUrl && !mdimageUrl && mediaUrl ? (
						<img src={`${mediaUrl}`} alt={`${mediaAlt}`} />
					) : (
						''
					)}
				</picture>
			</div>
		);
	}
}
