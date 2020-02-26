const fs = require('fs');
const jwt = require('jsonwebtoken');
const logger = require('./logger');

function read(customConfigFilename) {
  var config;

  try {
    config = customConfigFilename ? fs.readFileSync(customConfigFilename) : fs.readFileSync('./client.json');
  } catch {
    logger.log('Configuration file (client.json) not found or specified.', logger.MESSAGE_TYPE.ERROR, true);
    return;
  }

  const clientConfig =  JSON.parse(config);

  const { storageKey } = clientConfig;

  const token = jwt.decode(storageKey);
  const tokenOrganizations = token && token.claims.organizations;
  const tokenOrganizationId = tokenOrganizations && Object.keys(tokenOrganizations)[0];
  const userId = token && token.userId;

  const configOrganizationId = clientConfig.organizationId;
  const organizationId = (configOrganizationId && configOrganizationId.length > 0) ? configOrganizationId : tokenOrganizationId;

  return {
    storageKey: storageKey || '',
    userId: userId || '',
    organizationId: organizationId || ''
  };
}

module.exports = read;