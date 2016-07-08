'use strict';

class Prefix {

    constructor(prefix) {
        this._prefix = prefix;
    }

    apply(value) {
        return this._prefixGiven() ?
            `${this._prefix} ${value}` : value;
    }

    remove(value) {
        return this._prefixGiven() ?
            value.replace(new RegExp(`^${this._prefix}\\s`), '') : value
    }

    _prefixGiven() {
        return this._prefix && this._prefix.length > 0;
    }
}

module.exports = Prefix;