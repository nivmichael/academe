angular.module("acadb.services")

    /**
     * promise combiner allows us to wait for multiple promises to get result
     */
    .factory('promiseCombiner', ['$q', function ($q) {

        return function (numOfPromises) {
            return new ReadyInvoker(numOfPromises, $q);
        }

    }]);


/**
 * invokes all who the functions that listens to ready alert after the ready function is called numOfFunc times.
 * @param numOfFunc
 * @param animation
 * @constructor
 */
function ReadyInvoker(numOfFunc, $q, withLoading) {
    numOfFunc = numOfFunc || 1;

    this.defer = $q.defer();

    this.withLoading = withLoading === true;

    if (this.withLoading) {
        // showLoadingBar(numOfFunc == 1 ? 5 : 0);
    }

    this.numOfFunc = this.numOfFuncLeft = numOfFunc;
    this.listeners = [];
    this.stopped = false;
}

/**
 * invoke the given function when ready
 * @param func
 */
ReadyInvoker.prototype.wait = function () {
    return this.defer.promise;
};

/**
 * notify that another function is ready, checks if all the functions are ready, if so invoke all the ready listeners
 */
ReadyInvoker.prototype.ready = function () {
    this.numOfFuncLeft--;

    if (this.numOfFuncLeft === 0) {
        if (this.withLoading) {
            // showLoadingBar(100);
        }

        this.defer.resolve();

    } else {

        if (this.withLoading) {
            // showLoadingBar(((this.numOfFunc - this.numOfFuncLeft) * 100) / this.numOfFunc);
        }
    }
};

/**
 * stop the invoker, and don't invoke any wait functions
 */
ReadyInvoker.prototype.stop = function () {
    this.stopped = true;
};


ReadyInvoker.prototype.isEnded = function () {
    return this.numOfFuncLeft <= 0;
};