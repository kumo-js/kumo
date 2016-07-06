#! /usr/bin/env node

const fs = require('fs');
const _ = require('lodash');
const minimist = require('minimist');
const FileFinder = require('../lib/file-finder');
const EnvContext = require('../lib/env-context');
const CommandFactory = require('../lib/command-factory');

const args = minimist(process.argv.slice(2));
const reservedOptions = _.pick(args, 'cwd');
const action = {name: args._, options: _.omit(args, _.concat(['_'], reservedOptions.keys))};

const envContext = new EnvContext({fs: fs, fileFinder: new FileFinder(), options: reservedOptions});
const commandFactory = new CommandFactory({envContext: envContext});
commandFactory.createCommand(action).execute();