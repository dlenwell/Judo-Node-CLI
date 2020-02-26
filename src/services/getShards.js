const process = require('process');
const os = require('os');
const fetch = require('node-fetch');
const logger = require('../utils/logger');
const uuidV4 = require('uuid/v4');
const { version } = require('../../package.json');

function getShards(secretId, urls, token) {
  const transactionId = uuidV4();

  const getShard = (url) => {
    return fetch(`${url}?s=${secretId}&t=${transactionId}`, {
      method: 'GET',
      headers: {
        'X-Machine': os.hostname() || '',
        'User-Agent': `Judo Client NodeJS CLI/${version} NodeJS/${process.version}`,
        Authorization: token,
      },
      timeout: 2000
    }).then(res => res.text())
    .catch(e => {
      logger.log(e, logger.MESSAGE_TYPE.ERROR, true);
    });
  }

  return new Promise((resolve, reject) => {
    if (!urls) {
      reject('ShardIds not found.');
    } else {
      return urls.reduce((p, url) => {
        return p.then(chainResults =>
          getShard(url, token).then(currentResult => {
            return (currentResult) ? [...chainResults, currentResult] : [...chainResults];
          })
        );
      }, Promise.resolve([])).then(results => {
        resolve(results);
      });
    }
  });
}

module.exports = getShards;
