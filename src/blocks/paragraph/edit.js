/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { Platform } from '@wordpress/element';

/***
 * Interal dependencies
 */

import { theme_colors } from '../../utils/block-helpers';

export default function edit({
	setAttributes,
	attributes,
	clientId,
	mergeBlocks,
	onReplace,
	onRemove,
}) {
	const {
		textAlign,
		content,
		tag,
		placeholder,
		textColorClass,
		textColor,
		textStyle,
		extraClass,
	} = attributes;

	const onContentChange = (value) => {
		const newContent = { content: value };
		setAttributes(newContent);
	};

	const tagName = tag;

	const SetColorClass = (value) => {
		theme_colors.filter(function (item) {
			if (item.color == value) {
				setAttributes({
					textColorClass: item.slug,
				});
			}
		});
	};
	const colorClass =
		textColorClass && textColorClass != 'eight'
			? `text--color-${textColorClass}`
			: '';
	const styleClass = textStyle ? `text--style-${textStyle}` : '';
	const extraParegraphClass = extraClass ? `${extraClass}` : '';
	const paregraphAlignClass =
		textAlign && textAlign != 'left' ? `text--align-${textAlign}` : '';

	const blockClass = classnames(
		`${paregraphAlignClass}`,
		`${colorClass}`,
		`${styleClass}`,
		`${extraParegraphClass}`
	);

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Styles', 'tbblocks')} initialOpen={true}>
					<PanelColorSettings
						title={__('Text Color', 'tbblocks')}
						className={'block-color-setting block-color-top-0'}
						colorSettings={[
							{
								colors: theme_colors,
								value: textColor,
								onChange: (value) => {
									console.log(value);
									typeof value == 'undefined'
										? setAttributes({ textColorClass: '' })
										: SetColorClass(value);
									typeof value == 'undefined'
										? setAttributes({
												textColor: '#000000',
										  })
										: setAttributes({ textColor: value });
								},
								label: __('Text Color'),
							},
						]}
					/>
					<SelectControl
						label={__('Alignment', 'tbblocks')}
						options={[
							{
								value: 'left',
								label: __('Left', 'tbblocks'),
							},
							{
								value: 'center',
								label: __('Center', 'tbblocks'),
							},
							{
								value: 'right',
								label: __('Right', 'tbblocks'),
							},
						]}
						value={textAlign}
						onChange={(value) => {
							setAttributes({
								textAlign: value,
							});
						}}
					></SelectControl>
					<SelectControl
						label={__('Style', 'tbblocks')}
						options={[
							{
								value: 'one',
								label: __('One', 'tbblocks'),
							},
							{
								value: 'two',
								label: __('Two', 'tbblocks'),
							},
						]}
						value={textStyle}
						onChange={(value) => {
							setAttributes({
								textStyle: value,
							});
						}}
					></SelectControl>
				</PanelBody>
				<PanelBody
					title={__('Settings', 'tbblocks')}
					initialOpen={true}
				>
					<ToggleGroupControl
						label="Tag"
						className="block-togglegroup"
						value={tag}
						onChange={(value) => {
							setAttributes({
								tag: value,
							});
						}}
					>
						<ToggleGroupControlOption
							value="p"
							label="P"
							showTooltip={true}
							aria-label="P"
						/>
						<ToggleGroupControlOption
							value="span"
							label="SPAN"
							showTooltip={true}
							aria-label="SPAN"
						/>
					</ToggleGroupControl>
				</PanelBody>
			</InspectorControls>

			<RichText
				identifier="content"
				tagName={tagName}
				className={blockClass}
				value={content}
				onChange={onContentChange}
				onSplit={(value, isOriginal) => {
					let newAttributes;

					if (isOriginal || value) {
						newAttributes = {
							...attributes,
							content: value,
						};
					}

					const block = createBlock(
						'tbblocks/paragraph',
						newAttributes
					);

					if (isOriginal) {
						block.clientId = clientId;
					}

					return block;
				}}
				onMerge={mergeBlocks}
				onReplace={onReplace}
				onRemove={onRemove}
				aria-label={__('Paragraph text')}
				placeholder={placeholder || __('Add text here...')}
				{...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
				allowedFormats={['core/bold', 'core/italic', 'core/link']}
			/>
		</div>
	);
}
