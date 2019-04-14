class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const { query } = params;

    const userFound = await this.options.Model.find(query);
    return userFound;
  }

  async get(id) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data) {
    return data;
  }

  async patch(id, data) {
    return data;
  }

  async remove(id) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
