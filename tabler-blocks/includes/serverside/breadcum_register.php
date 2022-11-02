<?php 
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_breadcum_block_init() {
	register_block_type(
		TbBlocks_PLUGIN_DIR . '/dist/blocks/header/breadcum',
		[
			'render_callback' => 'render_breadcum_navigation',
		]
	);
}

add_action( 'init', 'create_breadcum_block_init' );

/**
 * Block render callback.
 *
 * @since 0.1.0
 * @param array $attrs Block attributes.
 *
 * @return string
 */
function render_breadcum_navigation( $attrs ) {
    $html = '';
	$attrs      = wp_parse_args(
		$attrs,
		[
			'className' => '',
			'anchor'    => '',
			'menu'      => 0,
		]
	); 

  

ob_start();
?>

<section id="breadcrumbs" class="section bg--color-two">
    <div class="section__content">
        <div class="row-wrapper row-wrapper--ct-wd">
            <div class="row row--xs-middle">
                <div class="col--xs-12 col--md-6">
                    <h1 class="headline--style-two">
                        <?php 
                        if(!empty(get_the_title())){
                            echo get_the_title();
                        } else{
                            echo 'Seitentitel';
                        }
                         ?>
                    </h1>
                </div>
                <div class="col--xs-12 col--md-6">
                    <div  class="breadcrumb--trail breadcrumbs">
                        <ul class="breadcrumb">
                            <li><a href="<?php echo site_url(); ?>" class="bread-link bread-home"><?php esc_html_e('Home', 'tbblocks') ?></a></li>
                            <span class="separator">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="10px" viewBox="0 0 59.414 59.414" fill="#3F3F3F" xml:space="preserve">
<polygon points="15.561,0 14.146,1.414 42.439,29.707 14.146,58 15.561,59.414 45.268,29.707 "/>
<g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>
                            <li class="active">
                                <?php 
                                    if(!empty(get_the_title())){
                                        echo get_the_title();
                                    } else{
                                        echo 'Seitentitel';
                                    }
                                ?>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php

$html = ob_get_clean();

return $html ;
	
}