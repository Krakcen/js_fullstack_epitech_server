const { authenticate } = require("@feathersjs/authentication").hooks;

const joinStoryRoom = async context => {
  const { app, params, data } = context;

  if (data.method === "join_story_room") {
    console.log("JOINING A ROOM");

    if (data.story_id) {
      // check if story exists
      const story = await app.service("story").find({ query: { _id: data.story_id } });
      if (!story.data.length) throw new Error("Story id doesnt match");

      // check if room exists
      const room = await app.service("story-rooms").find({ query: { id: data.story_id } });
      if (!room.data.length) {
        // create a new story-room
        const newRoom = await app.service("story-rooms").create({
          id: data.story_id,
          user_list: [params.user._id],
        });
      } else {
        // add the user to the room
        let tmpRoom = room.data[0];
        tmpRoom.user_list.push(params.user._id);
        const updateRoom = await app.service("story-rooms").update(data.story_id, tmpRoom);
      }

      const connectionFound = app.channel("membres").connections.filter(connection => connection.user.email === params.user.email);
      if (connectionFound.length !== 1) throw new Error("[joinStoryRoom] - Socket could not be found");

      app.channel(data.story_id).join(connectionFound[0]);

      context.result = {
        action_type: "user_join",
        story_room: data.story_id,
        payload: {
          username: params.user.username,
          email: params.user.email,
        },
      };
      // context.service.publish((data, context) => {
      //   console.log("Publishing the join event to story editors");
      //   return app.channel(data.story_id).send({
      //     action_type: 'user_join',
      //     payload: {
      //       username: params.user.username,
      //       email: params.user.email,
      //     },
      //   });
      // });
    }
  }

  return context;
};

const leaveStoryRoom = async context => {
  const { app, params, data } = context;

  if (data.method === "leave_story_room") {
    console.log("LEAVING A ROOM");

    if (data.story_id) {
      // check if story exists
      const story = await app.service("story").find({ query: { _id: data.story_id } });
      if (!story.data.length) throw new Error("Story id doesnt match");

      // check if room exists
      const room = await app.service("story-rooms").find({ query: { id: data.story_id } });
      if (room.data.length) {
        let tmpRoom = room.data[0];
        tmpRoom.user_list = tmpRoom.user_list.filter(user => {
          return !params.user._id.equals(user);
        });
        console.log(tmpRoom.user_list);
        const updateRoom = await app.service("story-rooms").update(data.story_id, tmpRoom);
        context.result = updateRoom;
      }

      app.channel(data.story_id).leave(connection => connection.user._id === params.user._id);

      context.result = {
        action_type: "user_leave",
        story_room: data.story_id,
        payload: {
          username: params.user.username,
          email: params.user.email,
        },
      };
    }
  }

  return context;
};

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [joinStoryRoom, leaveStoryRoom],
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
