'use strict';

const path = require('path');
const Promise = require('bluebird');

class InstallPlugins {

    constructor(params) {
        this._fs = Promise.promisifyAll(params.fs);
        this._kumoContext = params.kumoContext;
        this._logger = params.logger;
        this._shell = params.shell;
    }

    execute() {
        this._logger.info('Installing plugins...');
        return this.createInstallDirIfAbsent()
            .then(() => this.createNpmPackageFile())
            .then(() => this.installPluginPackModules());
    }

    createInstallDirIfAbsent() {
        return this._fs.statAsync(this._kumoDir())
            .catch(() => this._fs.mkdirAsync(this._kumoDir()));
    }

    createNpmPackageFile() {
        const packageFile = path.join(this._kumoDir(), 'package.json');
        const dependencies = this._kumoContext.settings().pluginPacks;
        return this._fs.writeFileAsync(packageFile, JSON.stringify({dependencies}));
    }

    installPluginPackModules() {
        return this._shell.run('npm install', {cwd: this._kumoDir()});
    }

    _kumoDir() {
        return this._kumoContext.kumoDir();
    }
}

module.exports = InstallPlugins;
