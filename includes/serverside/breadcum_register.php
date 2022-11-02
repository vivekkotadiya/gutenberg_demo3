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
    global $post;
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
                        
                            <?php 
                                $homeLink = esc_url(home_url('/'));
                                $pageid = get_the_ID();
                                $delimiter = '<span class="separator">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="10px" viewBox="0 0 59.414 59.414" fill="#3F3F3F" xml:space="preserve">
<polygon points="15.561,0 14.146,1.414 42.439,29.707 14.146,58 15.561,59.414 45.268,29.707 "/>
<g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>';
                                $home = esc_html__('Home', 'tabler');
                                $before = '<li class="active">';
                                $after = '</li>';
                                $showCurrent = 1;
                                if (is_home() && !is_front_page()) { ?>

                                    <ul class="breadcrumb"><li><a href="<?php echo esc_url($homeLink); ?>" class="bread-link bread-home"><?php echo  $home; ?></a><?php echo  $delimiter; ?><li class="active"><?php echo  get_the_title($pageid); ?></li></ul>';
                        
                                <?php } elseif(is_home()) { ?>
                                    <ul class="breadcrumb"><li class="active"><?php echo $home; ?></li></ul>
                                <?php }
                        
                                else { ?>
                        
                                    <ul class="breadcrumb"><li><a href="<?php echo esc_url($homeLink); ?>"><?php echo  $home; ?></a></li><?php echo $delimiter; ?>
                        
                                    <?php if ( is_category() || ( class_exists( 'WooCommerce' ) && is_product_category() ) ) {

                                        $thisCat = get_category(get_query_var('cat'), false);
                                        if (isset($thisCat->parent) && $thisCat->parent != 0) ?>
                                            <li><?php echo get_category_parents($thisCat->parent, TRUE, ' ' . '</li>'.$delimiter); ?>
                                        <?php echo $before . single_cat_title('', false) . $after; 
                        
                                    } elseif ( is_search() ) { ?>

                                        <?php echo $before . esc_html__('Search results for ', 'tabler') . '"' . get_search_query() . '"' . $after;
                        
                                    } elseif ( is_day() ) {  ?>

                                        <li><a href="<?php echo get_year_link(get_the_time('Y')); ?>"><?php echo get_the_time('Y'); ?></a></li><?php echo $delimiter; ?>
                                        <li><a href="<?php echo get_month_link(get_the_time('Y'),get_the_time('m')); ?>"><?php echo get_the_time('F'); ?></a></li><?php echo $delimiter; ?>
                                        <?php echo $before . get_the_time('d') . $after;
                        
                                    } elseif ( is_month() ) {  ?>

                                        <li><a href="<?php echo get_year_link(get_the_time('Y')); ?>"><?php echo get_the_time('Y'); ?></a></li><?php echo $delimiter; ?>
                                        <?php echo $before . get_the_time('F') . $after; 
                        
                                    } elseif ( is_year() ) { ?>

                                        <?php echo $before . get_the_time('Y') . $after;
                        
                                    } elseif ( class_exists( 'WooCommerce' ) && is_singular('product') ){

                                        $shop_id      = get_option('woocommerce_shop_page_id');
                                        $product      = wc_get_product( get_the_ID() );
                                        $categories   = ! empty( $product ) ? wc_get_product_category_list( $product->get_id(), ', ' ) : '';
                            
                                        if ( ! empty( $shop_id ) && $shop_id !== -1 ) { ?>
                                            <li><a href="<?php echo get_permalink( $shop_id ); ?>"><?php echo get_the_title( $shop_id ); ?></a></li><?php echo $delimiter;
                                        }
                            
                                        if ( ! empty( $categories ) ) { ?>
                                            <li><?php echo $categories; ?></li><?php echo $delimiter;
                                        }
                        
                                        echo $before . get_the_title() . $after;
                        
                                    } elseif ( is_single() && !is_attachment() ) {

                                        if ( get_post_type() != 'post' ) {
                                            $post_type = get_post_type_object(get_post_type());
                                            $slug = $post_type->rewrite;
                                            echo $before . get_the_title() . $after;
                        
                        
                                        } else {
                                            $cat = get_the_category(); $cat = $cat[0];
                                            $cats = get_category_parents($cat, TRUE, ' ' . $delimiter);
                                            $html .= $cats;
                                            echo $before . get_the_title() . $after;
                                        }
                        
                                    }  elseif ( is_attachment() && !$post->post_parent ) {

                                        if ($showCurrent == 1) $html .= $before . get_the_title() . $after;
                        
                                    } elseif ( is_attachment() ) {

                                        $parent = get_post($post->post_parent);
                                        $cat = get_the_category($parent->ID);
                                        if($cat) {
                                            $cat = $cat[0]; ?>
                                            <li><?php echo get_category_parents($cat, TRUE, ' ' . '</li>'.$delimiter); ?>
                                        <?php } ?>
                                        <li><a href="<?php echo get_permalink($parent); ?>"><?php echo $parent->post_title; ?></a></li>
                                        <?php echo $delimiter . $before . get_the_title() . $after;
                        
                                    } elseif ( is_page() && !$post->post_parent ) {
                                        
                                        echo $before . get_the_title() . $after;
                        
                                    } elseif ( is_page() && $post->post_parent ) {
                                        
                                        $parent_id  = $post->post_parent;
                                        $breadcrumbs = array();
                                        while ($parent_id) {
                                            $page = get_page($parent_id);
                                            $breadcrumbs[] = '<li><a href="' . get_permalink($page->ID) . '">' . get_the_title($page->ID) . '</a></li>';
                                            $parent_id  = $page->post_parent;
                                        }
                                        $breadcrumbs = array_reverse($breadcrumbs);
                                        for ($i = 0; $i < count($breadcrumbs); $i++) {
                                            echo $breadcrumbs[$i];
                                            if ($i != count($breadcrumbs)-1) 
                                                echo ' ' . $delimiter;
                                        }
                                        echo $delimiter . $before . get_the_title() . $after;
                        
                                    } elseif ( is_tag() ) {

                                        echo $before . esc_html__('Posts tagged ','tabler') .'"' . single_tag_title('', false) . '"' . $after;
                        
                                    } elseif ( is_author() ) {

                                        global $authordata;
                                        echo $before . esc_html__('Articles posted by ','tabler') . $authordata->display_name . $after;
                        
                                    } elseif ( is_404() ) {

                                        echo $before . 'Error 404' . $after;

                                    } elseif( class_exists( 'WooCommerce' ) && is_shop()){

                                        $shop_id = get_option('woocommerce_shop_page_id');
                                        echo $before .  get_the_title($shop_id) . $after;

                                    }
                        
                                    if ( get_query_var('paged') ) {
                        
                                        echo $before . " (" . esc_html__('Page', 'tabler') . ' ' . get_query_var('paged') . ")" . $after;
                        
                                    } ?>
                        
                                    </ul>
                        
                                <?php }
                            ?>
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