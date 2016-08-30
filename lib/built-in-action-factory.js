'use strict';

const fs = require('fs');
const runScript = require('command-promise');
const InstallPluginsAction = require('./built-in-actions/install-plugins');
const ScriptExecutor = require('./script-executor');

class BuiltInActionFactory {

    createInitDirAction(_params) {
        // TODO
    }

    createInstallAction(params) {
        const kumoContext = params.kumoContext;
        const logger = params.logger;
        const scriptExecutor = new ScriptExecutor({logger, runScript});
        return new InstallPluginsAction({fs, kumoContext, logger, scriptExecutor})
    }
}

module.exports = BuiltInActionFactory;
