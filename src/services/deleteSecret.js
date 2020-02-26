const fetch = require('node-fetch');
const config = require('../../config');
const CheckForError = require('./errorHandler');
const urls = config('services');

const deleteUrl = '/services/secret/<!secretid!>/DeleteSecret';

function deleteSecret(secretId, token) {
  const url = deleteUrl.replace('<!secretid!>', secretId);
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

module.exports = deleteSecret;
