const chalk = require('chalk');
const err = chalk.red.bold;
const suc = chalk.green.bold;
const dev = chalk.magenta.bold;
const warn = chalk.yellow.bold;

exports.logErr = function (errorMessage) {
    console.log(err(errorMessage));
};

exports.logSuc = function (succMessage) {
    console.log(suc(succMessage));
};

exports.logWarn = function (warnMessage) {
    console.log(warn(warnMessage));
};

exports.logDev = function (logMessage) {
    console.log(dev(devMesssage));
};