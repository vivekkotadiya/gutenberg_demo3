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
import { Platform } from '@wordpress/element';

export default function edit({ setAttributes, attributes }) {
	const {
		textAlign,
		content,
		level,
		placeholder,
		headColor,
		headColorClass,
		headStyle,
	} = attributes;

	const tagName = 'h' + level;

	const onContentChange = (value) => {
		const newContent = { content: value };
		setAttributes(newContent);
	};

	const blockProps = useBlockProps();
	const theme_colors = [
		{
			name: 'Grey',
			slug: 'one',
			color: '#3F3F3F',
		},
		{
			name: 'Dark Grey',
			slug: 'two',
			color: '#B6B6B6',
		},
		{
			name: 'Extra Light Red',
			slug: 'three',
			color: '#DD3333',
		},
		{
			name: 'White',
			slug: 'four',
			color: '#ffffff',
		},
		{
			name: 'Black',
			slug: 'five',
			color: '#000000',
		},
	];

	const SetColorClass = (value) => {
		theme_colors.filter(function (item) {
			if (item.color == value) {
				setAttributes({
					headColorClass: item.slug,
				});
			}
		});
	};
	const colorClass =
		headColorClass && headColorClass != 'five'
			? `headline--color-${headColorClass}`
			: '';
	const styleClass = headStyle ? `headline--style-${headStyle}` : '';
	const headlineAlign =
		textAlign && textAlign != 'left' ? `headline--align-${textAlign}` : '';

	const blockClass = classnames(
		`${headlineAlign}`,
		`${styleClass}`,
		`${colorClass}`
	);

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Styles')} initialOpen={true}>
					<PanelColorSettings
						title={__('Color')}
						className={'block-color-setting block-color-top-0'}
						colorSettings={[
							{
								colors: theme_colors,
								value: headColor,
								onChange: (value) => {
									typeof value == 'undefined'
										? setAttributes({ headColorClass: '' })
										: SetColorClass(value);
									typeof value == 'undefined'
										? setAttributes({
												headColor: '#000000',
										  })
										: setAttributes({ headColor: value });
								},
								label: __('Color'),
							},
						]}
					/>
					<SelectControl
						label={__('Alignment')}
						options={[
							{
								value: 'left',
								label: __('Left'),
							},
							{
								value: 'center',
								label: __('Center'),
							},
							{
								value: 'right',
								label: __('Right'),
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
						label={__('Style')}
						options={[
							{
								value: 'one',
								label: __('One'),
							},
							{
								value: 'two',
								label: __('Two'),
							},
							{
								value: 'three',
								label: __('Three'),
							},
							{
								value: 'four',
								label: __('Four'),
							},
						]}
						value={headStyle}
						onChange={(value) => {
							setAttributes({
								headStyle: value,
							});
						}}
					></SelectControl>
				</PanelBody>
				<PanelBody title={__('Settings')} initialOpen={true}>
					<ToggleGroupControl
						label="Tag"
						value={level}
						onChange={(value) => {
							setAttributes({
								level: Number(value),
							});
						}}
					>
						<ToggleGroupControlOption
							value="1"
							label="1"
							showTooltip={true}
							aria-label="H1"
						/>
						<ToggleGroupControlOption
							value="2"
							label="2"
							showTooltip={true}
							aria-label="H2"
						/>
						<ToggleGroupControlOption
							value="3"
							label="3"
							showTooltip={true}
							aria-label="H3"
						/>
						<ToggleGroupControlOption
							value="4"
							label="4"
							showTooltip={true}
							aria-label="H4"
						/>
						<ToggleGroupControlOption
							value="5"
							label="5"
							showTooltip={true}
							aria-label="H5"
						/>
						<ToggleGroupControlOption
							value="6"
							label="6"
							showTooltip={true}
							aria-label="H6"
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
				withoutInteractiveFormatting={true}
				aria-label={__('Heading text')}
				placeholder={placeholder || __('Heading')}
				{...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
				allowedFormats={['']}
			/>
		</div>
	);
}
