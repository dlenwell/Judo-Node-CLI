const secrets = require('shamirs-secret-sharing');
const crypto = require('crypto');
const chai = require('chai');

const expect = chai.expect;
const randomData = crypto.randomBytes(32);
const secret = randomData.toString('base64');

describe('Shamirs Secret Sharing', () => {

  it('should break apart a secret into 10 shards.', () => {
    const shares = secrets.split(secret, { shares: 10, threshold: 5 });
    expect(shares.length).to.equal(10);
  });

  it('should be able to combine 5 shares of the 10 to recreate the secret.', () => {
    const shares = secrets.split(secret, { shares: 10, threshold: 5 });
    const sharesToCombine = shares.slice(0,5);
    const combined = secrets.combine(sharesToCombine);
    expect(combined.toString()).to.equal(secret);
  });

  it('should fail to recreate the secret with 4 shares.', () => {
    const shares = secrets.split(secret, { shares: 10, threshold: 5 });
    const sharesToCombine = shares.slice(0,4);
    const combined = secrets.combine(sharesToCombine);
    expect(combined).to.not.equal(secret);
  });

});
