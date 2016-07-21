'use strict';

const fs = require('fs');
const PluginActionsLoader = require('./plugin-actions-loader');
const PluginActionsLoaderSteps = require('./plugin-actions-loader-steps');
const Shell = require('./shell');

class ActionLoadersFactory {

    constructor(params) {
        this._kumoContext = params.kumoContext;
        this._logger = params.logger;
    }

    createLoaders() {
        return [
            //TODO: this._builtInActionsLoader(),
            this._pluginActionsLoader()
        ];
    }

    _pluginActionsLoader() {
        return new PluginActionsLoader({
            pluginActionsLoaderSteps: this._pluginActionsLoaderSteps()
        });
    }

    _pluginActionsLoaderSteps() {
        return new PluginActionsLoaderSteps({
            fs: fs,
            kumoContext: this._kumoContext,
            logger: this._logger,
            requireFn: require,
            shell: new Shell({logger: this._logger})
        });
    }
}

module.exports = ActionLoadersFactory;
