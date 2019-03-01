const assert = require('assert');
const app = require('../../src/app');

describe('\'mutationsStories\' service', () => {
  it('registered the service', () => {
    const service = app.service('stories/mutations');

    assert.ok(service, 'Registered the service');
  });
});
