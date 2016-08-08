'use strict';

class KumoCommand {

    constructor(params) {
        this._actionFinder = params.actionFinder;
        this._kumoContext = params.kumoContext;
        this._logger = params.logger;
    }

    execute() {
        return this._findAction().then(action => {
            if (!action) this._throwNoMatchingAction();
            return action.execute(this._actionParams());
        });
    }

    _findAction() {
        return this._actionFinder.findByName(this._actionName());
    }

    _actionParams() {
        return {
            options: this._kumoContext.args().actionOptions,
            kumoContext: this._kumoContext,
            logger: this._logger
        };
    }

    _actionName() {
        return this._kumoContext.args().actionName;
    }

    _throwNoMatchingAction() {
        throw new Error(`Invalid action: ${this._actionName()}`);
    }
}

module.exports = KumoCommand;
