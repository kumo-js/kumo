'use strict';

const fs = require('fs');
const InitCommand = require('./commands/init-command');
const InvokePluginCommand = require('./commands/invoke-plugin-command');
const PluginsLoader = require('./plugins-loader');
const PluginsLoaderSteps = require('./plugins-loader-steps');
const Shell = require('./shell');

class CommandFactory {

    constructor(params) {
        this._envContext = params.envContext;
        this._logger = params.logger;
    }

    createCommand(action) {
        return action.name === 'init' ?
            this._initCommand() : this._invokePluginCommand(action);
    }

    _initCommand() {
        return new InitCommand({
            envContext: this._envContext,
            logger: this._logger
        });
    }

    _invokePluginCommand(action) {
        return new InvokePluginCommand({
            action: action,
            envContext: this._envContext,
            logger: this._logger,
            pluginsLoader: this._pluginsLoader()
        });
    }

    _pluginsLoader() {
        return new PluginsLoader({pluginsLoaderSteps: this._pluginsLoaderSteps()});
    }

    _pluginsLoaderSteps() {
        return new PluginsLoaderSteps({
            envContext: this._envContext,
            fs: fs, requireFn: require,
            logger: this._logger,
            shell: new Shell({logger: this._logger})
        });
    }
}

module.exports = CommandFactory;
