<?php
/**
 * Plugin Name: Blocks Grid Builder For Bootstrap
 * Plugin URI:
 * Description: Bootstrap Grid Columns Builder With Modern GUI
 * Author: BeSquares
 * Author URI: https://besquares.net
 * Version: 1.0.2
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package blocks-grid-builder-for-bootstrap
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
define( 'BOOTSTRAP_GRID_BUILDER_DIR',  plugin_dir_path( __FILE__ ) );
define( 'BOOTSTRAP_GRID_BUILDER_URL',  plugin_dir_url( __FILE__ ) );

require_once BOOTSTRAP_GRID_BUILDER_DIR . 'src/init.php';

