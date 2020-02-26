const fetch = require('node-fetch');
const config = require('../../config');
const CheckForError = require('./errorHandler');
const urls = config('services');

const reserveUrl = '/services/organization/<!organizationid!>/CreateSecret';

function reserveSecret(name, numberOfShards, expiresIn, allowedIPs, machineNames, organizationId, token) {
  const url = reserveUrl.replace('<!organizationid!>', organizationId);
  const postBody = {
    description: name,
    numberOfShards: numberOfShards,
    expiresIn: expiresIn,
    allowedIPs,
    machineNames
  };
  return fetch(urls.serviceUrl + url, {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
  })
  .then(res => res.json())
  .then(CheckForError);
}

module.exports = reserveSecret;
