'use strict';

const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');

class PluginsLoaderSteps {

    constructor(params) {
        this._envContext = params.envContext;
        this._fs = Promise.promisifyAll(params.fs);
        this._logger = params.logger;
        this._requireFn = params.requireFn;
        this._shell = params.shell;
    }

    createInstallDirIfAbsent() {
        return this._fs.statAsync(this._kumoDir())
            .catch(() => this._fs.mkdirAsync(this._kumoDir()));
    }

    createNpmPackageFile() {
        const packageFile = path.join(this._kumoDir(), 'package.json');
        const contents = {dependencies: this._plugins()};
        return this._fs.writeFileAsync(packageFile, JSON.stringify(contents));
    }

    installNpmModules() {
        return this._shell.run('npm install', {cwd: this._kumoDir()});
    }

    loadNpmModules() {
        return _.keys(this._plugins()).map(
            pluginName => this._requireFn(this._pluginDir(pluginName)));
    }

    _plugins() {
        return this._envContext.settings().plugins;
    }

    _pluginDir(pluginName) {
        return path.join(this._kumoDir(), 'node_modules', pluginName);
    }

    _kumoDir() {
        return this._envContext.kumoDir();
    }
}

module.exports = PluginsLoaderSteps;