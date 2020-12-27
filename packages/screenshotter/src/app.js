'use strict';

/**
 * Import test functions included config params
 */
const BaseApp = require( './base-app-shjs' );

/**
 * Class App ordering the base functionality of the app
 */
class App extends BaseApp {
	/**
	 * Running all tests functions for local environment
	 */
	run() {
		this.installDependencies();
		this.importTemplates();
		this.buildPackageAndRunServer();
		this.runTestScreenshots();
		this.cleanLocalEnv();
	}

	/**
	 *  Install dependencies for basic test
	 */
	installDependencies() {
		this.basicActionsBeforeInstall();
		this.installWpCli();
		this.downloadWpCore();
		this.config();
		this.install();
		this.installPlugins();
		this.installThemes();
	}

	/**
	 * Install dependencies for basic test
	 */
	importTemplates() {
		this.importTestTemplates();
	}

	/**
	 * Build package & run server
	 */
	buildPackageAndRunServer() {
		this.runBuild();
		this.runWpServer();
		this.runTestScreenshots()
	}

	/**
	 * Run test images compare
	 */
	runTestScreenshots() {
		this.testScreenshots();
	}

	/**
	 * Clean local test environment
	 */
	cleanLocalEnv() {
		// Decided if needed to clean local environment
		this.cleanLocalTestsEnv();
	}
}

module.exports = new App;
