'use strict';

const Promise = require('bluebird');

class ActionFinder {

    constructor(params) {
        this._actionLoadersFactory = params.actionLoadersFactory;
    }

    findByName(name) {
        return this._find(actions => actions.find(a => a.name === name));
    }

    _find(findFn) {
        return this._actionLoaders().reduce(
            (promise, loader) => this._chainFind(promise, loader, findFn),
            Promise.resolve()
        );
    }

    _chainFind(promise, loader, findFn) {
        return promise.then(action =>
            action || loader.loadActions().then(actions => findFn(actions))
        );
    }

    _actionLoaders() {
        return this._actionLoadersFactory.createLoaders();
    }
}

module.exports = ActionFinder;
