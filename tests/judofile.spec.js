const chai = require('chai');
const judo = require('../src/judofile');

const expect = chai.expect;

describe('Judo File', () => {

  it('should throw an error if "version" is not a number.', () => {
    expect(() => {
      new judo.JudoFile({version:'version', type:1, name:'secret name', secret_id:'secret id', index:[], n:5, m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "type" is not a number.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:'type', name:'secret name', secret_id:'secret id', index:[], n:5, m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "name" is not a string.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:123, secret_id:'secret id', index:[], n:5, m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "secretId" is not a string.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:123, index:[], n:5, m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "shardUrls" is not an array.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:123, n:5, m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "n" is not a number.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:'n', m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "m" is not a number.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:5, m:'m', wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "n" is not a whole number.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:5.1, m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "m" is not a whole number.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:5, m:3.1, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "wrappedKey" is not a string.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:5, m:3, wrapped_key:123, data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "data" is not a string.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:5, m:3, wrapped_key:'wrappedKey', data:123});
    }).to.throw(Error);
  });

  it('should throw an error if "n" is greater than "m".', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:5, m:10, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "n" is less than 3.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:2, m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "m" is less than 3.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:5, m:2, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should throw an error if "n" is greater than 100.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:101, m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });

  it('should not throw an error if all required parameters are valid.', () => {
    const judoFile = new judo.JudoFile({version:1, type:1, name:'name', secret_id:'secret id', index:[], n:5, m:3, wrapped_key:'wrappedKey', data:'data'});
    expect(judoFile).to.not.be.null;
  });

  it('should throw an error if all required parameters are not present.', () => {
    expect(() => {
      new judo.JudoFile({version:1, type:1, secret_id:'secret id', index:[], n:5, m:3, wrapped_key:'wrappedKey', data:'data'});
    }).to.throw(Error);
  });


});
