'use strict';

/**
 * For running this script in local env, it requires to install:
 * zip archive
 * mysql
 * wp-cli
 */

const argv = require( 'minimist' )( process.argv.slice( 2 ) );

const args = {
	/**
	 * Set DB params for settings
	 */
	db_name: argv.db_name ?? 'wordpress_test',
	db_user: argv.db_user ?? 'root',
	db_pass: argv.db_pass ?? 'root',
	db_host: argv.db_host ?? 'localhost',

	/**
	 * Set WP params for settings
	 */
	wp_version: argv.wp_version ?? 'latest',
	wp_locale: argv.wp_locale ?? 'en_US',
	wp_user: argv.wp_user ?? 'test',
	wp_user_pass: argv.wp_user_pass ?? 'test',
	wp_user_email: argv.wp_user_email ?? 'user@example.org',
	wp_site_name: argv.wp_site_name ?? 'test',
	wp_themes: argv.wp_themes ?? 'hello-elementor',
	wp_plugins: argv.wp_plugins ?? 'elementor',

	/**
	 * Declare an array of files to import for testing (the name of file must be same as the post_name)
	 */
	files: argv.files ?? [ 'buttons', 'dividers', 'global-settings', 'headings', 'icons', 'icons-box', 'icons-list', 'page-17', 'social-icons', 'testimonials', 'text-editor' ],

	/**
	 * Save the current working directory in an environment variable.
	 */
	initial_working_directory: process.cwd(),

	/**
	 * Set paths to directories where to install.
	 */
	wp_tests_dir: '/tmp/wordpress-tests-lib',
	wp_core_dir: '/tmp/wordpress/',

	/**
	 * Set paths to current plugins and them tests directories
	 */
	current_plugin: argv.current_plugin ?? 'elementor',

	/**
	 * debug (bool) - determine if running with basic msg like info|warning|error|success
	 */
	debug: argv.debug ?? false,
	/**
	 * deepDebug (bool) - determine if running with deep information msg like info|warning|error|success && error like status|stderr|stdout
	 */
	deepDebug: argv.deepDebug ?? false,

	/**
	 * reference (bool) - determine if backstopjs running with reference
	 */
	reference: argv.reference ?? false,

	/**
	 * clean_local_env (bool) - decided if needed to clean local env
	 */
	clean_local_env: argv.clean_local_env ?? false,
	/**
	 * test_as_device (string) - image compare run test as device (desktop|tablet|mobile|any other)
	 */
	test_as_device: argv.db_name ?? 'desktop',
	/**
	 * request_params (object) - save all params from user request
	 */
	request_params: argv,
};

/**
 * Add more directories paths for test
 */
args.backstop_dir = `${args.wp_core_dir}backstop_data`;
args.backstop_ref_dir = `${args.backstop_dir}/reference`;
args.wp_core_plugins_dir = `${args.wp_core_dir}wp-content/plugins`;
args.current_plugin_dir = `${args.wp_core_dir}wp-content/plugins/${args.current_plugin}`;
args.current_plugin_test_dir = `${args.current_plugin_dir}/tests`;
args.current_plugin_test_ref_dir = `${args.current_plugin_test_dir}/screenshotter/reference`;
args.current_plugin_test_conf_dir = `${args.current_plugin_test_dir}/screenshotter/config`;
/**
 * Set path to directory of sampled image to compare (before compare with percy)
 */
args.current_plugin_test_wp_ss_dir = `${args.current_plugin_test_dir}/screenshotter`;

module.exports = args;
