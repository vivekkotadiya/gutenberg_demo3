/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl } from '@wordpress/components';
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	IconPhoneline,
	IconEnvelop,
	IconHome,
} from '../../../utils/block-icons';

export default function edit({ setAttributes, attributes }) {
	const createMarkup = (html) => {
		return { __html: html };
	};
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Footer Contact Information', 'tbblocks')}
					initialOpen={true}
				>
					<TextControl
						label={__('Email', 'tbblocks')}
						type="text"
						value={attributes.email}
						onChange={(value) => setAttributes({ email: value })}
					/>
					<TextControl
						label={__('Email Link', 'tbblocks')}
						type="text"
						value={attributes.emailLink}
						onChange={(value) =>
							setAttributes({ emailLink: value })
						}
					/>

					<TextControl
						label={__('Address', 'tbblocks')}
						type="text"
						value={attributes.address}
						onChange={(value) => setAttributes({ address: value })}
					/>
					<TextControl
						label={__('Telefon', 'tbblocks')}
						type="text"
						value={attributes.telefon}
						onChange={(value) => setAttributes({ telefon: value })}
					/>
					<TextControl
						label={__('Telefon Link', 'tbblocks')}
						type="text"
						value={attributes.telefonLink}
						onChange={(value) =>
							setAttributes({ telefonLink: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div class="ci--wrapper">
				<div className="ci--list">
					{attributes.emailLink != '' && attributes.email != '' ? (
						<div class="ci--col bg--color-five">
							<div class="ci--content">
								<div class="ci--icon">
									<IconEnvelop />
								</div>
								<div class="ci--info">
									<h3>E-Mail</h3>
									<a href={attributes.emailLink}>
										{attributes.email}
									</a>
								</div>
							</div>
						</div>
					) : (
						''
					)}
					{attributes.address != '' ? (
						<div class="ci--col bg--color-six">
							<div class="ci--content">
								<div class="ci--icon">
									<IconHome />
								</div>
								<div class="ci--info">
									<h3>Adresse</h3>
									<span
										dangerouslySetInnerHTML={createMarkup(
											attributes.address
										)}
									></span>
								</div>
							</div>
						</div>
					) : (
						''
					)}
					{attributes.telefonLink != '' &&
					attributes.telefon != '' ? (
						<div class="ci--col bg--color-seven">
							<div class="ci--content">
								<div class="ci--icon">
									<IconPhoneline />
								</div>
								<div class="ci--info">
									<h3>Telefon</h3>
									<a href={attributes.telefonLink}>
										{attributes.telefon}
									</a>
								</div>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</>
	);
}
