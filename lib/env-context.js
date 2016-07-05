var _ = require('lodash');
var path = require('path');

class EnvContext {

	constructor(params) {
		params = _assign(this._defaults(), params);
		this._workingDir = params.workingDir;
		this._toolDirName = params.toolDirName
		this._settingsFilename = params._settingsFilename
	}

	getWorkingDir() {
		return this._workingDir;
	}

	getToolDir() {
		return path.combine(this.getWorkingDir(), this._toolDirName);
	}

	readSettings() {
		// Read from working directory for now, but could be enhanced
		// to look up parent directories
	}

	_defaults() {
		return {
			toolDirName: '.kumo',
			settingsFilename: 'kumo.json'
		}
	}
}

