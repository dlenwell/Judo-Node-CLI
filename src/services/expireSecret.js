const fetch = require('node-fetch');
const config = require('../../config');
const CheckForError = require('./errorHandler');
const urls = config('services');

const expireUrl = '/services/secret/<!secretid!>/ExpireSecret';

function expireSecret(secretId, token) {
  const url = expireUrl.replace('<!secretid!>', secretId);
  return fetch(urls.serviceUrl + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
  })
  .then(res => res.json())
  .then(CheckForError);
}

module.exports = expireSecret;
