const assert = require('assert');
const app = require('../../src/app');

describe('\'story-rooms\' service', () => {
  it('registered the service', () => {
    const service = app.service('story-rooms');

    assert.ok(service, 'Registered the service');
  });
});
