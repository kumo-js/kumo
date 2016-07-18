'use strict';

const _ = require('lodash');

class InvokePluginCommand {

    constructor(params) {
        this._action = params.action;
        this._kumoContext = params.kumoContext;
        this._logger = params.logger;
        this._pluginsLoader = params.pluginsLoader;
    }

    execute() {
        return this._findPlugin().then(plugin => {
            if (!plugin) this._throwNoMatchingPlugin();
            return this._invokePlugin(plugin);
        });
    }

    _findPlugin() {
        return this._pluginsLoader.load().then(plugins => {
            return _.find(plugins, p => _.includes(p.actions(), this._action.name))
        });
    }

    _invokePlugin(plugin) {
        return plugin.invokeAction(this._action.name, this._action.options, {
            cwd: this._kumoContext.cwd(),
            kumoSettings: this._kumoContext.settings(),
            logger: this._logger
        });
    }

    _throwNoMatchingPlugin() {
        throw new Error(`No plugin found that supports action: ${this._action.name}`);
    }
}

module.exports = InvokePluginCommand;