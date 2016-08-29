'use strict';

const Promise = require('bluebird');

class BuiltInActionsLoader {

    constructor(params) {
        this._actionFactory = params.builtInActionFactory;
    }

    loadActions() {
        return Promise.resolve([
            {
                name: 'install',
                execute: params => this._actionFactory.createInstallAction(params).execute()
            }
        ])
    }
}

module.exports = BuiltInActionsLoader;
