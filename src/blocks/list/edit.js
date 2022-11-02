/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

import { theme_colors } from '../../utils/block-helpers';

export default function edit({ setAttributes, attributes, onReplace }) {
	const { listStyle, values, listColorClass, listColor } = attributes;

	const SetColorClass = (value) => {
		theme_colors.filter(function (item) {
			if (item.color == value) {
				setAttributes({
					listColorClass: item.slug,
				});
			}
		});
	};
	const colorClass = listColorClass ? `list--color-${listColorClass}` : '';

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Styles', 'tabler')} initialOpen={true}>
					<SelectControl
						label={__('Style', 'tabler')}
						options={[
							{
								value: 'one',
								label: __('Normal', 'tabler'),
							},
							{
								value: 'two',
								label: __('Tab', 'tabler'),
							},
						]}
						value={listStyle}
						onChange={(value) => {
							setAttributes({
								listStyle: value,
							});
						}}
					></SelectControl>
					<PanelColorSettings
						title={__('List Color', 'tabler')}
						className={'block-color-setting block-color-top-0'}
						colorSettings={[
							{
								colors: theme_colors,
								value: listColor,
								onChange: (value) => {
									typeof value == 'undefined'
										? setAttributes({ listColorClass: '' })
										: SetColorClass(value);
									setAttributes({ listColor: value });
								},
								label: __('List Color'),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<RichText
					identifier="values"
					multiline="li"
					tagName="ul"
					onChange={(nextValues) =>
						setAttributes({ values: nextValues })
					}
					value={values}
					aria-label={__('List text')}
					placeholder={__('List')}
					onReplace={onReplace}
					onRemove={() => onReplace([])}
					type="string"
					allowedFormats={['core/bold', 'core/italic', 'core/link']}
					className={`list list--style-${listStyle} ${colorClass} igb-lists`}
				></RichText>
			</div>
		</>
	);
}
