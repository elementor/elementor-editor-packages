#!/usr/bin/env node

'use strict';

const arg = require( './config' );
arg.clean_local_env = true;

/**
 * Running app
 */
const app = require( './app' );
app.cleanLocalEnv();
