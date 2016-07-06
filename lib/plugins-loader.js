'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

class PluginsLoader {

    static create(params) {
        return _.bindAll(new PluginsLoader(params));
    }

    constructor(params) {
        this._steps = params.pluginsLoaderSteps;
    }

    load() {
        return Promise.resolve()
            .then(this._steps.createInstallDirIfAbsent)
            .then(this._steps.createNpmPackageFile)
            .then(this._steps.installNpmModules)
            .then(this._steps.refreshLocalNpmModules)
            .then(this._steps.loadNpmModules)
    }
}

module.exports = PluginsLoader;