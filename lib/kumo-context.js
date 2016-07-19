'use strict';

const path = require('path');

class KumoContext {

    constructor(params) {
        this._args = params.args;
        this._fs = params.fs;
        this._fileFinder = params.fileFinder;
    }

    args() {
        return this._args;
    }

    cwd() {
        return this._args.globalOptions.cwd || process.cwd();
    }

    kumoDir() {
        return path.join(this.rootDir(), '.kumo');
    }

    rootDir() {
        return path.dirname(this.settingsFile());
    }

    settingsFile() {
        return this._settingsFile = this._settingsFile || this._findSettingsFile();
    }

    settings() {
        return this._settings = this._settings ||
            JSON.parse(this._fs.readFileSync(this.settingsFile()));
    }

    _findSettingsFile() {
        const findOptions = {cwd: this.cwd(), errorIfNotFound: true};
        return this._fileFinder.findUpSync('kumo.json', findOptions);
    }
}

module.exports = KumoContext;
