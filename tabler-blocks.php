<?php
/**
 * Plugin Name:       Tabler Blocks
 * Description:       Gutenburg Blocks
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Expert
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tbblocks
 *
 * @package tbblocks
 */


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TbBlocks_VERSION', '1.0.0' );
define( 'TbBlocks_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'TbBlocks_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'TbBlocks_PLUGIN_FILE', __FILE__ );
define( 'TbBlocks_PLUGIN_BASE', plugin_basename( __FILE__ ) );
define( 'TbBlocks_API_NAMESPACE', 'tbblocks' );

if ( ! class_exists( 'TbBlocks' ) ) :
	/**
	 * Main TbBlocks Class.
	 *
	 * @since 1.0.0
	 */
	final class TbBlocks {
		/**
		 * This plugin's instance.
		 *
		 * @var TbBlocks
		 * @since 1.0.0
		 */
		private static $instance;

		/**
		 * Main TbBlocks Instance.
		 *
		 * Insures that only one instance of TbBlocks exists in memory at any one
		 * time. Also prevents needing to define globals all over the place.
		 *
		 * @since 1.0.0
		 * @static
		 * @return object|TbBlocks The one true TbBlocks
		 */
		public static function instance() {
			if ( ! isset( self::$instance ) && ! ( self::$instance instanceof TbBlocks ) ) {
				self::$instance = new TbBlocks();
				self::$instance->init();
				self::$instance->includes();
			}
			return self::$instance;
		}

		/**
		 * Throw error on object clone.
		 *
		 * The whole idea of the singleton design pattern is that there is a single
		 * object therefore, we don't want the object to be cloned.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __clone() {
			// Cloning instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'TbBlocks' ), '1.0' );
		}

		/**
		 * Disable unserializing of the class.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __wakeup() {
			// Unserializing instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Something went wrong.', 'TbBlocks' ), '1.0' );
		}

		/**
		 * Include required files.
		 *
		 * @access private
		 * @since 1.0.0
		 * @return void
		 */
		private function includes() {
			
			require_once TbBlocks_PLUGIN_DIR . 'includes/class-tbblocks-block-assets.php';
			require_once TbBlocks_PLUGIN_DIR . 'includes/class-seo-feilds-register.php';
			require_once TbBlocks_PLUGIN_DIR . 'includes/class-tbblocks-register-blocks.php';

			/**
			 * Server side Blocks Includes
			 */

			require_once TbBlocks_PLUGIN_DIR . 'includes/serverside/postcontent_register.php';
			require_once TbBlocks_PLUGIN_DIR . 'includes/serverside/navigation_register.php';
			require_once TbBlocks_PLUGIN_DIR . 'includes/serverside/breadcum_register.php';
			
			
		}

		/**
		 * Load actions
		 *
		 * @return void
		 */
		private function init() {
			add_action( 'plugins_loaded', array( $this, 'load_textdomain' ), 99 );
			add_action( 'enqueue_block_editor_assets', array( $this, 'block_localization' ) );	
			
			
		}

	
		
		

		/**
		 * Returns URL to the asset path.
		 *
		 * @param string $path Any extra directories needed.
		 */
		public function asset_source( $path = null ) {
			return TbBlocks_PLUGIN_URL . trailingslashit( path_join( 'dist', $path ) );
		}

			/**
		 * Loads the plugin language files.
		 *
		 * @access public
		 * @since 1.0.0
		 * @return void
		 */
		public function load_textdomain() {
			load_plugin_textdomain( 'tbblocks', false, basename( TbBlocks_PLUGIN_DIR ) . '/languages' );
		}

			/**
		 * Enqueue localization data for our blocks.
		 *
		 * @access public
		 */
		public function block_localization() {
			if ( function_exists( 'wp_set_script_translations' ) ) {
				wp_set_script_translations( 'tbblocks-editor', 'tbblocks', TbBlocks_PLUGIN_DIR . '/languages' );
			}
		}

	}
endif;



/**
 * The main function for that returns TbBlocks
 *
 * The main function responsible for returning the one true TbBlocks
 * Instance to functions everywhere.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * Example: <?php $tbblocks = TbBlocks(); ?>
 *
 * @since 1.0.0
 * @return object|TbBlocks The one true TbBlocks Instance.
 */
function TbBlocks() {
	return TbBlocks::instance();
}

// Get the plugin running. Load on plugins_loaded action to avoid issue on multisite.
if ( function_exists( 'is_multisite' ) && is_multisite() ) {
	add_action( 'plugins_loaded', 'TbBlocks', 90 );
} else {
	TbBlocks();
}

