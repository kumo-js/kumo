'use strict';

class InitCommand {

    constructor(params) {
        this._envContext = params.envContext;
        this._logger = params.logger;
    }

    execute() {
        // TODO
        throw new Error('Not implemented!')
    }
}

module.exports = InitCommand;