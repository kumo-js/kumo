'use strict';

class ConsoleLogger {

    constructor(params) {
        this._verbose = params.verbose;
    }

    info(message, data) {
        this._log(message, data);
    }

    debug(message, data) {
        if (this._verbose) {
            this._log(message, data);
        }
    }

    error(message, err) {
        err = err || {};
        if (message) console.error(message);
        console.error(this._verbose ? err.stack : err.message);
    }

    _log(message, data) {
        console.log(message, data || '');
    }
}

module.exports = ConsoleLogger;