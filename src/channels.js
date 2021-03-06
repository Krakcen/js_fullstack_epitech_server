module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // Si aucune fonctionnalité en temps réel n'a été configurée, il suffit de retourner
    return;
  }

  // only allpow
  app.service('methods').publish(data => app.channel(data.story_room));

  // Joindre le site.
  app.on('connection', (connection) => {
    app.channel('visiteur').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    // peut être indéfinie s'il n'y a pas de connexion
    // en temps réel, par ex. lors de la connexion via REST.
    if (connection) {
      // Obtenir l'utilisateur connecté à partir de la connexion
      // const { user } = connection;
      app.channel('visiteur').leave(connection);
      app.channel('membres').join(connection);

      // Channels can be named anything and joined on any condition

      // console.log(user);
      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }
    }
  });

  app.on('logout', (payload, { connection }) => {
    if (connection) {
      // When logging out, leave all channels before joining anonymous channel
      app.channel(app.channels).leave(connection);
      app.channel('visiteur').join(connection);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => app.channel('membres'));
  // Here you can add event publishers to channels set up in `channels.js`
  // To publish only for a specific event use `app.publish(eventname, () => {})`

  // console.log(
  //   'Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.',
  // ); // eslint-disable-line

  // e.g. to publish all service events to all authenticated users use

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));
  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
