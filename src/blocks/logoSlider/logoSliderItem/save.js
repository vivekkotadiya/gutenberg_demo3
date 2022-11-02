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
				xsmediaUrl,
				mdmediaUrl,
				linkUrl,
				openNewTab,
				linkTitle,
			},
		} = this.props;

		const target = openNewTab == true ? '_blank' : '';

		return (
			<div className={`glide__slide`}>
				{linkUrl ? (
					<a
						href={`${linkUrl}`}
						target={`${target}`}
						title={`${linkTitle}`}
						rel="noopener"
					>
						<picture className={`logo-slide-image`}>
							{xsmediaUrl && !mdmediaUrl && !mediaUrl ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${xsmediaUrl}`}
									/>
									<source
										media="(min-width:481px)"
										srcset={`${xsmediaUrl}`}
									/>
									<source
										media="(max-width:480px)"
										srcset={`${xsmediaUrl}`}
									/>
								</>
							) : (
								''
							)}
							{xsmediaUrl && mdmediaUrl && !mediaUrl ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${mdmediaUrl}`}
									/>
									<source
										media="(min-width:481px)"
										srcset={`${mdmediaUrl}`}
									/>
									<source
										media="(max-width:480px)"
										srcset={`${xsmediaUrl}`}
									/>
								</>
							) : (
								''
							)}
							{xsmediaUrl && !mdmediaUrl && mediaUrl ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${mediaUrl}`}
									/>
									<source
										media="(min-width:481px)"
										srcset={`${xsmediaUrl}`}
									/>
									<source
										media="(max-width:480px)"
										srcset={`${xsmediaUrl}`}
									/>
								</>
							) : (
								''
							)}
							{!xsmediaUrl && !mdmediaUrl && mediaUrl ? (
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
							{xsmediaUrl && mdmediaUrl && mediaUrl ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${mediaUrl}`}
									/>
									<source
										media="(min-width:481px)"
										srcset={`${mdmediaUrl}`}
									/>
									<source
										media="(max-width:480px)"
										srcset={`${xsmediaUrl}`}
									/>
								</>
							) : (
								''
							)}
							{xsmediaUrl ? (
								<img
									src={`${xsmediaUrl}`}
									alt={`${mediaAlt}`}
								/>
							) : !xsmediaUrl && mdmediaUrl ? (
								<img
									src={`${mdmediaUrl}`}
									alt={`${mediaAlt}`}
								/>
							) : !xsmediaUrl && !mdmediaUrl && mediaUrl ? (
								<img src={`${mediaUrl}`} alt={`${mediaAlt}`} />
							) : (
								''
							)}
						</picture>
					</a>
				) : (
					<picture className={`logo-slide-image`}>
						{xsmediaUrl && !mdmediaUrl && !mediaUrl ? (
							<>
								<source
									media="(min-width:1025px)"
									srcset={`${xsmediaUrl}`}
								/>
								<source
									media="(min-width:481px)"
									srcset={`${xsmediaUrl}`}
								/>
								<source
									media="(max-width:480px)"
									srcset={`${xsmediaUrl}`}
								/>
							</>
						) : (
							''
						)}
						{xsmediaUrl && mdmediaUrl && !mediaUrl ? (
							<>
								<source
									media="(min-width:1025px)"
									srcset={`${mdmediaUrl}`}
								/>
								<source
									media="(min-width:481px)"
									srcset={`${mdmediaUrl}`}
								/>
								<source
									media="(max-width:480px)"
									srcset={`${xsmediaUrl}`}
								/>
							</>
						) : (
							''
						)}
						{xsmediaUrl && !mdmediaUrl && mediaUrl ? (
							<>
								<source
									media="(min-width:1025px)"
									srcset={`${mediaUrl}`}
								/>
								<source
									media="(min-width:481px)"
									srcset={`${xsmediaUrl}`}
								/>
								<source
									media="(max-width:480px)"
									srcset={`${xsmediaUrl}`}
								/>
							</>
						) : (
							''
						)}
						{!xsmediaUrl && !mdmediaUrl && mediaUrl ? (
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
						{xsmediaUrl && mdmediaUrl && mediaUrl ? (
							<>
								<source
									media="(min-width:1025px)"
									srcset={`${mediaUrl}`}
								/>
								<source
									media="(min-width:481px)"
									srcset={`${mdmediaUrl}`}
								/>
								<source
									media="(max-width:480px)"
									srcset={`${xsmediaUrl}`}
								/>
							</>
						) : (
							''
						)}
						{xsmediaUrl ? (
							<img src={`${xsmediaUrl}`} alt={`${mediaAlt}`} />
						) : !xsmediaUrl && mdmediaUrl ? (
							<img src={`${mdmediaUrl}`} alt={`${mediaAlt}`} />
						) : !xsmediaUrl && !mdmediaUrl && mediaUrl ? (
							<img src={`${mediaUrl}`} alt={`${mediaAlt}`} />
						) : (
							''
						)}
					</picture>
				)}
			</div>
		);
	}
}
