const process = require('process');
const os = require('os');
const fetch = require('node-fetch');
const logger = require('../utils/logger');
const uuidV4 = require('uuid/v4');
const { version } = require('../../package.json');

function fillShards(secretId, urls, shards, token) {
  const transactionId = uuidV4();
  var shardStructs = [];

  const fillShard = (url, shardData) => {
    return fetch(`${url}?s=${secretId}&t=${transactionId}`, {
        method: 'POST',
        body: JSON.stringify({ data: shardData }),
        headers: {
          'Content-Type': 'application/json',
          'X-Machine': os.hostname() || '',
          'User-Agent': `Judo Client NodeJS CLI/${version} NodeJS/${process.version}`,
          Authorization: token,
        }
      }).then(res => {
        if (res.status != 200) {
          throw new Error('There was a problem storing data in this shard.');
        }
        return;
      });
  }

  return new Promise((resolve, reject) => {
    if (!urls) {
      reject('Shard urls not found.');
    }
    else if (urls.length < shards.length) {
      reject('Not enough shard reservations for the number of shards created.');
    }
    else {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const shard = shards[i];
        shardStructs.push({
          url: url,
          shard: shard
        });
      }

      return shardStructs.reduce((p, ss) => {
        return p.then(chainResults =>
          fillShard(ss.url, ss.shard, token).then(currentResult => [...chainResults, currentResult])
        ).catch(e => Promise.reject(e));
      }, Promise.resolve([])).then(results => {
        resolve(results);
      }).catch(e => logger.log(e.message, logger.MESSAGE_TYPE.ERROR));
    }
  });
}

module.exports = fillShards;
