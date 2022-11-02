import { __ } from '@wordpress/i18n';

function Save({ attributes }) {
	const { address, height, zoom } = attributes;

	const backgroundStyles = {
		minHeight: height ? height + 'px' : undefined,
	};

	const mapAttributes = {
		address,
		zoom,
	};

	const locale = document.documentElement.lang;

	return (
		<div className="g--map" style={backgroundStyles}>
			{
				<iframe
					frameBorder="0"
					loading="lazy"
					title={__('Google Map', 'tbblocks')}
					style={{ width: '100%', minHeight: height + 'px' }}
					src={`https://www.google.com/maps?q=${encodeURIComponent(
						address
					)}&output=embed&hl=${locale}&z=${zoom}`}
				/>
			}
		</div>
	);
}

export default Save;
