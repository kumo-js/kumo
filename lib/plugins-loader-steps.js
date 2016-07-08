'use strict';

const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');
const Plugin = require('./plugin');
const Prefix = require('./prefix');

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
        const contents = {dependencies: this._pluginPacks()};
        return this._fs.writeFileAsync(packageFile, JSON.stringify(contents));
    }

    installPluginPackModules() {
        return this._shell.run('npm install', {cwd: this._kumoDir()});
    }

    loadPluginPackModules() {
        return _.keys(this._pluginPacks()).map(
            name => this._requireFn(this._pluginPackDir(name)));
    }

    extractPlugins(pluginPacks) {
        return _.flatten(_.map(pluginPacks, pack => {
            const prefix = new Prefix(pack.prefix());
            return _.map(pack.plugins(), module => new Plugin({module, prefix}));
        }));
    }

    _pluginPacks() {
        return this._envContext.settings().pluginPacks;
    }

    _pluginPackDir(name) {
        return path.join(this._kumoDir(), 'node_modules', name);
    }

    _kumoDir() {
        return this._envContext.kumoDir();
    }
}

module.exports = PluginsLoaderSteps;