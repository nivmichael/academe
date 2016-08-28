/**
 * check if the given value is null or undefined
 * @param val
 * @returns {boolean}
 */
function isNull(val) {
    return angular.isUndefined(val) || val === null;
}

/**
 * check if the given value is null, undefined or empty string
 * @param value
 * @returns {boolean}
 */
function isNullOrEmpty(value) {
    return isNull(value) || value.length <= 0;
}

/**
 * make sure that the given value is not null, not undefined and nor empty string
 * @param value
 * @returns {boolean}
 */
function isNotNullNorEmpty(value) {
    return isNotNull(value) && !isNull(value.length) && value.trim().length > 0;
}

/**
 * make sure that the given value is not null nore undefined
 * @param value
 * @returns {boolean}
 */
function isNotNull(value) {
    return !isNull(value);
}

/**
 * concatenate not null nor empty arguments by a dash
 *
 * EXAMPLE:
 *
 * var str = concat("hello", null, "world", undefined); //str = "hello world"
 *
 *
 * @returns {*}
 */
function concat() {
    return this.symConcatArr(" ", arguments);
}

/**
 * reduce array values and concatenate not null nor empty ones by a dash
 *
 * EXAMPLE:
 *
 *
 * var str = concatArr(["hello", null, "world", undefined]); //str = "hello world"
 *
 *
 *
 * @param arr
 * @returns {*}
 */
function concatArr(arr) {
    return this.symConcatArr(" ", arr);
}


/**
 * concatenate not null nor empty arguments by the first argument
 *
 * EXAMPLE:
 *
 *
 * var str = symConcat("-", "hello", null, "world", undefined); //str = "hello-world"
 *
 * @returns {*}
 */
function symConcat() {

    var symbol = arguments[0];

    return this.symConcatArr(symbol, Array.prototype.slice.call(arguments, 1));
}


/**
 * reduce array values and concatenate not null nor empty ones by the given symbol
 *
 * EXAMPLE:
 *
 *
 * var str = symConcatArr("-", ["hello", null, "world", undefined]); //str = "hello-world"
 *
 *
 *
 * @param arr
 * @returns {*}
 */
function symConcatArr(symbol, arr) {
    return _.reduce(arr, function(memo, str) {

        if (isNull(memo)) {
            memo = str;
        } else if (isNotNullNorEmpty(str)) {
            memo += symbol + str;
        }

        return memo;
    });
}


/**
 * make the first letter of a string capital
 *
 * EXAMPLE:
 *
 * var state = "israel";
 *
 * var cState = state.capitalizeFirstLetter(); //cState = "Israel"
 *
 * @returns {string}
 */
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};