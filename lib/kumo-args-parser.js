'use strict';

const _ = require('lodash');
const minimist = require('minimist');

class KumoArgsParser {

    parse(args) {
        args = minimist(args.slice(2));
        const globalArgs = _.pick(args, ['cwd', 'verbose', 'help']);
        const actionArgs = _.omit(args, _.concat(_.keys(globalArgs), '_'));
        const actionName = args._.join(' ');
        return {actionName, actionArgs, globalArgs};
    }
}

module.exports = KumoArgsParser;
