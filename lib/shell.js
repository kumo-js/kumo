'use strict';

const runCmd = require('command-promise');

class Shell {

    constructor(params) {
        this._logger = params.logger;
    }

    run(cmd, options) {
        this._logger.debug(`Running cmd: ${cmd}`, options);
        return runCmd(cmd, options)
            .then(outputStreams => this._logger.debug(outputStreams[1]));
    }
}

module.exports = Shell;