'use strict';

const path = require('path');

class ContextFactory {

    constructor(params) {
        this._fileFinder = params.fileFinder;
        this._fileReader = params.fileReader;
    }

    createContext(parsedArgs) {
        const cwd = parsedArgs.globalOptions.cwd || process.cwd();
        return this._loadSettings(cwd).then(result => {
            const rootDir = path.dirname(result.settingsFile);
            return {
                args: parsedArgs,
                cwd: cwd,
                kumoDir: path.join(rootDir, '.kumo'),
                rootDir: rootDir,
                settings: result.settings
            };
        });
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

module.exports = ContextFactory;
