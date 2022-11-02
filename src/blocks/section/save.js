/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				backgroundColorClass,
				padding,
				anchor,
				xlbackgroundImagesrc,
				mdbackgroundImagesrc,
				xsbackgroundImagesrc,
				xlbackgroundImageId,
				mdbackgroundImageId,
				xsbackgroundImageId,
				hideLG,
				hideMD,
				hideXS,
			},
		} = this.props;

		const bgclass = backgroundColorClass
			? `section--bg-${backgroundColorClass}`
			: '';

		let hideSection = '';
		if (hideLG == true) {
			hideSection += ' section--lg-hide';
		}
		if (hideMD == true) {
			hideSection += ' section--md-hide';
		}
		if (hideXS == true) {
			hideSection += ' section--xs-hide';
		}

		return (
			<section
				id={anchor}
				className={`section section--pd-${padding}${hideSection} ${bgclass}`}
			>
				{(xlbackgroundImageId ||
					mdbackgroundImageId ||
					xsbackgroundImageId) && (
					<div className="section__background">
						<picture>
							{xsbackgroundImagesrc &&
							!mdbackgroundImagesrc &&
							!xlbackgroundImagesrc ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${xsbackgroundImagesrc}`}
									/>
									<source
										media="(min-width:481px)"
										srcset={`${xsbackgroundImagesrc}`}
									/>
									<source
										media="(max-width:480px)"
										srcset={`${xsbackgroundImagesrc}`}
									/>
								</>
							) : (
								''
							)}
							{xsbackgroundImagesrc &&
							mdbackgroundImagesrc &&
							!xlbackgroundImagesrc ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${mdbackgroundImagesrc}`}
									/>
									<source
										media="(min-width:481px)"
										srcset={`${mdbackgroundImagesrc}`}
									/>
									<source
										media="(max-width:480px)"
										srcset={`${xsbackgroundImagesrc}`}
									/>
								</>
							) : (
								''
							)}
							{xsbackgroundImagesrc &&
							mdbackgroundImagesrc &&
							xlbackgroundImagesrc ? (
								<>
									<source
										media="(min-width:1025px)"
										srcset={`${xlbackgroundImagesrc}`}
									/>
									<source
										media="(min-width:481px)"
										srcset={`${mdbackgroundImagesrc}`}
									/>
									<source
										media="(max-width:480px)"
										srcset={`${xsbackgroundImagesrc}`}
									/>
								</>
							) : (
								''
							)}
							{xsbackgroundImagesrc ? (
								<img
									src={`${xsbackgroundImagesrc}`}
									alt=""
									width="auto"
									height="auto"
								/>
							) : !xsbackgroundImagesrc &&
							  mdbackgroundImagesrc ? (
								<img
									src={`${mdbackgroundImagesrc}`}
									alt=""
									width="auto"
									height="auto"
								/>
							) : !xsbackgroundImagesrc &&
							  !mdbackgroundImagesrc &&
							  xlbackgroundImagesrc ? (
								<img
									src={`${xlbackgroundImagesrc}`}
									alt=""
									width="auto"
									height="auto"
								/>
							) : (
								''
							)}
						</picture>
					</div>
				)}
				<div className={`section__content`}>
					<InnerBlocks.Content />
				</div>
			</section>
		);
	}
}
