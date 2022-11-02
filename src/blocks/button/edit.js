/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useState, useEffect, useRef } from '@wordpress/element';
import {
	PanelBody,
	SelectControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	Popover,
	ToolbarButton,
	ToggleControl,
} from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	RichText,
	__experimentalLinkControl as LinkControl,
	BlockControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { displayShortcut } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import { createElement } from '@wordpress/element';

/***
 * Interal dependencies
 */

import { button_colors } from '../../utils/block-helpers';
import { IconForward } from '../../utils/block-icons';

export default function edit({
	setAttributes,
	attributes,
	isSelected,
	onReplace,
	mergeBlocks,
}) {
	const {
		style,
		align,
		bgcolor,
		bgcolorClass,
		width,
		linkTarget,
		buttonicon,
		rel,
		text,
		url,
	} = attributes;

	const ref = useRef();
	const richTextRef = useRef();

	const [isEditingURL, setIsEditingURL] = useState(false);
	const isURLSet = !!url;
	const opensInNewTab = linkTarget === '_blank';
	const NEW_TAB_REL = 'noopener';

	const relAttributes = [];

	const Element = ({ tagName, htmlAttrs, children }) => {
		return createElement(tagName, htmlAttrs, children);
	};

	// Stop the buttons from doing anything in the editor.
	const links = document.querySelectorAll('a.button--cta');

	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener(
			'click',
			function (e) {
				if (links[i].getAttribute('href')) {
					links[i].removeAttribute('href');
					e.preventDefault();
				}
			},
			false
		);
	}

	function onToggleOpenInNewTab(value) {
		const newLinkTarget = value ? '_blank' : undefined;

		if (newLinkTarget) {
			relAttributes.push('noopener');
		}

		setAttributes({
			linkTarget: newLinkTarget,
		});
	}

	function startEditing(event) {
		event.preventDefault();
		setIsEditingURL(true);
	}

	function unlink() {
		setAttributes({
			url: undefined,
			linkTarget: undefined,
			rel: undefined,
		});
		setIsEditingURL(false);
	}

	useEffect(() => {
		if (!isSelected) {
			setIsEditingURL(false);
		}
	}, [isSelected]);

	const SetColorClass = (value) => {
		button_colors.filter(function (item) {
			if (item.color == value) {
				setAttributes({
					bgcolorClass: item.slug,
				});
				setAttributes({
					bgcolor: item.color,
				});
			}
		});
	};

	const className = `button--cta button--style-${style} button--align-${align} button--width-${width} button--color-${bgcolorClass}`;

	let htmlAttributes = {
		className: classnames({
			'button--text': !buttonicon,
			[`${className}`]: undefined !== className,
		}),
		href: !!url ? url : null,
		target: !!linkTarget ? '_blank' : null,
		rel:
			relAttributes && relAttributes.length > 0
				? relAttributes.join(' ')
				: null,
	};

	return (
		<>
			<div {...useBlockProps({ className: `button--align-${align}` })}>
				<InspectorControls>
					<PanelBody
						title={__('Styles', 'tbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label="Button Style"
							className="block-togglegroup"
							value={style}
							isBlock
							onChange={(value) => {
								setAttributes({
									style: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="one"
								label="Fill"
								showTooltip={true}
								aria-label="Fill"
							/>
							<ToggleGroupControlOption
								value="two"
								label="Outline"
								showTooltip={true}
								aria-label="Outline"
							/>
						</ToggleGroupControl>

						<PanelColorSettings
							title={__('Button color', 'tbblocks')}
							className={'block-color-setting block-color-top-0'}
							colorSettings={[
								{
									colors: button_colors,
									value: bgcolor,
									onChange: (value) => {
										SetColorClass(value);
									},
									label: __('Button Color'),
								},
							]}
						/>

						<ToggleControl
							label="Button With Icon"
							checked={buttonicon}
							onChange={() =>
								setAttributes({
									buttonicon: !buttonicon,
								})
							}
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
							value={align}
							onChange={(value) => {
								setAttributes({
									align: value,
								});
							}}
						></SelectControl>
					</PanelBody>
					<PanelBody
						title={__('Settings', 'tbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label="Width"
							className="block-togglegroup"
							value={width}
							isBlock
							onChange={(value) => {
								setAttributes({
									width: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="inline"
								label="Inline"
								showTooltip={true}
								aria-label="Inline"
							/>
							<ToggleGroupControlOption
								value="one"
								label="1/4"
								showTooltip={true}
								aria-label="1/4"
							/>
							<ToggleGroupControlOption
								value="two"
								label="2/4"
								showTooltip={true}
								aria-label="2/4"
							/>
							<ToggleGroupControlOption
								value="three"
								label="3/4"
								showTooltip={true}
								aria-label="3/4"
							/>
							<ToggleGroupControlOption
								value="four"
								label="4/4"
								showTooltip={true}
								aria-label="4/4"
							/>
						</ToggleGroupControl>
					</PanelBody>
				</InspectorControls>

				<BlockControls group="block">
					{!isURLSet && (
						<ToolbarButton
							name="link"
							icon={link}
							title={__('Link')}
							shortcut={displayShortcut.primary('k')}
							onClick={startEditing}
						/>
					)}
					{isURLSet && (
						<ToolbarButton
							name="link"
							icon={linkOff}
							title={__('Unlink')}
							shortcut={displayShortcut.primaryShift('k')}
							onClick={unlink}
							isActive={true}
						/>
					)}
				</BlockControls>
				{isSelected && (isEditingURL || isURLSet) && (
					<Popover
						onClose={() => {
							setIsEditingURL(false);
							richTextRef.current?.focus();
						}}
						anchorRef={ref?.current}
						focusOnMount={isEditingURL ? 'firstElement' : false}
						__unstableSlotName={'__unstable-block-tools-after'}
					>
						<LinkControl
							className="wp-block-navigation-link__inline-link-input"
							value={{ url, opensInNewTab }}
							onChange={({
								url: newURL = '',
								opensInNewTab: newOpensInNewTab,
							}) => {
								setAttributes({ url: newURL });

								if (opensInNewTab !== newOpensInNewTab) {
									onToggleOpenInNewTab(newOpensInNewTab);
								}
							}}
							onRemove={() => {
								unlink();
								richTextRef.current?.focus();
							}}
							forceIsEditingLink={isEditingURL}
						/>
					</Popover>
				)}

				<Element tagName={'a'} htmlAttrs={htmlAttributes}>
					{!!buttonicon && (
						<Fragment>
							<span className={'button--text'}>
								<RichText
									ref={richTextRef}
									aria-label={__('Button text')}
									placeholder={__('Add text…')}
									value={text}
									onChange={(value) =>
										setAttributes({ text: value })
									}
									withoutInteractiveFormatting={false}
									allowedFormats={[]}
									onReplace={onReplace}
									onMerge={mergeBlocks}
									identifier="text"
								/>
							</span>
							<IconForward />
						</Fragment>
					)}

					{!buttonicon && (
						<RichText
							ref={richTextRef}
							aria-label={__('Button text')}
							placeholder={__('Add text…')}
							value={text}
							onChange={(value) => setAttributes({ text: value })}
							withoutInteractiveFormatting={false}
							allowedFormats={[]}
							onReplace={onReplace}
							onMerge={mergeBlocks}
							identifier="text"
						/>
					)}
				</Element>
			</div>
		</>
	);
}
