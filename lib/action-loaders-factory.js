'use strict';

const BuiltInActionFactory = require('./built-in-action-factory');
const BuildInActionsLoader = require('./built-in-actions-loader');
const PluginActionsLoader = require('./plugin-actions-loader');

class ActionLoadersFactory {

    constructor(params) {
        this._context = params.context;
        this._logger = params.logger;
    }

    createLoaders() {
        return [
            this._builtInActionsLoader(),
            this._pluginActionsLoader()
        ];
    }

    _builtInActionsLoader() {
        const builtInActionFactory = new BuiltInActionFactory();
        return new BuildInActionsLoader({builtInActionFactory});
    }

    _pluginActionsLoader() {
        const context = this._context;
        const requireFn = require;
        return new PluginActionsLoader({context, requireFn});
    }
}

module.exports = ActionLoadersFactory;
