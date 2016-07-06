'use strict';

const _ = require('lodash');
const path = require('path');

class EnvContext {

    static create(params) {
        return _.bindAll(new EnvContext(params));
    }

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

    settings() {
        return this._settings = this._settings ||
            JSON.parse(this._fs.readFileSync(this._settingsFile()));
    }

    settingsFile() {
        return this._settingsFile = this._settingsFile || this._findSettingsFile();
    }

    _findSettingsFile() {
        const findOptions = {cwd: this._options.cwd, errorIfNotFound: true};
        return this._fileFinder.findUpSync(this._options.settingsFilename, findOptions);
    }

    _defaultOptions() {
        return {
            toolDirName: '.kumo',
            settingsFilename: 'kumo.json',
            cwd: process.cwd()
        }
    }

}

module.exports = EnvContext;
