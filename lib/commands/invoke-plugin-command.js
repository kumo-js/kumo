const _ = require('lodash');

class InvokePluginCommand {

    constructor(params) {
        this._action = params.action;
        this._envContext = params.envContext;
        this._pluginsLoader = params.pluginsLoader
    }

    execute() {
        return this._findPlugin().then(
            p => p ? this._invokePlugin(p) : this._throwNoMatchingPlugin()
        );
    }

    _invokePlugin(plugin) {
        return plugin.invokeAction({
            action: this._action,
            workingDir: this._envContext.workingDir()
        });
    }

    _findPlugin() {
        return this._pluginsLoader.load().then(
            plugins => _.find(plugins, p => _.includes(p.supportedActions(), this._action.name))
        );
    }

    _throwNoMatchingPlugin() {
        throw new Error('No plugin found that supports action: ' + this._action.name);
    }
}

module.exports = InvokePluginCommand;