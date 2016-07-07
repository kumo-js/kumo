#!/usr/bin/env node
'use strict';

const fs = require('fs');
const Promise = require('bluebird');
const ArgsParser = require('../lib/cli-args-parser');
const CommandFactory = require('../lib/command-factory');
const ConsoleLogger = require('../lib/console-logger');
const EnvContext = require('../lib/env-context');
const FileFinder = require('../lib/file-finder');

const args = new ArgsParser(process.argv).parse();
const fileFinder = new FileFinder();
const logger = new ConsoleLogger({verbose: args.kumoOptions.verbose});
const envContext = new EnvContext({fs, fileFinder, options: {cwd: args.kumoOptions.cwd}});
const commandFactory = new CommandFactory({envContext, logger});

Promise.resolve()
    .then(() => commandFactory.createCommand(args.action).execute())
    .catch(err => {
        logger.error('Operation failed!', err);
        process.exit(1)
    });