const config = require('config');
const {
  user,
  pass,
  hostname,
  port,
  name } = config.get('db');

console.log(user, pass, hostname, port, name);

const configMigration = {
  mongodb: {
    url: `mongodb://${user}:${pass}@${hostname}:${port}`,
    databaseName: name,
    options: {
      useNewUrlParser: true
    }
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog'
};

module.exports = configMigration;
