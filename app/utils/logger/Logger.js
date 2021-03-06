/** @ignore */
const path = require('path');
/** @ignore */
const Winston = require('winston');
/** @ignore */
const DailyRotateFile = require('winston-daily-rotate-file');

/**
 * The logger
 */
class Logger {

    /**
     * Prepares and sets up the application logger instance.
     */
    constructor() {
        Winston.emitErrs = true;

        /**
         * The storage path for file logs.
         *
         * @type {String}
         */
        this.storage = path.resolve('storage', 'logs');

        /**
         * The Winston logger instance.
         *
         * @type {Winston}
         */
        this.winston = new Winston.Logger({
            exitOnError: true,
            colors: {
                info: 'green',
                warn: 'yellow',
                error: 'red',
                debug: 'blue',
                silly: 'blue'
            },
            transports: [
                this.buildDailyRotateTransport('exceptions', 'exception'),
                this.buildDailyRotateTransport('error', 'error'),
                this.buildDailyRotateTransport('console', 'debug'),
                new (Winston.transports.Console)({
                    humanReadableUnhandledException: true,
                    level: 'verbose',
                    colorize: true,
                    json: false
                })
            ]
        });
    }

    /**
     * Builds a daily rotate transsport file for Winston.
     *
     * @param  {String}  type   The type the file should be used for.
     * @param  {String}  level  The log level the file should be used for.
     * @return {DailyRotateFile}
     */
    buildDailyRotateTransport(type, level) {
        return new DailyRotateFile({
            humanReadableUnhandledException: type === 'exceptions',
            filename: path.resolve(this.storage, type),
            datePattern: '-yyyy-MM-dd.log',
            name: 'file:' + type,
            json: false,
            level
        });
    }

    /**
     * Sends a info message to the console and logs the message to a file.
     *
     * @param {Array}  args  The arguments that should be parsed to Winston.
     */
    info(...args) {
        return this.winston.info(...args);
    }

    /**
     * Sends a warn message to the console and logs the message to a file.
     *
     * @param {Array}  args  The arguments that should be parsed to Winston.
     */
    warn(...args) {
        return this.winston.warn(...args);
    }

    /**
     * Sends a error message to the console and logs the message to a file.
     *
     * @param {Array}  args  The arguments that should be parsed to Winston.
     */
    error(...args) {
        return this.winston.error(...args);
    }

    /**
     * Sends a debug message to the console and logs the message to a file.
     *
     * @param {Array}  args  The arguments that should be parsed to Winston.
     */
    debug(...args) {
        return this.winston.debug(...args);
    }

    /**
     * Sends a silly message to the console and logs the message to a file.
     *
     * @param {Array}  args  The arguments that should be parsed to Winston.
     */
    silly(...args) {
        return this.winston.silly(...args);
    }

    /**
     * Logs a message to the console and logs it to a file.
     *
     * @param {Array}  args  The arguments that should be parsed to Winston.
     */
    log(...args) {
        return this.winston.log(...args);
    }

    /**
     * Gets the logger instance.
     *
     * @return {Winston}
     */
    getLogger() {
        return this.winston;
    }
}

module.exports = new Logger;
