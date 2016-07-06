'use strict';

const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');

class PluginsLoaderSteps {

    static create(params) {
        return _.bindAll(new PluginsLoaderSteps(params));
    }

    constructor(params) {
        this._envContext = params.envContext;
        this._fs = Promise.promisifyAll(params.fs);
        this._requireFn = params.requireFn;
        this._shellFn = params.shellFn;
    }

    createInstallDirIfAbsent() {
        return this._fs.existsAsync(this._toolDir()).then(
            exists => exists ? null : this._fs.mkdirAsync(this._toolDir())
        );
    }

    createNpmPackageFile() {
        const packageFile = path.combine(this._toolDir(), 'package.json');
        const scripts = {linklocal: 'linklocal', unlinkLocal: 'linklocal -u'};
        const dependencies = _.assign({linklocal: '^2.6.0'}, this._plugins());
        return this._fs.writeFileAsync(packageFile, JSON.stringify({scripts, dependencies}));
    }

    installNpmModules() {
        return this._shellFn('npm install', {cwd: this._toolDir()});
    }

    refreshLocalNpmModules() {
        return this._shellFn('npm run linklocal && npm run unlinkLocal', {cwd: this._toolDir()});
    }

    loadNpmModules() {
        return _.map(this._plugins(), p => this._requireFn(this._pluginDir(p)));
    }

    _plugins() {
        return this._envContext.settings().plugins;
    }

    _pluginDir(plugin) {
        return path.combine(this._toolDir(), 'node_modules', plugin.name);
    }

    _toolDir() {
        return this._envContext.toolDir();
    }
}

module.exports = PluginsLoaderSteps;