var Promise = require('bluebird');

class PluginsLoader {

	constructor(params) {
		this._steps = params.pluginsLoaderSteps;
	}

	load() {
		return Promise.resolve()
			.then(this._steps.createNpmPackageFile)
			.then(this._steps.installNpmPluginModules)
			.then(this._steps.loadNpmPluginModules)
	}
}