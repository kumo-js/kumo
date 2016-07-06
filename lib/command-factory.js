'use strict';

const _ = require('lodash');
const fs = require('fs');
const shellFn = require('shellpromise');
const InitCommand = require('./commands/init-command');
const InvokePluginCommand = require('./commands/invoke-plugin-command');
const PluginsLoader = require('./plugins-loader');
const PluginsLoaderSteps = require('./plugins-loader-steps');

class CommandFactory {

    static create(params) {
        return _.bindAll(new CommandFactory(params));
    }

    constructor(params) {
        this._envContext = params.envContext;
    }

    createCommand(action) {
        return action.name === 'init' ?
            this._initCommand() : this._invokePluginCommand(action);
    }

    _initCommand() {
        return InitCommand.create({envContext: this._envContext});
    }

    _invokePluginCommand(action) {
        return InvokePluginCommand.create({
            action: action,
            envContext: this._envContext,
            pluginsLoader: this._pluginsLoader()
        });
    }

    _pluginsLoader() {
        return PluginsLoader.create({pluginsLoaderSteps: this._pluginsLoaderSteps()});
    }

    _pluginsLoaderSteps() {
        return PluginsLoaderSteps.create({
            envContext: this._envContext,
            fs: fs,
            requireFn: require,
            shellFn: shellFn
        });
    }
}

module.exports = CommandFactory;
