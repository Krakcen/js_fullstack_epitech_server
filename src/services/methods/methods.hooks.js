const { authenticate } = require('@feathersjs/authentication').hooks;

const getRoomInfo = async (context) => {
  const { app, params, data } = context;

  if (data.method === 'get_room_info') {
    if (data.story_id) {
      // check if user is in room
      const connectionFound = app
        .channel(data.story_id)
        .connections.filter(connection => connection.user.email === params.user.email);
      if (connectionFound.length !== 1) throw new Error('[joinStoryRoom] - Socket could not be found');

      const roomId = await app.service('story-rooms').find({ query: { id: data.story_id } });
      if (!roomId || !roomId.data || roomId.data.length !== 1 || !roomId.data[0].users) throw new Error('no room found (or too many');

      // only return usernames
      context.result = roomId.data[0].users;
    }
  }

  return context;
};

const createStoryBlock = async (context) => {
  const { app, params, data } = context;

  if (data.method === 'create_story_block') {
    if (data.story_id && params.user && data.full_text) {
      if (data.full_text.length < 120) throw new Error('short_text');

      // check if story exists
      const story = await app.service('story').find({ query: { _id: data.story_id } });
      if (!story.data.length) throw new Error('Story id doesnt match');

      // check if story reached the block limit
      if (story.data[0].nombreOfBlockDefault <= story.data[0].blocks.length) throw new Error('story_finished');

      // create the block
      const blockCreated = await app.service('block').Model.create({
        author: params.user._id,
        full_text: data.full_text,
        is_published: true,
      });

      // udpate the story
      await app.service('story').Model.update(
        { _id: data.story_id },
        {
          $push: {
            blocks: blockCreated._id,
          },
        },
      );
      context.result = {
        action_type: 'user_create_story_block',
        story_room: data.story_id,
        payload: {
          block: blockCreated,
          // story block
        },
      };
    }
  }

  return context;
};

const joinStoryRoom = async (context) => {
  const { app, params, data } = context;

  if (data.method === 'join_story_room') {
    if (data.story_id && params.user) {
      // check if story exists
      const story = await app.service('story').find({ query: { _id: data.story_id } });
      if (!story.data.length) throw new Error('Story id doesnt match');

      // check if room exists
      const room = await app.service('story-rooms').find({ query: { id: data.story_id } });
      if (!room.data.length) {
        // create a new story-room
        await app.service('story-rooms').create({
          id: data.story_id,
          user_list: [params.user._id],
        });
      } else {
        // add the user to the room
        const tmpRoom = room.data[0];
        for (const i in tmpRoom.user_list) {
          if (params.user._id.equals(tmpRoom.user_list[i])) throw new Error('already_connected_client');
        }
        tmpRoom.user_list.push(params.user._id);
        await app.service('story-rooms').update(data.story_id, tmpRoom);
      }
      const connectionFound = app
        .channel('membres')
        .connections.filter(connection => connection.user.email === params.user.email);
      if (!connectionFound.length) throw new Error('[joinStoryRoom] - Socket could not be found');

      app.channel(data.story_id).join(connectionFound[0]);

      context.result = {
        action_type: 'user_join',
        story_room: data.story_id,
        payload: {
          username: params.user.username,
          // email: params.user.email,
        },
      };
    }
  }

  return context;
};

const leaveStoryRoom = async (context) => {
  const { app, params, data } = context;

  if (data.method === 'leave_story_room') {
    if (data.story_id) {
      // check if story exists
      const story = await app.service('story').find({ query: { _id: data.story_id } });
      if (!story.data.length) throw new Error('Story id doesnt match');

      // check if room exists
      const room = await app.service('story-rooms').find({ query: { id: data.story_id } });

      if (room.data.length) {
        const tmpRoom = room.data[0];
        tmpRoom.user_list = tmpRoom.user_list.filter(user => !params.user._id.equals(user));
        const updateRoom = await app.service('story-rooms').update(data.story_id, tmpRoom);
        context.result = updateRoom;
      }

      app.channel(data.story_id).leave(connection => connection.user._id === params.user._id);

      context.result = {
        action_type: 'user_leave',
        story_room: data.story_id,
        payload: {
          username: params.user.username,
          // email: params.user.email,
        },
      };
    }
  }

  return context;
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [joinStoryRoom, leaveStoryRoom, getRoomInfo, createStoryBlock],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
