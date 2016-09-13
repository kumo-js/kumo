'use strict';

const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');

class PluginActionsLoader {

    constructor(params) {
        this._context = params.context;
        this._requireFn = params.requireFn;
    }

    loadActions() {
        return Promise.resolve()
            .then(() => this._loadPluginPackModules())
            .then(pluginPacks => this._loadPlugins(pluginPacks))
            .then(pluginPacks => this._extractPluginPackActions(pluginPacks));
    }

    _loadPluginPackModules() {
        const pluginPacks = this._context.settings.pluginPacks;
        return _.compact(_.keys(pluginPacks).map(name =>
            this._requireModule(this._pluginPackDir(name))
        ));
    }

    _loadPlugins(pluginPacks) {
        return Promise.all(
            pluginPacks.map(pack =>
                pack.loadPlugins().then(plugins =>
                    ({prefix: pack.prefix(), plugins})
                )
            )
        );
    }

    _extractPluginPackActions(pluginPacks) {
        return _.flattenDeep(
            pluginPacks.map(pack =>
                pack.plugins.map(plugin =>
                    this._extractPluginActions(plugin, pack.prefix)
                )
            )
        );
    }

    _extractPluginActions(plugin, prefix) {
        let prefixGiven = prefix && prefix.length > 0;
        return plugin.actions().map(action => {
            var prefixedName = prefixGiven ? `${prefix} ${action.name}` : action.name;
            return _.assign({}, action, {name: prefixedName});
        });
    }

    _pluginPackDir(name) {
        const kumoDir = this._context.kumoDir;
        return path.join(kumoDir, 'node_modules', name);
    }

    _requireModule(path) {
        try {
            return this._requireFn(path);
        } catch (err) {
            if (err.code === 'MODULE_NOT_FOUND') return null;
            throw err;
        }
    }
}

module.exports = PluginActionsLoader;
