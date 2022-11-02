/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * Internal dependencies
 */

import { IconPhone, IconMail, IconLocation } from '../../utils/block-icons';
import sitelogo from '../../assets/images/Logo-Tabler.png';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	return (
		<>
			<div class="bg--color-five header--top">
				<div className="header--container">
					<ul className="header--contact-list">
						{attributes.telefonLink != '' &&
						attributes.telefon != '' ? (
							<li class="header--contact-phone">
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
					<InnerBlocks.Content />
					<span id="menu--btn" class="hamburger">
						<span>Toggle menu</span>
					</span>
				</div>
			</div>
		</>
	);
}
