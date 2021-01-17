'use strict';

/**
 * Class Helpers represent the helpers functionality of the app
 */
class Helpers {
	constructor() {
		this.execSync = require( 'child_process' ).execSync;
		this.fs = require( 'fs' );
		this.path = require( 'path' );
		this.chalk = require( 'chalk' );
		this.shell = require( 'shelljs' );
		this.args = require( './config' );
	}

	/**
	 * Print massage
	 *
	 * @param type {string}
	 * @param msg  {string}
	 */
	printMsg( type, msg ) {
		const debug = require( './config' ).debug;
		// If debug equal to true - display msg
		if ( debug ) {
			const now = new Date();
			let msgColor;

			switch ( type.toLowerCase() ) {
				case 'error':
					msgColor = this.chalk.red;
					break;
				case 'info':
				case 'warning':
					msgColor = this.chalk.yellow;
					break;
				case 'success':
					msgColor = this.chalk.green;
					break;
				default:
					msgColor = this.chalk.white;
			}

			console.log( msgColor( `\n${ now } - ${ msg }` ) );
		}
	}

	/**
	 *  Exec shelljs command
	 *  If an error is NOT thrown, then:
	 *
	 *	Code message is guaranteed to be 0
	 *	Stdout is what's returned by the function
	 *	Stderr is almost definitely empty because it was successful.
	 *	In the rare event the command line executable returns a stderr and yet exits with status 0 (success), and you want to read it, you will need the async function.
	 *
	 * @param cmd {string} - the command
	 *
	 * @returns {string|boolean}
	 */
	execShelljs( cmd ) {
		const resShellExec = this.shell.exec( cmd );
		if ( 0 === resShellExec.code ) {
			this.printMsg( 'success', `success ${ resShellExec.stdout }` );
			return resShellExec.stdout;
		}
		if ( this.args.deepDebug ) {
			this.printMsg( 'error', `code message: ${ resShellExec.code }` );
		}
		this.printMsg( 'error', `stderr message: ${ resShellExec.stderr }` );

		// Array of possible errors that let the process to continue instead exit
		const acceptableErrors = [
			"Error: WordPress files seem to already be present here.",
			"Error: The 'wp-config.php' file already exists.",
			"ERROR 1007 (HY000) at line 1: Can't create database 'wordpress_test'; database exists",
		];

		// Remove whitespaces inside a string
		const error = resShellExec.stderr.trim();
		// Check for acceptable error
		const hasAcceptableErrors = acceptableErrors.includes( error );
		// Check for possible ignore errors that start with string 'npm '
		const ignoreError = error.startsWith( 'npm ' );
		// In case that error isn't acceptable and error isn't ignore, exit from process with error code
		if ( ! hasAcceptableErrors && ! ignoreError ) {
			process.exit( resShellExec.code );
		}

		return false;
	}

	/**
	 * Create directory
	 *
	 * @param path {string} - The path to folder
	 * @param recursive {boolean} - Determine if determine folder recursive
	 */
	createFolder( path, recursive = true ) {
		if ( ! this.fs.existsSync( `${ path }` ) ) {
			this.fs.mkdirSync( `${ path }`, { recursive: recursive }, ( err ) => {
				if ( err ) {
					this.printMsg( 'error', `Can't create directory - ${ path }` );
				}
				this.printMsg( 'success', `Directory created successfully - ${ path }` );
			} );
		}
	}

	/**
	 * Delete exists directory and all its contents, including any subdirectories and files
	 * @param path {string} - The path to folder
	 */
	deleteFolder( path ) {
		if ( this.fs.existsSync( `${ path }` ) ) {
			this.deleteFolderRecursive( `${ path }` );
			if ( ! this.fs.existsSync( `${ path }` ) ) {
				this.printMsg( 'success', `Deleted directory: ${ path }.` );
			} else {
				this.printMsg( 'error', `Can't deleted directory: ${ path }.` );
			}
		}
	}

	/**
	 * Delete directory and all its contents, including any subdirectories and files
	 *
	 * @param path {string} - The path to folder
	 */
	deleteFolderRecursive( path ) {
		if ( this.fs.existsSync( path ) ) {
			this.fs.readdirSync( path ).forEach( ( file ) => {
				const curPath = path + '/' + file;
				if ( this.fs.lstatSync( curPath ).isDirectory() ) { // recurse
					this.deleteFolderRecursive( curPath );
				} else { // delete file
					this.fs.unlinkSync( curPath );
				}
			} );
			this.fs.rmdirSync( path );
		}
	}

	/**
	 * Check if folder exists
	 *
	 * @param path {string} - path to folder
	 */
	hasFolder( path ) {
		if ( this.fs.existsSync( path ) ) {
			this.printMsg( 'info', `Exists folder - ${ path }` );
			return true;
		}
		this.printMsg( 'error', `The folder not exists - ${ path }` );
		return false;
	}

	/**
	 * Copy directory to another path recursively synchrony (it's like command: cp -R).
	 *
	 * @param {string} src  The path to the thing to copy.
	 * @param {string} dest The path to the new copy.
	 */
	copyFolderRecursiveSync( src, dest ) {
		const _this = this;
		let exists = this.fs.existsSync( src );
		let stats = exists && this.fs.statSync( src );
		let isDirectory = exists && stats.isDirectory();
		if ( isDirectory ) {
			this.createFolder( dest );
			this.fs.readdirSync( src ).forEach( function ( childItemName ) {
				_this.copyFolderRecursiveSync( _this.path.join( src, childItemName ), _this.path.join( dest, childItemName ) );
			} );
		} else {
			this.fs.copyFileSync( src, dest );
		}
	}

	/**
	 * Deleting symbolic link
	 *
	 * @param path {string}
	 */
	unlink( path ) {
		this.fs.unlink( path, (( err ) => {
			if ( err ) {
				this.printMsg( 'error', `${ err }` );
			} else {
				this.printMsg( 'success', `Deleted Symbolic Link: ${ path }.` );
			}
		}) );
	}

	/**
	 * Check if folder/file is a symbolic link
	 *
	 * @param path {string} - The path to folder/file
	 *
	 * @returns {bool|*}
	 */
	isSymlink( path ) {
		try {
			return this.fs.lstatSync( path ).isSymbolicLink();
		} catch ( err ) {
		}
		return false;
	}

	/**
	 * Check if package exists
	 *
	 * @param packageName {string} - The name of package
	 *
	 * @returns {boolean}
	 */
	isInstalledPackage( packageName ) {
		return !! this.execShelljs( `npm ls -g ${ packageName }` );
	}
}

module.exports = new Helpers;
