/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

import {
	IconPhoneline,
	IconEnvelop,
	IconHome,
} from '../../../utils/block-icons';

export default function save({ attributes }) {
	const createMarkup = (html) => {
		return { __html: html };
	};
	return (
		<>
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
