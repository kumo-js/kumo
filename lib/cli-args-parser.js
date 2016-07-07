'use strict';

const _ = require('lodash');
const minimist = require('minimist');

class CliArgsParser {

    constructor(args) {
        this._args = minimist(args.slice(2));
    }

    parse() {
        return {
            action: this._parseAction(),
            kumoOptions: this._parseKumoOptions()
        }
    }

    _parseAction() {
        const name = this._args['_'].join(' ');
        const kumoOptions = Object.keys(this._parseKumoOptions());
        const options = _.omit(this._args, kumoOptions.concat(['_']));
        return {name, options};
    }

    _parseKumoOptions() {
        return _.pick(this._args, ['cwd', 'verbose']);
    }
}

module.exports = CliArgsParser;