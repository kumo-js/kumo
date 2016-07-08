'use strict';

const Promise = require('bluebird');

class PluginsLoader {

    constructor(params) {
        this._steps = params.pluginsLoaderSteps;
    }

    load() {
        return Promise.resolve()
            .then(() => this._steps.createInstallDirIfAbsent())
            .then(() => this._steps.createNpmPackageFile())
            .then(() => this._steps.installPluginPackModules())
            .then(() => this._steps.loadPluginPackModules())
            .then(pluginPacks => this._steps.extractPlugins(pluginPacks));
    }
}

module.exports = PluginsLoader;