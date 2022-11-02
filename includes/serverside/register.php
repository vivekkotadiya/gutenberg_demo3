<?php 
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_gutenbutg_contactform_block_init() {
	register_block_type(
		TbBlocks_PLUGIN_DIR . '/dist/blocks/contactform',
		[
			'render_callback' => 'render_contact_form',
		]
	);
}
add_action( 'init', 'create_gutenbutg_contactform_block_init' );

/**
 * Block render callback.
 *
 * @since 0.1.0
 * @param array $attrs Block attributes.
 *
 * @return string
 */
function render_contact_form( $attrs ) {


    $postType = $attrs['postType'];
	$html = '';

	if(isset($postType) && !empty($postType)) {
		$html .= do_shortcode( '[contact-form-7 id="'. $postType.'"]' );
		
	}
	
    return $html;
	
}