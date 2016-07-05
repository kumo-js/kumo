var fs = require('fs');
var shell = require('shellpromise');

class CommandFactory {

	constructor(params) {
		this._envContext = params.envContext;
	}

	createCommand(action) {
		return action.name === 'init' ? this._initCommand(action.params) : this._invokePluginCommand(action);
	}

	_initCommand(params) {
		return new InitCommand({params: params, envContext: this._envContext});
	}

	_invokePluginCommand(action) {
		return new InvokePluginCommand({action: action, pluginsLoader: this._pluginsLoader()});
	}

	_pluginsLoader() {
		return new PluginsLoader({steps: this._pluginsLoaderSteps()});
	}

	_pluginsLoaderSteps() {
		return new PluginsLoaderSteps({envContext: this._envContext, fs: fs, shell: shell, require: require});
	}
}
