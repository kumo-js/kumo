'use strict';

const path = require('path');

class ContextInitializer {

    constructor(params) {
        this._fileFinder = params.fileFinder;
        this._fileReader = params.fileReader;
    }

    initialize(context, parsedCliArgs) {
        const cwd = this._cwd(parsedCliArgs);

        return this._loadSettings(cwd).then(result => {
            const rootDir = path.dirname(result.settingsFile);
            return Object.assign({}, context, {
                args: parsedCliArgs,
                cwd: cwd,
                kumoDir: path.join(rootDir, '.kumo'),
                rootDir: rootDir,
                settings: result.settings
            });
        });
    }

    _cwd(parsedCliArgs) {
        return parsedCliArgs.globalOptions.cwd || process.cwd();
    }

    _loadSettings(cwd) {
        return this._findSettingsFile(cwd).then(settingsFile =>
            this._fileReader.readJson(settingsFile).then(
                settings => ({settingsFile, settings})
            )
        );
    }

    _findSettingsFile(cwd) {
        const findOptions = {cwd, errorIfNotFound: true};
        return this._fileFinder.findUp('kumo.json', findOptions);
    }
}

module.exports = ContextInitializer;
