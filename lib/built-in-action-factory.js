'use strict';

const fs = require('fs');
const InstallPluginsAction = require('./built-in-actions/install-plugins');
const Shell = require('./shell');

class BuiltInActionFactory {

    createInitAction(_params) {
        // TODO
    }

    createInstallAction(params) {
        const kumoContext = params.kumoContext;
        const logger = params.logger;
        const shell = new Shell({logger: params.logger});
        return new InstallPluginsAction({fs, kumoContext, logger, shell})
    }
}

module.exports = BuiltInActionFactory;
