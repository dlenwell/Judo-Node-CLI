const fs = require('fs');
const colors = require('./colors');

const MESSAGE_TYPE = {
    LOG: 'LOG', // Generic information logged to the screen only
    INFO: 'INFO', // Generic information logged to file and screen.
    WARN: 'WARNING', // Warnings logged to file and screen.
    ERROR: 'ERROR'
};

function log(message, messageType, verbose) {
    var outputMsg = '';
    switch(messageType) {
        case MESSAGE_TYPE.LOG:
            outputMsg = `${colors.Bright}${message}${colors.Reset}`;
            break;
        case MESSAGE_TYPE.WARN:
            outputMsg = `${colors.FgYellow}${message}${colors.Reset}`;
            break;
        case MESSAGE_TYPE.ERROR:
            outputMsg = `${colors.Bright}${colors.FgRed}${message}${colors.Reset}`;
            break;
        case MESSAGE_TYPE.INFO:
            outputMsg = message;
            break;
        default:
            outputMsg = message;
            break;
    }

    logToConsole(outputMsg, messageType, verbose);
    logToFile(outputMsg, messageType, verbose);
}

function logToConsole(message, messageType, verbose) {
  if (verbose || messageType === MESSAGE_TYPE.ERROR || messageType === MESSAGE_TYPE.LOG) {
    console.log(message);
  }
}

function logToFile(message, messageType, verbose) {
  if (messageType !== MESSAGE_TYPE.LOG) {
    const messageTime = new Date().toLocaleString();
    fs.appendFile('judo.log', `${messageTime}: ${messageType}: ${message} \r\n`, (err) => {
        if (err) console.log(err);
    });
  }
}

module.exports = {
    log,
    MESSAGE_TYPE
};