const _ = require('lodash');
const path = require('path');

class PluginsLoaderSteps {

    constructor(params) {
        this._envContext = params.envContext;
        this._shell = params.shell;
        this._fs = Promise.promisifyAll(params.fs);
        this._require = params.require;
    }

    createInstallDirIfAbsent() {
        return this._fs.existsAsync(this._toolDir()).then(
            exists => exists ? null : this._fs.mkdirAsync(this._toolDir())
        );
    }

    createNpmPackageFile() {
        const packageFile = path.combine(this._toolDir(), 'package.json');
        const contents = {dependencies: this._plugins()};
        return this._fs.writeFileAsync(packageFile, JSON.stringify(contents));
    }

    installNpmPluginModules() {
        return this._shell('npm install', {cwd: this._toolDir()});
    }

    loadNpmPluginModules() {
        return _.map(this._plugins(), p => this._require(this._pluginDir(p)));
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