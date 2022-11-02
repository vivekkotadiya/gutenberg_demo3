<?php
/**
 * Load assets for our blocks.
 *
 * @package TbBlocks
 */



// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load general assets for our blocks.
 *
 * @since 1.0.0
 */
class TbBlocks_Block_Assets {


	/**
	 * This plugin's instance.
	 *
	 * @var TbBlocks_Block_Assets
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return TbBlocks_Block_Assets
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new TbBlocks_Block_Assets();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) ); 
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'frontend_only_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'cf7_optimize_equeues' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'cf7_optimize_equeues' ) );
	}

	/**
	 * Loads the asset file for the given script or style.
	 * Returns a default if the asset file is not found.
	 *
	 * @param string $filepath The name of the file without the extension.
	 *
	 * @return array The asset file contents.
	 */
	public function get_asset_file( $filepath ) {
		$asset_path = TbBlocks_PLUGIN_DIR . $filepath . '.asset.php';

		return file_exists( $asset_path )
			? include $asset_path
			: array(
				'dependencies' => array(),
				'version'      => TbBlocks_VERSION,
			);
	}

		/**
	 * Enqueue scripts that should only be available on the front end
	 */
	public function frontend_only_scripts() {
		$name       = 'tbblocks-main';
		$filepath   = 'dist/js/' . $name;
		$asset_file = $this->get_asset_file( $filepath );

		wp_enqueue_script(
			'tbblocks-frontend',
			TbBlocks_PLUGIN_URL . $filepath . '.js',
			 $asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {

		// Styles.
		$name       = 'style-tbblocks-1';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );
		


		wp_enqueue_style(
			'tbblocks-frontend',
			TbBlocks_PLUGIN_URL . $filepath . '.css',
			array(),
			$asset_file['version']
		);
		
	}

	

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {

		// Styles.
		$name       = 'tbblocks-1';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file( $filepath );

        global $pagenow;
	
		wp_enqueue_style(
			'tbblocks-editor',
			TbBlocks_PLUGIN_URL . $filepath  . '.css',
			array(),
			$asset_file['version']
		);

		
		
		foreach ( glob( TbBlocks_PLUGIN_DIR . 'dist/tbblocks-*.js' ) as $file ) {

			$name = str_replace( '.js', '', basename( $file ) ); // TbBlocks-1.

			if ( ! preg_match( '/tbblocks-\d+/', $name ) ) {
				continue;
			}

			$filepath   = 'dist/' . $name;
			$asset_file = $this->get_asset_file( $filepath );

			// Prevent wp-editor from loading on the widgets.php page.
			if ( 'widgets.php' === $pagenow ) {
				$script_key = array_search( 'wp-editor', $asset_file['dependencies'], true );

				if ( false !== $script_key ) {
					unset( $asset_file['dependencies'][ $script_key ] );
				}
			}

			 
			wp_enqueue_script(
				$name,
				TbBlocks_PLUGIN_URL . $filepath . '.js',
				array_merge( $asset_file['dependencies'], array( 'wp-api') ),
				$asset_file['version'],
				true
			);
		}

	}

    	/**
	 * Determine if the given post content contains any Tbblocks blocks
	 *
	 * @access public
	 * @since  2.14.2
	 * @param  WP_Post $post_object Post object.
	 *
	 * @return boolean True when post content contains a Tbblocks block.
	 */
	public function has_TbBlocks_block( WP_Post $post_object ) {

		return ! empty(
			array_filter(
				array(
					false !== strpos( $post_object->post_content, '<!-- wp:tbblocks/' ),
					has_block( 'core/block', $post_object ),
					has_block( 'core/button', $post_object ),
					has_block( 'core/cover', $post_object ),
					has_block( 'core/heading', $post_object ),
					has_block( 'core/image', $post_object ),
					has_block( 'core/gallery', $post_object ),
					has_block( 'core/list', $post_object ),
					has_block( 'core/paragraph', $post_object ),
					has_block( 'core/pullquote', $post_object ),
					has_block( 'core/quote', $post_object ),
				)
			)
		);

	}

	/**
	 * Return whether a post type should display the Block Editor.
	 *
	 * @param string $post_type The post_type slug to check.
	 */
	protected function is_post_type_gutenberg( $post_type ) {
		return use_block_editor_for_post_type( $post_type );
	}

	/**
	 * Return whether the page we are on is loading the Block Editor.
	 */
	protected function is_page_gutenberg() {
		if ( ! is_admin() ) {
			return false;
		}

		$admin_page = isset( $_SERVER['REQUEST_URI'] ) ? wp_basename( esc_url_raw( filter_var( wp_unslash( $_SERVER['REQUEST_URI'] ), FILTER_SANITIZE_URL ) ) ) : false;

		if ( ! $admin_page ) {
			return false;
		}

		if ( false !== strpos( $admin_page, 'post-new.php' ) && empty( $_GET['post_type'] ) ) {
			return true;
		}

		if ( false !== strpos( $admin_page, 'post-new.php' ) && isset( $_GET['post_type'] ) && $this->is_post_type_gutenberg( filter_input( INPUT_GET, wp_unslash( $_GET['post_type'] ), FILTER_UNSAFE_RAW ) ) ) {
			return true;
		}

		if ( false !== strpos( $admin_page, 'post.php' ) && isset( $_GET['post'] ) ) {
			$wp_post = get_post( filter_input( INPUT_GET, wp_unslash( $_GET['post'] ), FILTER_UNSAFE_RAW ) );
			if ( isset( $wp_post ) && isset( $wp_post->post_type ) && $this->is_post_type_gutenberg( $wp_post->post_type ) ) {
				return true;
			}
		}

		if ( false !== strpos( $admin_page, 'revision.php' ) && isset( $_GET['revision'] ) ) {
			$wp_post     = get_post( filter_input( INPUT_GET, wp_unslash( $_GET['revision'] ), FILTER_UNSAFE_RAW ) );
			$post_parent = get_post( $wp_post->post_parent );
			if ( isset( $post_parent ) && isset( $post_parent->post_type ) && $this->is_post_type_gutenberg( $post_parent->post_type ) ) {
				return true;
			}
		}
		return false;
	}

	public function cf7_optimize_equeues(){
		global  $post;

		if( !class_exists( 'WPCF7' ) || !$post ) {
			return;
		}
	
		wp_dequeue_style('contact-form-7');
		wp_dequeue_script('contact-form-7');
	
	
		if ( has_blocks( $post->post_content ) ) {
			
			$blocks = parse_blocks( $post->post_content );
			
			foreach ($blocks as $key => $block){
				
				foreach( $block['innerBlocks'] as $key => $bk ){
					
					if( strpos( $bk['innerBlocks'][0]['innerBlocks'][0]['blockName'], 'tbblocks/contactform') !== false ){
						
						wp_enqueue_style('contact-form-7');
						wp_enqueue_script('contact-form-7');
	
						return;
					}
				}
				
			}
		}
	}
}

TbBlocks_Block_Assets::register();
