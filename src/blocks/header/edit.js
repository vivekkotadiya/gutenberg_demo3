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
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { IconPhone, IconMail, IconLocation } from '../../utils/block-icons';
import sitelogo from '../../assets/images/Logo-Tabler.png';

const TEMPLATE = [['tbblocks/navigation']];

export default function edit({ setAttributes, attributes }) {
	const humberger = useRef();

	useEffect(() => {
		const { ownerDocument } = humberger.current;
		const { defaultView } = ownerDocument;
		var element = ownerDocument.getElementById('menu--btn');
		var menu = ownerDocument.querySelector('.header--nav');
		element.addEventListener('click', (event) => {
			menu.classList.toggle('is--active');
			element.classList.toggle('is--active');
		});
	}, []);

	console.log(window);
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Header Information', 'tbblocks')}
					initialOpen={true}
				>
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
				</PanelBody>
			</InspectorControls>
			<div class="bg--color-five header--top">
				<div className="header--container">
					<ul className="header--contact-list">
						{attributes.telefonLink != '' &&
						attributes.telefon != '' ? (
							<li class="header-contact--phone">
								<a href={attributes.telefonLink}>
									<IconPhone />
									{attributes.telefon}
								</a>
							</li>
						) : (
							''
						)}
						{attributes.emailLink != '' &&
						attributes.email != '' ? (
							<li class="header--contact-email">
								<a href={attributes.emailLink}>
									<IconMail />
									{attributes.email}
								</a>
							</li>
						) : (
							''
						)}
						{attributes.address != '' ? (
							<li class="header--contact-address">
								<span>
									<IconLocation /> {attributes.address}
								</span>
							</li>
						) : (
							''
						)}
					</ul>
				</div>
			</div>
			<div className="header--container">
				<div className="header--nav">
					<div class="site--logo">
						<a href={attributes.site_url}>
							<img
								src={sitelogo}
								alt="Tabler - High Tech Blech"
							/>
						</a>
					</div>
					<InnerBlocks template={TEMPLATE} />
					<span id="menu--btn" class="hamburger" ref={humberger}>
						<span>Toggle menu</span>
					</span>
				</div>
			</div>
		</>
	);
}
