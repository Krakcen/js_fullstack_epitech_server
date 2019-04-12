const assert = require('assert');
const app = require('../../src/app');

describe('\'methods\' service', () => {
  it('registered the service', () => {
    const service = app.service('methods');

    assert.ok(service, 'Registered the service');
  });
});
