/**
 * External dependencies
 */
import classnames from 'classnames';
import { IconLocation as icon } from '../../utils/block-icons';

/**
 * Internal dependencies
 */
import Controls from './controls';
import GoogleMapIframeRender from './edit-gmaps-iframe-render';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	store as blockEditorStore,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import {
	Button,
	Icon,
	Placeholder,
	ResizableBox,
	TextControl,
	withNotices,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const Edit = (props) => {
	const { attributes, className, isSelected, setAttributes } = props;

	const { address, pinned, height, zoom } = attributes;

	const [addressState, setAddress] = useState(address);

	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);

	useEffect(() => {
		if (
			!isSelected &&
			!pinned &&
			addressState &&
			Object.keys(addressState).length
		) {
			// This side-effect should not create an undo level.
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({
				address: addressState,
				pinned: true,
			});
		}
	}, [isSelected, pinned, addressState]);

	const renderMap = (event) => {
		if (event) {
			event.preventDefault();
		}

		setAttributes({ address: addressState, pinned: true });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				{isSelected && (
					<PanelBody title={__('Settings', 'tbblocks')}>
						<>
							<TextControl
								label={__('Adrress', 'tbblocks')}
								type="text"
								value={attributes.address}
								onChange={(value) =>
									setAttributes({ address: addressState })
								}
							/>

							<RangeControl
								label={__('Height', 'tbblocks')}
								max={800}
								min={200}
								onChange={(nextHeight) =>
									setAttributes({ height: nextHeight })
								}
								step={1}
								value={height}
							/>

							<RangeControl
								label={__('Zoom Level', 'tbblocks')}
								max={20}
								min={5}
								onChange={(nextZoom) =>
									setAttributes({ zoom: nextZoom })
								}
								step={1}
								value={zoom}
							/>
						</>
					</PanelBody>
				)}
			</InspectorControls>
			{isSelected && <Controls {...props} />}
			{pinned ? (
				<ResizableBox
					className={classnames(className, {
						'is-selected': isSelected,
					})}
					enable={{
						bottom: true,
						bottomLeft: false,
						bottomRight: false,
						left: false,
						right: false,
						top: false,
						topLeft: false,
						topRight: false,
					}}
					minHeight="200"
					onResizeStop={(_event, _direction, _elt, delta) => {
						setAttributes({
							height: parseInt(height + delta.height, 10),
						});
					}}
					showHandle={isSelected}
					size={{
						height,
						width: '100%',
					}}
				>
					{GoogleMapIframeRender(props)}
				</ResizableBox>
			) : (
				<Placeholder
					icon={<Icon icon={icon} />}
					instructions={__(
						'Enter a location or address to drop a pin on a Google map.',
						'tbblocks'
					)}
					label={__('Map', 'tbblocks')}
				>
					<form onSubmit={renderMap}>
						<TextControl
							className="components-placeholder__input"
							onChange={(nextAddress) => setAddress(nextAddress)}
							placeholder={__(
								'Search for a place or address…',
								'tbblocks'
							)}
							value={addressState || ''}
						/>
						<Button
							disabled={!addressState}
							isPrimary={!!addressState}
							isSecondary={!addressState}
							type="submit"
						>
							{__('Search', 'tbblocks')}
						</Button>
						<div className="components-placeholder__learn-more">
							{address && (
								<Button
									className="components-placeholder__cancel-button"
									disabled={!address}
									isTertiary
									onClick={() => {
										setAttributes({ pinned: !pinned });
										setAddress(address);
									}}
									title={__('Cancel', 'tbblocks')}
								>
									{__('Cancel', 'tbblocks')}
								</Button>
							)}
						</div>
					</form>
				</Placeholder>
			)}
		</div>
	);
};

export default compose([withNotices])(Edit);
