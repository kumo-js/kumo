'use strict';

const _ = require('lodash');

class InitCommand {

    static create(params) {
        return _.bindAll(new InitCommand(params));
    }

    constructor(params) {
        this._envContext = params.envContext;
    }

    execute() {
        // TODO
        throw new Error('Not implemented!')
    }
}

module.exports = InitCommand;