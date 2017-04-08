var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
            }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }return s;
})({ 1: [function (require, module, exports) {
        module.exports = {
            API_KEY: 'demokey',
            API_ENDPOINT: 'http://localhost/api'
        };
    }, {}], 2: [function (require, module, exports) {
        'use strict';

        // external API

        var policySchema = require('./src/policy');
        var types = require('./src/types');

        module.exports = {
            policySchema: policySchema,
            types: types
        };
    }, { "./src/policy": 15, "./src/types": 16 }], 3: [function (require, module, exports) {
        'use strict';

        var hasOwn = Object.prototype.hasOwnProperty;
        var toStr = Object.prototype.toString;

        var isArray = function isArray(arr) {
            if (typeof Array.isArray === 'function') {
                return Array.isArray(arr);
            }

            return toStr.call(arr) === '[object Array]';
        };

        var isPlainObject = function isPlainObject(obj) {
            if (!obj || toStr.call(obj) !== '[object Object]') {
                return false;
            }

            var hasOwnConstructor = hasOwn.call(obj, 'constructor');
            var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
            // Not own constructor property must be Object
            if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
                return false;
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            var key;
            for (key in obj) {/**/}

            return typeof key === 'undefined' || hasOwn.call(obj, key);
        };

        module.exports = function extend() {
            var options,
                name,
                src,
                copy,
                copyIsArray,
                clone,
                target = arguments[0],
                i = 1,
                length = arguments.length,
                deep = false;

            // Handle a deep copy situation
            if (typeof target === 'boolean') {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            } else if (typeof target !== 'object' && typeof target !== 'function' || target == null) {
                target = {};
            }

            for (; i < length; ++i) {
                options = arguments[i];
                // Only deal with non-null/undefined values
                if (options != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        // Prevent never-ending loop
                        if (target !== copy) {
                            // Recurse if we're merging plain objects or arrays
                            if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && isArray(src) ? src : [];
                                } else {
                                    clone = src && isPlainObject(src) ? src : {};
                                }

                                // Never move original objects, clone them
                                target[name] = extend(deep, clone, copy);

                                // Don't bring in undefined values
                            } else if (typeof copy !== 'undefined') {
                                target[name] = copy;
                            }
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        };
    }, {}], 4: [function (require, module, exports) {
        //! moment.js
        //! version : 2.18.1
        //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
        //! license : MIT
        //! momentjs.com

        ;(function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.moment = factory();
        })(this, function () {
            'use strict';

            var hookCallback;

            function hooks() {
                return hookCallback.apply(null, arguments);
            }

            // This is done to register the method called with moment()
            // without creating circular dependencies.
            function setHookCallback(callback) {
                hookCallback = callback;
            }

            function isArray(input) {
                return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
            }

            function isObject(input) {
                // IE8 will treat undefined and null as object if it wasn't for
                // input != null
                return input != null && Object.prototype.toString.call(input) === '[object Object]';
            }

            function isObjectEmpty(obj) {
                var k;
                for (k in obj) {
                    // even if its not own property I'd still call it non-empty
                    return false;
                }
                return true;
            }

            function isUndefined(input) {
                return input === void 0;
            }

            function isNumber(input) {
                return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
            }

            function isDate(input) {
                return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
            }

            function map(arr, fn) {
                var res = [],
                    i;
                for (i = 0; i < arr.length; ++i) {
                    res.push(fn(arr[i], i));
                }
                return res;
            }

            function hasOwnProp(a, b) {
                return Object.prototype.hasOwnProperty.call(a, b);
            }

            function extend(a, b) {
                for (var i in b) {
                    if (hasOwnProp(b, i)) {
                        a[i] = b[i];
                    }
                }

                if (hasOwnProp(b, 'toString')) {
                    a.toString = b.toString;
                }

                if (hasOwnProp(b, 'valueOf')) {
                    a.valueOf = b.valueOf;
                }

                return a;
            }

            function createUTC(input, format, locale, strict) {
                return createLocalOrUTC(input, format, locale, strict, true).utc();
            }

            function defaultParsingFlags() {
                // We need to deep clone this object.
                return {
                    empty: false,
                    unusedTokens: [],
                    unusedInput: [],
                    overflow: -2,
                    charsLeftOver: 0,
                    nullInput: false,
                    invalidMonth: null,
                    invalidFormat: false,
                    userInvalidated: false,
                    iso: false,
                    parsedDateParts: [],
                    meridiem: null,
                    rfc2822: false,
                    weekdayMismatch: false
                };
            }

            function getParsingFlags(m) {
                if (m._pf == null) {
                    m._pf = defaultParsingFlags();
                }
                return m._pf;
            }

            var some;
            if (Array.prototype.some) {
                some = Array.prototype.some;
            } else {
                some = function (fun) {
                    var t = Object(this);
                    var len = t.length >>> 0;

                    for (var i = 0; i < len; i++) {
                        if (i in t && fun.call(this, t[i], i, t)) {
                            return true;
                        }
                    }

                    return false;
                };
            }

            var some$1 = some;

            function isValid(m) {
                if (m._isValid == null) {
                    var flags = getParsingFlags(m);
                    var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
                        return i != null;
                    });
                    var isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

                    if (m._strict) {
                        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
                    }

                    if (Object.isFrozen == null || !Object.isFrozen(m)) {
                        m._isValid = isNowValid;
                    } else {
                        return isNowValid;
                    }
                }
                return m._isValid;
            }

            function createInvalid(flags) {
                var m = createUTC(NaN);
                if (flags != null) {
                    extend(getParsingFlags(m), flags);
                } else {
                    getParsingFlags(m).userInvalidated = true;
                }

                return m;
            }

            // Plugins that add properties should also add the key here (null value),
            // so we can properly clone ourselves.
            var momentProperties = hooks.momentProperties = [];

            function copyConfig(to, from) {
                var i, prop, val;

                if (!isUndefined(from._isAMomentObject)) {
                    to._isAMomentObject = from._isAMomentObject;
                }
                if (!isUndefined(from._i)) {
                    to._i = from._i;
                }
                if (!isUndefined(from._f)) {
                    to._f = from._f;
                }
                if (!isUndefined(from._l)) {
                    to._l = from._l;
                }
                if (!isUndefined(from._strict)) {
                    to._strict = from._strict;
                }
                if (!isUndefined(from._tzm)) {
                    to._tzm = from._tzm;
                }
                if (!isUndefined(from._isUTC)) {
                    to._isUTC = from._isUTC;
                }
                if (!isUndefined(from._offset)) {
                    to._offset = from._offset;
                }
                if (!isUndefined(from._pf)) {
                    to._pf = getParsingFlags(from);
                }
                if (!isUndefined(from._locale)) {
                    to._locale = from._locale;
                }

                if (momentProperties.length > 0) {
                    for (i = 0; i < momentProperties.length; i++) {
                        prop = momentProperties[i];
                        val = from[prop];
                        if (!isUndefined(val)) {
                            to[prop] = val;
                        }
                    }
                }

                return to;
            }

            var updateInProgress = false;

            // Moment prototype object
            function Moment(config) {
                copyConfig(this, config);
                this._d = new Date(config._d != null ? config._d.getTime() : NaN);
                if (!this.isValid()) {
                    this._d = new Date(NaN);
                }
                // Prevent infinite loop in case updateOffset creates new moment
                // objects.
                if (updateInProgress === false) {
                    updateInProgress = true;
                    hooks.updateOffset(this);
                    updateInProgress = false;
                }
            }

            function isMoment(obj) {
                return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
            }

            function absFloor(number) {
                if (number < 0) {
                    // -0 -> 0
                    return Math.ceil(number) || 0;
                } else {
                    return Math.floor(number);
                }
            }

            function toInt(argumentForCoercion) {
                var coercedNumber = +argumentForCoercion,
                    value = 0;

                if (coercedNumber !== 0 && isFinite(coercedNumber)) {
                    value = absFloor(coercedNumber);
                }

                return value;
            }

            // compare two arrays, return the number of differences
            function compareArrays(array1, array2, dontConvert) {
                var len = Math.min(array1.length, array2.length),
                    lengthDiff = Math.abs(array1.length - array2.length),
                    diffs = 0,
                    i;
                for (i = 0; i < len; i++) {
                    if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
                        diffs++;
                    }
                }
                return diffs + lengthDiff;
            }

            function warn(msg) {
                if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
                    console.warn('Deprecation warning: ' + msg);
                }
            }

            function deprecate(msg, fn) {
                var firstTime = true;

                return extend(function () {
                    if (hooks.deprecationHandler != null) {
                        hooks.deprecationHandler(null, msg);
                    }
                    if (firstTime) {
                        var args = [];
                        var arg;
                        for (var i = 0; i < arguments.length; i++) {
                            arg = '';
                            if (typeof arguments[i] === 'object') {
                                arg += '\n[' + i + '] ';
                                for (var key in arguments[0]) {
                                    arg += key + ': ' + arguments[0][key] + ', ';
                                }
                                arg = arg.slice(0, -2); // Remove trailing comma and space
                            } else {
                                arg = arguments[i];
                            }
                            args.push(arg);
                        }
                        warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
                        firstTime = false;
                    }
                    return fn.apply(this, arguments);
                }, fn);
            }

            var deprecations = {};

            function deprecateSimple(name, msg) {
                if (hooks.deprecationHandler != null) {
                    hooks.deprecationHandler(name, msg);
                }
                if (!deprecations[name]) {
                    warn(msg);
                    deprecations[name] = true;
                }
            }

            hooks.suppressDeprecationWarnings = false;
            hooks.deprecationHandler = null;

            function isFunction(input) {
                return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
            }

            function set(config) {
                var prop, i;
                for (i in config) {
                    prop = config[i];
                    if (isFunction(prop)) {
                        this[i] = prop;
                    } else {
                        this['_' + i] = prop;
                    }
                }
                this._config = config;
                // Lenient ordinal parsing accepts just a number in addition to
                // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
                // TODO: Remove "ordinalParse" fallback in next major release.
                this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
            }

            function mergeConfigs(parentConfig, childConfig) {
                var res = extend({}, parentConfig),
                    prop;
                for (prop in childConfig) {
                    if (hasOwnProp(childConfig, prop)) {
                        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                            res[prop] = {};
                            extend(res[prop], parentConfig[prop]);
                            extend(res[prop], childConfig[prop]);
                        } else if (childConfig[prop] != null) {
                            res[prop] = childConfig[prop];
                        } else {
                            delete res[prop];
                        }
                    }
                }
                for (prop in parentConfig) {
                    if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
                        // make sure changes to properties don't modify parent config
                        res[prop] = extend({}, res[prop]);
                    }
                }
                return res;
            }

            function Locale(config) {
                if (config != null) {
                    this.set(config);
                }
            }

            var keys;

            if (Object.keys) {
                keys = Object.keys;
            } else {
                keys = function (obj) {
                    var i,
                        res = [];
                    for (i in obj) {
                        if (hasOwnProp(obj, i)) {
                            res.push(i);
                        }
                    }
                    return res;
                };
            }

            var keys$1 = keys;

            var defaultCalendar = {
                sameDay: '[Today at] LT',
                nextDay: '[Tomorrow at] LT',
                nextWeek: 'dddd [at] LT',
                lastDay: '[Yesterday at] LT',
                lastWeek: '[Last] dddd [at] LT',
                sameElse: 'L'
            };

            function calendar(key, mom, now) {
                var output = this._calendar[key] || this._calendar['sameElse'];
                return isFunction(output) ? output.call(mom, now) : output;
            }

            var defaultLongDateFormat = {
                LTS: 'h:mm:ss A',
                LT: 'h:mm A',
                L: 'MM/DD/YYYY',
                LL: 'MMMM D, YYYY',
                LLL: 'MMMM D, YYYY h:mm A',
                LLLL: 'dddd, MMMM D, YYYY h:mm A'
            };

            function longDateFormat(key) {
                var format = this._longDateFormat[key],
                    formatUpper = this._longDateFormat[key.toUpperCase()];

                if (format || !formatUpper) {
                    return format;
                }

                this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });

                return this._longDateFormat[key];
            }

            var defaultInvalidDate = 'Invalid date';

            function invalidDate() {
                return this._invalidDate;
            }

            var defaultOrdinal = '%d';
            var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

            function ordinal(number) {
                return this._ordinal.replace('%d', number);
            }

            var defaultRelativeTime = {
                future: 'in %s',
                past: '%s ago',
                s: 'a few seconds',
                ss: '%d seconds',
                m: 'a minute',
                mm: '%d minutes',
                h: 'an hour',
                hh: '%d hours',
                d: 'a day',
                dd: '%d days',
                M: 'a month',
                MM: '%d months',
                y: 'a year',
                yy: '%d years'
            };

            function relativeTime(number, withoutSuffix, string, isFuture) {
                var output = this._relativeTime[string];
                return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
            }

            function pastFuture(diff, output) {
                var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
                return isFunction(format) ? format(output) : format.replace(/%s/i, output);
            }

            var aliases = {};

            function addUnitAlias(unit, shorthand) {
                var lowerCase = unit.toLowerCase();
                aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
            }

            function normalizeUnits(units) {
                return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
            }

            function normalizeObjectUnits(inputObject) {
                var normalizedInput = {},
                    normalizedProp,
                    prop;

                for (prop in inputObject) {
                    if (hasOwnProp(inputObject, prop)) {
                        normalizedProp = normalizeUnits(prop);
                        if (normalizedProp) {
                            normalizedInput[normalizedProp] = inputObject[prop];
                        }
                    }
                }

                return normalizedInput;
            }

            var priorities = {};

            function addUnitPriority(unit, priority) {
                priorities[unit] = priority;
            }

            function getPrioritizedUnits(unitsObj) {
                var units = [];
                for (var u in unitsObj) {
                    units.push({ unit: u, priority: priorities[u] });
                }
                units.sort(function (a, b) {
                    return a.priority - b.priority;
                });
                return units;
            }

            function makeGetSet(unit, keepTime) {
                return function (value) {
                    if (value != null) {
                        set$1(this, unit, value);
                        hooks.updateOffset(this, keepTime);
                        return this;
                    } else {
                        return get(this, unit);
                    }
                };
            }

            function get(mom, unit) {
                return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
            }

            function set$1(mom, unit, value) {
                if (mom.isValid()) {
                    mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
                }
            }

            // MOMENTS

            function stringGet(units) {
                units = normalizeUnits(units);
                if (isFunction(this[units])) {
                    return this[units]();
                }
                return this;
            }

            function stringSet(units, value) {
                if (typeof units === 'object') {
                    units = normalizeObjectUnits(units);
                    var prioritized = getPrioritizedUnits(units);
                    for (var i = 0; i < prioritized.length; i++) {
                        this[prioritized[i].unit](units[prioritized[i].unit]);
                    }
                } else {
                    units = normalizeUnits(units);
                    if (isFunction(this[units])) {
                        return this[units](value);
                    }
                }
                return this;
            }

            function zeroFill(number, targetLength, forceSign) {
                var absNumber = '' + Math.abs(number),
                    zerosToFill = targetLength - absNumber.length,
                    sign = number >= 0;
                return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
            }

            var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

            var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

            var formatFunctions = {};

            var formatTokenFunctions = {};

            // token:    'M'
            // padded:   ['MM', 2]
            // ordinal:  'Mo'
            // callback: function () { this.month() + 1 }
            function addFormatToken(token, padded, ordinal, callback) {
                var func = callback;
                if (typeof callback === 'string') {
                    func = function () {
                        return this[callback]();
                    };
                }
                if (token) {
                    formatTokenFunctions[token] = func;
                }
                if (padded) {
                    formatTokenFunctions[padded[0]] = function () {
                        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
                    };
                }
                if (ordinal) {
                    formatTokenFunctions[ordinal] = function () {
                        return this.localeData().ordinal(func.apply(this, arguments), token);
                    };
                }
            }

            function removeFormattingTokens(input) {
                if (input.match(/\[[\s\S]/)) {
                    return input.replace(/^\[|\]$/g, '');
                }
                return input.replace(/\\/g, '');
            }

            function makeFormatFunction(format) {
                var array = format.match(formattingTokens),
                    i,
                    length;

                for (i = 0, length = array.length; i < length; i++) {
                    if (formatTokenFunctions[array[i]]) {
                        array[i] = formatTokenFunctions[array[i]];
                    } else {
                        array[i] = removeFormattingTokens(array[i]);
                    }
                }

                return function (mom) {
                    var output = '',
                        i;
                    for (i = 0; i < length; i++) {
                        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
                    }
                    return output;
                };
            }

            // format date using native date object
            function formatMoment(m, format) {
                if (!m.isValid()) {
                    return m.localeData().invalidDate();
                }

                format = expandFormat(format, m.localeData());
                formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

                return formatFunctions[format](m);
            }

            function expandFormat(format, locale) {
                var i = 5;

                function replaceLongDateFormatTokens(input) {
                    return locale.longDateFormat(input) || input;
                }

                localFormattingTokens.lastIndex = 0;
                while (i >= 0 && localFormattingTokens.test(format)) {
                    format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
                    localFormattingTokens.lastIndex = 0;
                    i -= 1;
                }

                return format;
            }

            var match1 = /\d/; //       0 - 9
            var match2 = /\d\d/; //      00 - 99
            var match3 = /\d{3}/; //     000 - 999
            var match4 = /\d{4}/; //    0000 - 9999
            var match6 = /[+-]?\d{6}/; // -999999 - 999999
            var match1to2 = /\d\d?/; //       0 - 99
            var match3to4 = /\d\d\d\d?/; //     999 - 9999
            var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999
            var match1to3 = /\d{1,3}/; //       0 - 999
            var match1to4 = /\d{1,4}/; //       0 - 9999
            var match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999

            var matchUnsigned = /\d+/; //       0 - inf
            var matchSigned = /[+-]?\d+/; //    -inf - inf

            var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
            var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

            var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

            // any word (or two) characters or numbers including two/three word month in arabic.
            // includes scottish gaelic two word and hyphenated months
            var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

            var regexes = {};

            function addRegexToken(token, regex, strictRegex) {
                regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
                    return isStrict && strictRegex ? strictRegex : regex;
                };
            }

            function getParseRegexForToken(token, config) {
                if (!hasOwnProp(regexes, token)) {
                    return new RegExp(unescapeFormat(token));
                }

                return regexes[token](config._strict, config._locale);
            }

            // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
            function unescapeFormat(s) {
                return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
                    return p1 || p2 || p3 || p4;
                }));
            }

            function regexEscape(s) {
                return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            }

            var tokens = {};

            function addParseToken(token, callback) {
                var i,
                    func = callback;
                if (typeof token === 'string') {
                    token = [token];
                }
                if (isNumber(callback)) {
                    func = function (input, array) {
                        array[callback] = toInt(input);
                    };
                }
                for (i = 0; i < token.length; i++) {
                    tokens[token[i]] = func;
                }
            }

            function addWeekParseToken(token, callback) {
                addParseToken(token, function (input, array, config, token) {
                    config._w = config._w || {};
                    callback(input, config._w, config, token);
                });
            }

            function addTimeToArrayFromToken(token, input, config) {
                if (input != null && hasOwnProp(tokens, token)) {
                    tokens[token](input, config._a, config, token);
                }
            }

            var YEAR = 0;
            var MONTH = 1;
            var DATE = 2;
            var HOUR = 3;
            var MINUTE = 4;
            var SECOND = 5;
            var MILLISECOND = 6;
            var WEEK = 7;
            var WEEKDAY = 8;

            var indexOf;

            if (Array.prototype.indexOf) {
                indexOf = Array.prototype.indexOf;
            } else {
                indexOf = function (o) {
                    // I know
                    var i;
                    for (i = 0; i < this.length; ++i) {
                        if (this[i] === o) {
                            return i;
                        }
                    }
                    return -1;
                };
            }

            var indexOf$1 = indexOf;

            function daysInMonth(year, month) {
                return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
            }

            // FORMATTING

            addFormatToken('M', ['MM', 2], 'Mo', function () {
                return this.month() + 1;
            });

            addFormatToken('MMM', 0, 0, function (format) {
                return this.localeData().monthsShort(this, format);
            });

            addFormatToken('MMMM', 0, 0, function (format) {
                return this.localeData().months(this, format);
            });

            // ALIASES

            addUnitAlias('month', 'M');

            // PRIORITY

            addUnitPriority('month', 8);

            // PARSING

            addRegexToken('M', match1to2);
            addRegexToken('MM', match1to2, match2);
            addRegexToken('MMM', function (isStrict, locale) {
                return locale.monthsShortRegex(isStrict);
            });
            addRegexToken('MMMM', function (isStrict, locale) {
                return locale.monthsRegex(isStrict);
            });

            addParseToken(['M', 'MM'], function (input, array) {
                array[MONTH] = toInt(input) - 1;
            });

            addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
                var month = config._locale.monthsParse(input, token, config._strict);
                // if we didn't find a month name, mark the date as invalid.
                if (month != null) {
                    array[MONTH] = month;
                } else {
                    getParsingFlags(config).invalidMonth = input;
                }
            });

            // LOCALES

            var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
            var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
            function localeMonths(m, format) {
                if (!m) {
                    return isArray(this._months) ? this._months : this._months['standalone'];
                }
                return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
            }

            var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
            function localeMonthsShort(m, format) {
                if (!m) {
                    return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
                }
                return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
            }

            function handleStrictParse(monthName, format, strict) {
                var i,
                    ii,
                    mom,
                    llc = monthName.toLocaleLowerCase();
                if (!this._monthsParse) {
                    // this is not used
                    this._monthsParse = [];
                    this._longMonthsParse = [];
                    this._shortMonthsParse = [];
                    for (i = 0; i < 12; ++i) {
                        mom = createUTC([2000, i]);
                        this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                        this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
                    }
                }

                if (strict) {
                    if (format === 'MMM') {
                        ii = indexOf$1.call(this._shortMonthsParse, llc);
                        return ii !== -1 ? ii : null;
                    } else {
                        ii = indexOf$1.call(this._longMonthsParse, llc);
                        return ii !== -1 ? ii : null;
                    }
                } else {
                    if (format === 'MMM') {
                        ii = indexOf$1.call(this._shortMonthsParse, llc);
                        if (ii !== -1) {
                            return ii;
                        }
                        ii = indexOf$1.call(this._longMonthsParse, llc);
                        return ii !== -1 ? ii : null;
                    } else {
                        ii = indexOf$1.call(this._longMonthsParse, llc);
                        if (ii !== -1) {
                            return ii;
                        }
                        ii = indexOf$1.call(this._shortMonthsParse, llc);
                        return ii !== -1 ? ii : null;
                    }
                }
            }

            function localeMonthsParse(monthName, format, strict) {
                var i, mom, regex;

                if (this._monthsParseExact) {
                    return handleStrictParse.call(this, monthName, format, strict);
                }

                if (!this._monthsParse) {
                    this._monthsParse = [];
                    this._longMonthsParse = [];
                    this._shortMonthsParse = [];
                }

                // TODO: add sorting
                // Sorting makes sure if one month (or abbr) is a prefix of another
                // see sorting in computeMonthsParse
                for (i = 0; i < 12; i++) {
                    // make the regex if we don't have it already
                    mom = createUTC([2000, i]);
                    if (strict && !this._longMonthsParse[i]) {
                        this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                        this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
                    }
                    if (!strict && !this._monthsParse[i]) {
                        regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                        this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                    }
                    // test the regex
                    if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                        return i;
                    } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                        return i;
                    } else if (!strict && this._monthsParse[i].test(monthName)) {
                        return i;
                    }
                }
            }

            // MOMENTS

            function setMonth(mom, value) {
                var dayOfMonth;

                if (!mom.isValid()) {
                    // No op
                    return mom;
                }

                if (typeof value === 'string') {
                    if (/^\d+$/.test(value)) {
                        value = toInt(value);
                    } else {
                        value = mom.localeData().monthsParse(value);
                        // TODO: Another silent failure?
                        if (!isNumber(value)) {
                            return mom;
                        }
                    }
                }

                dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
                return mom;
            }

            function getSetMonth(value) {
                if (value != null) {
                    setMonth(this, value);
                    hooks.updateOffset(this, true);
                    return this;
                } else {
                    return get(this, 'Month');
                }
            }

            function getDaysInMonth() {
                return daysInMonth(this.year(), this.month());
            }

            var defaultMonthsShortRegex = matchWord;
            function monthsShortRegex(isStrict) {
                if (this._monthsParseExact) {
                    if (!hasOwnProp(this, '_monthsRegex')) {
                        computeMonthsParse.call(this);
                    }
                    if (isStrict) {
                        return this._monthsShortStrictRegex;
                    } else {
                        return this._monthsShortRegex;
                    }
                } else {
                    if (!hasOwnProp(this, '_monthsShortRegex')) {
                        this._monthsShortRegex = defaultMonthsShortRegex;
                    }
                    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
                }
            }

            var defaultMonthsRegex = matchWord;
            function monthsRegex(isStrict) {
                if (this._monthsParseExact) {
                    if (!hasOwnProp(this, '_monthsRegex')) {
                        computeMonthsParse.call(this);
                    }
                    if (isStrict) {
                        return this._monthsStrictRegex;
                    } else {
                        return this._monthsRegex;
                    }
                } else {
                    if (!hasOwnProp(this, '_monthsRegex')) {
                        this._monthsRegex = defaultMonthsRegex;
                    }
                    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
                }
            }

            function computeMonthsParse() {
                function cmpLenRev(a, b) {
                    return b.length - a.length;
                }

                var shortPieces = [],
                    longPieces = [],
                    mixedPieces = [],
                    i,
                    mom;
                for (i = 0; i < 12; i++) {
                    // make the regex if we don't have it already
                    mom = createUTC([2000, i]);
                    shortPieces.push(this.monthsShort(mom, ''));
                    longPieces.push(this.months(mom, ''));
                    mixedPieces.push(this.months(mom, ''));
                    mixedPieces.push(this.monthsShort(mom, ''));
                }
                // Sorting makes sure if one month (or abbr) is a prefix of another it
                // will match the longer piece.
                shortPieces.sort(cmpLenRev);
                longPieces.sort(cmpLenRev);
                mixedPieces.sort(cmpLenRev);
                for (i = 0; i < 12; i++) {
                    shortPieces[i] = regexEscape(shortPieces[i]);
                    longPieces[i] = regexEscape(longPieces[i]);
                }
                for (i = 0; i < 24; i++) {
                    mixedPieces[i] = regexEscape(mixedPieces[i]);
                }

                this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
                this._monthsShortRegex = this._monthsRegex;
                this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
                this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
            }

            // FORMATTING

            addFormatToken('Y', 0, 0, function () {
                var y = this.year();
                return y <= 9999 ? '' + y : '+' + y;
            });

            addFormatToken(0, ['YY', 2], 0, function () {
                return this.year() % 100;
            });

            addFormatToken(0, ['YYYY', 4], 0, 'year');
            addFormatToken(0, ['YYYYY', 5], 0, 'year');
            addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

            // ALIASES

            addUnitAlias('year', 'y');

            // PRIORITIES

            addUnitPriority('year', 1);

            // PARSING

            addRegexToken('Y', matchSigned);
            addRegexToken('YY', match1to2, match2);
            addRegexToken('YYYY', match1to4, match4);
            addRegexToken('YYYYY', match1to6, match6);
            addRegexToken('YYYYYY', match1to6, match6);

            addParseToken(['YYYYY', 'YYYYYY'], YEAR);
            addParseToken('YYYY', function (input, array) {
                array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
            });
            addParseToken('YY', function (input, array) {
                array[YEAR] = hooks.parseTwoDigitYear(input);
            });
            addParseToken('Y', function (input, array) {
                array[YEAR] = parseInt(input, 10);
            });

            // HELPERS

            function daysInYear(year) {
                return isLeapYear(year) ? 366 : 365;
            }

            function isLeapYear(year) {
                return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
            }

            // HOOKS

            hooks.parseTwoDigitYear = function (input) {
                return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
            };

            // MOMENTS

            var getSetYear = makeGetSet('FullYear', true);

            function getIsLeapYear() {
                return isLeapYear(this.year());
            }

            function createDate(y, m, d, h, M, s, ms) {
                // can't just apply() to create a date:
                // https://stackoverflow.com/q/181348
                var date = new Date(y, m, d, h, M, s, ms);

                // the date constructor remaps years 0-99 to 1900-1999
                if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
                    date.setFullYear(y);
                }
                return date;
            }

            function createUTCDate(y) {
                var date = new Date(Date.UTC.apply(null, arguments));

                // the Date.UTC function remaps years 0-99 to 1900-1999
                if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
                    date.setUTCFullYear(y);
                }
                return date;
            }

            // start-of-first-week - start-of-year
            function firstWeekOffset(year, dow, doy) {
                var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
                fwd = 7 + dow - doy,

                // first-week day local weekday -- which local weekday is fwd
                fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

                return -fwdlw + fwd - 1;
            }

            // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
            function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
                var localWeekday = (7 + weekday - dow) % 7,
                    weekOffset = firstWeekOffset(year, dow, doy),
                    dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
                    resYear,
                    resDayOfYear;

                if (dayOfYear <= 0) {
                    resYear = year - 1;
                    resDayOfYear = daysInYear(resYear) + dayOfYear;
                } else if (dayOfYear > daysInYear(year)) {
                    resYear = year + 1;
                    resDayOfYear = dayOfYear - daysInYear(year);
                } else {
                    resYear = year;
                    resDayOfYear = dayOfYear;
                }

                return {
                    year: resYear,
                    dayOfYear: resDayOfYear
                };
            }

            function weekOfYear(mom, dow, doy) {
                var weekOffset = firstWeekOffset(mom.year(), dow, doy),
                    week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
                    resWeek,
                    resYear;

                if (week < 1) {
                    resYear = mom.year() - 1;
                    resWeek = week + weeksInYear(resYear, dow, doy);
                } else if (week > weeksInYear(mom.year(), dow, doy)) {
                    resWeek = week - weeksInYear(mom.year(), dow, doy);
                    resYear = mom.year() + 1;
                } else {
                    resYear = mom.year();
                    resWeek = week;
                }

                return {
                    week: resWeek,
                    year: resYear
                };
            }

            function weeksInYear(year, dow, doy) {
                var weekOffset = firstWeekOffset(year, dow, doy),
                    weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
                return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
            }

            // FORMATTING

            addFormatToken('w', ['ww', 2], 'wo', 'week');
            addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

            // ALIASES

            addUnitAlias('week', 'w');
            addUnitAlias('isoWeek', 'W');

            // PRIORITIES

            addUnitPriority('week', 5);
            addUnitPriority('isoWeek', 5);

            // PARSING

            addRegexToken('w', match1to2);
            addRegexToken('ww', match1to2, match2);
            addRegexToken('W', match1to2);
            addRegexToken('WW', match1to2, match2);

            addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
                week[token.substr(0, 1)] = toInt(input);
            });

            // HELPERS

            // LOCALES

            function localeWeek(mom) {
                return weekOfYear(mom, this._week.dow, this._week.doy).week;
            }

            var defaultLocaleWeek = {
                dow: 0, // Sunday is the first day of the week.
                doy: 6 // The week that contains Jan 1st is the first week of the year.
            };

            function localeFirstDayOfWeek() {
                return this._week.dow;
            }

            function localeFirstDayOfYear() {
                return this._week.doy;
            }

            // MOMENTS

            function getSetWeek(input) {
                var week = this.localeData().week(this);
                return input == null ? week : this.add((input - week) * 7, 'd');
            }

            function getSetISOWeek(input) {
                var week = weekOfYear(this, 1, 4).week;
                return input == null ? week : this.add((input - week) * 7, 'd');
            }

            // FORMATTING

            addFormatToken('d', 0, 'do', 'day');

            addFormatToken('dd', 0, 0, function (format) {
                return this.localeData().weekdaysMin(this, format);
            });

            addFormatToken('ddd', 0, 0, function (format) {
                return this.localeData().weekdaysShort(this, format);
            });

            addFormatToken('dddd', 0, 0, function (format) {
                return this.localeData().weekdays(this, format);
            });

            addFormatToken('e', 0, 0, 'weekday');
            addFormatToken('E', 0, 0, 'isoWeekday');

            // ALIASES

            addUnitAlias('day', 'd');
            addUnitAlias('weekday', 'e');
            addUnitAlias('isoWeekday', 'E');

            // PRIORITY
            addUnitPriority('day', 11);
            addUnitPriority('weekday', 11);
            addUnitPriority('isoWeekday', 11);

            // PARSING

            addRegexToken('d', match1to2);
            addRegexToken('e', match1to2);
            addRegexToken('E', match1to2);
            addRegexToken('dd', function (isStrict, locale) {
                return locale.weekdaysMinRegex(isStrict);
            });
            addRegexToken('ddd', function (isStrict, locale) {
                return locale.weekdaysShortRegex(isStrict);
            });
            addRegexToken('dddd', function (isStrict, locale) {
                return locale.weekdaysRegex(isStrict);
            });

            addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
                var weekday = config._locale.weekdaysParse(input, token, config._strict);
                // if we didn't get a weekday name, mark the date as invalid
                if (weekday != null) {
                    week.d = weekday;
                } else {
                    getParsingFlags(config).invalidWeekday = input;
                }
            });

            addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
                week[token] = toInt(input);
            });

            // HELPERS

            function parseWeekday(input, locale) {
                if (typeof input !== 'string') {
                    return input;
                }

                if (!isNaN(input)) {
                    return parseInt(input, 10);
                }

                input = locale.weekdaysParse(input);
                if (typeof input === 'number') {
                    return input;
                }

                return null;
            }

            function parseIsoWeekday(input, locale) {
                if (typeof input === 'string') {
                    return locale.weekdaysParse(input) % 7 || 7;
                }
                return isNaN(input) ? null : input;
            }

            // LOCALES

            var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
            function localeWeekdays(m, format) {
                if (!m) {
                    return isArray(this._weekdays) ? this._weekdays : this._weekdays['standalone'];
                }
                return isArray(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
            }

            var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
            function localeWeekdaysShort(m) {
                return m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
            }

            var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
            function localeWeekdaysMin(m) {
                return m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
            }

            function handleStrictParse$1(weekdayName, format, strict) {
                var i,
                    ii,
                    mom,
                    llc = weekdayName.toLocaleLowerCase();
                if (!this._weekdaysParse) {
                    this._weekdaysParse = [];
                    this._shortWeekdaysParse = [];
                    this._minWeekdaysParse = [];

                    for (i = 0; i < 7; ++i) {
                        mom = createUTC([2000, 1]).day(i);
                        this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                        this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
                    }
                }

                if (strict) {
                    if (format === 'dddd') {
                        ii = indexOf$1.call(this._weekdaysParse, llc);
                        return ii !== -1 ? ii : null;
                    } else if (format === 'ddd') {
                        ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                        return ii !== -1 ? ii : null;
                    } else {
                        ii = indexOf$1.call(this._minWeekdaysParse, llc);
                        return ii !== -1 ? ii : null;
                    }
                } else {
                    if (format === 'dddd') {
                        ii = indexOf$1.call(this._weekdaysParse, llc);
                        if (ii !== -1) {
                            return ii;
                        }
                        ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                        if (ii !== -1) {
                            return ii;
                        }
                        ii = indexOf$1.call(this._minWeekdaysParse, llc);
                        return ii !== -1 ? ii : null;
                    } else if (format === 'ddd') {
                        ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                        if (ii !== -1) {
                            return ii;
                        }
                        ii = indexOf$1.call(this._weekdaysParse, llc);
                        if (ii !== -1) {
                            return ii;
                        }
                        ii = indexOf$1.call(this._minWeekdaysParse, llc);
                        return ii !== -1 ? ii : null;
                    } else {
                        ii = indexOf$1.call(this._minWeekdaysParse, llc);
                        if (ii !== -1) {
                            return ii;
                        }
                        ii = indexOf$1.call(this._weekdaysParse, llc);
                        if (ii !== -1) {
                            return ii;
                        }
                        ii = indexOf$1.call(this._shortWeekdaysParse, llc);
                        return ii !== -1 ? ii : null;
                    }
                }
            }

            function localeWeekdaysParse(weekdayName, format, strict) {
                var i, mom, regex;

                if (this._weekdaysParseExact) {
                    return handleStrictParse$1.call(this, weekdayName, format, strict);
                }

                if (!this._weekdaysParse) {
                    this._weekdaysParse = [];
                    this._minWeekdaysParse = [];
                    this._shortWeekdaysParse = [];
                    this._fullWeekdaysParse = [];
                }

                for (i = 0; i < 7; i++) {
                    // make the regex if we don't have it already

                    mom = createUTC([2000, 1]).day(i);
                    if (strict && !this._fullWeekdaysParse[i]) {
                        this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                        this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                        this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
                    }
                    if (!this._weekdaysParse[i]) {
                        regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                        this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                    }
                    // test the regex
                    if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                        return i;
                    } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                        return i;
                    } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                        return i;
                    } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                        return i;
                    }
                }
            }

            // MOMENTS

            function getSetDayOfWeek(input) {
                if (!this.isValid()) {
                    return input != null ? this : NaN;
                }
                var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                if (input != null) {
                    input = parseWeekday(input, this.localeData());
                    return this.add(input - day, 'd');
                } else {
                    return day;
                }
            }

            function getSetLocaleDayOfWeek(input) {
                if (!this.isValid()) {
                    return input != null ? this : NaN;
                }
                var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
                return input == null ? weekday : this.add(input - weekday, 'd');
            }

            function getSetISODayOfWeek(input) {
                if (!this.isValid()) {
                    return input != null ? this : NaN;
                }

                // behaves the same as moment#day except
                // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
                // as a setter, sunday should belong to the previous week.

                if (input != null) {
                    var weekday = parseIsoWeekday(input, this.localeData());
                    return this.day(this.day() % 7 ? weekday : weekday - 7);
                } else {
                    return this.day() || 7;
                }
            }

            var defaultWeekdaysRegex = matchWord;
            function weekdaysRegex(isStrict) {
                if (this._weekdaysParseExact) {
                    if (!hasOwnProp(this, '_weekdaysRegex')) {
                        computeWeekdaysParse.call(this);
                    }
                    if (isStrict) {
                        return this._weekdaysStrictRegex;
                    } else {
                        return this._weekdaysRegex;
                    }
                } else {
                    if (!hasOwnProp(this, '_weekdaysRegex')) {
                        this._weekdaysRegex = defaultWeekdaysRegex;
                    }
                    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
                }
            }

            var defaultWeekdaysShortRegex = matchWord;
            function weekdaysShortRegex(isStrict) {
                if (this._weekdaysParseExact) {
                    if (!hasOwnProp(this, '_weekdaysRegex')) {
                        computeWeekdaysParse.call(this);
                    }
                    if (isStrict) {
                        return this._weekdaysShortStrictRegex;
                    } else {
                        return this._weekdaysShortRegex;
                    }
                } else {
                    if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
                    }
                    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
                }
            }

            var defaultWeekdaysMinRegex = matchWord;
            function weekdaysMinRegex(isStrict) {
                if (this._weekdaysParseExact) {
                    if (!hasOwnProp(this, '_weekdaysRegex')) {
                        computeWeekdaysParse.call(this);
                    }
                    if (isStrict) {
                        return this._weekdaysMinStrictRegex;
                    } else {
                        return this._weekdaysMinRegex;
                    }
                } else {
                    if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
                    }
                    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
                }
            }

            function computeWeekdaysParse() {
                function cmpLenRev(a, b) {
                    return b.length - a.length;
                }

                var minPieces = [],
                    shortPieces = [],
                    longPieces = [],
                    mixedPieces = [],
                    i,
                    mom,
                    minp,
                    shortp,
                    longp;
                for (i = 0; i < 7; i++) {
                    // make the regex if we don't have it already
                    mom = createUTC([2000, 1]).day(i);
                    minp = this.weekdaysMin(mom, '');
                    shortp = this.weekdaysShort(mom, '');
                    longp = this.weekdays(mom, '');
                    minPieces.push(minp);
                    shortPieces.push(shortp);
                    longPieces.push(longp);
                    mixedPieces.push(minp);
                    mixedPieces.push(shortp);
                    mixedPieces.push(longp);
                }
                // Sorting makes sure if one weekday (or abbr) is a prefix of another it
                // will match the longer piece.
                minPieces.sort(cmpLenRev);
                shortPieces.sort(cmpLenRev);
                longPieces.sort(cmpLenRev);
                mixedPieces.sort(cmpLenRev);
                for (i = 0; i < 7; i++) {
                    shortPieces[i] = regexEscape(shortPieces[i]);
                    longPieces[i] = regexEscape(longPieces[i]);
                    mixedPieces[i] = regexEscape(mixedPieces[i]);
                }

                this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
                this._weekdaysShortRegex = this._weekdaysRegex;
                this._weekdaysMinRegex = this._weekdaysRegex;

                this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
                this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
                this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
            }

            // FORMATTING

            function hFormat() {
                return this.hours() % 12 || 12;
            }

            function kFormat() {
                return this.hours() || 24;
            }

            addFormatToken('H', ['HH', 2], 0, 'hour');
            addFormatToken('h', ['hh', 2], 0, hFormat);
            addFormatToken('k', ['kk', 2], 0, kFormat);

            addFormatToken('hmm', 0, 0, function () {
                return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
            });

            addFormatToken('hmmss', 0, 0, function () {
                return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
            });

            addFormatToken('Hmm', 0, 0, function () {
                return '' + this.hours() + zeroFill(this.minutes(), 2);
            });

            addFormatToken('Hmmss', 0, 0, function () {
                return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
            });

            function meridiem(token, lowercase) {
                addFormatToken(token, 0, 0, function () {
                    return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
                });
            }

            meridiem('a', true);
            meridiem('A', false);

            // ALIASES

            addUnitAlias('hour', 'h');

            // PRIORITY
            addUnitPriority('hour', 13);

            // PARSING

            function matchMeridiem(isStrict, locale) {
                return locale._meridiemParse;
            }

            addRegexToken('a', matchMeridiem);
            addRegexToken('A', matchMeridiem);
            addRegexToken('H', match1to2);
            addRegexToken('h', match1to2);
            addRegexToken('k', match1to2);
            addRegexToken('HH', match1to2, match2);
            addRegexToken('hh', match1to2, match2);
            addRegexToken('kk', match1to2, match2);

            addRegexToken('hmm', match3to4);
            addRegexToken('hmmss', match5to6);
            addRegexToken('Hmm', match3to4);
            addRegexToken('Hmmss', match5to6);

            addParseToken(['H', 'HH'], HOUR);
            addParseToken(['k', 'kk'], function (input, array, config) {
                var kInput = toInt(input);
                array[HOUR] = kInput === 24 ? 0 : kInput;
            });
            addParseToken(['a', 'A'], function (input, array, config) {
                config._isPm = config._locale.isPM(input);
                config._meridiem = input;
            });
            addParseToken(['h', 'hh'], function (input, array, config) {
                array[HOUR] = toInt(input);
                getParsingFlags(config).bigHour = true;
            });
            addParseToken('hmm', function (input, array, config) {
                var pos = input.length - 2;
                array[HOUR] = toInt(input.substr(0, pos));
                array[MINUTE] = toInt(input.substr(pos));
                getParsingFlags(config).bigHour = true;
            });
            addParseToken('hmmss', function (input, array, config) {
                var pos1 = input.length - 4;
                var pos2 = input.length - 2;
                array[HOUR] = toInt(input.substr(0, pos1));
                array[MINUTE] = toInt(input.substr(pos1, 2));
                array[SECOND] = toInt(input.substr(pos2));
                getParsingFlags(config).bigHour = true;
            });
            addParseToken('Hmm', function (input, array, config) {
                var pos = input.length - 2;
                array[HOUR] = toInt(input.substr(0, pos));
                array[MINUTE] = toInt(input.substr(pos));
            });
            addParseToken('Hmmss', function (input, array, config) {
                var pos1 = input.length - 4;
                var pos2 = input.length - 2;
                array[HOUR] = toInt(input.substr(0, pos1));
                array[MINUTE] = toInt(input.substr(pos1, 2));
                array[SECOND] = toInt(input.substr(pos2));
            });

            // LOCALES

            function localeIsPM(input) {
                // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
                // Using charAt should be more compatible.
                return (input + '').toLowerCase().charAt(0) === 'p';
            }

            var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
            function localeMeridiem(hours, minutes, isLower) {
                if (hours > 11) {
                    return isLower ? 'pm' : 'PM';
                } else {
                    return isLower ? 'am' : 'AM';
                }
            }

            // MOMENTS

            // Setting the hour should keep the time, because the user explicitly
            // specified which hour he wants. So trying to maintain the same hour (in
            // a new timezone) makes sense. Adding/subtracting hours does not follow
            // this rule.
            var getSetHour = makeGetSet('Hours', true);

            // months
            // week
            // weekdays
            // meridiem
            var baseConfig = {
                calendar: defaultCalendar,
                longDateFormat: defaultLongDateFormat,
                invalidDate: defaultInvalidDate,
                ordinal: defaultOrdinal,
                dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
                relativeTime: defaultRelativeTime,

                months: defaultLocaleMonths,
                monthsShort: defaultLocaleMonthsShort,

                week: defaultLocaleWeek,

                weekdays: defaultLocaleWeekdays,
                weekdaysMin: defaultLocaleWeekdaysMin,
                weekdaysShort: defaultLocaleWeekdaysShort,

                meridiemParse: defaultLocaleMeridiemParse
            };

            // internal storage for locale config files
            var locales = {};
            var localeFamilies = {};
            var globalLocale;

            function normalizeLocale(key) {
                return key ? key.toLowerCase().replace('_', '-') : key;
            }

            // pick the locale from the array
            // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
            // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
            function chooseLocale(names) {
                var i = 0,
                    j,
                    next,
                    locale,
                    split;

                while (i < names.length) {
                    split = normalizeLocale(names[i]).split('-');
                    j = split.length;
                    next = normalizeLocale(names[i + 1]);
                    next = next ? next.split('-') : null;
                    while (j > 0) {
                        locale = loadLocale(split.slice(0, j).join('-'));
                        if (locale) {
                            return locale;
                        }
                        if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                            //the next array item is better than a shallower substring of this one
                            break;
                        }
                        j--;
                    }
                    i++;
                }
                return null;
            }

            function loadLocale(name) {
                var oldLocale = null;
                // TODO: Find a better way to register and load all the locales in Node
                if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
                    try {
                        oldLocale = globalLocale._abbr;
                        require('./locale/' + name);
                        // because defineLocale currently also sets the global locale, we
                        // want to undo that for lazy loaded locales
                        getSetGlobalLocale(oldLocale);
                    } catch (e) {}
                }
                return locales[name];
            }

            // This function will load locale and then set the global locale.  If
            // no arguments are passed in, it will simply return the current global
            // locale key.
            function getSetGlobalLocale(key, values) {
                var data;
                if (key) {
                    if (isUndefined(values)) {
                        data = getLocale(key);
                    } else {
                        data = defineLocale(key, values);
                    }

                    if (data) {
                        // moment.duration._locale = moment._locale = data;
                        globalLocale = data;
                    }
                }

                return globalLocale._abbr;
            }

            function defineLocale(name, config) {
                if (config !== null) {
                    var parentConfig = baseConfig;
                    config.abbr = name;
                    if (locales[name] != null) {
                        deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                        parentConfig = locales[name]._config;
                    } else if (config.parentLocale != null) {
                        if (locales[config.parentLocale] != null) {
                            parentConfig = locales[config.parentLocale]._config;
                        } else {
                            if (!localeFamilies[config.parentLocale]) {
                                localeFamilies[config.parentLocale] = [];
                            }
                            localeFamilies[config.parentLocale].push({
                                name: name,
                                config: config
                            });
                            return null;
                        }
                    }
                    locales[name] = new Locale(mergeConfigs(parentConfig, config));

                    if (localeFamilies[name]) {
                        localeFamilies[name].forEach(function (x) {
                            defineLocale(x.name, x.config);
                        });
                    }

                    // backwards compat for now: also set the locale
                    // make sure we set the locale AFTER all child locales have been
                    // created, so we won't end up with the child locale set.
                    getSetGlobalLocale(name);

                    return locales[name];
                } else {
                    // useful for testing
                    delete locales[name];
                    return null;
                }
            }

            function updateLocale(name, config) {
                if (config != null) {
                    var locale,
                        parentConfig = baseConfig;
                    // MERGE
                    if (locales[name] != null) {
                        parentConfig = locales[name]._config;
                    }
                    config = mergeConfigs(parentConfig, config);
                    locale = new Locale(config);
                    locale.parentLocale = locales[name];
                    locales[name] = locale;

                    // backwards compat for now: also set the locale
                    getSetGlobalLocale(name);
                } else {
                    // pass null for config to unupdate, useful for tests
                    if (locales[name] != null) {
                        if (locales[name].parentLocale != null) {
                            locales[name] = locales[name].parentLocale;
                        } else if (locales[name] != null) {
                            delete locales[name];
                        }
                    }
                }
                return locales[name];
            }

            // returns locale data
            function getLocale(key) {
                var locale;

                if (key && key._locale && key._locale._abbr) {
                    key = key._locale._abbr;
                }

                if (!key) {
                    return globalLocale;
                }

                if (!isArray(key)) {
                    //short-circuit everything else
                    locale = loadLocale(key);
                    if (locale) {
                        return locale;
                    }
                    key = [key];
                }

                return chooseLocale(key);
            }

            function listLocales() {
                return keys$1(locales);
            }

            function checkOverflow(m) {
                var overflow;
                var a = m._a;

                if (a && getParsingFlags(m).overflow === -2) {
                    overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

                    if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                        overflow = DATE;
                    }
                    if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                        overflow = WEEK;
                    }
                    if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                        overflow = WEEKDAY;
                    }

                    getParsingFlags(m).overflow = overflow;
                }

                return m;
            }

            // iso 8601 regex
            // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
            var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
            var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

            var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

            var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/],
            // YYYYMM is NOT allowed by the standard
            ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]];

            // iso time formats and regexes
            var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];

            var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

            // date from iso format
            function configFromISO(config) {
                var i,
                    l,
                    string = config._i,
                    match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
                    allowTime,
                    dateFormat,
                    timeFormat,
                    tzFormat;

                if (match) {
                    getParsingFlags(config).iso = true;

                    for (i = 0, l = isoDates.length; i < l; i++) {
                        if (isoDates[i][1].exec(match[1])) {
                            dateFormat = isoDates[i][0];
                            allowTime = isoDates[i][2] !== false;
                            break;
                        }
                    }
                    if (dateFormat == null) {
                        config._isValid = false;
                        return;
                    }
                    if (match[3]) {
                        for (i = 0, l = isoTimes.length; i < l; i++) {
                            if (isoTimes[i][1].exec(match[3])) {
                                // match[2] should be 'T' or space
                                timeFormat = (match[2] || ' ') + isoTimes[i][0];
                                break;
                            }
                        }
                        if (timeFormat == null) {
                            config._isValid = false;
                            return;
                        }
                    }
                    if (!allowTime && timeFormat != null) {
                        config._isValid = false;
                        return;
                    }
                    if (match[4]) {
                        if (tzRegex.exec(match[4])) {
                            tzFormat = 'Z';
                        } else {
                            config._isValid = false;
                            return;
                        }
                    }
                    config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
                    configFromStringAndFormat(config);
                } else {
                    config._isValid = false;
                }
            }

            // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
            var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

            // date and time from ref 2822 format
            function configFromRFC2822(config) {
                var string, match, dayFormat, dateFormat, timeFormat, tzFormat;
                var timezones = {
                    ' GMT': ' +0000',
                    ' EDT': ' -0400',
                    ' EST': ' -0500',
                    ' CDT': ' -0500',
                    ' CST': ' -0600',
                    ' MDT': ' -0600',
                    ' MST': ' -0700',
                    ' PDT': ' -0700',
                    ' PST': ' -0800'
                };
                var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
                var timezone, timezoneIndex;

                string = config._i.replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
                .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
                .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
                match = basicRfcRegex.exec(string);

                if (match) {
                    dayFormat = match[1] ? 'ddd' + (match[1].length === 5 ? ', ' : ' ') : '';
                    dateFormat = 'D MMM ' + (match[2].length > 10 ? 'YYYY ' : 'YY ');
                    timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

                    // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
                    if (match[1]) {
                        // day of week given
                        var momentDate = new Date(match[2]);
                        var momentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][momentDate.getDay()];

                        if (match[1].substr(0, 3) !== momentDay) {
                            getParsingFlags(config).weekdayMismatch = true;
                            config._isValid = false;
                            return;
                        }
                    }

                    switch (match[5].length) {
                        case 2:
                            // military
                            if (timezoneIndex === 0) {
                                timezone = ' +0000';
                            } else {
                                timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                                timezone = (timezoneIndex < 0 ? ' -' : ' +') + ('' + timezoneIndex).replace(/^-?/, '0').match(/..$/)[0] + '00';
                            }
                            break;
                        case 4:
                            // Zone
                            timezone = timezones[match[5]];
                            break;
                        default:
                            // UT or +/-9999
                            timezone = timezones[' GMT'];
                    }
                    match[5] = timezone;
                    config._i = match.splice(1).join('');
                    tzFormat = ' ZZ';
                    config._f = dayFormat + dateFormat + timeFormat + tzFormat;
                    configFromStringAndFormat(config);
                    getParsingFlags(config).rfc2822 = true;
                } else {
                    config._isValid = false;
                }
            }

            // date from iso format or fallback
            function configFromString(config) {
                var matched = aspNetJsonRegex.exec(config._i);

                if (matched !== null) {
                    config._d = new Date(+matched[1]);
                    return;
                }

                configFromISO(config);
                if (config._isValid === false) {
                    delete config._isValid;
                } else {
                    return;
                }

                configFromRFC2822(config);
                if (config._isValid === false) {
                    delete config._isValid;
                } else {
                    return;
                }

                // Final attempt, use Input Fallback
                hooks.createFromInputFallback(config);
            }

            hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
                config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
            });

            // Pick the first defined of two or three arguments.
            function defaults(a, b, c) {
                if (a != null) {
                    return a;
                }
                if (b != null) {
                    return b;
                }
                return c;
            }

            function currentDateArray(config) {
                // hooks is actually the exported moment object
                var nowValue = new Date(hooks.now());
                if (config._useUTC) {
                    return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
                }
                return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
            }

            // convert an array to a date.
            // the array should mirror the parameters below
            // note: all values past the year are optional and will default to the lowest possible value.
            // [year, month, day , hour, minute, second, millisecond]
            function configFromArray(config) {
                var i,
                    date,
                    input = [],
                    currentDate,
                    yearToUse;

                if (config._d) {
                    return;
                }

                currentDate = currentDateArray(config);

                //compute day of the year from weeks and weekdays
                if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
                    dayOfYearFromWeekInfo(config);
                }

                //if the day of the year is set, figure out what it is
                if (config._dayOfYear != null) {
                    yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

                    if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                        getParsingFlags(config)._overflowDayOfYear = true;
                    }

                    date = createUTCDate(yearToUse, 0, config._dayOfYear);
                    config._a[MONTH] = date.getUTCMonth();
                    config._a[DATE] = date.getUTCDate();
                }

                // Default to current date.
                // * if no year, month, day of month are given, default to today
                // * if day of month is given, default month and year
                // * if month is given, default only year
                // * if year is given, don't default anything
                for (i = 0; i < 3 && config._a[i] == null; ++i) {
                    config._a[i] = input[i] = currentDate[i];
                }

                // Zero out whatever was not defaulted, including time
                for (; i < 7; i++) {
                    config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
                }

                // Check for 24:00:00.000
                if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
                    config._nextDay = true;
                    config._a[HOUR] = 0;
                }

                config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
                // Apply timezone offset from input. The actual utcOffset can be changed
                // with parseZone.
                if (config._tzm != null) {
                    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
                }

                if (config._nextDay) {
                    config._a[HOUR] = 24;
                }
            }

            function dayOfYearFromWeekInfo(config) {
                var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

                w = config._w;
                if (w.GG != null || w.W != null || w.E != null) {
                    dow = 1;
                    doy = 4;

                    // TODO: We need to take the current isoWeekYear, but that depends on
                    // how we interpret now (local, utc, fixed offset). So create
                    // a now version of current config (take local/utc/offset flags, and
                    // create now).
                    weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
                    week = defaults(w.W, 1);
                    weekday = defaults(w.E, 1);
                    if (weekday < 1 || weekday > 7) {
                        weekdayOverflow = true;
                    }
                } else {
                    dow = config._locale._week.dow;
                    doy = config._locale._week.doy;

                    var curWeek = weekOfYear(createLocal(), dow, doy);

                    weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

                    // Default to current week.
                    week = defaults(w.w, curWeek.week);

                    if (w.d != null) {
                        // weekday -- low day numbers are considered next week
                        weekday = w.d;
                        if (weekday < 0 || weekday > 6) {
                            weekdayOverflow = true;
                        }
                    } else if (w.e != null) {
                        // local weekday -- counting starts from begining of week
                        weekday = w.e + dow;
                        if (w.e < 0 || w.e > 6) {
                            weekdayOverflow = true;
                        }
                    } else {
                        // default to begining of week
                        weekday = dow;
                    }
                }
                if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
                    getParsingFlags(config)._overflowWeeks = true;
                } else if (weekdayOverflow != null) {
                    getParsingFlags(config)._overflowWeekday = true;
                } else {
                    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
                    config._a[YEAR] = temp.year;
                    config._dayOfYear = temp.dayOfYear;
                }
            }

            // constant that refers to the ISO standard
            hooks.ISO_8601 = function () {};

            // constant that refers to the RFC 2822 form
            hooks.RFC_2822 = function () {};

            // date from string and format string
            function configFromStringAndFormat(config) {
                // TODO: Move this to another part of the creation flow to prevent circular deps
                if (config._f === hooks.ISO_8601) {
                    configFromISO(config);
                    return;
                }
                if (config._f === hooks.RFC_2822) {
                    configFromRFC2822(config);
                    return;
                }
                config._a = [];
                getParsingFlags(config).empty = true;

                // This array is used to make a Date, either with `new Date` or `Date.UTC`
                var string = '' + config._i,
                    i,
                    parsedInput,
                    tokens,
                    token,
                    skipped,
                    stringLength = string.length,
                    totalParsedInputLength = 0;

                tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

                for (i = 0; i < tokens.length; i++) {
                    token = tokens[i];
                    parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
                    // console.log('token', token, 'parsedInput', parsedInput,
                    //         'regex', getParseRegexForToken(token, config));
                    if (parsedInput) {
                        skipped = string.substr(0, string.indexOf(parsedInput));
                        if (skipped.length > 0) {
                            getParsingFlags(config).unusedInput.push(skipped);
                        }
                        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                        totalParsedInputLength += parsedInput.length;
                    }
                    // don't parse if it's not a known token
                    if (formatTokenFunctions[token]) {
                        if (parsedInput) {
                            getParsingFlags(config).empty = false;
                        } else {
                            getParsingFlags(config).unusedTokens.push(token);
                        }
                        addTimeToArrayFromToken(token, parsedInput, config);
                    } else if (config._strict && !parsedInput) {
                        getParsingFlags(config).unusedTokens.push(token);
                    }
                }

                // add remaining unparsed input length to the string
                getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
                if (string.length > 0) {
                    getParsingFlags(config).unusedInput.push(string);
                }

                // clear _12h flag if hour is <= 12
                if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
                    getParsingFlags(config).bigHour = undefined;
                }

                getParsingFlags(config).parsedDateParts = config._a.slice(0);
                getParsingFlags(config).meridiem = config._meridiem;
                // handle meridiem
                config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

                configFromArray(config);
                checkOverflow(config);
            }

            function meridiemFixWrap(locale, hour, meridiem) {
                var isPm;

                if (meridiem == null) {
                    // nothing to do
                    return hour;
                }
                if (locale.meridiemHour != null) {
                    return locale.meridiemHour(hour, meridiem);
                } else if (locale.isPM != null) {
                    // Fallback
                    isPm = locale.isPM(meridiem);
                    if (isPm && hour < 12) {
                        hour += 12;
                    }
                    if (!isPm && hour === 12) {
                        hour = 0;
                    }
                    return hour;
                } else {
                    // this is not supposed to happen
                    return hour;
                }
            }

            // date from string and array of format strings
            function configFromStringAndArray(config) {
                var tempConfig, bestMoment, scoreToBeat, i, currentScore;

                if (config._f.length === 0) {
                    getParsingFlags(config).invalidFormat = true;
                    config._d = new Date(NaN);
                    return;
                }

                for (i = 0; i < config._f.length; i++) {
                    currentScore = 0;
                    tempConfig = copyConfig({}, config);
                    if (config._useUTC != null) {
                        tempConfig._useUTC = config._useUTC;
                    }
                    tempConfig._f = config._f[i];
                    configFromStringAndFormat(tempConfig);

                    if (!isValid(tempConfig)) {
                        continue;
                    }

                    // if there is any input that was not parsed add a penalty for that format
                    currentScore += getParsingFlags(tempConfig).charsLeftOver;

                    //or tokens
                    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

                    getParsingFlags(tempConfig).score = currentScore;

                    if (scoreToBeat == null || currentScore < scoreToBeat) {
                        scoreToBeat = currentScore;
                        bestMoment = tempConfig;
                    }
                }

                extend(config, bestMoment || tempConfig);
            }

            function configFromObject(config) {
                if (config._d) {
                    return;
                }

                var i = normalizeObjectUnits(config._i);
                config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
                    return obj && parseInt(obj, 10);
                });

                configFromArray(config);
            }

            function createFromConfig(config) {
                var res = new Moment(checkOverflow(prepareConfig(config)));
                if (res._nextDay) {
                    // Adding is smart enough around DST
                    res.add(1, 'd');
                    res._nextDay = undefined;
                }

                return res;
            }

            function prepareConfig(config) {
                var input = config._i,
                    format = config._f;

                config._locale = config._locale || getLocale(config._l);

                if (input === null || format === undefined && input === '') {
                    return createInvalid({ nullInput: true });
                }

                if (typeof input === 'string') {
                    config._i = input = config._locale.preparse(input);
                }

                if (isMoment(input)) {
                    return new Moment(checkOverflow(input));
                } else if (isDate(input)) {
                    config._d = input;
                } else if (isArray(format)) {
                    configFromStringAndArray(config);
                } else if (format) {
                    configFromStringAndFormat(config);
                } else {
                    configFromInput(config);
                }

                if (!isValid(config)) {
                    config._d = null;
                }

                return config;
            }

            function configFromInput(config) {
                var input = config._i;
                if (isUndefined(input)) {
                    config._d = new Date(hooks.now());
                } else if (isDate(input)) {
                    config._d = new Date(input.valueOf());
                } else if (typeof input === 'string') {
                    configFromString(config);
                } else if (isArray(input)) {
                    config._a = map(input.slice(0), function (obj) {
                        return parseInt(obj, 10);
                    });
                    configFromArray(config);
                } else if (isObject(input)) {
                    configFromObject(config);
                } else if (isNumber(input)) {
                    // from milliseconds
                    config._d = new Date(input);
                } else {
                    hooks.createFromInputFallback(config);
                }
            }

            function createLocalOrUTC(input, format, locale, strict, isUTC) {
                var c = {};

                if (locale === true || locale === false) {
                    strict = locale;
                    locale = undefined;
                }

                if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
                    input = undefined;
                }
                // object construction must be done this way.
                // https://github.com/moment/moment/issues/1423
                c._isAMomentObject = true;
                c._useUTC = c._isUTC = isUTC;
                c._l = locale;
                c._i = input;
                c._f = format;
                c._strict = strict;

                return createFromConfig(c);
            }

            function createLocal(input, format, locale, strict) {
                return createLocalOrUTC(input, format, locale, strict, false);
            }

            var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            });

            var prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            });

            // Pick a moment m from moments so that m[fn](other) is true for all
            // other. This relies on the function fn to be transitive.
            //
            // moments should either be an array of moment objects or an array, whose
            // first element is an array of moment objects.
            function pickBy(fn, moments) {
                var res, i;
                if (moments.length === 1 && isArray(moments[0])) {
                    moments = moments[0];
                }
                if (!moments.length) {
                    return createLocal();
                }
                res = moments[0];
                for (i = 1; i < moments.length; ++i) {
                    if (!moments[i].isValid() || moments[i][fn](res)) {
                        res = moments[i];
                    }
                }
                return res;
            }

            // TODO: Use [].sort instead?
            function min() {
                var args = [].slice.call(arguments, 0);

                return pickBy('isBefore', args);
            }

            function max() {
                var args = [].slice.call(arguments, 0);

                return pickBy('isAfter', args);
            }

            var now = function () {
                return Date.now ? Date.now() : +new Date();
            };

            var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

            function isDurationValid(m) {
                for (var key in m) {
                    if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                        return false;
                    }
                }

                var unitHasDecimal = false;
                for (var i = 0; i < ordering.length; ++i) {
                    if (m[ordering[i]]) {
                        if (unitHasDecimal) {
                            return false; // only allow non-integers for smallest unit
                        }
                        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                            unitHasDecimal = true;
                        }
                    }
                }

                return true;
            }

            function isValid$1() {
                return this._isValid;
            }

            function createInvalid$1() {
                return createDuration(NaN);
            }

            function Duration(duration) {
                var normalizedInput = normalizeObjectUnits(duration),
                    years = normalizedInput.year || 0,
                    quarters = normalizedInput.quarter || 0,
                    months = normalizedInput.month || 0,
                    weeks = normalizedInput.week || 0,
                    days = normalizedInput.day || 0,
                    hours = normalizedInput.hour || 0,
                    minutes = normalizedInput.minute || 0,
                    seconds = normalizedInput.second || 0,
                    milliseconds = normalizedInput.millisecond || 0;

                this._isValid = isDurationValid(normalizedInput);

                // representation for dateAddRemove
                this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
                minutes * 6e4 + // 1000 * 60
                hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
                // Because of dateAddRemove treats 24 hours as different from a
                // day when working around DST, we need to store them separately
                this._days = +days + weeks * 7;
                // It is impossible translate months into days without knowing
                // which months you are are talking about, so we have to store
                // it separately.
                this._months = +months + quarters * 3 + years * 12;

                this._data = {};

                this._locale = getLocale();

                this._bubble();
            }

            function isDuration(obj) {
                return obj instanceof Duration;
            }

            function absRound(number) {
                if (number < 0) {
                    return Math.round(-1 * number) * -1;
                } else {
                    return Math.round(number);
                }
            }

            // FORMATTING

            function offset(token, separator) {
                addFormatToken(token, 0, 0, function () {
                    var offset = this.utcOffset();
                    var sign = '+';
                    if (offset < 0) {
                        offset = -offset;
                        sign = '-';
                    }
                    return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
                });
            }

            offset('Z', ':');
            offset('ZZ', '');

            // PARSING

            addRegexToken('Z', matchShortOffset);
            addRegexToken('ZZ', matchShortOffset);
            addParseToken(['Z', 'ZZ'], function (input, array, config) {
                config._useUTC = true;
                config._tzm = offsetFromString(matchShortOffset, input);
            });

            // HELPERS

            // timezone chunker
            // '+10:00' > ['10',  '00']
            // '-1530'  > ['-15', '30']
            var chunkOffset = /([\+\-]|\d\d)/gi;

            function offsetFromString(matcher, string) {
                var matches = (string || '').match(matcher);

                if (matches === null) {
                    return null;
                }

                var chunk = matches[matches.length - 1] || [];
                var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
                var minutes = +(parts[1] * 60) + toInt(parts[2]);

                return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
            }

            // Return a moment from input, that is local/utc/zone equivalent to model.
            function cloneWithOffset(input, model) {
                var res, diff;
                if (model._isUTC) {
                    res = model.clone();
                    diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
                    // Use low-level api, because this fn is low-level api.
                    res._d.setTime(res._d.valueOf() + diff);
                    hooks.updateOffset(res, false);
                    return res;
                } else {
                    return createLocal(input).local();
                }
            }

            function getDateOffset(m) {
                // On Firefox.24 Date#getTimezoneOffset returns a floating point.
                // https://github.com/moment/moment/pull/1871
                return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
            }

            // HOOKS

            // This function will be called whenever a moment is mutated.
            // It is intended to keep the offset in sync with the timezone.
            hooks.updateOffset = function () {};

            // MOMENTS

            // keepLocalTime = true means only change the timezone, without
            // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
            // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
            // +0200, so we adjust the time as needed, to be valid.
            //
            // Keeping the time actually adds/subtracts (one hour)
            // from the actual represented time. That is why we call updateOffset
            // a second time. In case it wants us to change the offset again
            // _changeInProgress == true case, then we have to adjust, because
            // there is no such time in the given timezone.
            function getSetOffset(input, keepLocalTime, keepMinutes) {
                var offset = this._offset || 0,
                    localAdjust;
                if (!this.isValid()) {
                    return input != null ? this : NaN;
                }
                if (input != null) {
                    if (typeof input === 'string') {
                        input = offsetFromString(matchShortOffset, input);
                        if (input === null) {
                            return this;
                        }
                    } else if (Math.abs(input) < 16 && !keepMinutes) {
                        input = input * 60;
                    }
                    if (!this._isUTC && keepLocalTime) {
                        localAdjust = getDateOffset(this);
                    }
                    this._offset = input;
                    this._isUTC = true;
                    if (localAdjust != null) {
                        this.add(localAdjust, 'm');
                    }
                    if (offset !== input) {
                        if (!keepLocalTime || this._changeInProgress) {
                            addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                        } else if (!this._changeInProgress) {
                            this._changeInProgress = true;
                            hooks.updateOffset(this, true);
                            this._changeInProgress = null;
                        }
                    }
                    return this;
                } else {
                    return this._isUTC ? offset : getDateOffset(this);
                }
            }

            function getSetZone(input, keepLocalTime) {
                if (input != null) {
                    if (typeof input !== 'string') {
                        input = -input;
                    }

                    this.utcOffset(input, keepLocalTime);

                    return this;
                } else {
                    return -this.utcOffset();
                }
            }

            function setOffsetToUTC(keepLocalTime) {
                return this.utcOffset(0, keepLocalTime);
            }

            function setOffsetToLocal(keepLocalTime) {
                if (this._isUTC) {
                    this.utcOffset(0, keepLocalTime);
                    this._isUTC = false;

                    if (keepLocalTime) {
                        this.subtract(getDateOffset(this), 'm');
                    }
                }
                return this;
            }

            function setOffsetToParsedOffset() {
                if (this._tzm != null) {
                    this.utcOffset(this._tzm, false, true);
                } else if (typeof this._i === 'string') {
                    var tZone = offsetFromString(matchOffset, this._i);
                    if (tZone != null) {
                        this.utcOffset(tZone);
                    } else {
                        this.utcOffset(0, true);
                    }
                }
                return this;
            }

            function hasAlignedHourOffset(input) {
                if (!this.isValid()) {
                    return false;
                }
                input = input ? createLocal(input).utcOffset() : 0;

                return (this.utcOffset() - input) % 60 === 0;
            }

            function isDaylightSavingTime() {
                return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
            }

            function isDaylightSavingTimeShifted() {
                if (!isUndefined(this._isDSTShifted)) {
                    return this._isDSTShifted;
                }

                var c = {};

                copyConfig(c, this);
                c = prepareConfig(c);

                if (c._a) {
                    var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
                    this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
                } else {
                    this._isDSTShifted = false;
                }

                return this._isDSTShifted;
            }

            function isLocal() {
                return this.isValid() ? !this._isUTC : false;
            }

            function isUtcOffset() {
                return this.isValid() ? this._isUTC : false;
            }

            function isUtc() {
                return this.isValid() ? this._isUTC && this._offset === 0 : false;
            }

            // ASP.NET json date format regex
            var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

            // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
            // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
            // and further modified to allow for strings containing both week and day
            var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

            function createDuration(input, key) {
                var duration = input,

                // matching against regexp is expensive, do it on demand
                match = null,
                    sign,
                    ret,
                    diffRes;

                if (isDuration(input)) {
                    duration = {
                        ms: input._milliseconds,
                        d: input._days,
                        M: input._months
                    };
                } else if (isNumber(input)) {
                    duration = {};
                    if (key) {
                        duration[key] = input;
                    } else {
                        duration.milliseconds = input;
                    }
                } else if (!!(match = aspNetRegex.exec(input))) {
                    sign = match[1] === '-' ? -1 : 1;
                    duration = {
                        y: 0,
                        d: toInt(match[DATE]) * sign,
                        h: toInt(match[HOUR]) * sign,
                        m: toInt(match[MINUTE]) * sign,
                        s: toInt(match[SECOND]) * sign,
                        ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
                    };
                } else if (!!(match = isoRegex.exec(input))) {
                    sign = match[1] === '-' ? -1 : 1;
                    duration = {
                        y: parseIso(match[2], sign),
                        M: parseIso(match[3], sign),
                        w: parseIso(match[4], sign),
                        d: parseIso(match[5], sign),
                        h: parseIso(match[6], sign),
                        m: parseIso(match[7], sign),
                        s: parseIso(match[8], sign)
                    };
                } else if (duration == null) {
                    // checks for null or undefined
                    duration = {};
                } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
                    diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

                    duration = {};
                    duration.ms = diffRes.milliseconds;
                    duration.M = diffRes.months;
                }

                ret = new Duration(duration);

                if (isDuration(input) && hasOwnProp(input, '_locale')) {
                    ret._locale = input._locale;
                }

                return ret;
            }

            createDuration.fn = Duration.prototype;
            createDuration.invalid = createInvalid$1;

            function parseIso(inp, sign) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            }

            function positiveMomentsDifference(base, other) {
                var res = { milliseconds: 0, months: 0 };

                res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
                if (base.clone().add(res.months, 'M').isAfter(other)) {
                    --res.months;
                }

                res.milliseconds = +other - +base.clone().add(res.months, 'M');

                return res;
            }

            function momentsDifference(base, other) {
                var res;
                if (!(base.isValid() && other.isValid())) {
                    return { milliseconds: 0, months: 0 };
                }

                other = cloneWithOffset(other, base);
                if (base.isBefore(other)) {
                    res = positiveMomentsDifference(base, other);
                } else {
                    res = positiveMomentsDifference(other, base);
                    res.milliseconds = -res.milliseconds;
                    res.months = -res.months;
                }

                return res;
            }

            // TODO: remove 'name' arg after deprecation is removed
            function createAdder(direction, name) {
                return function (val, period) {
                    var dur, tmp;
                    //invert the arguments, but complain about it
                    if (period !== null && !isNaN(+period)) {
                        deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                        tmp = val;val = period;period = tmp;
                    }

                    val = typeof val === 'string' ? +val : val;
                    dur = createDuration(val, period);
                    addSubtract(this, dur, direction);
                    return this;
                };
            }

            function addSubtract(mom, duration, isAdding, updateOffset) {
                var milliseconds = duration._milliseconds,
                    days = absRound(duration._days),
                    months = absRound(duration._months);

                if (!mom.isValid()) {
                    // No op
                    return;
                }

                updateOffset = updateOffset == null ? true : updateOffset;

                if (milliseconds) {
                    mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
                }
                if (days) {
                    set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
                }
                if (months) {
                    setMonth(mom, get(mom, 'Month') + months * isAdding);
                }
                if (updateOffset) {
                    hooks.updateOffset(mom, days || months);
                }
            }

            var add = createAdder(1, 'add');
            var subtract = createAdder(-1, 'subtract');

            function getCalendarFormat(myMoment, now) {
                var diff = myMoment.diff(now, 'days', true);
                return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
            }

            function calendar$1(time, formats) {
                // We want to compare the start of today, vs this.
                // Getting start-of-today depends on whether we're local/utc/offset or not.
                var now = time || createLocal(),
                    sod = cloneWithOffset(now, this).startOf('day'),
                    format = hooks.calendarFormat(this, sod) || 'sameElse';

                var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

                return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
            }

            function clone() {
                return new Moment(this);
            }

            function isAfter(input, units) {
                var localInput = isMoment(input) ? input : createLocal(input);
                if (!(this.isValid() && localInput.isValid())) {
                    return false;
                }
                units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
                if (units === 'millisecond') {
                    return this.valueOf() > localInput.valueOf();
                } else {
                    return localInput.valueOf() < this.clone().startOf(units).valueOf();
                }
            }

            function isBefore(input, units) {
                var localInput = isMoment(input) ? input : createLocal(input);
                if (!(this.isValid() && localInput.isValid())) {
                    return false;
                }
                units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
                if (units === 'millisecond') {
                    return this.valueOf() < localInput.valueOf();
                } else {
                    return this.clone().endOf(units).valueOf() < localInput.valueOf();
                }
            }

            function isBetween(from, to, units, inclusivity) {
                inclusivity = inclusivity || '()';
                return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) && (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
            }

            function isSame(input, units) {
                var localInput = isMoment(input) ? input : createLocal(input),
                    inputMs;
                if (!(this.isValid() && localInput.isValid())) {
                    return false;
                }
                units = normalizeUnits(units || 'millisecond');
                if (units === 'millisecond') {
                    return this.valueOf() === localInput.valueOf();
                } else {
                    inputMs = localInput.valueOf();
                    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
                }
            }

            function isSameOrAfter(input, units) {
                return this.isSame(input, units) || this.isAfter(input, units);
            }

            function isSameOrBefore(input, units) {
                return this.isSame(input, units) || this.isBefore(input, units);
            }

            function diff(input, units, asFloat) {
                var that, zoneDelta, delta, output;

                if (!this.isValid()) {
                    return NaN;
                }

                that = cloneWithOffset(input, this);

                if (!that.isValid()) {
                    return NaN;
                }

                zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

                units = normalizeUnits(units);

                if (units === 'year' || units === 'month' || units === 'quarter') {
                    output = monthDiff(this, that);
                    if (units === 'quarter') {
                        output = output / 3;
                    } else if (units === 'year') {
                        output = output / 12;
                    }
                } else {
                    delta = this - that;
                    output = units === 'second' ? delta / 1e3 : // 1000
                    units === 'minute' ? delta / 6e4 : // 1000 * 60
                    units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    delta;
                }
                return asFloat ? output : absFloor(output);
            }

            function monthDiff(a, b) {
                // difference in months
                var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),

                // b is in (anchor - 1 month, anchor + 1 month)
                anchor = a.clone().add(wholeMonthDiff, 'months'),
                    anchor2,
                    adjust;

                if (b - anchor < 0) {
                    anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
                    // linear across the month
                    adjust = (b - anchor) / (anchor - anchor2);
                } else {
                    anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
                    // linear across the month
                    adjust = (b - anchor) / (anchor2 - anchor);
                }

                //check for negative zero, return zero if negative zero
                return -(wholeMonthDiff + adjust) || 0;
            }

            hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
            hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

            function toString() {
                return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
            }

            function toISOString() {
                if (!this.isValid()) {
                    return null;
                }
                var m = this.clone().utc();
                if (m.year() < 0 || m.year() > 9999) {
                    return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
                if (isFunction(Date.prototype.toISOString)) {
                    // native implementation is ~50x faster, use it when we can
                    return this.toDate().toISOString();
                }
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }

            /**
             * Return a human readable representation of a moment that can
             * also be evaluated to get a new moment which is the same
             *
             * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
             */
            function inspect() {
                if (!this.isValid()) {
                    return 'moment.invalid(/* ' + this._i + ' */)';
                }
                var func = 'moment';
                var zone = '';
                if (!this.isLocal()) {
                    func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
                    zone = 'Z';
                }
                var prefix = '[' + func + '("]';
                var year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
                var datetime = '-MM-DD[T]HH:mm:ss.SSS';
                var suffix = zone + '[")]';

                return this.format(prefix + year + datetime + suffix);
            }

            function format(inputString) {
                if (!inputString) {
                    inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
                }
                var output = formatMoment(this, inputString);
                return this.localeData().postformat(output);
            }

            function from(time, withoutSuffix) {
                if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
                    return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
                } else {
                    return this.localeData().invalidDate();
                }
            }

            function fromNow(withoutSuffix) {
                return this.from(createLocal(), withoutSuffix);
            }

            function to(time, withoutSuffix) {
                if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
                    return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
                } else {
                    return this.localeData().invalidDate();
                }
            }

            function toNow(withoutSuffix) {
                return this.to(createLocal(), withoutSuffix);
            }

            // If passed a locale key, it will set the locale for this
            // instance.  Otherwise, it will return the locale configuration
            // variables for this instance.
            function locale(key) {
                var newLocaleData;

                if (key === undefined) {
                    return this._locale._abbr;
                } else {
                    newLocaleData = getLocale(key);
                    if (newLocaleData != null) {
                        this._locale = newLocaleData;
                    }
                    return this;
                }
            }

            var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            });

            function localeData() {
                return this._locale;
            }

            function startOf(units) {
                units = normalizeUnits(units);
                // the following switch intentionally omits break keywords
                // to utilize falling through the cases.
                switch (units) {
                    case 'year':
                        this.month(0);
                    /* falls through */
                    case 'quarter':
                    case 'month':
                        this.date(1);
                    /* falls through */
                    case 'week':
                    case 'isoWeek':
                    case 'day':
                    case 'date':
                        this.hours(0);
                    /* falls through */
                    case 'hour':
                        this.minutes(0);
                    /* falls through */
                    case 'minute':
                        this.seconds(0);
                    /* falls through */
                    case 'second':
                        this.milliseconds(0);
                }

                // weeks are a special case
                if (units === 'week') {
                    this.weekday(0);
                }
                if (units === 'isoWeek') {
                    this.isoWeekday(1);
                }

                // quarters are also special
                if (units === 'quarter') {
                    this.month(Math.floor(this.month() / 3) * 3);
                }

                return this;
            }

            function endOf(units) {
                units = normalizeUnits(units);
                if (units === undefined || units === 'millisecond') {
                    return this;
                }

                // 'date' is an alias for 'day', so it should be considered as such.
                if (units === 'date') {
                    units = 'day';
                }

                return this.startOf(units).add(1, units === 'isoWeek' ? 'week' : units).subtract(1, 'ms');
            }

            function valueOf() {
                return this._d.valueOf() - (this._offset || 0) * 60000;
            }

            function unix() {
                return Math.floor(this.valueOf() / 1000);
            }

            function toDate() {
                return new Date(this.valueOf());
            }

            function toArray() {
                var m = this;
                return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
            }

            function toObject() {
                var m = this;
                return {
                    years: m.year(),
                    months: m.month(),
                    date: m.date(),
                    hours: m.hours(),
                    minutes: m.minutes(),
                    seconds: m.seconds(),
                    milliseconds: m.milliseconds()
                };
            }

            function toJSON() {
                // new Date(NaN).toJSON() === null
                return this.isValid() ? this.toISOString() : null;
            }

            function isValid$2() {
                return isValid(this);
            }

            function parsingFlags() {
                return extend({}, getParsingFlags(this));
            }

            function invalidAt() {
                return getParsingFlags(this).overflow;
            }

            function creationData() {
                return {
                    input: this._i,
                    format: this._f,
                    locale: this._locale,
                    isUTC: this._isUTC,
                    strict: this._strict
                };
            }

            // FORMATTING

            addFormatToken(0, ['gg', 2], 0, function () {
                return this.weekYear() % 100;
            });

            addFormatToken(0, ['GG', 2], 0, function () {
                return this.isoWeekYear() % 100;
            });

            function addWeekYearFormatToken(token, getter) {
                addFormatToken(0, [token, token.length], 0, getter);
            }

            addWeekYearFormatToken('gggg', 'weekYear');
            addWeekYearFormatToken('ggggg', 'weekYear');
            addWeekYearFormatToken('GGGG', 'isoWeekYear');
            addWeekYearFormatToken('GGGGG', 'isoWeekYear');

            // ALIASES

            addUnitAlias('weekYear', 'gg');
            addUnitAlias('isoWeekYear', 'GG');

            // PRIORITY

            addUnitPriority('weekYear', 1);
            addUnitPriority('isoWeekYear', 1);

            // PARSING

            addRegexToken('G', matchSigned);
            addRegexToken('g', matchSigned);
            addRegexToken('GG', match1to2, match2);
            addRegexToken('gg', match1to2, match2);
            addRegexToken('GGGG', match1to4, match4);
            addRegexToken('gggg', match1to4, match4);
            addRegexToken('GGGGG', match1to6, match6);
            addRegexToken('ggggg', match1to6, match6);

            addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
                week[token.substr(0, 2)] = toInt(input);
            });

            addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
                week[token] = hooks.parseTwoDigitYear(input);
            });

            // MOMENTS

            function getSetWeekYear(input) {
                return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
            }

            function getSetISOWeekYear(input) {
                return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
            }

            function getISOWeeksInYear() {
                return weeksInYear(this.year(), 1, 4);
            }

            function getWeeksInYear() {
                var weekInfo = this.localeData()._week;
                return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
            }

            function getSetWeekYearHelper(input, week, weekday, dow, doy) {
                var weeksTarget;
                if (input == null) {
                    return weekOfYear(this, dow, doy).year;
                } else {
                    weeksTarget = weeksInYear(input, dow, doy);
                    if (week > weeksTarget) {
                        week = weeksTarget;
                    }
                    return setWeekAll.call(this, input, week, weekday, dow, doy);
                }
            }

            function setWeekAll(weekYear, week, weekday, dow, doy) {
                var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
                    date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

                this.year(date.getUTCFullYear());
                this.month(date.getUTCMonth());
                this.date(date.getUTCDate());
                return this;
            }

            // FORMATTING

            addFormatToken('Q', 0, 'Qo', 'quarter');

            // ALIASES

            addUnitAlias('quarter', 'Q');

            // PRIORITY

            addUnitPriority('quarter', 7);

            // PARSING

            addRegexToken('Q', match1);
            addParseToken('Q', function (input, array) {
                array[MONTH] = (toInt(input) - 1) * 3;
            });

            // MOMENTS

            function getSetQuarter(input) {
                return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
            }

            // FORMATTING

            addFormatToken('D', ['DD', 2], 'Do', 'date');

            // ALIASES

            addUnitAlias('date', 'D');

            // PRIOROITY
            addUnitPriority('date', 9);

            // PARSING

            addRegexToken('D', match1to2);
            addRegexToken('DD', match1to2, match2);
            addRegexToken('Do', function (isStrict, locale) {
                // TODO: Remove "ordinalParse" fallback in next major release.
                return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
            });

            addParseToken(['D', 'DD'], DATE);
            addParseToken('Do', function (input, array) {
                array[DATE] = toInt(input.match(match1to2)[0], 10);
            });

            // MOMENTS

            var getSetDayOfMonth = makeGetSet('Date', true);

            // FORMATTING

            addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

            // ALIASES

            addUnitAlias('dayOfYear', 'DDD');

            // PRIORITY
            addUnitPriority('dayOfYear', 4);

            // PARSING

            addRegexToken('DDD', match1to3);
            addRegexToken('DDDD', match3);
            addParseToken(['DDD', 'DDDD'], function (input, array, config) {
                config._dayOfYear = toInt(input);
            });

            // HELPERS

            // MOMENTS

            function getSetDayOfYear(input) {
                var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
                return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
            }

            // FORMATTING

            addFormatToken('m', ['mm', 2], 0, 'minute');

            // ALIASES

            addUnitAlias('minute', 'm');

            // PRIORITY

            addUnitPriority('minute', 14);

            // PARSING

            addRegexToken('m', match1to2);
            addRegexToken('mm', match1to2, match2);
            addParseToken(['m', 'mm'], MINUTE);

            // MOMENTS

            var getSetMinute = makeGetSet('Minutes', false);

            // FORMATTING

            addFormatToken('s', ['ss', 2], 0, 'second');

            // ALIASES

            addUnitAlias('second', 's');

            // PRIORITY

            addUnitPriority('second', 15);

            // PARSING

            addRegexToken('s', match1to2);
            addRegexToken('ss', match1to2, match2);
            addParseToken(['s', 'ss'], SECOND);

            // MOMENTS

            var getSetSecond = makeGetSet('Seconds', false);

            // FORMATTING

            addFormatToken('S', 0, 0, function () {
                return ~~(this.millisecond() / 100);
            });

            addFormatToken(0, ['SS', 2], 0, function () {
                return ~~(this.millisecond() / 10);
            });

            addFormatToken(0, ['SSS', 3], 0, 'millisecond');
            addFormatToken(0, ['SSSS', 4], 0, function () {
                return this.millisecond() * 10;
            });
            addFormatToken(0, ['SSSSS', 5], 0, function () {
                return this.millisecond() * 100;
            });
            addFormatToken(0, ['SSSSSS', 6], 0, function () {
                return this.millisecond() * 1000;
            });
            addFormatToken(0, ['SSSSSSS', 7], 0, function () {
                return this.millisecond() * 10000;
            });
            addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
                return this.millisecond() * 100000;
            });
            addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
                return this.millisecond() * 1000000;
            });

            // ALIASES

            addUnitAlias('millisecond', 'ms');

            // PRIORITY

            addUnitPriority('millisecond', 16);

            // PARSING

            addRegexToken('S', match1to3, match1);
            addRegexToken('SS', match1to3, match2);
            addRegexToken('SSS', match1to3, match3);

            var token;
            for (token = 'SSSS'; token.length <= 9; token += 'S') {
                addRegexToken(token, matchUnsigned);
            }

            function parseMs(input, array) {
                array[MILLISECOND] = toInt(('0.' + input) * 1000);
            }

            for (token = 'S'; token.length <= 9; token += 'S') {
                addParseToken(token, parseMs);
            }
            // MOMENTS

            var getSetMillisecond = makeGetSet('Milliseconds', false);

            // FORMATTING

            addFormatToken('z', 0, 0, 'zoneAbbr');
            addFormatToken('zz', 0, 0, 'zoneName');

            // MOMENTS

            function getZoneAbbr() {
                return this._isUTC ? 'UTC' : '';
            }

            function getZoneName() {
                return this._isUTC ? 'Coordinated Universal Time' : '';
            }

            var proto = Moment.prototype;

            proto.add = add;
            proto.calendar = calendar$1;
            proto.clone = clone;
            proto.diff = diff;
            proto.endOf = endOf;
            proto.format = format;
            proto.from = from;
            proto.fromNow = fromNow;
            proto.to = to;
            proto.toNow = toNow;
            proto.get = stringGet;
            proto.invalidAt = invalidAt;
            proto.isAfter = isAfter;
            proto.isBefore = isBefore;
            proto.isBetween = isBetween;
            proto.isSame = isSame;
            proto.isSameOrAfter = isSameOrAfter;
            proto.isSameOrBefore = isSameOrBefore;
            proto.isValid = isValid$2;
            proto.lang = lang;
            proto.locale = locale;
            proto.localeData = localeData;
            proto.max = prototypeMax;
            proto.min = prototypeMin;
            proto.parsingFlags = parsingFlags;
            proto.set = stringSet;
            proto.startOf = startOf;
            proto.subtract = subtract;
            proto.toArray = toArray;
            proto.toObject = toObject;
            proto.toDate = toDate;
            proto.toISOString = toISOString;
            proto.inspect = inspect;
            proto.toJSON = toJSON;
            proto.toString = toString;
            proto.unix = unix;
            proto.valueOf = valueOf;
            proto.creationData = creationData;

            // Year
            proto.year = getSetYear;
            proto.isLeapYear = getIsLeapYear;

            // Week Year
            proto.weekYear = getSetWeekYear;
            proto.isoWeekYear = getSetISOWeekYear;

            // Quarter
            proto.quarter = proto.quarters = getSetQuarter;

            // Month
            proto.month = getSetMonth;
            proto.daysInMonth = getDaysInMonth;

            // Week
            proto.week = proto.weeks = getSetWeek;
            proto.isoWeek = proto.isoWeeks = getSetISOWeek;
            proto.weeksInYear = getWeeksInYear;
            proto.isoWeeksInYear = getISOWeeksInYear;

            // Day
            proto.date = getSetDayOfMonth;
            proto.day = proto.days = getSetDayOfWeek;
            proto.weekday = getSetLocaleDayOfWeek;
            proto.isoWeekday = getSetISODayOfWeek;
            proto.dayOfYear = getSetDayOfYear;

            // Hour
            proto.hour = proto.hours = getSetHour;

            // Minute
            proto.minute = proto.minutes = getSetMinute;

            // Second
            proto.second = proto.seconds = getSetSecond;

            // Millisecond
            proto.millisecond = proto.milliseconds = getSetMillisecond;

            // Offset
            proto.utcOffset = getSetOffset;
            proto.utc = setOffsetToUTC;
            proto.local = setOffsetToLocal;
            proto.parseZone = setOffsetToParsedOffset;
            proto.hasAlignedHourOffset = hasAlignedHourOffset;
            proto.isDST = isDaylightSavingTime;
            proto.isLocal = isLocal;
            proto.isUtcOffset = isUtcOffset;
            proto.isUtc = isUtc;
            proto.isUTC = isUtc;

            // Timezone
            proto.zoneAbbr = getZoneAbbr;
            proto.zoneName = getZoneName;

            // Deprecations
            proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
            proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
            proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
            proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
            proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

            function createUnix(input) {
                return createLocal(input * 1000);
            }

            function createInZone() {
                return createLocal.apply(null, arguments).parseZone();
            }

            function preParsePostFormat(string) {
                return string;
            }

            var proto$1 = Locale.prototype;

            proto$1.calendar = calendar;
            proto$1.longDateFormat = longDateFormat;
            proto$1.invalidDate = invalidDate;
            proto$1.ordinal = ordinal;
            proto$1.preparse = preParsePostFormat;
            proto$1.postformat = preParsePostFormat;
            proto$1.relativeTime = relativeTime;
            proto$1.pastFuture = pastFuture;
            proto$1.set = set;

            // Month
            proto$1.months = localeMonths;
            proto$1.monthsShort = localeMonthsShort;
            proto$1.monthsParse = localeMonthsParse;
            proto$1.monthsRegex = monthsRegex;
            proto$1.monthsShortRegex = monthsShortRegex;

            // Week
            proto$1.week = localeWeek;
            proto$1.firstDayOfYear = localeFirstDayOfYear;
            proto$1.firstDayOfWeek = localeFirstDayOfWeek;

            // Day of Week
            proto$1.weekdays = localeWeekdays;
            proto$1.weekdaysMin = localeWeekdaysMin;
            proto$1.weekdaysShort = localeWeekdaysShort;
            proto$1.weekdaysParse = localeWeekdaysParse;

            proto$1.weekdaysRegex = weekdaysRegex;
            proto$1.weekdaysShortRegex = weekdaysShortRegex;
            proto$1.weekdaysMinRegex = weekdaysMinRegex;

            // Hours
            proto$1.isPM = localeIsPM;
            proto$1.meridiem = localeMeridiem;

            function get$1(format, index, field, setter) {
                var locale = getLocale();
                var utc = createUTC().set(setter, index);
                return locale[field](utc, format);
            }

            function listMonthsImpl(format, index, field) {
                if (isNumber(format)) {
                    index = format;
                    format = undefined;
                }

                format = format || '';

                if (index != null) {
                    return get$1(format, index, field, 'month');
                }

                var i;
                var out = [];
                for (i = 0; i < 12; i++) {
                    out[i] = get$1(format, i, field, 'month');
                }
                return out;
            }

            // ()
            // (5)
            // (fmt, 5)
            // (fmt)
            // (true)
            // (true, 5)
            // (true, fmt, 5)
            // (true, fmt)
            function listWeekdaysImpl(localeSorted, format, index, field) {
                if (typeof localeSorted === 'boolean') {
                    if (isNumber(format)) {
                        index = format;
                        format = undefined;
                    }

                    format = format || '';
                } else {
                    format = localeSorted;
                    index = format;
                    localeSorted = false;

                    if (isNumber(format)) {
                        index = format;
                        format = undefined;
                    }

                    format = format || '';
                }

                var locale = getLocale(),
                    shift = localeSorted ? locale._week.dow : 0;

                if (index != null) {
                    return get$1(format, (index + shift) % 7, field, 'day');
                }

                var i;
                var out = [];
                for (i = 0; i < 7; i++) {
                    out[i] = get$1(format, (i + shift) % 7, field, 'day');
                }
                return out;
            }

            function listMonths(format, index) {
                return listMonthsImpl(format, index, 'months');
            }

            function listMonthsShort(format, index) {
                return listMonthsImpl(format, index, 'monthsShort');
            }

            function listWeekdays(localeSorted, format, index) {
                return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
            }

            function listWeekdaysShort(localeSorted, format, index) {
                return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
            }

            function listWeekdaysMin(localeSorted, format, index) {
                return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
            }

            getSetGlobalLocale('en', {
                dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                ordinal: function (number) {
                    var b = number % 10,
                        output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
                    return number + output;
                }
            });

            // Side effect imports
            hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
            hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

            var mathAbs = Math.abs;

            function abs() {
                var data = this._data;

                this._milliseconds = mathAbs(this._milliseconds);
                this._days = mathAbs(this._days);
                this._months = mathAbs(this._months);

                data.milliseconds = mathAbs(data.milliseconds);
                data.seconds = mathAbs(data.seconds);
                data.minutes = mathAbs(data.minutes);
                data.hours = mathAbs(data.hours);
                data.months = mathAbs(data.months);
                data.years = mathAbs(data.years);

                return this;
            }

            function addSubtract$1(duration, input, value, direction) {
                var other = createDuration(input, value);

                duration._milliseconds += direction * other._milliseconds;
                duration._days += direction * other._days;
                duration._months += direction * other._months;

                return duration._bubble();
            }

            // supports only 2.0-style add(1, 's') or add(duration)
            function add$1(input, value) {
                return addSubtract$1(this, input, value, 1);
            }

            // supports only 2.0-style subtract(1, 's') or subtract(duration)
            function subtract$1(input, value) {
                return addSubtract$1(this, input, value, -1);
            }

            function absCeil(number) {
                if (number < 0) {
                    return Math.floor(number);
                } else {
                    return Math.ceil(number);
                }
            }

            function bubble() {
                var milliseconds = this._milliseconds;
                var days = this._days;
                var months = this._months;
                var data = this._data;
                var seconds, minutes, hours, years, monthsFromDays;

                // if we have a mix of positive and negative values, bubble down first
                // check: https://github.com/moment/moment/issues/2166
                if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
                    milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
                    days = 0;
                    months = 0;
                }

                // The following code bubbles up values, see the tests for
                // examples of what that means.
                data.milliseconds = milliseconds % 1000;

                seconds = absFloor(milliseconds / 1000);
                data.seconds = seconds % 60;

                minutes = absFloor(seconds / 60);
                data.minutes = minutes % 60;

                hours = absFloor(minutes / 60);
                data.hours = hours % 24;

                days += absFloor(hours / 24);

                // convert days to months
                monthsFromDays = absFloor(daysToMonths(days));
                months += monthsFromDays;
                days -= absCeil(monthsToDays(monthsFromDays));

                // 12 months -> 1 year
                years = absFloor(months / 12);
                months %= 12;

                data.days = days;
                data.months = months;
                data.years = years;

                return this;
            }

            function daysToMonths(days) {
                // 400 years have 146097 days (taking into account leap year rules)
                // 400 years have 12 months === 4800
                return days * 4800 / 146097;
            }

            function monthsToDays(months) {
                // the reverse of daysToMonths
                return months * 146097 / 4800;
            }

            function as(units) {
                if (!this.isValid()) {
                    return NaN;
                }
                var days;
                var months;
                var milliseconds = this._milliseconds;

                units = normalizeUnits(units);

                if (units === 'month' || units === 'year') {
                    days = this._days + milliseconds / 864e5;
                    months = this._months + daysToMonths(days);
                    return units === 'month' ? months : months / 12;
                } else {
                    // handle milliseconds separately because of floating point math errors (issue #1867)
                    days = this._days + Math.round(monthsToDays(this._months));
                    switch (units) {
                        case 'week':
                            return days / 7 + milliseconds / 6048e5;
                        case 'day':
                            return days + milliseconds / 864e5;
                        case 'hour':
                            return days * 24 + milliseconds / 36e5;
                        case 'minute':
                            return days * 1440 + milliseconds / 6e4;
                        case 'second':
                            return days * 86400 + milliseconds / 1000;
                        // Math.floor prevents floating point math errors here
                        case 'millisecond':
                            return Math.floor(days * 864e5) + milliseconds;
                        default:
                            throw new Error('Unknown unit ' + units);
                    }
                }
            }

            // TODO: Use this.as('ms')?
            function valueOf$1() {
                if (!this.isValid()) {
                    return NaN;
                }
                return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
            }

            function makeAs(alias) {
                return function () {
                    return this.as(alias);
                };
            }

            var asMilliseconds = makeAs('ms');
            var asSeconds = makeAs('s');
            var asMinutes = makeAs('m');
            var asHours = makeAs('h');
            var asDays = makeAs('d');
            var asWeeks = makeAs('w');
            var asMonths = makeAs('M');
            var asYears = makeAs('y');

            function get$2(units) {
                units = normalizeUnits(units);
                return this.isValid() ? this[units + 's']() : NaN;
            }

            function makeGetter(name) {
                return function () {
                    return this.isValid() ? this._data[name] : NaN;
                };
            }

            var milliseconds = makeGetter('milliseconds');
            var seconds = makeGetter('seconds');
            var minutes = makeGetter('minutes');
            var hours = makeGetter('hours');
            var days = makeGetter('days');
            var months = makeGetter('months');
            var years = makeGetter('years');

            function weeks() {
                return absFloor(this.days() / 7);
            }

            var round = Math.round;
            var thresholds = {
                ss: 44, // a few seconds to seconds
                s: 45, // seconds to minute
                m: 45, // minutes to hour
                h: 22, // hours to day
                d: 26, // days to month
                M: 11 // months to year
            };

            // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
            function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
                return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
            }

            function relativeTime$1(posNegDuration, withoutSuffix, locale) {
                var duration = createDuration(posNegDuration).abs();
                var seconds = round(duration.as('s'));
                var minutes = round(duration.as('m'));
                var hours = round(duration.as('h'));
                var days = round(duration.as('d'));
                var months = round(duration.as('M'));
                var years = round(duration.as('y'));

                var a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];

                a[2] = withoutSuffix;
                a[3] = +posNegDuration > 0;
                a[4] = locale;
                return substituteTimeAgo.apply(null, a);
            }

            // This function allows you to set the rounding function for relative time strings
            function getSetRelativeTimeRounding(roundingFunction) {
                if (roundingFunction === undefined) {
                    return round;
                }
                if (typeof roundingFunction === 'function') {
                    round = roundingFunction;
                    return true;
                }
                return false;
            }

            // This function allows you to set a threshold for relative time strings
            function getSetRelativeTimeThreshold(threshold, limit) {
                if (thresholds[threshold] === undefined) {
                    return false;
                }
                if (limit === undefined) {
                    return thresholds[threshold];
                }
                thresholds[threshold] = limit;
                if (threshold === 's') {
                    thresholds.ss = limit - 1;
                }
                return true;
            }

            function humanize(withSuffix) {
                if (!this.isValid()) {
                    return this.localeData().invalidDate();
                }

                var locale = this.localeData();
                var output = relativeTime$1(this, !withSuffix, locale);

                if (withSuffix) {
                    output = locale.pastFuture(+this, output);
                }

                return locale.postformat(output);
            }

            var abs$1 = Math.abs;

            function toISOString$1() {
                // for ISO strings we do not use the normal bubbling rules:
                //  * milliseconds bubble up until they become hours
                //  * days do not bubble at all
                //  * months bubble up until they become years
                // This is because there is no context-free conversion between hours and days
                // (think of clock changes)
                // and also not between days and months (28-31 days per month)
                if (!this.isValid()) {
                    return this.localeData().invalidDate();
                }

                var seconds = abs$1(this._milliseconds) / 1000;
                var days = abs$1(this._days);
                var months = abs$1(this._months);
                var minutes, hours, years;

                // 3600 seconds -> 60 minutes -> 1 hour
                minutes = absFloor(seconds / 60);
                hours = absFloor(minutes / 60);
                seconds %= 60;
                minutes %= 60;

                // 12 months -> 1 year
                years = absFloor(months / 12);
                months %= 12;

                // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
                var Y = years;
                var M = months;
                var D = days;
                var h = hours;
                var m = minutes;
                var s = seconds;
                var total = this.asSeconds();

                if (!total) {
                    // this is the same as C#'s (Noda) and python (isodate)...
                    // but not other JS (goog.date)
                    return 'P0D';
                }

                return (total < 0 ? '-' : '') + 'P' + (Y ? Y + 'Y' : '') + (M ? M + 'M' : '') + (D ? D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? h + 'H' : '') + (m ? m + 'M' : '') + (s ? s + 'S' : '');
            }

            var proto$2 = Duration.prototype;

            proto$2.isValid = isValid$1;
            proto$2.abs = abs;
            proto$2.add = add$1;
            proto$2.subtract = subtract$1;
            proto$2.as = as;
            proto$2.asMilliseconds = asMilliseconds;
            proto$2.asSeconds = asSeconds;
            proto$2.asMinutes = asMinutes;
            proto$2.asHours = asHours;
            proto$2.asDays = asDays;
            proto$2.asWeeks = asWeeks;
            proto$2.asMonths = asMonths;
            proto$2.asYears = asYears;
            proto$2.valueOf = valueOf$1;
            proto$2._bubble = bubble;
            proto$2.get = get$2;
            proto$2.milliseconds = milliseconds;
            proto$2.seconds = seconds;
            proto$2.minutes = minutes;
            proto$2.hours = hours;
            proto$2.days = days;
            proto$2.weeks = weeks;
            proto$2.months = months;
            proto$2.years = years;
            proto$2.humanize = humanize;
            proto$2.toISOString = toISOString$1;
            proto$2.toString = toISOString$1;
            proto$2.toJSON = toISOString$1;
            proto$2.locale = locale;
            proto$2.localeData = localeData;

            // Deprecations
            proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
            proto$2.lang = lang;

            // Side effect imports

            // FORMATTING

            addFormatToken('X', 0, 0, 'unix');
            addFormatToken('x', 0, 0, 'valueOf');

            // PARSING

            addRegexToken('x', matchSigned);
            addRegexToken('X', matchTimestamp);
            addParseToken('X', function (input, array, config) {
                config._d = new Date(parseFloat(input, 10) * 1000);
            });
            addParseToken('x', function (input, array, config) {
                config._d = new Date(toInt(input));
            });

            // Side effect imports


            hooks.version = '2.18.1';

            setHookCallback(createLocal);

            hooks.fn = proto;
            hooks.min = min;
            hooks.max = max;
            hooks.now = now;
            hooks.utc = createUTC;
            hooks.unix = createUnix;
            hooks.months = listMonths;
            hooks.isDate = isDate;
            hooks.locale = getSetGlobalLocale;
            hooks.invalid = createInvalid;
            hooks.duration = createDuration;
            hooks.isMoment = isMoment;
            hooks.weekdays = listWeekdays;
            hooks.parseZone = createInZone;
            hooks.localeData = getLocale;
            hooks.isDuration = isDuration;
            hooks.monthsShort = listMonthsShort;
            hooks.weekdaysMin = listWeekdaysMin;
            hooks.defineLocale = defineLocale;
            hooks.updateLocale = updateLocale;
            hooks.locales = listLocales;
            hooks.weekdaysShort = listWeekdaysShort;
            hooks.normalizeUnits = normalizeUnits;
            hooks.relativeTimeRounding = getSetRelativeTimeRounding;
            hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
            hooks.calendarFormat = getCalendarFormat;
            hooks.prototype = proto;

            return hooks;
        });
    }, {}], 5: [function (require, module, exports) {
        /* eslint-disable */

        'use strict';

        module.exports = [{ "id": "france", "name": "Франция" }, { "id": "finland", "name": "Финляндия" }, { "id": "estonia", "name": "Эстония" }];
    }, {}], 6: [function (require, module, exports) {
        'use strict';

        var moment = require('moment');
        var matcher = require('./helpers/matcher');

        var isoFormat = 'YYYY-MM-DD';

        var isDateBetweenInclusive = function (date, min, max) {
            if (date === null || min === null || max === null) {
                return null;
            }

            var mdate = moment(date);
            return mdate.isSameOrAfter(moment(min)) && mdate.isSameOrBefore(moment(max));
        };

        // событие, например тур, путешествие, прокат, полёт и т.п.
        module.exports = {
            id: { type: 'Integer', label: 'ID' },

            durationMax: {
                type: 'Duration', // P1Y2M3D
                label: 'Максимально возможная продолжительность путешествия'
            },

            startDate: {
                type: 'Date',
                label: 'Отправляюсь'
            },

            endDate: {
                type: 'Date',
                label: 'Возвращаюсь'
            },

            startDateMin: {
                type: 'Date',
                label: 'Минимальная дата отправления'
            },

            startDateMax: {
                type: 'Date',
                label: 'Максимальная дата отправления',
                // либо установленной дате окончания, либо мин + 1 год
                computed: ['startDateMin', 'endDate', 'durationMax', function (startDateMin, endDate, durationMax) {
                    if (startDateMin === null || durationMax === null) {
                        // endDate can be null
                        return null;
                    }

                    var mmDurationMax = moment.duration(durationMax);

                    var mmStartDateLatest = moment(startDateMin).add(mmDurationMax);
                    var startDateLatest = mmStartDateLatest.format(isoFormat);
                    if (endDate === null) {
                        return startDateLatest;
                    }

                    return moment(endDate).isBefore(mmStartDateLatest) ? endDate : startDateLatest;
                }]
            },

            endDateMin: {
                type: 'Date',
                label: 'Минимальная дата возвращения',
                computed: ['startDateMin', 'startDate', matcher.lastAvailable]
            },

            endDateMax: {
                type: 'Date',
                label: 'Максимальная дата возвращения',
                // start + 1 year || startMin + 1 year
                computed: ['endDateMin', 'durationMax', function (endDateMin, durationMax) {
                    if (durationMax === null || endDateMin === null) {
                        return null;
                    }

                    var mmDurationMax = moment.duration(durationMax);

                    return moment(endDateMin).add(mmDurationMax).format(isoFormat);
                }]
            },

            isFixed: {
                type: 'Boolean',
                label: 'Нужен годовой полис?'
            },

            /** Number of days between start and end dates, including both */
            daysBetween: {
                type: 'Integer',
                label: 'Количество дней между датами',
                computed: ['endDate', 'startDate', function (end, start) {
                    if (end === null || start === null) {
                        return null;
                    }

                    return moment(end).diff(moment(start), 'days') + 1;
                }]
            },

            isStartDateBetween: {
                type: 'Boolean',
                label: '*некорректная дата',
                computed: ['startDate', 'startDateMin', 'startDateMax', isDateBetweenInclusive]
            },

            isEndDateBetween: {
                type: 'Boolean',
                label: '*некорректная дата',
                computed: ['endDate', 'endDateMin', 'endDateMax', isDateBetweenInclusive]
            }
        };
    }, { "./helpers/matcher": 8, "moment": 4 }], 7: [function (require, module, exports) {
        'use strict';

        // var xhr = require('request');
        // var xhr = require('xhr');

        var offersResponse = require('./offers-response');

        var helper = {};

        var transformCards = function (initialCardsResponse) {
            return initialCardsResponse.data.map(function (card) {
                var cname;
                var territory = card.territory;
                if (territory && territory.countryGroup) {
                    if (Array.isArray(territory.countryGroup)) {
                        cname = territory.countryGroup.join('; ');
                    }
                }

                return {
                    id: card.productId,
                    companyId: card.companyId,
                    currency: card.currency,
                    price: card.price,
                    priceRub: card.priceRub,
                    companyName: cname || 'empty'
                };
            });
        };

        helper.load = function (endpoint, resolve, reject) {
            if (endpoint === null) {
                return null;
            }

            // callback will be called once with the arguments ( Error, response , body ) where the response is an object:
            var callback = function (err, resp, body) {
                if (err) {
                    reject(err);return;
                }

                if (resp.statusCode === 200) {
                    // console.log('body', body);
                    var cards = transformCards(JSON.parse(body));
                    resolve(cards);
                } else {
                    console.log('resp', resp);
                    reject(body);
                }
            };

            // var req = xhr({
            //   uri: endpoint
            // }, callback);

            // return function() {
            //   req.abort();
            // };

            var timeoutInstance = setTimeout(function () {
                callback(null, { statusCode: 200 }, JSON.stringify(offersResponse));
            }, 1500);

            return clearTimeout.bind(null, timeoutInstance);
        };

        module.exports = helper;
    }, { "./offers-response": 9 }], 8: [function (require, module, exports) {
        'use strict';

        var helper = {};

        // Универсальные значения для любого проекта,
        //   не зависящие от конкретной бизнес-логики
        // Если данные значения не будут соответствовать задачам,
        //   то можно использовать альтернативные методы с явными значениями
        // от 1 до 50 символов (включительно)
        var latinNameRegExp = /^[a-z][a-z\s,.'-]{0,49}$/i;
        // от 1 до 150 символов (включительно)
        var cyrNameRegExp = /^[а-я][а-я\s,.'-]{0,149}$/i;
        var ageMin = 0;
        var ageAdultMin = 18;
        var ageMax = 120;

        /**
         * @returns {Boolean}
         * Если хотя бы одно значение не известно (null) - не достаточно данных для принятия решения (result = null)
         * Если все значения true, то result = true
         * Иначе false
         */
        helper.isAnd = function () {
            var arr = Array.prototype.slice.call(arguments);

            var isSomeNull = arr.some(function (item) {
                return item === null;
            });

            if (isSomeNull) {
                return null;
            }

            return arr.every(function (item) {
                return item === true;
            });
        };

        helper.isTestRegExp = function (str, regExp) {
            if (str === null || regExp === null) {
                return null;
            }
            return regExp.test(str);
        };

        /**
         * @returns {Boolean} Является ли строка именем (фамилией) на латинице
         */
        helper.isLatinName = function (str) {
            if (str === null) {
                return null;
            }
            return latinNameRegExp.test(str);
        };

        /**
         * Cyr - упрощённое от cyrillic
         * @returns {Boolean} Является ли строка именем (фио) на кириллице
         */
        helper.isCyrName = function (str) {
            if (str === null) {
                return null;
            }
            return cyrNameRegExp.test(str);
        };

        /**
         * @returns {Boolean} Соответствует ли указанный возраст диапазону универсальных значений: от 0 до 120
         */
        helper.isAgeValid = function (age) {
            if (age === null) {
                return null;
            }
            return ageMin <= age && age <= ageMax;
        };

        /**
         * @returns {Boolean} Совершеннолетие
         */
        helper.isAgeAdult = function (age) {
            if (age === null) {
                return null;
            }
            return ageAdultMin <= age && age <= ageMax;
        };

        /**
         * Если минимальная дата рождения не указана бизнес-требованиями, тогда только технические границы: new Date(-8640000000000000) = 20.04.-271821
         * В данном случае ограничение по ageMax
         * @param {String} initial Дата отсчёта, сегодня
         * @returns {String} Универсальное значение для минимально возможной даты рождения: 120 лет назад
         */
        // helper.minBirthday = function(initial) {
        //   if (initial === null) { return null; }
        //   var isoDuration = 'P-' + ageMax + 'Y';
        //   return durationHelper.calculateGostPlusDuration(initial, isoDuration);
        // };

        // /**
        //  * @returns {String} Максимально возможная дата рождения для совершеннолетнего
        //  */
        // helper.maxAdultBirthday = function(initial) {
        //   if (initial === null) { return null; }
        //   var isoDuration = 'P-' + ageAdultMin + 'Y';
        //   return durationHelper.calculateGostPlusDuration(initial, isoDuration);
        // };

        helper.isStringBetweenInclusive = function (str, min, max) {
            if (str !== null && min !== null && max !== null) {
                return str.length >= min && str.length <= max;
            }
            return null;
        };

        helper.isNumberBetweenInclusive = function (num, min, max) {
            if (num !== null && min !== null && max !== null) {
                return num >= min && num <= max;
            }
            return null;
        };

        helper.lastAvailable = function () {
            var arr = Array.prototype.slice.call(arguments);
            for (var i = arr.length - 1; i >= 0; i -= 1) {
                if (arr[i] !== null) {
                    return arr[i];
                }
            }
            return null;
        };

        var PRIMARY_KEY = 'id'; // Обычно 'id'

        /**
         * @returns {Array} Например, ссылки на ещё не выбранные страны
         */
        helper.uncoveredList = function (coveredList, originList) {
            // console.log('uncoveredList', coveredList, originList);
            if (originList === null) {
                return null;
            }

            var coveredIds = (coveredList || []).map(function (c) {
                return c[PRIMARY_KEY];
            });

            return originList.filter(function (originItem) {
                // TODO: only ids originItem, like Tourist
                return coveredIds.indexOf(originItem[PRIMARY_KEY]) < 0;
            });
        };

        module.exports = helper;
    }, {}], 9: [function (require, module, exports) {
        /* eslint-disable */

        var response = {
            "status": 200,
            "data": [{
                "productId": 123,
                "companyId": 234,
                "insuranceSubProductId": 321,
                "territory": {
                    "id": 1,
                    "code": "vtb-e",
                    "countryGroup": ["vtb-part-e", "vtb-allworld", "vtb-schengen", "vtb-evro"]
                },
                "insuredDays": 1,
                "sport": null,
                "currency": "EUR",
                "price": 123,
                "priceRub": 654,
                "assistances": [{
                    "all": [{
                        "id": 4, "code": "gva", "name": "Global Voyager Assistance", "phone": ["000000000"]
                    }]
                }, {
                    "italy": [{
                        "id": 4, "code": "gva", "name": "Global Voyager Assistance", "phone": null, "localPhone": ["00000000"]
                    }]
                }]
            }]
        };

        module.exports = response;
    }, {}], 10: [function (require, module, exports) {
        var extend = require('extend');
        var person = require('./person');

        var insurant = {};
        extend(insurant, person, {
            // override person.id (Integer)
            id: {
                type: 'Decade',
                label: 'ИД застрахованного'
            },

            orderNumber: {
                type: 'Text',
                label: 'Застрахованное лицо №',
                computed: ['id', function (id) {
                    return id + ''; // or id + 1 (for 0-based ids)
                }]
            },

            specialConditions: {
                type: 'Text',
                label: 'Специальные условия застрахованного лица к полису'
            }
        });

        module.exports = insurant;
    }, { "./person": 13, "extend": 3 }], 11: [function (require, module, exports) {
        var extend = require('extend');
        var event = require('./event');

        // data from (event + policy)
        var insuredEvent = {};
        extend(insuredEvent, event, {
            insuredDuration: {
                type: 'Duration',
                label: 'Период страхования, кол-во дней'
            }
        });

        module.exports = insuredEvent;
    }, { "./event": 6, "extend": 3 }], 12: [function (require, module, exports) {
        var typeCountry = require('./types').Country;

        // место действия полиса: страна, группа стран
        module.exports = {
            id: {
                type: 'Country',
                label: 'ИД'
            },

            name: {
                type: 'Text',
                label: 'Страна',
                computed: ['id', function (id) {
                    return typeCountry.allowed.filter(function (c) {
                        return c.id === id;
                    })[0].name;
                }]
            },

            visitDate: {
                type: 'Date',
                // если предполагается несколько посещений, то первая дата
                label: 'Дата предполагаемого посещения места по данному полису'
            },

            restrictions: {
                type: 'Text',
                // например: не действует в каких-то городах страны
                label: 'Ограничения полиса, действующие на территории места/страны'
            },

            // на данный момент эти поля вычисляемые, так как нет нужных данных в источнике, например {id:italy, isDateVisaRequired: true, isShengen: true}
            // при появлении этих полей в источнике - данные будут подгружаться напрямую без вычислений
            isDateVisaRequired: {
                type: 'Boolean',
                label: 'Требуется ли указание даты получения визы',
                computed: ['id', function (id) {
                    return id === 'estonia' || id === 'finland';
                }]
            },

            isShengen: {
                type: 'Boolean',
                label: 'Входит ли страна в Шенген',
                computed: ['id', function (id) {
                    // TODO
                    return id === 'italy' || id === 'spain';
                }]
            }
        };
    }, { "./types": 16 }], 13: [function (require, module, exports) {
        'use strict';

        module.exports = {
            id: {
                type: 'Integer',
                label: 'ИД'
            },

            name: {
                type: 'Text',
                label: 'Имя'
            },

            age: {
                type: 'Age',
                label: 'Возраст, лет'
            },

            birthDate: {
                type: 'Date',
                label: 'Дата рождения'
            },

            // TODO: move to Age type
            isAdult: {
                type: 'Boolean',
                label: 'Совершеннолетний?',
                computed: ['age', function (age) {
                    if (age === null) {
                        return null;
                    }
                    return age >= 18;
                }]
            }

            // virtual
            // мнимая связь, существующая только в пределах системы
            // insurants: select * from insurants where personId = id
        };
    }, {}], 14: [function (require, module, exports) {
        'use strict';

        module.exports = {
            id: {
                type: 'Integer',
                label: 'Идентификатор продукта'
            },
            companyId: {
                type: 'Integer',
                label: 'Идентификатор страховой компании'
            },
            companyName: {
                type: 'Text',
                label: 'Название страховой компании'
            },
            currency: {
                // TODO: type Currency (USD, RUB, EUR, etc.)
                type: 'Text',
                label: 'Валюта'
            },
            price: {
                type: 'Number',
                label: 'Цена'
            },
            priceRub: {
                type: 'Number',
                label: 'Цена в рублях'
            },
            infoUrl: {
                type: 'URL',
                label: 'Адрес продукта',
                computed: ['id', function (id) {
                    if (id === null) {
                        return null;
                    }
                    return './product/' + id;
                }]
            }
        };
    }, {}], 15: [function (require, module, exports) {
        'use strict';

        var extend = require('extend');
        var ajaxLoader = require('./helpers/ajax-loader');
        var config = require('../config');

        var personSchema = require('./person');
        var insuredPlaceSchema = require('./insured-place');
        var insuredEventSchema = require('./insured-event');
        var insurantSchema = require('./insurant');
        var policyOfferSchema = require('./policy-offer');

        var insurerSchema = {};
        extend(insurerSchema, personSchema, {});

        // http://schema.org/FinancialService
        module.exports = {
            id: { type: 'Integer', label: 'ID' },

            name: {
                type: 'Text',
                // Полис ВЗР
                label: 'Название услуги'
            },

            description: {
                type: 'Text',
                label: 'Описание услуги'
            },

            dateVisa: {
                type: 'Date',
                // Дата получения визы (если несколько стран требует полис для визы, то это наименьшая дата)
                label: 'Дата получения визы'
            },

            // выбранные страны
            insuredPlaces: {
                type: 'ItemList',
                label: 'Страны',
                schema: 'Country',
                ref: insuredPlaceSchema
            },

            // страны, доступные для быстрого выбора: Шенген, Тайланд - top3pop
            // страны, доступные для основного выбора: 200 стран

            insurants: {
                type: 'ItemList',
                label: 'Туристы',
                schema: 'Person',
                ref: insurantSchema
            },

            insurer: {
                type: 'Item',
                label: 'Услуги',
                schema: 'Person',
                ref: insurerSchema
            },

            insuredEvent: {
                type: 'Item',
                label: 'Даты',
                schema: 'Event',
                ref: insuredEventSchema
            },

            // policyVendor
            // policyAgency
            // products

            // virtual
            // insurants: select * from insurants where policyId = id;
            // insurer: select * from insurers where policyId = id Limit 1;
            //  or insurers[0]: 1 to 1 relation
            // policyPlaces: select * from policyPlaces where policyId = id;

            insuredPlacesWarning: {
                type: 'Text',
                label: 'Валидация стран',
                computed: ['id', 'insuredPlaces', function (id, insuredPlaces) {
                    if (id === null) {
                        return null;
                    }

                    if (insuredPlaces.length < 1) {
                        return 'Выберите хотя бы одну страну';
                    }

                    return '';
                }]
            },

            insuredEventWarning: {
                type: 'Text',
                label: 'Валидация дат поездки',
                computed: ['id', 'insuredEvent', function (id, insuredEvent) {
                    if (id === null || insuredEvent === null) {
                        return null;
                    }

                    if (insuredEvent.isFixed !== true) {
                        return 'Укажите корректные даты поездки';
                    }

                    return '';
                }]
            },

            insurantsWarning: {
                type: 'Text',
                label: 'Валидация застрахованных лиц',
                computed: ['id', 'insurants', function (id, insurants) {
                    if (id === null) {
                        return null;
                    }

                    // all insurants must be filled
                    // at least one insurant must be
                    var isAllInsurantsValid = insurants.every(function (t) {
                        return t.age > 0 || t.age === 0;
                    });

                    if (isAllInsurantsValid === false) {
                        return 'Укажите возраст всех туристов';
                    }

                    if (insurants.length < 1) {
                        return 'Добавьте хотя бы одного туриста';
                    }

                    return '';
                }]
            },

            calculableWarning: {
                type: 'Text',
                label: 'необходимо заполнить',
                computed: ['id', 'insuredPlacesWarning', 'insurantsWarning', function (id, insuredPlacesWarning, insurantsWarning) {
                    if (id === null) {
                        return null;
                    }
                    if (insuredPlacesWarning) {
                        return insuredPlacesWarning;
                    }

                    if (insurantsWarning) {
                        return insurantsWarning;
                    }

                    return ''; // no warning
                }]
            },

            // calculates when any array is changed
            isCalculable: {
                type: 'Boolean',
                label: 'Возможен ли расчёт?',
                computed: ['id', 'insuredPlacesWarning', 'insuredEventWarning', 'insurantsWarning', function (id, w1, w2, w3) {
                    if (id === null || w1 === null || w2 === null || w3 === null) {
                        return null;
                    }
                    // no messages - then valid
                    return !w1 && !w2 && !w3;
                }]
            },

            offersWarning: {
                type: 'Text',
                label: 'Сообщение о результатах',
                computed: ['isCalculable', function (isCalculable) {
                    if (isCalculable === null) {
                        return null;
                    }

                    if (isCalculable === true) {
                        // показать кол-во продуктов
                        return 'Показать список продуктов';
                    }

                    return '';
                }]
            },

            offersEndpoint: {
                type: 'URL',
                label: 'URL предложений',
                computed: ['isCalculable', 'insuredEvent', function (isCalculable, tour) {
                    if (isCalculable === null || isCalculable === false || tour === null) {
                        return null;
                    }

                    var apiProps = {
                        currency: 'eur',
                        // TODO: convert from ISO to GOST
                        dateStart: tour.startDate, // '24.12.2017',
                        dateEnd: tour.endOutput, // '25.12.2017',
                        // TODO: convert to days from duration
                        insuredDays: tour.insuredDuration || null, // can be null
                        'service%5Bmedicine%5D': 30000,
                        'key': config.API_KEY
                    };

                    var parts = [];

                    Object.keys(apiProps).forEach(function (key) {
                        var val = apiProps[key];
                        if (val !== null && val !== undefined) {
                            parts.push(key + '=' + val);
                        }
                    });

                    return config.API_ENDPOINT + '/quote?' + parts.join('&');
                }]
            },

            offers: {
                type: 'ItemList',
                label: 'Предложения',
                schema: 'Offer',
                ref: policyOfferSchema,
                computedAsync: ['offersEndpoint', ajaxLoader.load]
            }
        };

        // easync: {
        //   type: 'Text',
        //   label: 'SomeAsync',
        //   computedAsync: ['offersEndpoint', function(endpoint, resolve) {
        //     if (endpoint === null) { return null; }
        //     var t = setTimeout(function() {
        //       resolve('supertext');
        //     }, 2000);
        //     return clearTimeout.bind(null, t);
        //   }]
        // }
    }, { "../config": 1, "./helpers/ajax-loader": 7, "./insurant": 10, "./insured-event": 11, "./insured-place": 12, "./person": 13, "./policy-offer": 14, "extend": 3 }], 16: [function (require, module, exports) {
        'use strict';

        var allowedCountries = require('./data/countries');

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
        Number.isInteger = Number.isInteger || function (value) {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        };

        var isNumber = function (num) {
            return isNaN(num) === false && isFinite(num);
        };

        module.exports = {
            Boolean: {
                isValid: function (value) {
                    return typeof value === 'boolean';
                }
            },
            Text: {
                isValid: function (value) {
                    return typeof value === 'string';
                }
            },
            URL: {
                isValid: function (value) {
                    // urls can be relative: /some-icon.png
                    // hard-coded most used length
                    return typeof value === 'string' && value.length <= 2000;
                }
            },
            // http://some-img.jpeg|alt=Welcome|width=200|height=100
            Image: {
                isValid: function (value) {
                    var parts = value.split('|');
                    var srcUrl = parts[0];
                    // TODO: check other parts
                    return typeof value === 'string' && srcUrl && srcUrl.length > 0;
                }
            },
            Number: {
                isValid: function (value) {
                    return isNumber(value);
                }
            },
            Float: {
                isValid: function (value) {
                    return isNumber(value);
                }
            },
            Integer: {
                isValid: function (value) {
                    return Number.isInteger(value);
                }
            },
            Age: {
                min: 0,
                max: 120,
                isValid: function (value) {
                    return Number.isInteger(value) && value >= this.min && value <= this.max;
                }
            },
            Decade: {
                min: 1,
                max: 10,
                isValid: function (value) {
                    return Number.isInteger(value) && value >= this.min && value <= this.max;
                }
            },
            Country: {
                allowed: allowedCountries,
                isValid: function (value) {
                    var ids = this.allowed.map(function (c) {
                        return c.id;
                    });

                    return typeof value === 'string' && ids.indexOf(value) >= 0;
                }
            },
            Date: {
                regExp: /^\d{4}-[01]\d-[0-3]\d$/,
                isValid: function (value) {
                    return this.regExp.test(value);
                }
            },
            Duration: {
                regExp: /^P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)D)?$/,
                isValid: function (value) {
                    return this.regExp.test(value);
                }
            }
        };

        // TODO: Date best validation
        // const m = moment(value, isoFormat, true);
        // return m.isValid();
    }, { "./data/countries": 5 }], 17: [function (require, module, exports) {
        module.exports = require('./src/computed-state');
    }, { "./src/computed-state": 18 }], 18: [function (require, module, exports) {
        /** @module */

        'use strict';

        var Listener = require('./listener');
        var Computer = require('./computer');
        var Setting = require('./setting');

        var toPlainChangedPaths = function (scope, target) {
            if (!scope) {
                throw new Error('toPlainChangedPaths_scope_required');
            }

            if (Array.isArray(scope) === true) {
                scope.forEach(function (item) {
                    toPlainChangedPaths(item, target);
                });
            } else {
                Object.keys(scope).forEach(function (key) {
                    if (target.indexOf(key) < 0) {
                        target.push(key);
                    }
                    toPlainChangedPaths(scope[key], target);
                });
            }
        };

        // get with cloning
        var getWritableProperties = function (obj) {
            if (Array.isArray(obj)) {
                return obj.map(function (item) {
                    return getWritableProperties(item);
                });
            }

            var result = {};

            Object.keys(obj).forEach(function (key) {
                if (!obj.__settings[key].calculate) {
                    var value = obj[key];
                    if (value !== null && typeof value === 'object') {
                        // objects
                        result[key] = getWritableProperties(value);
                    } else {
                        // primitives
                        result[key] = obj[key];
                    }
                }
            });

            return result;
        };

        /**
         * @returns {*} Scope of async paths and functions
         * 'student': asyncFunction
         * 'student.rating': asyncFunction
         * etc.
         */
        var getAsyncPaths = function (obj) {
            if (Array.isArray(obj)) {
                return obj.map(function (item) {
                    return getAsyncPaths(item);
                });
            }

            var result = {};

            Object.keys(obj).forEach(function (key) {
                var propSetting = obj.__settings[key];
                var calculateAsync = propSetting.calculateAsync;
                var watchedKeys = propSetting.watchedKeys;

                // if async exists
                if (!calculateAsync || !watchedKeys) {
                    return;
                }

                var asyncWatchedValues = watchedKeys.map(function (watchedKey) {
                    return obj[watchedKey];
                });

                result[key] = {
                    propertyPath: key,
                    func: calculateAsync,
                    args: asyncWatchedValues
                };

                // TODO: inner properties with paths
            });

            return result;
        };

        /**
         * @param {Function} callback Executed when keys are changed
         * @param {String[]} watchedKeys List of property keys
         * @todo watchedPaths instead keys
         * @param {Listener[]} anyListeners List of async or usual listeners
         * @returns {Function} unsubscribe - remove subscription
         */
        var subscribeAny = function (callback, watchedKeys, anyListeners) {
            var listener = new Listener(callback, watchedKeys);
            anyListeners.push(listener);
            return function () {
                var index = anyListeners.indexOf(listener);
                anyListeners.splice(index, 1);
            };
        };

        /**
         * Build settings from config
         * config is more readable; settings - usable
         * @param {Object} config { name: {type:'Text'}, ... }
         * @returns {Object} Scope of instances of settings
         */
        var buildSettings = function (config) {
            var settings = {};
            Object.keys(config).forEach(function (propName) {
                settings[propName] = new Setting(propName, config[propName]);
            });

            return settings;
        };

        var ComputedState = function () {
            function ComputedState(rootConfig) {
                _classCallCheck(this, ComputedState);

                var rootSettings = buildSettings(rootConfig);

                this._rootEntity = new Computer(rootSettings);
                this._listeners = [];
                this._asyncListeners = [];

                /**
                 * Timeouts, XHR requests and other async instances
                 * To cancel it before new invocation
                 */
                this._asyncCancels = {};
            }

            /** Convert changed keys; notify listeners; run async handlers */


            _createClass(ComputedState, [{
                key: "operate",
                value: function operate(scopeOfChangedKeys, skippedPropertyKey) {
                    if (!scopeOfChangedKeys || scopeOfChangedKeys.length === 0) {
                        return;
                    }
                    // console.log('scopeOfChangedKeys', JSON.stringify(scopeOfChangedKeys));
                    // TODO: convert to changed paths instead keys (or add to output)
                    var allChangedPaths = [];
                    toPlainChangedPaths(scopeOfChangedKeys, allChangedPaths);
                    this.ready(allChangedPaths);

                    // remove skipped items
                    var neededChangedPaths = allChangedPaths.filter(function (key) {
                        return key !== skippedPropertyKey;
                    });

                    if (neededChangedPaths.length > 0) {
                        this.handleAsyncProps(neededChangedPaths);
                    }
                }

                /**
                 * When the entire state is stabilized - run async operations:
                 * - get all async properties and functions
                 * - run it for changed paths (keys for this moment)
                 */

            }, {
                key: "handleAsyncProps",
                value: function handleAsyncProps(allChangedPaths) {
                    var asyncPaths = getAsyncPaths(this._rootEntity);

                    var that = this;

                    // Array of { func: func, args: args }
                    var changedAsyncPaths = [];

                    // TODO: if not yet fullfilled
                    // if (obj[key].data !== null) { return; }

                    Object.keys(asyncPaths).forEach(function (propertyPath) {
                        if (allChangedPaths.indexOf(propertyPath) < 0) {
                            return;
                        }
                        var obj = asyncPaths[propertyPath];
                        changedAsyncPaths.push(obj);
                    });

                    var maxAsyncCalls = changedAsyncPaths.length;
                    var changedAsyncKeys = changedAsyncPaths.map(function (item) {
                        return item.propertyPath;
                    });

                    changedAsyncPaths.forEach(function (asyncScope) {
                        var asyncFunction = asyncScope.func;
                        var asyncArgs = asyncScope.args;
                        var propertyPath = asyncScope.propertyPath;

                        // console.log('async', propertyPath);

                        var finish = function (propertyValue) {
                            // console.log('update...', propertyPath, propertyValue);
                            that._updateAsyncProperty(propertyPath, propertyValue);
                            // console.log('updated', propertyPath);

                            maxAsyncCalls -= 1;
                            if (maxAsyncCalls === 0) {
                                that.readyAsync(changedAsyncKeys);
                            }
                        };

                        var resolve = function (val) {
                            finish({
                                data: val,
                                error: null,
                                loading: false
                            });
                        };

                        var reject = function (err) {
                            finish({
                                data: null,
                                error: err,
                                loading: false
                            });
                        };

                        // Returns a Timeout for use with clearTimeout()
                        var allArgs = asyncArgs.concat([resolve, reject]);

                        // clean prev timeout
                        var prevCancelAsync = that._asyncCancels[propertyPath];
                        if (prevCancelAsync) {
                            prevCancelAsync();
                            delete that._asyncCancels[propertyPath];
                        }

                        // run computedAsync function
                        var cancelAsync = asyncFunction.apply(null, allArgs);
                        that._asyncCancels[propertyPath] = cancelAsync;
                    });
                }

                /** Copy an return a current state */

            }, {
                key: "getEntity",
                value: function getEntity() {
                    return this._rootEntity;
                    // TODO: or copy
                    // return JSON.parse(JSON.stringify(this._rootEntity));
                }

                /**
                 * @returns {Object} Scope of writable properties (without computed)
                 *  e.g: to backup it
                 */

            }, {
                key: "getWritableEntity",
                value: function getWritableEntity() {
                    var writableEntity = getWritableProperties(this._rootEntity);
                    // console.log('w', writableState);
                    return writableEntity;
                }
            }, {
                key: "update",
                value: function update(paths) {
                    this.operate(this._rootEntity.update(paths));
                }

                /** Update all properties, but skip re-async for async props */

            }, {
                key: "_updateAsyncProperty",
                value: function _updateAsyncProperty(propertyPath, propertyValue) {
                    var upd = {};
                    upd[propertyPath] = propertyValue;
                    this.operate(this._rootEntity.update(upd), propertyPath);
                }
            }, {
                key: "insertItem",
                value: function insertItem(propertyPath, item) {
                    this.operate(this._rootEntity.insertItem(propertyPath, item));
                }
            }, {
                key: "removeItem",
                value: function removeItem(propertyPath, id) {
                    this.operate(this._rootEntity.removeItem(propertyPath, id));
                }
            }, {
                key: "subscribe",
                value: function subscribe(callback, watchedKeys) {
                    return subscribeAny(callback, watchedKeys, this._listeners);
                }
            }, {
                key: "subscribeAsync",
                value: function subscribeAsync(callback, watchedKeys) {
                    return subscribeAny(callback, watchedKeys, this._asyncListeners);
                }

                /** When all sync operations are finished */

            }, {
                key: "ready",
                value: function ready(changedKeys) {
                    var state = this.getEntity();
                    var writableState = this.getWritableEntity();

                    this._listeners.forEach(function (listener) {
                        listener.notify(changedKeys, state, writableState);
                    });
                }

                /** When all async operations are finished */

            }, {
                key: "readyAsync",
                value: function readyAsync(changedAsyncKeys) {
                    var state = this.getEntity();
                    var writableState = this.getWritableEntity();

                    this._asyncListeners.forEach(function (listener) {
                        listener.notify(changedAsyncKeys, state, writableState);
                    });
                }
            }]);

            return ComputedState;
        }();

        module.exports = ComputedState;
    }, { "./computer": 19, "./listener": 21, "./setting": 22 }], 19: [function (require, module, exports) {
        /** @module */

        'use strict';

        var Effect = require('./effect');

        var PRIMARY_KEY = 'id';

        var findIndexByPrimaryKey = function (list, primaryKey) {
            for (var i = 0, l = list.length; i < l; i += 1) {
                if (list[i][PRIMARY_KEY] === primaryKey) {
                    return i;
                }
            }
            return -1;
        };

        var findItemByPrimaryKey = function (list, primaryKeyString) {
            return list.filter(function (elem) {
                // country['id'] === 'usa'
                // 'members.5.name' -  typeof '5' === 'string'
                return elem[PRIMARY_KEY] + '' === primaryKeyString;
            })[0];
        };

        var hasOwnProperty = function (inst, propName) {
            return {}.hasOwnProperty.call(inst, propName);
        };

        var pathToLevels = function (propertyPath) {
            return propertyPath.split('.');
        };

        var levelsToPath = function (levels) {
            return levels.join('.');
        };

        /** A class to create calculated objects from specific configuration */

        var Computer = function () {
            /**
             * @param {Object} settings Common settings for all instances
             */
            function Computer(settings) {
                _classCallCheck(this, Computer);

                if (!settings) {
                    throw new Error('settings_required');
                }

                Object.defineProperty(this, '__effects', {
                    value: [],
                    writable: false,
                    enumerable: false,
                    configurable: false
                });

                // save settings for future using
                Object.defineProperty(this, '__settings', {
                    value: settings,
                    writable: false,
                    enumerable: false,
                    configurable: false
                });

                // create properties from settings
                Object.keys(this.__settings).forEach(this._createProperty.bind(this));
            }

            /**
             * Default value for properties: null
             * @param {String} propName Property name, like 'birthDate'
             * @returns {Object} Result of creation
             */


            _createClass(Computer, [{
                key: "_createProperty",
                value: function _createProperty(propName) {
                    var propertySetting = this.__settings[propName];

                    Object.defineProperty(this, propName, {
                        value: propertySetting.type === 'ItemList' ? [] : null,
                        writable: true,
                        enumerable: true,
                        configurable: false
                    });

                    if (propertySetting.calculate) {
                        this._attachComputedProps(propName, propertySetting.watchedKeys, propertySetting.calculate);
                    }
                }
            }, {
                key: "_attachComputedProps",
                value: function _attachComputedProps(propName, watchedKeys, calculate) {
                    watchedKeys.forEach(this._verifyWatchedKey.bind(this));

                    this.__effects.push(new Effect(this, propName, watchedKeys, calculate));
                }

                /**
                 * Wached properties must be declared before computed properties
                 * @param {String} watchedKey One of ['firstName', 'lastName']
                 * @returns {*} Result of verification
                 */

            }, {
                key: "_verifyWatchedKey",
                value: function _verifyWatchedKey(watchedKey) {
                    if (!watchedKey || hasOwnProperty(this, watchedKey) === false) {
                        throw new Error('required_dependent_property: ' + watchedKey);
                    }
                }

                /**
                 * Create computed instances only for 'ref' (not for 'type')
                 * @param {Object} entityConfig Entity config: props, metadata
                 * @param {*} value Value of this property
                 * @returns {*} Value (for primitives) or instance of type (for entities)
                 */

            }, {
                key: "_createByType",
                value: function _createByType(entityConfig, value) {
                    // value = { name: 'bar', lname: 'foo', person: { age: 123 } }
                    // 1. create 2. update props (with effects)
                    var needEntity = new this.constructor(entityConfig);
                    needEntity.update(value);
                    return needEntity;
                }

                /**
                 * For example, create Instance from array
                 * 'events': [{start: 123, end: 234}, {...}, ...]
                 * Must return Array of instances for Arrays
                 * @param {String} propName Like 'ranges', 'name'
                 * @param {Array<Object>|String|Number|*} value Any value for this property
                 * @returns {Object} Instance, based on this value
                 */

            }, {
                key: "_createInstanceFromValue",
                value: function _createInstanceFromValue(propName, value) {
                    if (value === null) {
                        return null;
                    }

                    var propSetting = this.__settings[propName];

                    // TODO:
                    var settingType = propSetting.type;

                    // referenced entity, like event.place
                    var entitySettings = propSetting.refSettings;

                    // console.log('refEntity', refEntity && Object.keys(refEntity));

                    var that = this;

                    // if (Array.isArray(value)) {
                    if (settingType === 'ItemList') {
                        if (!entitySettings) {
                            throw new Error('required_ref_for_item_list: ' + propName + ' ' + JSON.stringify(value));
                        }

                        if (Array.isArray(value) === true) {
                            return value.map(function (itemValue) {
                                return that._createByType(entitySettings, itemValue);
                            });
                            // throw new Error('required_array: ' + propName + ' ' + JSON.stringify(value));
                        }

                        // create for insertItem method
                        return this._createByType(entitySettings, value);
                    } else if (settingType === 'Item') {
                        if (!entitySettings) {
                            throw new Error('required_ref_for_item: ' + propName);
                        }
                        return this._createByType(entitySettings, value);
                    }

                    // TODO: hack for async properties
                    if (this.__settings[propName].calculateAsync) {
                        return value;
                    }

                    // verify type of value
                    // Item and ItemList is already verified during entity.update
                    // all types must be verified on ViewSide:
                    //  on ModelSide just checking with exceptions
                    // if (types[settingType].isValid(value) === false) {
                    //   throw new Error('type_mismatch: ' + propName + ': ' + value + ': ' + settingType);
                    // }

                    return value;
                }
            }, {
                key: "_set",
                value: function _set(key, value) {
                    var propSetting = this.__settings[key];
                    if (propSetting.calculate && !propSetting.calculateAsync) {
                        // at this moment async properties updated from outside (state)
                        throw new Error('only_writable_properties_allowed: ' + key);
                    }

                    this[key] = value;
                    // console.log('set', key, value);
                }

                /**
                 * Set computed properties through a redefine method
                 *
                 * Alternative: Object.defineProperty(this, key, { value: value });
                 *   does not work in PhantomJS: https://github.com/ariya/phantomjs/issues/11856
                 * @param {String} key Property name
                 * @param {*} value New property value
                 * @returns {undefined} Result of setting
                 */

            }, {
                key: "_setComputed",
                value: function _setComputed(key, value) {
                    if (!this.__settings[key].calculate) {
                        throw new Error('only_computed_properties_allowed:' + key);
                    }
                    this[key] = value;
                }

                /**
                 * https://www.polymer-project.org/2.0/docs/about_20
                 * No more dirty checking for objects or arrays. Unlike 1.x, when you make a notifying change to an object or array property, Polymer re-evaluates everything below that property (sub-properties, array items).
                 * @param {String} propertyName Like 'ranges', 'name'
                 * @param {*} value for this property
                 * @returns {Boolean} Should prop change
                 */

            }, {
                key: "_shouldPropChange",
                value: function _shouldPropChange(propertyName, value) {
                    if (value === undefined) {
                        throw new Error('value_cannot_be_undefined');
                    }

                    var old = this[propertyName];
                    if (old === undefined) {
                        throw new Error('property_must_exist: ' + propertyName);
                    }

                    // skip arrays and objects
                    return (
                        // Strict equality check for primitives
                        old !== value && (
                        // This ensures old:NaN, value:NaN always returns false
                        old === old || value === value)
                    );
                }
            }, {
                key: "_updateComputedPropertyIfNeeded",
                value: function _updateComputedPropertyIfNeeded(propertyName, value) {
                    if (this._shouldPropChange(propertyName, value) === false) {
                        return false;
                    }

                    var valueInstance = this._createInstanceFromValue(propertyName, value);
                    this._setComputed(propertyName, valueInstance);
                    return true;
                }

                /**
                 * @param {String} propertyName Like 'ranges', 'name', etc.
                 * @param {*} value To update
                 * @returns {Boolean} Whether the property updated
                 */

            }, {
                key: "_updatePropertyIfNeeded",
                value: function _updatePropertyIfNeeded(propertyName, value) {
                    if (this._shouldPropChange(propertyName, value) === false) {
                        return false;
                    }

                    var valueInstance = this._createInstanceFromValue(propertyName, value);
                    this._set(propertyName, valueInstance);
                    return true;
                }
            }, {
                key: "_runPropEffects",
                value: function _runPropEffects(changedPropName) {
                    var list = [];
                    this.__effects.forEach(function (eff) {
                        var scopeOfComputedPropNames = eff.compute(changedPropName);
                        if (scopeOfComputedPropNames) {
                            list.push(scopeOfComputedPropNames);
                        }
                    });

                    // console.log('computedPropNames', computedPropNames);
                    return list;
                }

                /**
                 * Find the entity (one or item from array) and fire associatedCommand
                 *   and run propEffects for middle entities
                 * If an object (not a property)
                 * ['student', 'name'] = this.student
                 * ['people', '0', 'name'] = this.people
                 * @param {String} entityName Like 'student'
                 * @param {Array<String>} nextLevels Like ['5', 'grades']
                 * @param {*} value Value to update | insert | remove
                 * @param {String} associatedCommand Update|Insert|Remove
                 * @returns {Object} Scope of changes
                 */

            }, {
                key: "_iterateLevels",
                value: function _iterateLevels(entityName, nextLevels, value, associatedCommand) {
                    var mainEntity = this[entityName];

                    // if no people.0
                    if (!mainEntity) {
                        throw new Error('no_such_property_to_set: ' + entityName);
                    }

                    // this.student._updatePath
                    // this.people - Array (no such method)
                    var needEntity;
                    var needLevels;
                    // this.people - Array (no inner methods)
                    // nextPropertyPath = '0.name'
                    // if 'students' or 'people'
                    if (Array.isArray(mainEntity)) {
                        // 2 = of [2, name] of people.2.name
                        // 4 = of [4] of people.4
                        // usa = of [usa, area] of countries.usa.area
                        var elemPrimaryKey = nextLevels[0];
                        // search by index of an array
                        // it can be replaced with search by id of item
                        var mainItem = findItemByPrimaryKey(mainEntity, elemPrimaryKey);

                        if (!mainItem) {
                            // console.log('mainItem', elemPrimaryKey, JSON.stringify(mainObject));
                            throw new Error('cannot_update_nonexistent_item: ' + entityName + '.' + elemPrimaryKey);
                        }

                        needEntity = mainItem;
                        needLevels = nextLevels.slice(1);
                    } else {
                        needEntity = mainEntity;
                        needLevels = nextLevels;
                    }

                    if (needLevels.length < 1) {
                        throw new Error('update_is_not_supported_for_path: ' + entityName);
                    }

                    var scopeOfInternalChanges = needEntity[associatedCommand](levelsToPath(needLevels), value);

                    if (!scopeOfInternalChanges) {
                        return null;
                    }

                    var scopeOfComputedPropNames = {};
                    scopeOfComputedPropNames[entityName] = this._runPropEffects(entityName);
                    return scopeOfComputedPropNames;
                }

                /**
                 * @param {String} propertyPath Scope of property names, like
                 *   - 'someObject.someProperty'
                 *   - 'name'
                 *   - 'students[0].name' - index of element
                 *   - 'people:3.name' - id of element
                 *   - 'people:3'
                 *   - 'countries:usa.area'
                 * @param {*} value Any value
                 * @returns {Object} Scope of changes
                 */

            }, {
                key: "_updatePath",
                value: function _updatePath(propertyPath, value) {
                    // levels of an object
                    // 'student.name'
                    // - student - 1st level
                    // - name - 2nd level
                    // or
                    // 'countries.usa.area'
                    // - countries
                    // - usa - 2nd level
                    // - area - 3rd level
                    var levels = pathToLevels(propertyPath);

                    // main = 'student': ['student', 'name'] (object)
                    // main = 'lastName': ['lastName'] (property of an object)
                    // main = 'people' : ['people', '0', 'name'] (object = array)
                    // main = '0' : ['0', 'name'] (object = item of an array)
                    var mainLevel = levels[0];
                    // console.log('_updatePath', propertyPath, propertyName);
                    if (!mainLevel) {
                        throw new Error('property_path_invalid: ' + propertyPath);
                    }

                    if (levels.length > 1) {
                        return this._iterateLevels(mainLevel, levels.slice(1), value, '_updatePath');
                    }

                    // if a property (not an object): name, lastName, age
                    // or update a full object:
                    // - 'student': { id:123, name: 'asdf'}
                    // - 'countries.usa': { area: 345 }
                    // if (levels.length === 1) {
                    var isChanged = this._updatePropertyIfNeeded(mainLevel, value);
                    if (isChanged) {
                        return this._runBatchedEffects([mainLevel]);
                    }
                    return null;
                }
            }, {
                key: "update",
                value: function update(paths) {
                    if (typeof paths !== 'object') {
                        throw new Error('paths_required_object:' + paths);
                    }

                    // console.log('update(paths)', Object.keys(paths));
                    var that = this;
                    var changes = [];
                    Object.keys(paths).forEach(function (propertyPath) {
                        // console.log('propPath', propertyPath);
                        var valueFresh = paths[propertyPath];
                        var scopeOfChanges = that._updatePath(propertyPath, valueFresh);
                        if (scopeOfChanges) {
                            changes.push(scopeOfChanges);
                        }
                    });

                    // console.log('changes:', JSON.stringify(changes));
                    return changes;
                }

                /**
                 * Run effects for few properties
                 * @param {String[]} changedPropNames Like ['name', 'lastName']
                 * @returns {Object} Scope of computed property names
                 */

            }, {
                key: "_runBatchedEffects",
                value: function _runBatchedEffects(changedPropNames) {
                    if (changedPropNames.length === 0) {
                        return null;
                    }

                    var that = this;

                    var scopeOfComputedPropNames = {};
                    // console.log('changedPropNames', changedPropNames, this);
                    changedPropNames.forEach(function (changedPropName) {
                        var computedPropNames = that._runPropEffects(changedPropName);
                        scopeOfComputedPropNames[changedPropName] = computedPropNames;
                    });

                    return scopeOfComputedPropNames;
                }

                /**
                 * Update properties and run effects (computed props)
                 * @param {Object} props Like { name: 'John', lastname: 'Bin' }
                 * @returns {Object} Scope of computed property names (few items)
                 */

            }, {
                key: "_updateProperties",
                value: function _updateProperties(props) {
                    var callback = function (propertyName) {
                        return this._updatePropertyIfNeeded(propertyName, props[propertyName]);
                    };

                    var changedPropNames = Object.keys(props).filter(callback.bind(this));

                    return this._runBatchedEffects(changedPropNames);
                }

                /**
                 * Insert to an array
                 * - insertItem('tasks',  {id: 2, name: 'asdf'})
                 * @param {String} propertyPath Like 'groups', 'students',
                 *                 'groups.5.members', 'student.grades'
                 * @param {Object} item Entity data: { id: 1, name: 'asdf' }
                 * @returns {undefined}
                 */

            }, {
                key: "insertItem",
                value: function insertItem(propertyPath, item) {
                    // TODO: verify id unique through all table
                    // TODO: insert, using sorting by id
                    if (item[PRIMARY_KEY] === null || item[PRIMARY_KEY] === undefined) {
                        throw new Error('required_primary_key_for_prop: ' + PRIMARY_KEY + ': ' + propertyPath);
                    }

                    // duplication of _updatePath
                    var levels = pathToLevels(propertyPath);
                    var mainLevel = levels[0];
                    if (!mainLevel) {
                        throw new Error('property_path_invalid: ' + propertyPath);
                    }

                    if (levels.length > 1) {
                        return this._iterateLevels(mainLevel, levels.slice(1), item, 'insertItem');
                        // return null;
                    }

                    var propertyName = propertyPath; // 1-level

                    if (!this.__settings[propertyName]) {
                        throw new Error('no_such_property_to_insert: ' + propertyName);
                    }

                    var propType = this.__settings[propertyName].type;

                    if (propType !== 'ItemList') {
                        throw new Error('required_ItemList_type_to_insert:' + propertyName);
                    }

                    var currentList = this[propertyName];

                    if (Array.isArray(currentList) === false) {
                        throw new Error('required_array_to_insert:' + propertyName);
                    }

                    var existingIndex = findIndexByPrimaryKey(currentList, item[PRIMARY_KEY]);

                    if (existingIndex >= 0) {
                        console.log('already_exist: ' + propertyName);
                        return null;
                    }

                    // ('students', {id: 1, name: 'Jane'})
                    var itemInstance = this._createInstanceFromValue(propertyName, item);

                    // append new item to the store
                    currentList.push(itemInstance);

                    var scopeOfPropNames = {};
                    scopeOfPropNames[propertyName] = this._runPropEffects(propertyName);
                    return scopeOfPropNames;
                }
            }, {
                key: "removeItem",
                value: function removeItem(propertyPath, primaryKeyValue) {
                    var levels = pathToLevels(propertyPath);

                    if (levels.length > 1) {
                        return this._iterateLevels(levels[0], levels.slice(1), primaryKeyValue, 'removeItem');
                        // return null;
                    }

                    var propertyName = propertyPath;

                    if (!this.__settings[propertyName]) {
                        throw new Error('no_such_property_to_remove: ' + propertyName);
                    }

                    var propType = this.__settings[propertyName].type;
                    // if (Array.isArray(typeArray) === false) {
                    if (propType !== 'ItemList') {
                        throw new Error('required_ItemList_to_remove: ' + propertyName);
                    }

                    var currentList = this[propertyName];

                    if (Array.isArray(currentList) === false) {
                        throw new Error('required_array_value_to_remove:' + propertyName);
                    }

                    var existingIndex = findIndexByPrimaryKey(currentList, primaryKeyValue);

                    if (existingIndex < 0) {
                        console.log('record_not_found: ', primaryKeyValue, currentList);
                        return null;
                    }

                    // remove item from the store
                    currentList.splice(existingIndex, 1);

                    var scopeOfPropNames = {};
                    scopeOfPropNames[propertyName] = this._runPropEffects(propertyName);
                    return scopeOfPropNames;
                }
            }]);

            return Computer;
        }();

        module.exports = Computer;
    }, { "./effect": 20 }], 20: [function (require, module, exports) {
        /** @module */

        'use strict';

        /** An effect for some computed property */

        var Effect = function () {
            function Effect(ctx, computedKey, watchedKeys, computation) {
                _classCallCheck(this, Effect);

                /**
                 * Computed property
                 * @type {String}
                 */
                this.computedKey = computedKey;

                /**
                 * Names of dependent properties
                 * @type {String[]}
                 */
                this.watchedKeys = watchedKeys;

                /**
                 * A function, executed after watched props have been changed
                 * @type {Function}
                 */
                this.computation = computation;

                /**
                 * Context, where properties are stored
                 * @type {Object}
                 */
                this.ctx = ctx;
            }

            /**
             * Run computation and update value
             * @param {String} changedKey Name of changed property
             * @returns {Object} Scope of computed properties
             */


            _createClass(Effect, [{
                key: "compute",
                value: function compute(changedKey) {
                    if (this.watchedKeys.indexOf(changedKey) < 0) {
                        return null;
                    }

                    var ctx = this.ctx;

                    var args = this.watchedKeys.map(function (watchedKey) {
                        return ctx[watchedKey];
                    });

                    // var props = {};
                    // props[this.computedKey] = this.computation.apply(null, args);
                    // return ctx._updateProperties(props);

                    var computationResult = this.computation.apply(null, args);

                    var isChanged = ctx._updateComputedPropertyIfNeeded(this.computedKey, computationResult);

                    if (isChanged) {
                        return ctx._runBatchedEffects([this.computedKey]);
                    }

                    return null;
                }
            }]);

            return Effect;
        }();

        module.exports = Effect;
    }, {}], 21: [function (require, module, exports) {
        /** @module */

        'use strict';

        /** A listener of store changes */

        var Listener = function () {
            function Listener(callback, watchedKeys) {
                _classCallCheck(this, Listener);

                this.callback = callback;
                this.watchedKeys = watchedKeys;
            }

            /**
             * Filter and notify listeners
             * If no changedKeys or no watchedKeys - send it
             */


            _createClass(Listener, [{
                key: "notify",
                value: function notify(changedKeys, state, writableState) {
                    var isSend = false;
                    if (this.watchedKeys && changedKeys) {
                        isSend = this.watchedKeys.some(function (watchedKey) {
                            return changedKeys.indexOf(watchedKey) >= 0;
                        });
                    } else {
                        isSend = true;
                    }

                    if (isSend) {
                        this.callback(changedKeys, state, writableState);
                    }
                }
            }]);

            return Listener;
        }();

        module.exports = Listener;
    }, {}], 22: [function (require, module, exports) {
        /**
         * Creates an internal object from readable settings
         * - async type
         * - computed function + watched keys
         * @todo: precompile these objects from config
         * @module
         */

        'use strict';

        var areAllArgumentsFilled = function (args) {
            var arr = Array.prototype.slice.call(args);
            return arr.every(function (arg) {
                if (typeof arg === 'undefined') {
                    throw new Error('argument_can_not_be_undefined: ' + arg);
                }

                return arg !== null;
            });
        };

        /**
         * Async properties contains only computedAsync definition
         * There is a default function to compute initial values for async properties (null values for data and error)
         * @returns {Object} Default object for computed async
         */
        var defaultComputedForAsync = function () {
            if (areAllArgumentsFilled(arguments)) {
                return { data: null, error: null, loading: true };
            }

            return null;
        };

        var buildSettings = function (config) {
            var settings = {};
            Object.keys(config).forEach(function (propName) {
                settings[propName] = new Setting(propName, config[propName]); // eslint-disable-line
            });

            return settings;
        };

        var attachProps = function (initialSetting, propConfig) {
            var setting = initialSetting;
            setting.type = propConfig.type;
            // <label>My input</label> for according input or span

            if (propConfig.label) {
                setting.label = propConfig.label;
            }

            if (propConfig.schema) {
                // http://schema.org
                setting.schema = propConfig.schema;
            }

            if (propConfig.sameAsProperty) {
                setting.sameAsProperty = propConfig.sameAsProperty;
            }
        };

        /**
         * Convert from JSON configuration to Setting model
         * all async properties are computed
         * all writable properties can not be async
         * add a default computed function for async properties
         */

        var Setting = function Setting(propName, propConfig) {
            _classCallCheck(this, Setting);

            if (!propConfig.type) {
                throw new Error('required_type: ' + propName);
            }

            if (typeof propConfig.type !== 'string') {
                throw new Error('required_prop_type_string: ' + propName);
            }

            // propConfig.label is optional

            var computed = propConfig.computed;
            var computedAsync = propConfig.computedAsync;

            if (computed && computedAsync) {
                throw new Error('use_computed_or_computedAsync: ' + propName);
            }

            if (computedAsync) {
                var innerType = {};
                attachProps(innerType, propConfig);

                if (propConfig.ref) {
                    innerType.ref = propConfig.ref;
                }

                this.type = 'Item';
                this.label = 'AsyncItem';
                this.refSettings = buildSettings({
                    data: innerType,
                    error: {
                        type: 'Text',
                        label: 'Error'
                    },
                    // TODO: to computed
                    // if data is null and error is null, then loading?
                    loading: {
                        type: 'Boolean',
                        label: 'Loading'
                    }
                });
                this.schema = 'AsyncItem';
            } else {
                attachProps(this, propConfig);

                if (propConfig.ref) {
                    // TODO: combine ref + schema
                    // this.ref = propConfig.ref;
                    this.refSettings = buildSettings(propConfig.ref);
                }
            }

            // exit for simple writable properties
            // continue for computed props
            if (!computed && !computedAsync) {
                return;
            }

            this.watchedKeys = (computed || computedAsync).slice(0, -1);

            if (!this.watchedKeys || this.watchedKeys.length < 1) {
                throw new Error('required_array_of_watched_keys: ' + propName);
            }

            // TODO: add default behavior for all computed properties:
            // if (areAllArgumentsFilled(arguments) === false) return null;
            this.calculate = computedAsync ? defaultComputedForAsync : computed.slice(-1)[0];

            if (!this.calculate || typeof this.calculate !== 'function') {
                throw new Error('required_calculation_function: ' + propName);
            }

            // additional function only for async props
            if (computedAsync) {
                this.calculateAsync = computedAsync.slice(-1)[0];

                if (!this.calculateAsync || typeof this.calculateAsync !== 'function') {
                    throw new Error('required_async_calculation_function: ' + propName);
                }
            }
        };

        module.exports = Setting;
    }, {}], 23: [function (require, module, exports) {
        arguments[4][4][0].apply(exports, arguments);
    }, { "dup": 4 }], 24: [function (require, module, exports) {
        /*!
         * Pikaday
         *
         * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
         */

        (function (root, factory) {
            'use strict';

            var moment;
            if (typeof exports === 'object') {
                // CommonJS module
                // Load moment.js as an optional dependency
                try {
                    moment = require('moment');
                } catch (e) {}
                module.exports = factory(moment);
            } else if (typeof define === 'function' && define.amd) {
                // AMD. Register as an anonymous module.
                define(function (req) {
                    // Load moment.js as an optional dependency
                    var id = 'moment';
                    try {
                        moment = req(id);
                    } catch (e) {}
                    return factory(moment);
                });
            } else {
                root.Pikaday = factory(root.moment);
            }
        })(this, function (moment) {
            'use strict';

            /**
             * feature detection and helper functions
             */

            var hasMoment = typeof moment === 'function',
                hasEventListeners = !!window.addEventListener,
                document = window.document,
                sto = window.setTimeout,
                addEvent = function (el, e, callback, capture) {
                if (hasEventListeners) {
                    el.addEventListener(e, callback, !!capture);
                } else {
                    el.attachEvent('on' + e, callback);
                }
            },
                removeEvent = function (el, e, callback, capture) {
                if (hasEventListeners) {
                    el.removeEventListener(e, callback, !!capture);
                } else {
                    el.detachEvent('on' + e, callback);
                }
            },
                fireEvent = function (el, eventName, data) {
                var ev;

                if (document.createEvent) {
                    ev = document.createEvent('HTMLEvents');
                    ev.initEvent(eventName, true, false);
                    ev = extend(ev, data);
                    el.dispatchEvent(ev);
                } else if (document.createEventObject) {
                    ev = document.createEventObject();
                    ev = extend(ev, data);
                    el.fireEvent('on' + eventName, ev);
                }
            },
                trim = function (str) {
                return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
            },
                hasClass = function (el, cn) {
                return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
            },
                addClass = function (el, cn) {
                if (!hasClass(el, cn)) {
                    el.className = el.className === '' ? cn : el.className + ' ' + cn;
                }
            },
                removeClass = function (el, cn) {
                el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
            },
                isArray = function (obj) {
                return (/Array/.test(Object.prototype.toString.call(obj))
                );
            },
                isDate = function (obj) {
                return (/Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
                );
            },
                isWeekend = function (date) {
                var day = date.getDay();
                return day === 0 || day === 6;
            },
                isLeapYear = function (year) {
                // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
                return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
            },
                getDaysInMonth = function (year, month) {
                return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
            },
                setToStartOfDay = function (date) {
                if (isDate(date)) date.setHours(0, 0, 0, 0);
            },
                compareDates = function (a, b) {
                // weak date comparison (use setToStartOfDay(date) to ensure correct result)
                return a.getTime() === b.getTime();
            },
                extend = function (to, from, overwrite) {
                var prop, hasProp;
                for (prop in from) {
                    hasProp = to[prop] !== undefined;
                    if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                        if (isDate(from[prop])) {
                            if (overwrite) {
                                to[prop] = new Date(from[prop].getTime());
                            }
                        } else if (isArray(from[prop])) {
                            if (overwrite) {
                                to[prop] = from[prop].slice(0);
                            }
                        } else {
                            to[prop] = extend({}, from[prop], overwrite);
                        }
                    } else if (overwrite || !hasProp) {
                        to[prop] = from[prop];
                    }
                }
                return to;
            },
                adjustCalendar = function (calendar) {
                if (calendar.month < 0) {
                    calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
                    calendar.month += 12;
                }
                if (calendar.month > 11) {
                    calendar.year += Math.floor(Math.abs(calendar.month) / 12);
                    calendar.month -= 12;
                }
                return calendar;
            },


            /**
             * defaults and localisation
             */
            defaults = {

                // bind the picker to a form field
                field: null,

                // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
                bound: undefined,

                // position of the datepicker, relative to the field (default to bottom & left)
                // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
                position: 'bottom left',

                // automatically fit in the viewport even if it means repositioning from the position option
                reposition: true,

                // the default output format for `.toString()` and `field` value
                format: 'YYYY-MM-DD',

                // the initial date to view when first opened
                defaultDate: null,

                // make the `defaultDate` the initial selected value
                setDefaultDate: false,

                // first day of week (0: Sunday, 1: Monday etc)
                firstDay: 0,

                // the default flag for moment's strict date parsing
                formatStrict: false,

                // the minimum/earliest date that can be selected
                minDate: null,
                // the maximum/latest date that can be selected
                maxDate: null,

                // number of years either side, or array of upper/lower range
                yearRange: 10,

                // show week numbers at head of row
                showWeekNumber: false,

                // used internally (don't config outside)
                minYear: 0,
                maxYear: 9999,
                minMonth: undefined,
                maxMonth: undefined,

                startRange: null,
                endRange: null,

                isRTL: false,

                // Additional text to append to the year in the calendar title
                yearSuffix: '',

                // Render the month after year in the calendar title
                showMonthAfterYear: false,

                // Render days of the calendar grid that fall in the next or previous month
                showDaysInNextAndPreviousMonths: false,

                // how many months are visible
                numberOfMonths: 1,

                // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
                // only used for the first display or when a selected date is not visible
                mainCalendar: 'left',

                // Specify a DOM element to render the calendar in
                container: undefined,

                // internationalization
                i18n: {
                    previousMonth: 'Previous Month',
                    nextMonth: 'Next Month',
                    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                },

                // Theme Classname
                theme: null,

                // callback function
                onSelect: null,
                onOpen: null,
                onClose: null,
                onDraw: null
            },


            /**
             * templating functions to abstract HTML rendering
             */
            renderDayName = function (opts, day, abbr) {
                day += opts.firstDay;
                while (day >= 7) {
                    day -= 7;
                }
                return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
            },
                renderDay = function (opts) {
                var arr = [];
                var ariaSelected = 'false';
                if (opts.isEmpty) {
                    if (opts.showDaysInNextAndPreviousMonths) {
                        arr.push('is-outside-current-month');
                    } else {
                        return '<td class="is-empty"></td>';
                    }
                }
                if (opts.isDisabled) {
                    arr.push('is-disabled');
                }
                if (opts.isToday) {
                    arr.push('is-today');
                }
                if (opts.isSelected) {
                    arr.push('is-selected');
                    ariaSelected = 'true';
                }
                if (opts.isInRange) {
                    arr.push('is-inrange');
                }
                if (opts.isStartRange) {
                    arr.push('is-startrange');
                }
                if (opts.isEndRange) {
                    arr.push('is-endrange');
                }
                return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' + '<button class="pika-button pika-day" type="button" ' + 'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' + opts.day + '</button>' + '</td>';
            },
                renderWeek = function (d, m, y) {
                // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
                var onejan = new Date(y, 0, 1),
                    weekNum = Math.ceil(((new Date(y, m, d) - onejan) / 86400000 + onejan.getDay() + 1) / 7);
                return '<td class="pika-week">' + weekNum + '</td>';
            },
                renderRow = function (days, isRTL) {
                return '<tr>' + (isRTL ? days.reverse() : days).join('') + '</tr>';
            },
                renderBody = function (rows) {
                return '<tbody>' + rows.join('') + '</tbody>';
            },
                renderHead = function (opts) {
                var i,
                    arr = [];
                if (opts.showWeekNumber) {
                    arr.push('<th></th>');
                }
                for (i = 0; i < 7; i++) {
                    arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
                }
                return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
            },
                renderTitle = function (instance, c, year, month, refYear, randId) {
                var i,
                    j,
                    arr,
                    opts = instance._o,
                    isMinYear = year === opts.minYear,
                    isMaxYear = year === opts.maxYear,
                    html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
                    monthHtml,
                    yearHtml,
                    prev = true,
                    next = true;

                for (arr = [], i = 0; i < 12; i++) {
                    arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : '') + '>' + opts.i18n.months[i] + '</option>');
                }

                monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

                if (isArray(opts.yearRange)) {
                    i = opts.yearRange[0];
                    j = opts.yearRange[1] + 1;
                } else {
                    i = year - opts.yearRange;
                    j = 1 + year + opts.yearRange;
                }

                for (arr = []; i < j && i <= opts.maxYear; i++) {
                    if (i >= opts.minYear) {
                        arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"' : '') + '>' + i + '</option>');
                    }
                }
                yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

                if (opts.showMonthAfterYear) {
                    html += yearHtml + monthHtml;
                } else {
                    html += monthHtml + yearHtml;
                }

                if (isMinYear && (month === 0 || opts.minMonth >= month)) {
                    prev = false;
                }

                if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
                    next = false;
                }

                if (c === 0) {
                    html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
                }
                if (c === instance._o.numberOfMonths - 1) {
                    html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
                }

                return html += '</div>';
            },
                renderTable = function (opts, data, randId) {
                return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
            },


            /**
             * Pikaday constructor
             */
            Pikaday = function (options) {
                var self = this,
                    opts = self.config(options);

                self._onMouseDown = function (e) {
                    if (!self._v) {
                        return;
                    }
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    if (!target) {
                        return;
                    }

                    if (!hasClass(target, 'is-disabled')) {
                        if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                            self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                            if (opts.bound) {
                                sto(function () {
                                    self.hide();
                                    if (opts.field) {
                                        opts.field.blur();
                                    }
                                }, 100);
                            }
                        } else if (hasClass(target, 'pika-prev')) {
                            self.prevMonth();
                        } else if (hasClass(target, 'pika-next')) {
                            self.nextMonth();
                        }
                    }
                    if (!hasClass(target, 'pika-select')) {
                        // if this is touch event prevent mouse events emulation
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                            return false;
                        }
                    } else {
                        self._c = true;
                    }
                };

                self._onChange = function (e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    if (!target) {
                        return;
                    }
                    if (hasClass(target, 'pika-select-month')) {
                        self.gotoMonth(target.value);
                    } else if (hasClass(target, 'pika-select-year')) {
                        self.gotoYear(target.value);
                    }
                };

                self._onKeyChange = function (e) {
                    e = e || window.event;

                    if (self.isVisible()) {

                        switch (e.keyCode) {
                            case 13:
                            case 27:
                                opts.field.blur();
                                break;
                            case 37:
                                e.preventDefault();
                                self.adjustDate('subtract', 1);
                                break;
                            case 38:
                                self.adjustDate('subtract', 7);
                                break;
                            case 39:
                                self.adjustDate('add', 1);
                                break;
                            case 40:
                                self.adjustDate('add', 7);
                                break;
                        }
                    }
                };

                self._onInputChange = function (e) {
                    var date;

                    if (e.firedBy === self) {
                        return;
                    }
                    if (hasMoment) {
                        date = moment(opts.field.value, opts.format, opts.formatStrict);
                        date = date && date.isValid() ? date.toDate() : null;
                    } else {
                        date = new Date(Date.parse(opts.field.value));
                    }
                    if (isDate(date)) {
                        self.setDate(date);
                    }
                    if (!self._v) {
                        self.show();
                    }
                };

                self._onInputFocus = function () {
                    self.show();
                };

                self._onInputClick = function () {
                    self.show();
                };

                self._onInputBlur = function () {
                    // IE allows pika div to gain focus; catch blur the input field
                    var pEl = document.activeElement;
                    do {
                        if (hasClass(pEl, 'pika-single')) {
                            return;
                        }
                    } while (pEl = pEl.parentNode);

                    if (!self._c) {
                        self._b = sto(function () {
                            self.hide();
                        }, 50);
                    }
                    self._c = false;
                };

                self._onClick = function (e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement,
                        pEl = target;
                    if (!target) {
                        return;
                    }
                    if (!hasEventListeners && hasClass(target, 'pika-select')) {
                        if (!target.onchange) {
                            target.setAttribute('onchange', 'return;');
                            addEvent(target, 'change', self._onChange);
                        }
                    }
                    do {
                        if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                            return;
                        }
                    } while (pEl = pEl.parentNode);
                    if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                        self.hide();
                    }
                };

                self.el = document.createElement('div');
                self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

                addEvent(self.el, 'mousedown', self._onMouseDown, true);
                addEvent(self.el, 'touchend', self._onMouseDown, true);
                addEvent(self.el, 'change', self._onChange);
                addEvent(document, 'keydown', self._onKeyChange);

                if (opts.field) {
                    if (opts.container) {
                        opts.container.appendChild(self.el);
                    } else if (opts.bound) {
                        document.body.appendChild(self.el);
                    } else {
                        opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
                    }
                    addEvent(opts.field, 'change', self._onInputChange);

                    if (!opts.defaultDate) {
                        if (hasMoment && opts.field.value) {
                            opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                        } else {
                            opts.defaultDate = new Date(Date.parse(opts.field.value));
                        }
                        opts.setDefaultDate = true;
                    }
                }

                var defDate = opts.defaultDate;

                if (isDate(defDate)) {
                    if (opts.setDefaultDate) {
                        self.setDate(defDate, true);
                    } else {
                        self.gotoDate(defDate);
                    }
                } else {
                    self.gotoDate(new Date());
                }

                if (opts.bound) {
                    this.hide();
                    self.el.className += ' is-bound';
                    addEvent(opts.trigger, 'click', self._onInputClick);
                    addEvent(opts.trigger, 'focus', self._onInputFocus);
                    addEvent(opts.trigger, 'blur', self._onInputBlur);
                } else {
                    this.show();
                }
            };

            /**
             * public Pikaday API
             */
            Pikaday.prototype = {

                /**
                 * configure functionality
                 */
                config: function (options) {
                    if (!this._o) {
                        this._o = extend({}, defaults, true);
                    }

                    var opts = extend(this._o, options, true);

                    opts.isRTL = !!opts.isRTL;

                    opts.field = opts.field && opts.field.nodeName ? opts.field : null;

                    opts.theme = typeof opts.theme === 'string' && opts.theme ? opts.theme : null;

                    opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

                    opts.trigger = opts.trigger && opts.trigger.nodeName ? opts.trigger : opts.field;

                    opts.disableWeekends = !!opts.disableWeekends;

                    opts.disableDayFn = typeof opts.disableDayFn === 'function' ? opts.disableDayFn : null;

                    var nom = parseInt(opts.numberOfMonths, 10) || 1;
                    opts.numberOfMonths = nom > 4 ? 4 : nom;

                    if (!isDate(opts.minDate)) {
                        opts.minDate = false;
                    }
                    if (!isDate(opts.maxDate)) {
                        opts.maxDate = false;
                    }
                    if (opts.minDate && opts.maxDate && opts.maxDate < opts.minDate) {
                        opts.maxDate = opts.minDate = false;
                    }
                    if (opts.minDate) {
                        this.setMinDate(opts.minDate);
                    }
                    if (opts.maxDate) {
                        this.setMaxDate(opts.maxDate);
                    }

                    if (isArray(opts.yearRange)) {
                        var fallback = new Date().getFullYear() - 10;
                        opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                        opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
                    } else {
                        opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                        if (opts.yearRange > 100) {
                            opts.yearRange = 100;
                        }
                    }

                    return opts;
                },

                /**
                 * return a formatted string of the current selection (using Moment.js if available)
                 */
                toString: function (format) {
                    return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this._o.format) : this._d.toDateString();
                },

                /**
                 * return a Moment.js object of the current selection (if available)
                 */
                getMoment: function () {
                    return hasMoment ? moment(this._d) : null;
                },

                /**
                 * set the current selection from a Moment.js object (if available)
                 */
                setMoment: function (date, preventOnSelect) {
                    if (hasMoment && moment.isMoment(date)) {
                        this.setDate(date.toDate(), preventOnSelect);
                    }
                },

                /**
                 * return a Date object of the current selection with fallback for the current date
                 */
                getDate: function () {
                    return isDate(this._d) ? new Date(this._d.getTime()) : new Date();
                },

                /**
                 * set the current selection
                 */
                setDate: function (date, preventOnSelect) {
                    if (!date) {
                        this._d = null;

                        if (this._o.field) {
                            this._o.field.value = '';
                            fireEvent(this._o.field, 'change', { firedBy: this });
                        }

                        return this.draw();
                    }
                    if (typeof date === 'string') {
                        date = new Date(Date.parse(date));
                    }
                    if (!isDate(date)) {
                        return;
                    }

                    var min = this._o.minDate,
                        max = this._o.maxDate;

                    if (isDate(min) && date < min) {
                        date = min;
                    } else if (isDate(max) && date > max) {
                        date = max;
                    }

                    this._d = new Date(date.getTime());
                    setToStartOfDay(this._d);
                    this.gotoDate(this._d);

                    if (this._o.field) {
                        this._o.field.value = this.toString();
                        fireEvent(this._o.field, 'change', { firedBy: this });
                    }
                    if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                        this._o.onSelect.call(this, this.getDate());
                    }
                },

                /**
                 * change view to a specific date
                 */
                gotoDate: function (date) {
                    var newCalendar = true;

                    if (!isDate(date)) {
                        return;
                    }

                    if (this.calendars) {
                        var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                            lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                            visibleDate = date.getTime();
                        // get the end of the month
                        lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
                        lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
                        newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
                    }

                    if (newCalendar) {
                        this.calendars = [{
                            month: date.getMonth(),
                            year: date.getFullYear()
                        }];
                        if (this._o.mainCalendar === 'right') {
                            this.calendars[0].month += 1 - this._o.numberOfMonths;
                        }
                    }

                    this.adjustCalendars();
                },

                adjustDate: function (sign, days) {

                    var day = this.getDate();
                    var difference = parseInt(days) * 24 * 60 * 60 * 1000;

                    var newDay;

                    if (sign === 'add') {
                        newDay = new Date(day.valueOf() + difference);
                    } else if (sign === 'subtract') {
                        newDay = new Date(day.valueOf() - difference);
                    }

                    if (hasMoment) {
                        if (sign === 'add') {
                            newDay = moment(day).add(days, "days").toDate();
                        } else if (sign === 'subtract') {
                            newDay = moment(day).subtract(days, "days").toDate();
                        }
                    }

                    this.setDate(newDay);
                },

                adjustCalendars: function () {
                    this.calendars[0] = adjustCalendar(this.calendars[0]);
                    for (var c = 1; c < this._o.numberOfMonths; c++) {
                        this.calendars[c] = adjustCalendar({
                            month: this.calendars[0].month + c,
                            year: this.calendars[0].year
                        });
                    }
                    this.draw();
                },

                gotoToday: function () {
                    this.gotoDate(new Date());
                },

                /**
                 * change view to a specific month (zero-index, e.g. 0: January)
                 */
                gotoMonth: function (month) {
                    if (!isNaN(month)) {
                        this.calendars[0].month = parseInt(month, 10);
                        this.adjustCalendars();
                    }
                },

                nextMonth: function () {
                    this.calendars[0].month++;
                    this.adjustCalendars();
                },

                prevMonth: function () {
                    this.calendars[0].month--;
                    this.adjustCalendars();
                },

                /**
                 * change view to a specific full year (e.g. "2012")
                 */
                gotoYear: function (year) {
                    if (!isNaN(year)) {
                        this.calendars[0].year = parseInt(year, 10);
                        this.adjustCalendars();
                    }
                },

                /**
                 * change the minDate
                 */
                setMinDate: function (value) {
                    if (value instanceof Date) {
                        setToStartOfDay(value);
                        this._o.minDate = value;
                        this._o.minYear = value.getFullYear();
                        this._o.minMonth = value.getMonth();
                    } else {
                        this._o.minDate = defaults.minDate;
                        this._o.minYear = defaults.minYear;
                        this._o.minMonth = defaults.minMonth;
                        this._o.startRange = defaults.startRange;
                    }

                    this.draw();
                },

                /**
                 * change the maxDate
                 */
                setMaxDate: function (value) {
                    if (value instanceof Date) {
                        setToStartOfDay(value);
                        this._o.maxDate = value;
                        this._o.maxYear = value.getFullYear();
                        this._o.maxMonth = value.getMonth();
                    } else {
                        this._o.maxDate = defaults.maxDate;
                        this._o.maxYear = defaults.maxYear;
                        this._o.maxMonth = defaults.maxMonth;
                        this._o.endRange = defaults.endRange;
                    }

                    this.draw();
                },

                setStartRange: function (value) {
                    this._o.startRange = value;
                },

                setEndRange: function (value) {
                    this._o.endRange = value;
                },

                /**
                 * refresh the HTML
                 */
                draw: function (force) {
                    if (!this._v && !force) {
                        return;
                    }
                    var opts = this._o,
                        minYear = opts.minYear,
                        maxYear = opts.maxYear,
                        minMonth = opts.minMonth,
                        maxMonth = opts.maxMonth,
                        html = '',
                        randId;

                    if (this._y <= minYear) {
                        this._y = minYear;
                        if (!isNaN(minMonth) && this._m < minMonth) {
                            this._m = minMonth;
                        }
                    }
                    if (this._y >= maxYear) {
                        this._y = maxYear;
                        if (!isNaN(maxMonth) && this._m > maxMonth) {
                            this._m = maxMonth;
                        }
                    }

                    randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

                    for (var c = 0; c < opts.numberOfMonths; c++) {
                        html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
                    }

                    this.el.innerHTML = html;

                    if (opts.bound) {
                        if (opts.field.type !== 'hidden') {
                            sto(function () {
                                opts.trigger.focus();
                            }, 1);
                        }
                    }

                    if (typeof this._o.onDraw === 'function') {
                        this._o.onDraw(this);
                    }

                    if (opts.bound) {
                        // let the screen reader user know to use arrow keys
                        opts.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
                    }
                },

                adjustPosition: function () {
                    var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

                    if (this._o.container) return;

                    this.el.style.position = 'absolute';

                    field = this._o.trigger;
                    pEl = field;
                    width = this.el.offsetWidth;
                    height = this.el.offsetHeight;
                    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                    viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                    scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

                    if (typeof field.getBoundingClientRect === 'function') {
                        clientRect = field.getBoundingClientRect();
                        left = clientRect.left + window.pageXOffset;
                        top = clientRect.bottom + window.pageYOffset;
                    } else {
                        left = pEl.offsetLeft;
                        top = pEl.offsetTop + pEl.offsetHeight;
                        while (pEl = pEl.offsetParent) {
                            left += pEl.offsetLeft;
                            top += pEl.offsetTop;
                        }
                    }

                    // default position is bottom & left
                    if (this._o.reposition && left + width > viewportWidth || this._o.position.indexOf('right') > -1 && left - width + field.offsetWidth > 0) {
                        left = left - width + field.offsetWidth;
                    }
                    if (this._o.reposition && top + height > viewportHeight + scrollTop || this._o.position.indexOf('top') > -1 && top - height - field.offsetHeight > 0) {
                        top = top - height - field.offsetHeight;
                    }

                    this.el.style.left = left + 'px';
                    this.el.style.top = top + 'px';
                },

                /**
                 * render HTML for a particular month
                 */
                render: function (year, month, randId) {
                    var opts = this._o,
                        now = new Date(),
                        days = getDaysInMonth(year, month),
                        before = new Date(year, month, 1).getDay(),
                        data = [],
                        row = [];
                    setToStartOfDay(now);
                    if (opts.firstDay > 0) {
                        before -= opts.firstDay;
                        if (before < 0) {
                            before += 7;
                        }
                    }
                    var previousMonth = month === 0 ? 11 : month - 1,
                        nextMonth = month === 11 ? 0 : month + 1,
                        yearOfPreviousMonth = month === 0 ? year - 1 : year,
                        yearOfNextMonth = month === 11 ? year + 1 : year,
                        daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
                    var cells = days + before,
                        after = cells;
                    while (after > 7) {
                        after -= 7;
                    }
                    cells += 7 - after;
                    for (var i = 0, r = 0; i < cells; i++) {
                        var day = new Date(year, month, 1 + (i - before)),
                            isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                            isToday = compareDates(day, now),
                            isEmpty = i < before || i >= days + before,
                            dayNumber = 1 + (i - before),
                            monthNumber = month,
                            yearNumber = year,
                            isStartRange = opts.startRange && compareDates(opts.startRange, day),
                            isEndRange = opts.endRange && compareDates(opts.endRange, day),
                            isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                            isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);

                        if (isEmpty) {
                            if (i < before) {
                                dayNumber = daysInPreviousMonth + dayNumber;
                                monthNumber = previousMonth;
                                yearNumber = yearOfPreviousMonth;
                            } else {
                                dayNumber = dayNumber - days;
                                monthNumber = nextMonth;
                                yearNumber = yearOfNextMonth;
                            }
                        }

                        var dayConfig = {
                            day: dayNumber,
                            month: monthNumber,
                            year: yearNumber,
                            isSelected: isSelected,
                            isToday: isToday,
                            isDisabled: isDisabled,
                            isEmpty: isEmpty,
                            isStartRange: isStartRange,
                            isEndRange: isEndRange,
                            isInRange: isInRange,
                            showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
                        };

                        row.push(renderDay(dayConfig));

                        if (++r === 7) {
                            if (opts.showWeekNumber) {
                                row.unshift(renderWeek(i - before, month, year));
                            }
                            data.push(renderRow(row, opts.isRTL));
                            row = [];
                            r = 0;
                        }
                    }
                    return renderTable(opts, data, randId);
                },

                isVisible: function () {
                    return this._v;
                },

                show: function () {
                    if (!this.isVisible()) {
                        removeClass(this.el, 'is-hidden');
                        this._v = true;
                        this.draw();
                        if (this._o.bound) {
                            addEvent(document, 'click', this._onClick);
                            this.adjustPosition();
                        }
                        if (typeof this._o.onOpen === 'function') {
                            this._o.onOpen.call(this);
                        }
                    }
                },

                hide: function () {
                    var v = this._v;
                    if (v !== false) {
                        if (this._o.bound) {
                            removeEvent(document, 'click', this._onClick);
                        }
                        this.el.style.position = 'static'; // reset
                        this.el.style.left = 'auto';
                        this.el.style.top = 'auto';
                        addClass(this.el, 'is-hidden');
                        this._v = false;
                        if (v !== undefined && typeof this._o.onClose === 'function') {
                            this._o.onClose.call(this);
                        }
                    }
                },

                /**
                 * GAME OVER
                 */
                destroy: function () {
                    this.hide();
                    removeEvent(this.el, 'mousedown', this._onMouseDown, true);
                    removeEvent(this.el, 'touchend', this._onMouseDown, true);
                    removeEvent(this.el, 'change', this._onChange);
                    if (this._o.field) {
                        removeEvent(this._o.field, 'change', this._onInputChange);
                        if (this._o.bound) {
                            removeEvent(this._o.trigger, 'click', this._onInputClick);
                            removeEvent(this._o.trigger, 'focus', this._onInputFocus);
                            removeEvent(this._o.trigger, 'blur', this._onInputBlur);
                        }
                    }
                    if (this.el.parentNode) {
                        this.el.parentNode.removeChild(this.el);
                    }
                }

            };

            return Pikaday;
        });
    }, { "moment": 23 }], 25: [function (require, module, exports) {
        /** Pick any integer between min and max age */

        'use strict';

        /**
         * @param {Number} props.value Number or null
         */

        module.exports = function (props, doc) {
            var elem = doc.createElement('input');
            elem.type = 'number';
            elem.placeholder = 'лет';
            return elem;
        };
    }, {}], 26: [function (require, module, exports) {
        /** Boolean label */

        'use strict';

        module.exports = function () {
            var elem = document.createElement('span');
            elem.setAttribute('data-state', '');
            return elem;
        };
    }, {}], 27: [function (require, module, exports) {
        /** Checkbox */

        'use strict';

        module.exports = function (props, doc) {
            var elem = doc.createElement('input');
            elem.type = 'checkbox';

            setTimeout(function () {
                var div = doc.createElement('div');
                div.appendChild(doc.createElement('div'));
                elem.parentNode.insertBefore(div, elem.nextSibling);
            }, 0);

            return elem;
        };
    }, {}], 28: [function (require, module, exports) {
        /**
         * Set property value: input or display
         */

        'use strict';

        var reselectOptions = function (elem, value) {
            var options = elem.children;
            for (var i = options.length - 1; i >= 0; i -= 1) {
                var needOption = options[i];
                // setAttribute for static html
                if (needOption.value === value) {
                    needOption.setAttribute('selected', 'selected');
                } else {
                    needOption.removeAttribute('selected');
                }
            }
        };

        /**
         * Установка значения элемента
         * Преобразование исходного типа в тип элемента (строка или чекбокс)
         * value - for inputs
         * textContent - for readable properties
         * По сути является полифиллом для elem.setTypedValue -
         *   установкой типизированного значения (не строки) в элемент
         */
        var setInputValue = function (elemInput, value) {
            // no-param-reassign
            var elem = elemInput;

            if (value === undefined) {
                throw new Error('value_can_not_be_undefined');
            }

            switch (elem.type) {
                case 'checkbox':
                    elem.checked = value; // null or false or true
                    if (value === true) {
                        elem.setAttribute('checked', 'checked');
                        // default value in some browsers
                        elem.setAttribute('value', 'on');
                    } else {
                        elem.removeAttribute('checked');
                        elem.removeAttribute('value');
                    }
                    break;
                case 'select-one':
                    // Attribute value not allowed on element select at this point
                    elem.value = value === null ? '' : value;
                    reselectOptions(elem, value);
                    break;
                default:
                    elem.value = value === null ? '' : value;
                    if (value !== null) {
                        elem.setAttribute('value', value);
                    } else {
                        elem.removeAttribute('value');
                    }
            }

            // debugging
            elem.title = String(value);
        };

        var parseImageMeta = function (imageMeta) {
            var parts = imageMeta.split('|');

            if (!parts[0]) {
                throw new Error('required_imageMeta_src');
            }

            var result = {
                src: parts[0]
            };

            for (var i = 1; i < parts.length; i += 1) {
                var keyValue = parts[i].split('=');
                result[keyValue[0]] = keyValue[1];
            }

            return result;
        };

        var setDisplayValue = function (elemDisplay, value) {
            var elem = elemDisplay;

            if (value === undefined) {
                throw new Error('value_can_not_be_undefined');
            }

            if (elem.tagName === 'A') {
                elem.href = value || '';
                elem.textContent = value || '';
            } else if (elem.tagName === 'IMG') {
                if (value === null) {
                    throw new Error('image can not be null at this moment');
                }
                var imageMeta = parseImageMeta(value);
                // parse Image string

                elem.src = imageMeta.src;
                if (imageMeta.width) {
                    elem.width = imageMeta.width;
                }
                if (imageMeta.height) {
                    elem.height = imageMeta.height;
                }
                if (imageMeta.alt) {
                    elem.alt = imageMeta.alt;
                }
            } else if (elem.hasAttribute('data-state')) {
                elem.textContent = String(value);
                elem.setAttribute('data-state', String(value));
                // set to wrap
                elem.parentNode.setAttribute('data-state', String(value));
            } else {
                elem.textContent = value === null ? '' : value + '';
                // TODO debugging
                elem.title = String(value);
            }
        };

        module.exports = {
            setInputValue: setInputValue,
            setDisplayValue: setDisplayValue
        };

        /**
         * HTML контрол при каждом событии генерирует нужные данные
         * Например <input type="number" class="integer-input />
         * является по сути <integer-input />
         * который на выходе должен выдавать целое число,
         * а также выдавать базовую ошибку, если введено нецелое число или строка
         * Изначально элемент содержит только базовую логику, объявленную браузером, например проверка чисел, дат, а также генерация событий. То есть HTML разметка уже сама по себе содержит логику (без дополнительных скриптов)
         * Данный полифилл добавляет более гибкую логику элементам ввода.
         *
         * Обновление также может быть и по кнопке UPDATE - явный вызов
         * - слушать событие клик на соответствующих кнопках
         */

        /**
         * Событие вставки новых записей.
         * Три вида кнопок: обновление, удаление, добавление
         * - события клик на соответствующих кнопках
         * В итоге инициируется новое сообщение
         * - название сущности (пути)
         * - новый элемент (созданный или выбранный)
         */
        // const registerInsert = function(rootElem) {
        //   rootElem.addEventListener('click', function(e) {
        //     const elem = e.target;

        //     // <form new-record></form>
        //     // `<button data-method="insert-item"
        //     //          data-entity="policy.countries"
        //     //          data-entity-form="some-form-of-new-record"
        //     // `;

        //     // `<button data-method="remove-item"
        //     //          data-entity="policy.countries"
        //     //          data-entity-id="usa"
        //     // `;

        //     const event = new CustomEvent('insertItem', {
        //       detail: result,
        //       bubbles: true
        //     });

        //     elem.dispatchEvent(event);
        //   });
        // };
    }, {}], 29: [function (require, module, exports) {
        /** Country input */

        'use strict';

        module.exports = function (props, doc, typeChecker) {
            var elem = document.createElement('select');
            // elem.type = 'text';
            // elem.placeholder = 'country id';

            var emptyOption = document.createElement('option');
            emptyOption.textContent = 'Выберите страну...';
            emptyOption.value = '';
            elem.appendChild(emptyOption);

            typeChecker.allowed.forEach(function (c) {
                var elemOption = document.createElement('option');
                elemOption.value = c.id;
                elemOption.textContent = c.name;
                elemOption.label = c.name;
                elem.appendChild(elemOption);
            });

            return elem;
        };
    }, {}], 30: [function (require, module, exports) {
        /** Date as GOST string */

        'use strict';

        module.exports = function (props, doc) {
            var elem = doc.createElement('span');
            return elem;
        };
    }, {}], 31: [function (require, module, exports) {
        /** @module */

        'use strict';

        module.exports = function (props, doc) {
            var elem = doc.createElement('input');
            elem.type = 'date';
            // elem.placeholder = 'dd.mm.yyyy';
            // TODO: manual input later
            // https://github.com/dbushell/Pikaday/issues/520
            elem.readOnly = true;
            // TODO: load min and max from other DOM elements
            //    console.log('picker is created');
            // };

            return elem;
        };
    }, {}], 32: [function (require, module, exports) {
        /** Pick any number between min and max */

        'use strict';

        module.exports = function (props, doc, typeChecker) {
            var elem = document.createElement('input');
            elem.type = 'number';
            elem.placeholder = 'От ' + typeChecker.min + ' до ' + typeChecker.max;
            elem.min = typeChecker.min;
            elem.max = typeChecker.max;
            return elem;
        };
    }, {}], 33: [function (require, module, exports) {
        /** String input */

        'use strict';

        module.exports = function (props, doc) {
            var elem = doc.createElement('input');
            elem.type = 'text';
            elem.placeholder = 'duration';
            // TODO: show picker like date: years, months, days number

            return elem;
        };
    }, {}], 34: [function (require, module, exports) {
        /**
         * Contains a list of simple inputs, according entity properties
         * @module
         */

        'use strict';

        var propFactory = require('./prop-factory');
        var controlsSetter = require('./controls-setter');
        var microdata = require('./helpers/microdata');
        var propRow = require('./prop-row');

        var entityListWrapper = require('./entity-list-wrapper');

        var SEPAR = '__';

        var buildInputName = function (parentPathLevels, propName) {
            var levels = parentPathLevels.concat(propName);

            var str = levels[0];

            for (var i = 1; i < levels.length; i += 1) {
                str += '[' + levels[i] + ']';
            }

            return str;
        };

        var destroyEntityElem = function (elemRow, entityPathLevels) {
            var allPathLevels = ['root'].concat(entityPathLevels);

            var elemEntityId = allPathLevels.join(SEPAR) + '_content';

            var elemEntity = elemRow.querySelector('#' + elemEntityId);

            if (elemEntity) {
                elemRow.removeChild(elemEntity);
            }
        };

        /**
         * Entity, like 'student', 'person', 'thing', 'membership'
         * @param {String} propName Name of a property of a parent entity,
         *        eg: 'group.captain = {}' null only for root element
         *        'item' if the parent is ItemList
         * @param {String[]} entityPathLevels
         *        eg: second membership in a group: [group, memberships, 2]
         *        no path levels only for a root element
         * @param {Object} entityTemplate { firstName: 'bar' }
         * @param {String} entitySchema eg: 'Person', 'Thing', 'Membership'
         * @param {Object} defaultValues { firstName: 'Jane', ... } for this entity
         * @returns {Object} DOM element for this entity
         */
        var buildEntityElem = function (elemRow, entityPathLevels, entitySchema, entity, typeCheckers, isGlobalDisplayOnly) {
            if (!typeCheckers) {
                throw new Error('required_typeCheckers');
            }

            // Если элемент уже существует, его надо обновить, а не строить заново
            // Передавать родительский компонент
            // По нему определять существование и вставлять в него же

            var allPathLevels = ['root'].concat(entityPathLevels);

            var elemEntityId = allPathLevels.join(SEPAR) + '_content';

            // // TODO: find from parentElem (not from document)
            var elemEntity = elemRow.querySelector('#' + elemEntityId);

            if (!entity) {
                throw new Error('required_entity');
            }

            if (!elemEntity) {
                // Создать новый элемент со свойствами
                // Вставить в parentElem
                // По идее каждое обновление хранилища должно полностью перестраивать элемент сущности и встраивать в тело документа (заменять)
                elemEntity = document.createElement('div');
                elemEntity.id = elemEntityId;
                // if (entityPathLevels.length > 0) {
                //   // TODO: propName
                //   microdata.markProperty(elemEntityContent, propName);
                // }
                microdata.markEntity(elemEntity, entitySchema);
                elemRow.appendChild(elemEntity);
                // } else {
                //   // TODO: обновить все внутренние свойства
                //   throw new Error('not_realized_update');
            }

            // console.log('elemEntityContent', elemEntityContent);
            // update or create
            buildElementsFromSettings(elemEntity, entityPathLevels, entity, typeCheckers, isGlobalDisplayOnly); // eslint-disable-line

            return elemEntity;
        };

        var createElemInsertId = function (idPropType, typeChecker, pathLevels) {
            var elemInsertId = propFactory.createInput(idPropType, typeChecker);
            elemInsertId.setAttribute('data-entity-list-path', pathLevels.join('.'));
            elemInsertId.setAttribute('data-action', 'insertItem');
            return elemInsertId;
        };

        var findOrCreateElemSection = function (elemRow, elemSectionId, entitySettings, typeCheckers, pathLevels, isGlobalDisplayOnly) {
            var elemExisting = elemRow.querySelector('#' + elemSectionId);

            if (elemExisting) {
                return elemExisting;
            }

            // TODO: change to UL or something listable
            var elemCreated = document.createElement('div');
            elemCreated.id = elemSectionId;
            microdata.markEntity(elemCreated, 'ItemList');
            elemRow.appendChild(elemCreated);

            // id can be calculated during insertion
            // or on the client (countryId)
            // пользователь указывает ид, имя, возраст
            // данные ассоциативной сущности и самой ассоциации
            // ассоциативная сущность должна существовать в отдельности
            // от текущей сущности
            // данные ассоциации указываются вручную

            // const formInsertion = document.createElement('div');
            // это не обновляемая сущность, а вставляемая (без событий и вычисляемых полей)
            // вставляемая сущность также может содержать внутренние сущности:
            // нужна атомарная операция вставки - только записываемые частные свойства: ид и т.п.
            // некоторые сущности требуют обязательных полей (но это не точно)
            // например isFixed не может быть null
            // buildEntityElem(formInsertion,
            // entityPathLevels,
            // entitySchema,
            // entity)
            var idSetting = entitySettings.id;
            if (!idSetting) {
                throw new Error('required_id_for: ' + elemSectionId);
            }

            var idPropType = idSetting.type; // 'Country' | 'Integer'

            var typeChecker = typeCheckers[idPropType];
            if (!isGlobalDisplayOnly) {
                var elemInsertId = createElemInsertId(idPropType, typeChecker, pathLevels);
                // TODO: or in ItemList element, like [].push
                elemRow.appendChild(elemInsertId);
            }

            // const elemInsert = document.createElement('button');
            // elemInsert.type = 'button';
            // elemInsert.setAttribute('data-action-type', 'insertItem');
            // elemInsert.setAttribute('data-entity-list-path', pathLevels.join('.'));
            // добавить страну, добавить туриста
            // Кнопка добавляет пустую сущность (с авто ид), которая потом заполняется обновлениями
            // Как ИД сгенерировать? Нулевой нельзя добавить
            // По кол-ву предыдущих записей
            // elemInsert.textContent = 'Add';

            /**
               По нажатию на кнопку отображается форма (всплывающее окно)
               - выбор страны
               - выбор сохранённого туриста (добавление нового)
            */
            // elemRow.appendChild(elemInsert);
            return elemCreated;
        };

        /**
         * It doesnt depends of property name of a parent entity
         * @param {String[]} pathLevels Like ['university', 'students']
         *        Last String must be plural (collection of entities)
         * @param {Object} entitySettings A template for an item of this collection
         * @param {String} entitySchema A schema for an item of this collection, like 'Person'
         * @returns {Object} DOM element: list of items
         */
        var buildEntityListElem = function (elemRow, pathLevels, entitySchema, entitySettings, entityList, typeCheckers, isGlobalDisplayOnly) {
            if (pathLevels.length < 1) {
                throw new Error('required_path_levels_non_empty');
            }

            var allPathLevels = ['root'].concat(pathLevels);

            var elemSectionId = allPathLevels.join(SEPAR) + '_content';

            var elemSection = findOrCreateElemSection(elemRow, elemSectionId, entitySettings, typeCheckers, pathLevels, isGlobalDisplayOnly);

            entityListWrapper.updateItems(elemSection, entityList, entitySchema, pathLevels, typeCheckers, isGlobalDisplayOnly, buildEntityElem);

            return elemSection;
            // Update inner list

            // TODO
            // const itemInsertElem = buildItemInsertElem(pathLevels);
            // sectionElem.appendChild(itemInsertElem);
        };

        // Создаётся элемент свойства
        // Отделение создания элемента от установки значения
        // Так как значение может меняться
        // Другие аттрибуты также могут меняться, например минмакс
        // Но в проекте всё делится только на сущность и его свойства
        // Обновление свойства - обновляет только значение в соответствующем элементе. Все остальные аттрибуты - константы. Поэтому и нет динамических мин и макс (только статика или хак)
        var buildSimpleElem = function (elemRow, parentPathLevels, propName, propType, propValue, isDisplayOnly, typeCheckers) {
            var allPathLevels = ['root'].concat(parentPathLevels.concat(propName));

            var propContentId = allPathLevels.join(SEPAR) + '_content';

            var elemProp = elemRow.querySelector('#' + propContentId);

            if (!elemProp) {
                var typeChecker = typeCheckers[propType];

                if (isDisplayOnly) {
                    elemProp = propFactory.createDisplay(propType, typeChecker);
                } else {
                    elemProp = propFactory.createInput(propType, typeChecker);
                    elemProp.name = buildInputName(parentPathLevels, propName);
                    elemProp.setAttribute('data-entity-path', parentPathLevels.join('.') || 'root');
                }

                elemProp.id = propContentId;
                elemRow.appendChild(elemProp);
            }

            if (isDisplayOnly) {
                controlsSetter.setDisplayValue(elemProp, propValue);
            } else {
                controlsSetter.setInputValue(elemProp, propValue);
            }

            return elemProp;
        };

        var buildAnyElem = function (elemRow, propName, propSetting, parentPathLevels, propValue, typeCheckers, isPropDisplayOnly) {
            if (!propName || !propSetting) {
                throw new Error('required_propName_propSetting');
            }

            if (!elemRow) {
                throw new Error('required_elem_row');
            }

            var propType = propSetting.type;

            if (!propType) {
                throw new Error('required_propType');
            }

            var childEntitySettings = propSetting.refSettings;
            // TODO: schema from inner entity
            var childEntitySchema = propSetting.schema;

            var pathLevels = parentPathLevels.concat(propName);

            switch (propType) {
                case 'Item':
                    if (!childEntitySettings) {
                        throw new Error('required_ref_for_Item');
                    }
                    if (!childEntitySchema) {
                        throw new Error('required_schema_for_Item: ' + propName);
                    }

                    // Если сущность была удалена, тогда удалить соотв элемент
                    if (!propValue) {
                        // console.warn('create_null_props', propName);
                        destroyEntityElem(elemRow, pathLevels);
                        return null;
                    }

                    // propValue = entity
                    return buildEntityElem(elemRow, pathLevels, childEntitySchema, propValue, typeCheckers, isPropDisplayOnly);

                // only root element without propName
                // itemprop must be outside of scope
                // <div itemprop="student" itemscope itemtype="Person">
                // it's a logical error: inner components do not depend of outer
                case 'ItemList':
                    // if no propVaule (entity) - use this settings to build
                    //   the insertion form
                    if (!childEntitySettings) {
                        throw new Error('required_ref_for_ItemList');
                    }
                    if (!childEntitySchema) {
                        throw new Error('required_schema_for_ItemList: ' + propName);
                    }

                    // propValue = [{ firstName: 'Jane' }]
                    // propValue can be null (for non-existing entities)
                    return buildEntityListElem(elemRow, pathLevels, childEntitySchema, childEntitySettings, propValue || [], typeCheckers, isPropDisplayOnly); // TODO: null array
                default:
                    return buildSimpleElem(elemRow, parentPathLevels, propName, propType, propValue, isPropDisplayOnly, typeCheckers);
            }
        };

        // TODO: async objects
        // 'firstName', ['student', 'person'], false, 'Text', 'Jane'
        // 'created', ['memberships', 123], false, 'Date', '2010-01-01'

        /**
         * @param {Object} entityTemplate Like {firtsName: {type: 'Text'}}
         * @param {String[]} parentPathLevels Like ['person', 'memberships']
         * @param {Object} entity Like { firtsName: 'Jane' }
         * @returns {Object[]} List of DOM elements
         */
        var buildElementsFromSettings = function (elemEntity, parentPathLevels, entity, typeCheckers, isGlobalDisplayOnly) {
            if (!entity || !elemEntity) {
                // entityElement can not exist without an entity
                throw new Error('entity_and_elemEntity_must_exist');
            }

            var entitySettings = entity.__settings;

            Object.keys(entitySettings).forEach(function (propName) {
                // student['name']
                var propSetting = entitySettings[propName];
                var propValue = entity[propName];

                if (propValue === undefined) {
                    throw new Error('prop_can_not_be_undefined');
                }

                var propLabel = propSetting.label;
                if (!propLabel) {
                    throw new Error('required_label: ' + propName);
                }

                var isPropDisplayOnly = isGlobalDisplayOnly || !!propSetting.calculate || parentPathLevels.indexOf('data') >= 0 || propName === 'loading' || propName === 'error';

                // TODO: root__
                var allPathLevels = ['root'].concat(parentPathLevels.concat(propName));

                var propGlobalId = allPathLevels.join(SEPAR);

                var elemRow = elemEntity.querySelector('#' + propGlobalId);

                if (!elemRow) {
                    // Если свойства не существует - создаётся wrap + label + content
                    // И добавляется в родительский блок
                    // А затем обновляется значение элемента
                    elemRow = propRow(propGlobalId);
                    elemRow.setAttribute('data-prop-row', propName);

                    var elemLabel = document.createElement('label');
                    elemLabel.id = propGlobalId + '_label';
                    // if writable property, like <input>
                    if (!isPropDisplayOnly) {
                        elemLabel.htmlFor = propGlobalId + '_content';
                    }

                    elemLabel.textContent = propLabel;
                    elemRow.appendChild(elemLabel); // <td>label</td>

                    // Add to parent entity TODO: update
                    elemEntity.appendChild(elemRow);
                    // } else {
                    //   throw new Error('not_realized_update_prop');
                }

                var anyElem = buildAnyElem(elemRow, propName, propSetting, parentPathLevels, propValue, typeCheckers, isPropDisplayOnly);

                if (anyElem) {
                    microdata.markProperty(anyElem, propName, propSetting.sameAsProperty);
                }
            });
        };

        // props.parentPathLevels,
        // props.entitySettings,
        // props.entitySchema,
        // props.entity
        module.exports = buildEntityElem;

        //   // foreach props - create input, append to div
        //   // 'simple' - input
        //   // 'Item': again this element with different props
        //   // 'ItemList': new container with this elements
        // };


        // freshList (or ids)
        // const buildItemInsertElem = function(pathLevels) {
        //   // TODO: load foreignList from store (or url)
        //   const foreignList = [{
        //     id: 51,
        //     created: '2010-01-10'
        //   }, {
        //     id: 52,
        //     created: '2010-01-20'
        //   }, {
        //     id: 53,
        //     created: '2010-02-10'
        //   }];

        //   const options = foreignList.map(function(item) {
        //     // TODO: to spans from string
        //     return [item.id + '', item.id + ': ' + item.created];
        //   });

        //   options.unshift([null, 'select...']);

        //   // TODO: remove freshList from foreign list (or mark selected)

        //   // build readable form from items <select><option></select>
        //   // TODO: async url to load items
        //   // add handler to select some item: insertItem to pahtLevels
        //   // TODO: add search field for quick adding
        // };

    }, { "./controls-setter": 28, "./entity-list-wrapper": 35, "./helpers/microdata": 36, "./prop-factory": 40, "./prop-row": 41 }], 35: [function (require, module, exports) {
        'use strict';

        // const microdata = require('./helpers/microdata');

        var SEPAR = '__';

        module.exports = {
            updateItems: function (elemSection, entityList, entitySchema, pathLevels, typeCheckers, isGlobalDisplayOnly, buildEntityElem) {
                if (!elemSection) {
                    throw new Error('required_elemSection');
                }

                // must be array
                if (!entityList || Array.isArray(entityList) === false) {
                    throw new Error('required_entityList_array');
                }

                var allPathLevels = ['root'].concat(pathLevels);

                var ids = entityList.map(function (entity) {
                    return allPathLevels.concat(entity.id).join(SEPAR) + '_content';
                });

                var currentElems = elemSection.children;

                // delete excessive
                for (var i = currentElems.length - 1; i >= 0; i -= 1) {
                    var needElem = currentElems[i];

                    if (ids.indexOf(needElem.id) < 0) {
                        elemSection.removeChild(needElem);
                    }
                }

                // update or insert
                // TODO: index -> position
                entityList.forEach(function (entity) {
                    if (!entity) {
                        throw new Error('required_entity');
                    }

                    var entityPathLevels = pathLevels.concat(entity.id);

                    var elemEntity = buildEntityElem(elemSection, entityPathLevels, entitySchema, entity, typeCheckers, isGlobalDisplayOnly);

                    var btn = elemEntity.querySelector('[data-action="removeItem"][data-entity-list-path="' + pathLevels.join('.') + '"]');

                    if (!btn) {
                        // TODO: if not exists
                        var buttonRemoveItem = document.createElement('button');
                        buttonRemoveItem.textContent = 'X';
                        buttonRemoveItem.type = 'button';
                        buttonRemoveItem.setAttribute('data-action', 'removeItem');
                        buttonRemoveItem.setAttribute('data-entity-oid', JSON.stringify({ id: entity.id }));
                        buttonRemoveItem.setAttribute('data-entity-list-path', pathLevels.join('.'));
                        elemEntity.appendChild(buttonRemoveItem);
                    }
                });
            }
        };
    }, {}], 36: [function (require, module, exports) {
        'use strict';

        var helper = {};

        helper.markEntity = function (entityElem, schemaName) {
            entityElem.setAttribute('itemscope', '');
            entityElem.setAttribute('itemtype', 'http://schema.org/' + schemaName);
        };

        helper.markProperty = function (propertyElem, propertyName, sameAsPropertyName) {
            // like 'url contentUrl' for images
            var val = propertyName + (sameAsPropertyName ? ' ' + sameAsPropertyName : '');

            propertyElem.setAttribute('itemprop', val);
        };

        module.exports = helper;
    }, {}], 37: [function (require, module, exports) {
        /**
         * Image
         * ImageObject: { id: url, width: 100, height: 200, alt: 'asdf' }
         */

        'use strict';

        module.exports = function () {
            return document.createElement('img');
        };
    }, {}], 38: [function (require, module, exports) {
        /** String label */

        'use strict';

        module.exports = function (props, doc) {
            var elem = doc.createElement('span');
            return elem;
        };
    }, {}], 39: [function (require, module, exports) {
        /** Pick any number between min and max */

        'use strict';

        module.exports = function (props, doc) {
            var elem = doc.createElement('input');
            elem.type = 'number';
            elem.placeholder = 'Число';
            return elem;
        };
    }, {}], 40: [function (require, module, exports) {
        /**
         * A component factory, like document.createElement
         *
         * Name convention for custom elements:
         * - two or more words
         * - separated by dash
         * - lowercase
         * - Latin characters
         *
         * Boolean-input can be a selector, radio, simple input, etc.
         * it depends of design of a project
         *
         * @todo switch to custom elements after release
         * @todo use <template> to clone instead building elems from scratch
         * @module
         */

        'use strict';

        // at this moment it's not a class
        // will be converted when custom elements will be released
        // browserify doesnt support dynamic requires

        var BooleanDisplay = require('./boolean-display');
        var TextDisplay = require('./text-display');
        var NumberDisplay = require('./number-display');
        var DateDisplay = require('./date-display');
        var UrlDisplay = require('./url-display');
        var ImageDisplay = require('./image-display');

        var BooleanInput = require('./boolean-input');
        var TextInput = require('./text-input');
        var NumberInput = require('./number-input');
        var AgeInput = require('./age-input');
        var DecadeInput = require('./decade-input');
        var DateInput = require('./date-input');
        var DurationInput = require('./duration-input');
        var CountryInput = require('./country-input');

        var calculateInput = function (tag) {
            switch (tag) {
                case 'boolean-input':
                    return BooleanInput;
                case 'text-input':
                case 'url-input':
                    return TextInput;
                case 'number-input':
                case 'integer-input':
                case 'float-input':
                    return NumberInput;
                case 'age-input':
                    return AgeInput;
                case 'decade-input':
                    return DecadeInput;
                case 'date-input':
                    return DateInput;
                case 'duration-input':
                    return DurationInput;
                case 'country-input':
                    return CountryInput;

                default:
                    throw new Error('tag_is_not_supported: ' + tag);
            }
        };

        var calculateDisplay = function (tag) {
            switch (tag) {
                case 'boolean-display':
                    return BooleanDisplay;
                case 'text-display':
                    return TextDisplay;
                case 'url-display':
                    return UrlDisplay;
                case 'image-display':
                    return ImageDisplay;
                case 'number-display':
                case 'integer-display':
                case 'float-display':
                case 'age-display':
                    return NumberDisplay;
                case 'date-display':
                    return DateDisplay;
                // case 'duration-display':
                //   return DurationDisplay;

                default:
                    throw new Error('tag_is_not_supported: ' + tag);
            }
        };

        module.exports = {
            createInput: function (propType, typeChecker) {
                var tag = propType.toLowerCase() + '-input';

                var elemClass = calculateInput(tag);

                var elem = elemClass({}, document, typeChecker); // empty props

                elem.setAttribute('data-schema-type', propType);

                // use classes instead tags, while no custom elements
                elem.className = tag;
                return elem;
            },
            createDisplay: function (propType, typeChecker) {
                var tag = propType.toLowerCase() + '-display';

                var elemClass = calculateDisplay(tag);

                var elem = elemClass({}, document, typeChecker); // empty props

                elem.setAttribute('data-schema-type', propType);

                // use classes instead tags, while no custom elements
                elem.className = tag;
                return elem;
            }
        };
    }, { "./age-input": 25, "./boolean-display": 26, "./boolean-input": 27, "./country-input": 29, "./date-display": 30, "./date-input": 31, "./decade-input": 32, "./duration-input": 33, "./image-display": 37, "./number-display": 38, "./number-input": 39, "./text-display": 42, "./text-input": 43, "./url-display": 44 }], 41: [function (require, module, exports) {
        /**
         Обёртка для свойства. Содержит:
         - элемент с названием свойства
         - элемент с контентом свойства
        Дополнительно (на стороне разметки-представления)
         - элемент, скрывающий/отображающий элемент с контентом свойства
        */

        'use strict';

        module.exports = function (rowId) {
            var row = document.createElement('fieldset');
            row.id = rowId;
            row.className = 'prop-row';
            return row;
        };
    }, {}], 42: [function (require, module, exports) {
        arguments[4][38][0].apply(exports, arguments);
    }, { "dup": 38 }], 43: [function (require, module, exports) {
        /** String input */

        'use strict';

        module.exports = function (props, doc) {
            var elem = doc.createElement('input');
            elem.type = 'text';
            elem.placeholder = 'text';
            return elem;
        };
    }, {}], 44: [function (require, module, exports) {
        /** String label */

        'use strict';

        module.exports = function () {
            return document.createElement('a');
        };
    }, {}], 45: [function (require, module, exports) {
        'use strict';

        // Side modules

        var ComputedState = require('computed-state');
        var modelTemplate = require('../../vm-schema').policySchema;
        var inputPolyfill = require('./input-polyfill');
        var pubsub = require('./pubsub');
        var initialState = require('./initial-state');

        var store = new ComputedState(modelTemplate);

        store.update(initialState);

        var rootContent = document.getElementById('root_content');

        if (!rootContent) {
            throw new Error('no_root_content');
        }

        inputPolyfill.init(rootContent);

        // Подписка на события в хранилище
        // перерисовка разметки при изменениях данных
        // добавление обработчиков в элементы для изменения данных хранилища
        pubsub(rootContent.parentNode, store);

        var policy = store.getEntity();

        /**
         * Вкладки (табы) не относятся к семантике. Это часть декоративного представления. Модель "Полис" не содержит сведений о группировке её свойств.
         * Переключение вкладок осуществляется пользователем вручную либо автоматически при загрузке:
         * - если все данные валидны и состояние полиса вычисляемое: isCalculable = true, тогда сразу отображается вкладка со списком продуктов
         * - если нет, то вычисляется вкладка с невалидными данными и отображается
         * TODO: вкладки можно отнести к модели как "состояние-шаг заполнения"
         */
        var tabs = ['insuredPlaces', 'insuredEvent', 'insurants', 'insurer', 'offers'];

        tabs.forEach(function (tabName) {
            var rowId = 'root__' + tabName;
            var row = document.getElementById(rowId);
            if (!row) {
                throw new Error('no_row: ' + tabName);
            }
            var elemSwitch = document.createElement('input');
            elemSwitch.type = 'radio';
            elemSwitch.name = 'tabview';
            elemSwitch.setAttribute('value', rowId);
            row.insertBefore(elemSwitch, row.firstChild);
        });

        var goToTab = function (tabName) {
            rootContent.querySelector('input[name=tabview][value=root__' + tabName + ']').checked = true;
        };

        var needTab = void 0;
        if (policy.isCalculable === true) {
            needTab = 'offers';
        } else {
            // TODO: вычислить нужную вкладку, пока что первая
            needTab = 'insuredPlaces';
        }

        goToTab(needTab);

        tabs.forEach(function (tabName) {
            // root__insuredPlacesWarning_content
            var tabElem = rootContent.querySelector('#root__' + tabName + 'Warning');

            if (!tabElem) {
                console.warn('no_tabElem', tabName);
                return;
            }

            tabElem.onclick = function () {
                console.log('onclick', tabName);
                goToTab(tabName);
            };
        });

        /**
         * Вспомогательная кнопка по переключению между вкладками
         */
        // const buttonTabNext = document.createElement('button');
        // buttonTabNext.type = 'button';
        // buttonTabNext.textContent = 'Далее';
        // buttonTabNext.className = 'tab-next';
        // rootContent.appendChild(buttonTabNext);
    }, { "../../vm-schema": 2, "./initial-state": 46, "./input-polyfill": 47, "./pubsub": 48, "computed-state": 17 }], 46: [function (require, module, exports) {
        module.exports = {
            id: 0,
            name: 'Полис ВЗР',
            description: 'Электронный страховой полис для выезда за границу: страхование жизни и здоровья, имущества, ответственности и др.',
            insuredEvent: {
                id: 0,
                durationMax: 'P1Y-1D', // 1 year - 1 day
                startDate: '2017-03-03', // tomorrow
                startDateMin: '2017-03-02', // today
                isFixed: false
            },
            insurer: {
                id: 0,
                age: 111
                // query.insurer ? (parseInt(query.insurer.age) || null) : null
            },
            insurants: [{
                id: 1,
                name: 'Jane',
                age: null
            }, {
                id: 2,
                name: 'John',
                age: null
            }],
            insuredPlaces: []
            // {
            //     id: 'finland',
            //     visitDate: '2010-01-01'
            //   }, {
            //     id: 'france',
            //     visitDate: '2010-01-01'
            //   }]
        };
    }, {}], 47: [function (require, module, exports) {
        /**
         * полифилл заменяет стандартный датапикер для соответствующих инпутов. При первой фокусировке - создаётся датапикер.
         * @todo firefox
        */

        'use strict';

        var Pikaday = require('pikaday');

        var i18n = {
            previousMonth: 'Предыдущий месяц',
            nextMonth: 'Следующий месяц',
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            weekdaysShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
        };

        var init = function (rootElem) {
            // Добавление полифиллов для элементов,
            // например создание датапикера для соответствующих инпутов
            var replacePicker = function (e) {
                var elem = e.target;
                var microType = elem.getAttribute('data-schema-type');

                if (microType !== 'Date') {
                    return;
                }

                // hide default datepicker
                // e.preventDefault();

                // console.log('date-input onfocus');

                if (elem.picker) {
                    // console.log('already exists');
                    // console.dir(elem);
                    return;
                }

                elem.picker = new Pikaday({
                    field: elem,
                    // format: 'YYYY-MM-DD', // 'DD.MM.YYYY',
                    firstDay: 1, // Monday
                    i18n: i18n,
                    yearRange: 2,
                    showDaysInNextAndPreviousMonths: false,
                    numberOfMonths: 2,
                    formatStrict: true
                    // container: elem.parentNode,
                    // onSelect: function() { const dateString = this.toString(); }
                });

                // TODO: picker.setDate(val);
                // elem.parentNode.insertBefore(picker.el, elem.nextSibling);
            };

            rootElem.addEventListener('focusin', replacePicker);
            rootElem.addEventListener('click', replacePicker);
        };

        module.exports = {
            init: init
        };
    }, { "pikaday": 24 }], 48: [function (require, module, exports) {
        'use strict';

        var entityBuilder = require('./controls/entity-builder');
        var typeCheckers = require('../../vm-schema').types;

        var getTypedValue = function (elem) {
            switch (elem.type) {
                case 'checkbox':
                    return elem.checked;
                case 'number':
                    // "0" ? 0 : null
                    return elem.value ? parseFloat(elem.value) : null;
                // elem.valueAsNumber;
                case 'date':
                    // no valueAsDate
                    return elem.value || null;
                case 'text':
                    // TODO: what if NumberType used with <input type=text>
                    return elem.value || null;
                case 'select-one':
                    // <select>
                    return elem.value || null;
                default:
                    throw new Error('elem_type_is_not_supported: ' + elem.type);
            }
        };

        module.exports = function (rootContainer, store) {
            var insertItem = function (entityListPath, propValue) {
                try {
                    store.insertItem(entityListPath, {
                        id: propValue
                    });
                } catch (exc) {
                    // console.log('exc', exc);
                    alert(exc.message);
                }
            };

            var updateItem = function (entityPath, itemProp, propValue) {
                var upd = {};
                if (entityPath === 'root') {
                    upd[itemProp] = propValue;
                } else {
                    upd[entityPath + '.' + itemProp] = propValue;
                }

                // console.log('update event', upd);

                store.update(upd);

                // try {
                //   // TODO: age to number
                //   // result = elem.value || null; // elem.value - String
                // } catch (exc) {
                //   throw exc;
                //   // console.log('exc', exc.message);
                //   // TODO: best message
                // }
            };

            rootContainer.addEventListener('change', function (e) {
                // console.log('global onchange', e.target);
                var elem = e.target;

                var schemaType = elem.getAttribute('data-schema-type');

                if (!schemaType) {
                    console.log('no_schema_type', elem);
                    return;
                }

                var propValue = getTypedValue(elem);
                var itemProp = elem.getAttribute('itemprop');

                // validate propValue by schemaType
                if (propValue !== null && typeCheckers[schemaType].isValid(propValue) === false) {
                    alert('invalid_type: ' + schemaType + ' ' + propValue);

                    // if store.value already null: nothing changes
                    elem.value = null;
                    // TODO: or send to the store with null
                    elem.dispatchEvent(new Event('change', { bubbles: true }));
                    elem.focus();
                    return;
                }

                var entityPath = elem.getAttribute('data-entity-path');

                if (entityPath) {
                    // TODO: validation

                    // update
                    updateItem(entityPath, itemProp, propValue);
                    return;
                }

                var entityListPath = elem.getAttribute('data-entity-list-path');
                var dataAction = elem.getAttribute('data-action');

                if (dataAction) {
                    if (!entityListPath) {
                        throw new Error('required_entity-list-path: ' + elem.id);
                    }

                    if (dataAction === 'insertItem') {
                        insertItem(entityListPath, propValue);
                    } else if (dataAction === 'removeItem') {
                        var oid = elem.getAttribute('data-entity-oid');
                        var idToRemove = void 0;
                        try {
                            idToRemove = JSON.parse(oid);
                        } catch (exc) {
                            console.warn('parse_error: ', elem.id);
                            throw exc;
                        }
                        console.log('removeItem', entityListPath, idToRemove);
                        // removeItem(entityListPath, idToRemove);
                    } else {
                        throw new Error('dataAction_is_not_supported: ' + dataAction);
                    }
                }

                console.warn('no_entity_path', elem.id);
            });

            // для кнопок вставки и удаления из массивом
            rootContainer.addEventListener('click', function (e) {
                // console.log('global onchange', e.target);
                var elem = e.target;

                var dataAction = elem.getAttribute('data-action');

                if (!dataAction) {
                    console.warn('no_data_action_on_button', elem.id);
                    return;
                }

                var entityListPath = elem.getAttribute('data-entity-list-path');

                if (!entityListPath) {
                    throw new Error('required_entity-list-path: ' + elem.id);
                }

                if (dataAction !== 'removeItem') {
                    console.warn('only_removeItem_data-action', elem.id);
                    return;
                }

                var oid = elem.getAttribute('data-entity-oid');
                var idToRemove = void 0;
                try {
                    idToRemove = JSON.parse(oid).id;
                } catch (exc) {
                    console.warn('parse_error: ', elem.id);
                    throw exc;
                }
                console.log('removeItem', entityListPath, idToRemove);
                try {
                    store.removeItem(entityListPath, idToRemove);
                } catch (exc) {
                    alert('Не удалось удалить: ' + exc.message);
                }
            });

            store.subscribe(function (changedKeys, stateFresh) {
                // console.log('changedKeys TODO', changedKeys);

                entityBuilder(rootContainer, [], 'FinancialProduct', stateFresh, typeCheckers,
                // isGlobalDisplayOnly
                false);
            });
        };

        // Перерисовка разметки сущности
        // Есть сущность (данные), есть разметка сущности (не вью)
        // Изменения в сущности - изменяют и разметку
        // Разметка может быть создана до создания модели. Так как разметка зависит от хранилища, а не от содержащейся в ней модели. Без модели разметка будет пуста, либо содержать прелоадер.
        /**
         * Сперва создаётся хранилище и начальная модель
         * Затем разметка
         * либо
         * Разметка подписывается на изменение хранилища.
         * Объявляется-создаётся начальная сущность - перерисовывается разметка
         * Если контейнер сущности не существует, то создаётся
         * Если существует, то обновляется
         * Если самой сущности не существует, то контейнер удаляется
         root: {
         id: 123,
         tour: {
        
         }
         }
         */

        // subscribe to all changes
        // когда изменяется любое поле - находить это поле и изменять значение
        // Если сущности ещё не было - создавать заново по соотв настройкам
        // Например при изменении insurer.age, также могут измениться вычисляемые поля: isAdult, etc.
        // Функция получает список изменённых полей:
        // - insurer.age
        // - insurer.isAdult
        // - insurer (как общее свойство)
        // { insurer: { age: true, isAdult: true }, isCalculable: true }
        // or
        // [ 'insurer', 'insurer.age', 'insurer.isAdult', 'isCalculable' ]
        // entity: [ changedProps ]
        // policy: [ 'start' , 'end', 'insurer', 'countries', insurer: {} ]
        // policy.insurer: [ 'name', 'age' ]
        // policy.countries.usa: [ '123', 'asdf' ]
        // массивы и внутренние объекты получают общие изменённые ключи
        // для их перерисовки - пересматриваются все свойства и изменяются индивидуально, если требуется
        // Связь поля с обёрткой - позже
        // Стэйт будет равен нулл, если корневая сущность ещё не создана

        // const rootElemNew = entityBuilder({
        //   parentPathLevels: [],
        //   entitySettings: stateFresh.__settings,
        //   entitySchema: 'Policy',
        //   // изначально - пустой объект
        //   // по идее для пустого объекта ничего не надо создавать
        //   // даже - нужно удалять существующую разметку
        //   entity: stateFresh,
        // }, document);

        // const rootContentCurrent = document.getElementById('root_content');

        // if (!rootContentCurrent) { console.log('no root_content'); return; }

        // const parentNode = rootContentCurrent.parentNode;

        // parentNode.removeChild(rootContentCurrent);
        // rootElemNew.id = 'root_content';
        // parentNode.appendChild(rootElemNew);

        // rootContainer.addEventListener('click', function(e) {
        //   const elem = e.target;
        //   const actionType = elem.getAttribute('data-action-type');
        //   const entityListPath = elem.getAttribute('data-entity-list-path');

        //   if (!actionType) { return; }

        //   if (!entityListPath) {
        //     console.warn('no_entity-list-path', actionType);
        //     return;
        //   }

        //   switch (actionType) {
        //     case 'updateItem':
        //       break;
        //     case 'insertItem':
        //       store.insertItem(entityListPath, {
        //         id: new Date().getTime()  // auto-generated id
        //       });
        //       break;
        //     case 'removeItem':
        //       break;
        //     default:
        //       throw new Error('not_supported: ' + actionType);
        //   }

        //   console.log('actionType', actionType);
        // });
    }, { "../../vm-schema": 2, "./controls/entity-builder": 34 }] }, {}, [45]);
