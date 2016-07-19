#!/usr/bin/env node
'use strict';

const Promise = require('bluebird');
const ConsoleLogger = require('../lib/console-logger');
const KumoArgsParser = require('../lib/kumo-args-parser');
const KumoCommandFactory = require('../lib/kumo-command-factory');

const args = new KumoArgsParser().parse(process.argv);
const logger = new ConsoleLogger({verbose: args.globalOptions.verbose});
const commandFactory = new KumoCommandFactory({logger});

Promise.resolve()
    .then(() => commandFactory.createCommand(args).execute())
    .catch(err => {
        logger.error('Operation failed!', err);
        process.exit(1);
    });