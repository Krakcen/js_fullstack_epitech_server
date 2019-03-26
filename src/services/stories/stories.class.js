const errors = require('feathers-errors');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find (params) {
    const {
      query
    } = params;

    const userFound = await this.options.Model.find(query);
    return userFound;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    return [];
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
