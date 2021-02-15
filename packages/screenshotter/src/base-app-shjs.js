'use strict';

/**
 * Class BaseApp represent the base functionality of app
 */
class BaseAppShJs {
	constructor() {
		this.args = require( './config' );
		this.helpers = require( './helpers' );
		this.process = require( 'process' );
		this.shell = require( 'shelljs' );
		this.childProc = null;
		this.isRunningkillServerProcess = false;
		this.basicActionsBeforeInstall();
	}

	/**
	 * Starter function
	 * Check if dependencies packages exsits, else install them
	 */
	basicActionsBeforeInstall() {
		if ( ! this.args.direct_call_to_clean_local_env ) {
			/**
			 * @todo: the below condition can be a problem because config must included one of arguments: "theme" or "plugin".
			 *        also it's blocked command : elementor-screenshotter-clean-local-env. for fix that add new argument to condition : !this.args.direct_call_to_clean_local_env && ...
			 */
			const testPlugin = ( ! this.args.direct_call_to_clean_local_env && 'plugin' === this.args.test_type && ( ! this.args.current_plugin.length || ! Object.keys( this.args.wp_themes ).length ) );
			const testTheme = ( ! this.args.direct_call_to_clean_local_env && 'theme' === this.args.test_type && ( ! Object.keys( this.args.wp_plugins ).length || ! this.args.current_theme.length ) );
			// Exit from process if missing config file or arguments: "pluginName" or "theme" is empty
			if ( testPlugin ) {
				this.helpers.printMsg( 'error', 'Error: the arguments: "name" or "theme" is empty. please check ./tests/screenshotter/config.js' );
				this.process.exit( 1 );
			}
			if ( testTheme ) {
				this.helpers.printMsg( 'error', 'Error: the arguments: "plugins" or "theme_name" is empty. please check ./tests/screenshotter/config.js' );
				this.process.exit( 1 );
			}
		}

		this.helpers.createFolder( this.args.wp_core_dir );
		this.shell.cd( this.args.wp_core_dir );

		// Get information for debug state
		this.helpers.printMsg( 'info', `basicActionsBeforeInstall - ${ this.shell.pwd() }` );

		this.helpers.execShelljs( 'node -v' );
		this.helpers.execShelljs( 'npm -v' );
	}

	/**
	 * Download and install wp-cli
	 */
	installWpCli() {
		this.shell.cd( this.args.wp_core_dir );

		// Get information for debug state
		this.helpers.printMsg( 'info', `installWpCli - ${ this.shell.pwd() }` );

		// Download and install wp-cli
		this.helpers.execShelljs( `curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar` );
		// Set the permissions to make it executable
		this.helpers.execShelljs( 'chmod +x wp-cli.phar' );
		this.helpers.execShelljs( 'mv wp-cli.phar /usr/local/bin/wp' );
		// Get information for debug state
		this.helpers.execShelljs( 'wp --info' );
	}

	/**
	 * Download the WordPress core files (--skip-plugins - Download WP without the default plugins)
	 */
	downloadWpCore() {
		// Get information for debug state
		this.helpers.printMsg( 'info', `downloadWpCore - ${ this.shell.pwd() }` );

		this.helpers.execShelljs( `wp core download --locale="${ this.args.wp_locale }" --version="${ this.args.wp_version }" --skip-plugins` );
	}

	/**
	 * Create the wp-config file
	 */
	config() {
		// Get information for debug state
		this.helpers.printMsg( 'info', `config - ${ this.shell.pwd() }` );

		this.helpers.execShelljs( `wp config create --dbname="${ this.args.db_name }" --dbuser="${ this.args.db_user }" --dbpass="${ this.args.db_pass }"` );
	}

	/**
	 * Create database and install wp
	 */
	install() {
		// Get information for debug state
		this.helpers.printMsg( 'info', `install - ${ this.shell.pwd() }` );

		// Create database
		this.helpers.execShelljs( 'wp db create' );

		// Parse db_host for port or socket references
		const parts = this.args.db_host.split( ':' );
		const dbHostname = parts[ 0 ];
		const dbSockOrPort = parts[ 1 ];
		let extra = '';

		if ( dbHostname && dbHostname.length ) {
			if ( dbSockOrPort && dbSockOrPort.length ) {
				extra = `--host=${ dbHostname } --port=${ dbSockOrPort } --protocol=tcp`;
			} else if ( dbSockOrPort && dbSockOrPort.length ) {
				extra = `--socket=${ dbSockOrPort }`;
			} else if ( dbHostname && dbHostname.length ) {
				extra = `--host=${ dbHostname } --protocol=tcp`;
			}
		}

		// Optimizes the database
		this.helpers.execShelljs( `wp db optimize --dbuser="${ this.args.db_user }" --dbpass="${ this.args.db_pass }" ${ extra }` );

		// Install WordPress
		this.helpers.execShelljs( `wp core install --url="${ this.args.db_host }" --title="${ this.args.wp_site_name }" --admin_user="${ this.args.wp_user }" --admin_password="${ this.args.wp_user_pass }" --admin_email="${ this.args.wp_user_email }"` );
	}

	/**
	 * Install and activate plugins
	 */
	installPlugins() {
		// Get information for debug state
		this.helpers.printMsg( 'info', `installPlugins - ${ this.shell.pwd() }` );

		// Create plugins folder
		this.helpers.createFolder( this.args.wp_core_plugins_dir );
		if ( this.helpers.hasFolder( this.args.wp_core_plugins_dir ) ) {

			if ( 'plugin' === this.args.test_type ) {
				if ( Object.keys( this.args.wp_plugins ).length ) {
					const cpInitialWorkingDirectoryFolder = this.shell.cp( '-R', this.args.initial_working_directory, this.args.current_plugin_dir );
					if ( 0 === cpInitialWorkingDirectoryFolder.code ) {
						this.helpers.printMsg( 'success', `copy initial working directory folder from ${this.args.initial_working_directory} to ${this.args.current_plugin_dir}` );
					}
				} else {
					// Create symlink to current path
					const symlink = this.shell.ln( '-sf', this.args.initial_working_directory, this.args.current_plugin_dir );
					if ( symlink ) {
						this.helpers.printMsg( 'success', `created symlink ${this.args.initial_working_directory}   ${this.args.current_plugin_dir}` )
					}
				}
			}

			// Activate plugins (this plugins can be anything or dependencies)
			if ( Object.keys( this.args.wp_plugins ).length ) {
				// Install plugins and activate
				for ( const [ plugin, version ] of Object.entries( this.args.wp_plugins ) ) {
					// Install specific version, otherwise last version
					const ver = version.length ? `--version='${ version }'` : '';
					this.helpers.execShelljs( `wp plugin install '${ plugin }' ${ ver } --activate --force` );
				}
			} else {
				this.helpers.printMsg( 'info', 'Info: there is no plugins to install. please check variable called: "plugins" on path ./tests/screenshotter/config.js' );
			}

			if ( this.args.current_plugin ) {
				// Activate current plugin (where the PR append)
				this.helpers.execShelljs( `wp plugin activate "${this.args.current_plugin}"` );
			} else {
				this.helpers.printMsg( 'info', 'Info: there is no plugin to install. please check variable called: "name" on path ./tests/screenshotter/config.js' );
			}
		}
	}

	/**
	 * Install and activate themes
	 */
	installThemes() {
		// Get information for debug state
		this.helpers.printMsg( 'info', `installThemes - ${ this.shell.pwd() }` );

		if ( 'theme' === this.args.test_type ) {
			if ( Object.keys( this.args.wp_themes ).length ) {
				const cpInitialWorkingDirectoryFolder = this.shell.cp( '-R', this.args.initial_working_directory, this.args.current_theme_dir );
				if ( 0 === cpInitialWorkingDirectoryFolder.code ) {
					this.helpers.printMsg( 'success', `copy initial working directory folder from ${this.args.initial_working_directory}/${this.args.current_theme} to ${this.args.current_theme_dir}` );
				}
			} else {
				// Create symlink to current path
				const symlink = this.shell.ln( '-sf', `${this.args.initial_working_directory}/${this.args.current_theme}`, this.args.current_theme_dir );
				if ( symlink ) {
					this.helpers.printMsg( 'success', `created symlink ${this.args.initial_working_directory}/${this.args.current_theme}   ${this.args.current_theme_dir}` )
				}
			}
		}

		if ( Object.keys( this.args.wp_themes ).length ) {
			// Install the theme
			for ( const [ theme, version ] of Object.entries( this.args.wp_themes ) ) {
				// Install specific version, otherwise last version
				const ver = version.length ? `--version='${ version }'` : '';
				this.helpers.execShelljs( `wp theme install "${ theme }" ${ ver } --activate --force` );
			}
		} else {
			this.helpers.printMsg( 'info', 'Info: there is no themes to install. please check variable called: "themes" on path ./tests/screenshotter/config.js' );
		}

		if ( this.args.current_theme ) {
			// Activate current theme (where the PR append)
			this.helpers.execShelljs( `wp theme activate "${ this.args.current_theme }"` );
		} else {
			this.helpers.printMsg( 'info', 'Info: there is no theme to install. please check variable called: "theme_name" on path ./tests/screenshotter/config.js' );
		}
	}

	/**
	 * Import templates
	 */
	importTestTemplates() {
		this.shell.cd( this.args.wp_core_dir );

		// Get information for debug state
		this.helpers.printMsg( 'info', `importTestTemplates - ${ this.shell.pwd() }` );
		if ( this.args.files.length ) {
			for ( const file of this.args.files ) {
				if ( 'theme' === this.args.test_type ) {
					this.args.current_plugin_test_conf_dir = this.args.current_theme_test_conf_dir;
				}
				// Import elementor json template to db
				this.helpers.execShelljs( `wp elementor library import "${this.args.current_plugin_test_conf_dir}/${file}.json" --user="${this.args.wp_user}"` );
				// Extract the template id from given string and update the pot_type of post to 'page'
				const templateID = this.helpers.execShelljs( `wp db query "SELECT id FROM wp_posts WHERE post_name='${ file }' ORDER BY 'id' ASC LIMIT 1;"` ).toString().replace( /[^0-9]/g, '' );
				this.helpers.execShelljs( `wp db query "UPDATE wp_posts SET post_type='page' WHERE id='${ templateID }';"` );

				// Get information for debug state
				this.helpers.execShelljs( `wp db query "SELECT id,post_title,post_name,post_type,post_status,post_date FROM wp_posts WHERE id='${ templateID }';"` );
			}
		} else {
			this.helpers.printMsg( 'error', 'Error: there is no file(s) to import.' );
		}
		// Clear (elementor) css cache
		this.helpers.execShelljs( 'wp elementor flush-css' );
	}

	/**
	 * Run build
	 */
	runBuild() {
		this.shell.cd( this.args.current_plugin_dir );

		// Get information for debug state
		this.helpers.printMsg( 'info', `runBuild - ${ this.process.cwd() }` );

		this.buildByTestType( this.helpers.hasFolder( this.args.current_plugin_dir ) );

		if ( 'theme' === this.args.test_type ) {
			this.shell.cd( this.args.current_theme_dir );
			this.buildByTestType( this.helpers.hasFolder( this.args.current_theme_dir ) );
		}
	}

	buildByTestType( hasFolder ) {
		if ( hasFolder ) {
			if ( ! this.helpers.isInstalledPackage( 'grunt-cli' ) ) {
				const gruntIsInstalled = this.helpers.execShelljs( 'npm i grunt-cli' );
				if ( false === gruntIsInstalled ) {
					return this.runBuild();
				}
			}
			if ( this.helpers.isInstalledPackage( 'grunt-cli' ) ) {
				// Get information for debug state
				this.helpers.printMsg( 'info', `grunt installed - ${ this.shell.pwd() }` );
				// Npm install && run Build
				this.helpers.execShelljs( 'npm i && grunt' );
			}
		}
	}

	/**
	 * Run wp server (php -S) and save the proccess in backgorund
	 */
	runWpServer() {
		this.shell.cd( this.args.wp_core_dir );

		// Get information for debug state
		this.helpers.printMsg( 'info', `runWpServer - ${ this.shell.pwd() }` );

		// Rewrite url structure
		this.helpers.execShelljs( 'wp rewrite structure "/%postname%/"' );

		// Launches PHP's built-in web server run on port 80 (for multisite)
		const spawn = require( 'child_process' ).spawn;

		this.childProc = spawn( 'wp server', [], {
			detached: true,
			shell: true,
			stdio: "ignore"
		} );

		// Get information for debug state
		this.helpers.execShelljs( 'wp db check' );
		this.helpers.execShelljs( 'wp config list' );
	}

	/**
	 * Compare samples images by takes screenshots of web pages from (headless) browser
	 */
	testScreenshots() {
		this.shell.cd( this.args.wp_core_dir );

		// Get information for debug state
		this.helpers.printMsg( 'info', `testScreenshots - ${ this.shell.pwd() }` );

		// Create directory called 'reference'
		this.helpers.createFolder( this.args.backstop_ref_dir );

		if ( ! this.args.reference ) {
			if ( 'theme' === this.args.test_type ) {
				this.args.current_plugin_test_ref_dir = this.args.current_theme_test_ref_dir;
			}
			// Copy paste to path
			const cpReferenceFolder = this.shell.cp( '-R', this.args.current_plugin_test_ref_dir, this.args.backstop_dir );
			if ( 0 === cpReferenceFolder.code ) {
				this.helpers.printMsg( 'success', `copy reference folder from ${ this.args.current_plugin_test_ref_dir } to ${ this.args.backstop_dir }` );
			}
		}

		if ( 'theme' === this.args.test_type ) {
			this.args.current_plugin_test_screenshotter_dir = this.args.current_theme_test_screenshotter_dir;
		}

		/**
		 * @todo check the problem with node js and don't install node v15+ (backstopjs checked and working good with node v14.5.1)
		 *       attention - sometimes backstopjs doesn't installed pupeteer as well
		 *       in this case go to '/usr/local/lib/node_modules/backstopjs' and delete backstopjs package manually and install it again.
		 */
		if ( this.args.reference ) {
			// The below two command running backstop directly
			this.helpers.execShelljs( `node ${ __dirname }/../node_modules/backstopjs/cli/index.js reference --config="${ this.args.current_plugin_test_screenshotter_dir }/backstop.js"` );
		}

		const backstopResult = this.helpers.execShelljs( `node "${ __dirname }/../node_modules/backstopjs/cli/index.js" test --config="${ this.args.current_plugin_test_screenshotter_dir }/backstop.js"` );

		if ( false === backstopResult ) {
			process.exit( 1 );
		} else {
			process.exit( 0 );
		}
	}

	/************************************************************************************************
	 ************************* The Below functions Clean The Local Tests Env ************************
	 ************************************************************************************************/

	/**
	 * Deletes the existing database
	 */
	deleteDB() {
		this.shell.cd( this.args.wp_core_dir );
		this.helpers.execShelljs( `wp db drop --yes` );
	}

	/**
	 * Clears the internal cache
	 */
	wpCliCacheClear() {
		this.shell.cd( this.args.wp_core_dir );
		this.helpers.execShelljs( `wp cli cache clear` );
	}

	/**
	 * Delete symlink if exists
	 */
	deleteSymlink() {
		const checkIsSymlink = this.helpers.isSymlink( `${ this.args.current_plugin_dir }` );
		if ( checkIsSymlink ) {
			this.helpers.unlink( `${ this.args.current_plugin_dir }` );
		}
	}

	/**
	 * Delete all installed directories and all its contents, including any subdirectories and files
	 */
	deleteTheInstalledDirectories() {
		// Delete the directory and all its contents, including any subdirectories and files by ${path}
		this.helpers.deleteFolder( `${ this.args.wp_core_dir }` );
		this.helpers.deleteFolder( `${ this.args.wp_tests_dir }` );
		this.helpers.deleteFolder( `${ this.args.current_plugin_test_screenshotter_dir }` );
	}

	/**
	 * Killall running proccess on server
	 * @todo : check how to kill the bg proccess - https://nodejs.org/api/child_process.html#child_process_subprocess_pid
	 */
	killServerProcess() {
		// Prevent duplicate running from app.js
		if ( ! this.isRunningkillServerProcess ) {
			this.isRunningkillServerProcess = true;
			// Get information for debug state
			this.helpers.printMsg( 'info', `killServerProcess - ${ this.shell.pwd() }` );
			if ( this.childProc && this.childProc.pid ) {
				this.helpers.printMsg( 'info', `process pid ${ this.childProc.pid }` );
				this.process.kill( this.childProc.pid )
				this.childProc.abort();
			}
		}
	}

	/**
	 * The below functions are usable only for clean local env when running tests
	 */
	cleanLocalTestsEnv() {
		// Decided if clean local env
		if ( this.args.clean_local_env ) {
			this.deleteDB();
			this.wpCliCacheClear();
			this.deleteSymlink();
			this.deleteTheInstalledDirectories();
			this.killServerProcess();
		}
	}
}

module.exports = BaseAppShJs;
