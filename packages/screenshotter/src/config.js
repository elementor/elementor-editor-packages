'use strict';

/**
 * For running this script in local env, it requires to install:
 * zip archive,
 * mysql,
 * wp-cli
 */

const argv = require( 'minimist' )( process.argv.slice( 2 ) );
const config = argv.config && Object.keys( argv.config ).length ? require( argv.config ) : {};

const args = {
	/**
	 * Set DB params for settings
	 */
	db_name: config.db_name ?? 'wordpress_test',
	db_user: config.db_user ?? 'root',
	db_pass: config.db_pass ?? 'root',
	db_host: config.db_host ?? 'localhost',

	/**
	 * Set WP params for settings
	 */
	wp_version: config.wp_version ?? 'latest',
	wp_locale: config.wp_locale ?? 'en_US',
	wp_user: config.wp_user ?? 'test',
	wp_user_pass: config.wp_user_pass ?? 'test',
	wp_user_email: config.wp_user_email ?? 'user@example.org',
	wp_site_name: config.wp_site_name ?? 'test',
	wp_themes: config.theme ?? '',
	wp_plugins: config.plugins ?? {},

	/**
	 * Declare an array of files to import for testing (the name of file must be same as the post_name)
	 */
	files: config.templates ?? [],

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
	 * Set paths to current plugin and his tests directories
	 */
	current_plugin: config.plugin_name ?? '',

	/**
	 * Set paths to current theme and his tests directories
	 */
	current_theme: config.theme_name ?? '',

	/**
	 * Set paths to current plugins and them tests directories
	 */
	test_type: config.test_type ?? '',

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
	 * direct_call_to_clean_local_env (bool) - prevent exit from process when user run only command -> elementor-screenshotter-clean-local-env
	 */
	direct_call_to_clean_local_env: false,
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
args.backstop_dir = `${ args.wp_core_dir }backstop_data`;
args.backstop_ref_dir = `${ args.backstop_dir }/reference`;
args.wp_core_plugins_dir = `${ args.wp_core_dir }wp-content/plugins`;
args.current_plugin_dir = `${ args.wp_core_plugins_dir }/${ args.current_plugin }`;
args.current_plugin_test_dir = `${ args.current_plugin_dir }/tests`;
args.current_plugin_test_ref_dir = `${ args.current_plugin_test_dir }/screenshotter/reference`;
args.current_plugin_test_conf_dir = `${ args.current_plugin_test_dir }/screenshotter/config`;
args.wp_themes_dir = `${ args.wp_core_dir }wp-content/themes`;
args.current_theme_dir = `${ args.wp_themes_dir }/${ args.current_theme }`;
args.current_theme_test_dir = `${ args.current_theme_dir }/tests`;
args.current_theme_test_ref_dir = `${ args.current_theme_test_dir }/screenshotter/reference`;
args.current_theme_test_conf_dir = `${ args.current_theme_test_dir }/screenshotter/config`;
/**
 * Set path to directory of sampled image to compare (before compare with backstop)
 */
args.current_plugin_test_screenshotter_dir = `${ args.current_plugin_test_dir }/screenshotter`;
args.current_theme_test_screenshotter_dir = `${ args.current_theme_test_dir }/screenshotter`;

module.exports = args;
