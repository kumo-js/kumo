'use strict';

const _ = require('lodash');
const path = require('path');

class KumoContext {

    constructor(params) {
        this._fs = params.fs;
        this._fileFinder = params.fileFinder;
        this._options = _.assign(this._defaultOptions(), params.options);
    }
    
    cwd() {
        return this._options.cwd;
    }

    kumoDir() {
        return path.join(this.rootDir(), this._options.kumoDirName);
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
        const findOptions = {cwd: this._options.cwd, errorIfNotFound: true};
        return this._fileFinder.findUpSync(this._options.settingsFilename, findOptions);
    }

    _defaultOptions() {
        return {
            kumoDirName: '.kumo',
            settingsFilename: 'kumo.json',
            cwd: process.cwd()
        }
    }

}

module.exports = KumoContext;
