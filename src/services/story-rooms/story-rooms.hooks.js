const { authenticate } = require('@feathersjs/authentication').hooks;

const log = require('../../hooks/log');

const afterFindStoryRoom = async context => {
  const {
    app,
    params
  } = context;


  // CREATE OR JOIN THE CHANNEL
  if (!context.result.data.length) {
    // CHECK IF STORY EXIST
    const room = await app.service('story').find({ query: { _id: context.params.query.id } });
    if (!room.data.length) throw new Error("Story id doesnt match");

    // CREATE THE ROOM
    const newRoom = await app.service('story-rooms').create({
      id: context.params.query.id,
      user_list: [params.user._id],
    });

  }
  else {
    let tmpRoom = context.result.data[0];
    tmpRoom.user_list.push(params.user._id);
    const updateRoom = await app.service('story-rooms').update(context.params.query.id, tmpRoom);
  }

  // console.log(`Joining the channel ${context.params.query.id}`)
  app.channel(context.params.query.id).join();

  // console.log("CHANNELS IN AFTER");
  // console.log(app.channels);

  return context;
}

const beforeCreateStoryRoom = async context => {
  const {
    app,
    params
  } = context;


  console.log(context.params);
  console.log(context.data);
  // check if room already exists
  //if (app.service('story-rooms').find({ query: {  } }))


  // app.channel('stories').leave(connection => {
  //   logger.info(connection);
  //   return connection.user._id === userFound._id
  // });

  return context;
}

module.exports = {
  before: {
    all: [ /*, authenticate('jwt')*/ ],
    find: [],
    get: [],
    create: [/*beforeCreateStoryRoom*/],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [/*afterFindStoryRoom*/],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [log()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
