'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

class ActionFinder {

    constructor(params) {
        this._actionLoadersFactory = params.actionLoadersFactory;
    }

    find(name) {
        return this._loadActions()
            .then(actions => _.filter(actions, a => a.name === name))
            .then(actions => {
                if (actions.length === 0) throw new Error(`Action not found: ${name}`);
                if (actions.length > 1) throw new Error(`Ambiguous action: ${name}`);
                return actions[0];
            });
    }

    _loadActions() {
        const loaders = this._actionLoadersFactory.createLoaders();
        const loadActions = loaders.map(loader => loader.loadActions());
        return Promise.all(loadActions).then(actions => _.flatten(actions));
    }
}

module.exports = ActionFinder;
