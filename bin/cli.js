#!/usr/bin/env node

'use strict';

const fs = require('fs');
const _ = require('lodash');
const minimist = require('minimist');
const program = require('commander');
const FileFinder = require('../lib/file-finder');
const EnvContext = require('../lib/env-context');
const CommandFactory = require('../lib/command-factory');

program
    .version(require('../package').version)
    .arguments('<file>')
    .option('-u, --username <username>', 'The user to authenticate as')
    .option('-p, --password <password>', 'The user\'s password')
    .action(function(file) {
        console.log('user: %s pass: %s file: %s',
        program.username, program.password, file);
    })
    .parse(process.argv);

const args = minimist(process.argv.slice(2));
const reservedOptions = _.pick(args, 'cwd');

const action = {
    name: args._,
    options: _.omit(args, _.concat(['_'],
    reservedOptions.keys))
};

const envContext = new EnvContext({
    fs: fs,
    fileFinder: new FileFinder(),
    options: reservedOptions
});

const commandFactory = new CommandFactory({envContext: envContext});
commandFactory.createCommand(action).execute();
