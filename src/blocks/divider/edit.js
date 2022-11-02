/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import { PanelBody, SelectControl, __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption } from '@wordpress/components';
 import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

 
export default function edit({ setAttributes, attributes, isSelected }) {
    const {
        style,
        paddingTop,
        paddingBottom
    } = attributes;  
    return(
        <>
            <InspectorControls >
                <PanelBody
                    title={ __( 'Styles', 'tabler' ) }
                    initialOpen={ true }
                    >
                    <SelectControl
                        label = {__("Style", "tabler")}
                        options = {[
                            {
                                value: "one",
                                label: __("White", "tabler"),
                            },
                            {
                                value: "two",
                                label: __("Line - Light Grey", "tabler"),
                            },
                            {
                                value: "three",
                                label: __("Line - Grey", "tabler"),
                            },
                            {
                                value: "four",
                                label: __("Line - Dark Grey", "tabler"),
                            },
                            {
                                value: "five",
                                label: __("Line - Light Red", "tabler"),
                            },
                            {
                                value: "six",
                                label: __("Line - Red", "tabler"),
                            },
                            {
                                value: "seven",
                                label: __("Line - Dark Red", "tabler"),
                            },
                        ]}
                        value={style}
                        onChange={ ( value ) => { 
                            setAttributes( {
                                style: value
                            } );
                        } }
                    >
                    </SelectControl>
                </PanelBody>
                <PanelBody
                    title={ __( 'Settings', 'tabler' ) }
                    initialOpen={ true }
                    >
                        <ToggleGroupControl label="Spacing Top" className="ix-togglegroup"
                            value={ paddingTop } isBlock 
                            onChange={ (value) => {    
                                setAttributes( {
                                    paddingTop: value,
                                } );
                            } }>
                            <ToggleGroupControlOption value="0" label="S" showTooltip={ true } aria-label="Small" />
                            <ToggleGroupControlOption value="1" label="M" showTooltip={ true } aria-label="Medium" />
                            <ToggleGroupControlOption value="2" label="L" showTooltip={ true } aria-label="Large" />
                            <ToggleGroupControlOption value="3" label="Xl" showTooltip={ true } aria-label="Extra Large" />
                        </ToggleGroupControl>
                        <ToggleGroupControl label="Spacing Bottom" className="ix-togglegroup"
                            value={ paddingBottom } isBlock 
                            onChange={ (value) => {    
                                setAttributes( {
                                    paddingBottom: value,
                                } );
                            } }>
                            <ToggleGroupControlOption value="0" label="S" showTooltip={ true } aria-label="Small" />
                            <ToggleGroupControlOption value="1" label="M" showTooltip={ true } aria-label="Medium" />
                            <ToggleGroupControlOption value="2" label="L" showTooltip={ true } aria-label="Large" />
                            <ToggleGroupControlOption value="3" label="XL" showTooltip={ true } aria-label="Extra Large" />
                        </ToggleGroupControl>
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps()}>
                <hr class={`divider divider--style-${style} divider--pd-top-${paddingTop} divider--pd-bottom-${paddingBottom}`} />
            </div>
        </>
    );
}