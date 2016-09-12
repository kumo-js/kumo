#!/usr/bin/env node
'use strict';

const ConsoleLogger = require('../lib/console-logger');
const ContextFactory = require('../lib/context-factory');
const FileFinder = require('../lib/file-finder');
const JsonCompatibleFileReader = require('../lib/json-compatible-file-reader');
const KumoArgsParser = require('../lib/kumo-args-parser');
const KumoCommandFactory = require('../lib/kumo-command-factory');

const args = new KumoArgsParser().parse(process.argv);
const logger = new ConsoleLogger({verbose: args.globalOptions.verbose});
const fileFinder = new FileFinder();
const fileReader = new JsonCompatibleFileReader();
const contextFactory = new ContextFactory({fileFinder, fileReader});
const commandFactory = new KumoCommandFactory({logger});

contextFactory.createContext(args)
    .then(context => commandFactory.createCommand(context))
    .then(command => command.execute())
    .catch(err => {
        logger.error('Operation failed!', err);
        process.exit(1);
    });
