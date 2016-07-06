'use strict';

const _ = require('lodash');
const path = require('path');

class EnvContext {

    constructor(params) {
        this._fs = params.fs;
        this._fileFinder = params.fileFinder;
        this._options = _.assign(this._defaultOptions(), params.options);
    }

    cwd() {
        return this._options.cwd;
    }

    toolDir() {
        return path.join(this.rootDir(), this.options.toolDirName);
    }

    rootDir() {
        return path.dirname(this.settingsFile());
    }

    settingsFile() {
        this._settingsFile = this._settingsFile ||
            this._fileFinder.findUpSync(this._options.settingsFilename, {cwd: this._options.cwd});
        return this._settingsFile;
    }

    settings() {
        this._settings = this._settings ||
            JSON.parse(this._fs.readFileSync(this.settingsFile()));
        return this._settings;
    }

    _defaultOptions() {
        return {
            toolDirName: '.kumo',
            settingsFilename: 'kumo.json',
            cwd: process.cwd()
        };
    }

}

module.exports = EnvContext;
