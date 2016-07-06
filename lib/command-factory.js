const fs = require('fs');
const shell = require('shellpromise');
const InitCommand = require('./commands/init-command');
const InvokePluginCommand = require('./commands/invoke-plugin-command');
const PluginsLoader = require('./plugins-loader');
const PluginsLoaderSteps = require('./plugins-loader-steps');

class CommandFactory {

    constructor(params) {
        this._envContext = params.envContext;
    }

    createCommand(action) {
        return action.name === 'init' ?
            this._initCommand() : this._invokePluginCommand(action);
    }

    _initCommand() {
        return new InitCommand({envContext: this._envContext});
    }

    _invokePluginCommand(action) {
        return new InvokePluginCommand({
            action: action, envContext: this._envContext, pluginsLoader: this._pluginsLoader()
        });
    }

    _pluginsLoader() {
        return new PluginsLoader({steps: this._pluginsLoaderSteps()});
    }

    _pluginsLoaderSteps() {
        return new PluginsLoaderSteps({
            envContext: this._envContext, fs: fs, shell: shell, require: require
        });
    }
}

module.exports = CommandFactory;
