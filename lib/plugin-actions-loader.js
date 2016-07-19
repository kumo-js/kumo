'use strict';

const Promise = require('bluebird');

class PluginActionsLoader {

    constructor(params) {
        this._steps = params.pluginActionsLoaderSteps;
    }

    loadActions() {
        return Promise.resolve()
            .then(() => this._steps.createInstallDirIfAbsent())
            .then(() => this._steps.createNpmPackageFile())
            .then(() => this._steps.installPluginPackModules())
            .then(() => this._steps.loadPluginPackModules())
            .then(pluginPacks => this._steps.extractActions(pluginPacks));
    }
}

module.exports = PluginActionsLoader;