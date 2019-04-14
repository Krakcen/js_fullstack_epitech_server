const { disallow, fastJoin } = require('feathers-hooks-common');

const log = require('../../hooks/log');

const postResolvers = {
  joins: {
    users: {
      resolver: (/* $select, $limit, $sort */) => async (room, context) => {
        let filteredUsers = await context.app
          .service('users')
          .Model.find({ _id: { $in: room.user_list } });
        filteredUsers = filteredUsers.map(user => user.username);
        room.users = filteredUsers;
        return room.users;
      },
    },
  },
};

module.exports = {
  before: {
    all: [disallow('socketio', 'external', 'primus', 'rest')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [fastJoin(postResolvers)],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
