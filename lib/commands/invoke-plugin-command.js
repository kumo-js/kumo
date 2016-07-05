var _ = require('lodash');

class InvokePluginCommand {

	constructor(params) {
		this._action = params.action;
		this._pluginsLoader = params.pluginsLoader
	}

	execute() {
		return this._findPlugin().then(
			p => p ? this._invokePlugin(p) : this._throwNoMatchingPlugin());
	}

	_invokePlugin(plugin) {
		return plugin.invokeAction(this._action.name, this._action.params);
	}

	_findPlugin() {
		return this._pluginsLoader.load().then(
			plugins => _.find(_plugins, p => _.includes(p.supportedActions(), this._action.name)));
	}

	_throwNoMatchingPlugin() {
		throw new Error('No plugin found that supports action: ' + this._action);
	}
}