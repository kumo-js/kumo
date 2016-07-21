'use strict';

const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');

class PluginActionsLoaderSteps {

    constructor(params) {
        this._fs = Promise.promisifyAll(params.fs);
        this._kumoContext = params.kumoContext;
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

    extractActions(pluginPacks) {
        return _.flattenDeep(pluginPacks.map(pack =>
            pack.plugins().map(plugin =>
                this._extractPrefixedActions(plugin, pack.prefix())
            )
        ));
    }

    _pluginPacks() {
        return this._kumoContext.settings().pluginPacks;
    }

    _pluginPackDir(name) {
        return path.join(this._kumoDir(), 'node_modules', name);
    }

    _extractPrefixedActions(plugin, prefix) {
        let prefixGiven = prefix && prefix.length > 0;
        return plugin.actions().map(action => {
            var prefixedName = prefixGiven ? `${prefix} ${action.name}` : action.name;
            return _.assign({}, action, {name: prefixedName});
        });
    }

    _kumoDir() {
        return this._kumoContext.kumoDir();
    }
}

module.exports = PluginActionsLoaderSteps;