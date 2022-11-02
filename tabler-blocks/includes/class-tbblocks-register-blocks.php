<?php
/**
 * Register blocks.
 *
 * @package TbBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load registration for our blocks.
 *
 * @since 1.6.0
 */
class TbBlocks_Register_Blocks {


	/**
	 * This plugin's instance.
	 *
	 * @var TbBlocks_Register_Blocks
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return TbBlocks_Register_Blocks
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new TbBlocks_Register_Blocks();
		}

		return self::$instance;
	}

	/**
	 * The Plugin slug.
	 *
	 * @var string $slug
	 */
	private $slug;

	/**
	 * The Constructor.
	 */
	public function __construct() {
		$this->slug = 'tbblocks';

		add_action( 'init', array( $this, 'register_blocks' ), 99 );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function register_blocks() {

		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Shortcut for the slug.
		$slug = $this->slug;

		register_block_type(
			'tbblocks/header',
			array(
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend'
		
			)
		);
		register_block_type(
			'tbblocks/footer',
			array(
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend'
		
			)
		);
		register_block_type(
			'tbblocks/section',
			array(
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend'
		
			)
		);
		register_block_type(
			'tbblocks/row',
			array(
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend'
		
			)
		);
		register_block_type(
			'tbblocks/column',
			array(
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend'
		
			)
		);

	}
}

TbBlocks_Register_Blocks::register();
