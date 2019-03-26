<<<<<<< HEAD
# js-fullstack-epitech-server
=======
# API STORY FACTORY : 📚
>>>>>>> ccc4efa52f00cf1eda6a05bae6f70cac3a98bd4a

> Projet for Courses JavaScript FullStack

## About

<<<<<<< HEAD
This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies
=======
    Story Factory permet de créer une histoire en colaboration avec plus utilisateur. 
    Vous choisiez votre titre. Vous ajoutez votre synopsis. Vous choisiez le nombre de blocks que peut écrire un utilisateur. 

## Pour commencer

La mise en service est aussi simple que 1, 2, 3.

1. Assurez-vous d'avoir installer [NodeJS](https://nodejs.org/) et [npm](https://www.npmjs.com/).
2. Installez vos dépendances
>>>>>>> ccc4efa52f00cf1eda6a05bae6f70cac3a98bd4a

    ```
    cd path/to/js-fullstack-epitech-server; npm install
    ```

<<<<<<< HEAD
3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
=======
3. Démarrer l'api.

    ```
    npm run start
    ```

## Installation packages 
- Dependencies:
📦 **_@feathersjs/authentication_** (^2.1.16), 
📦 **_@feathersjs/authentication-jwt_** (^2.0.10), 
📦 **_@feathersjs/authentication-local_** (^1.2.9),
📦 **_@feathersjs/configuration_** (^2.0.6), 
📦 **_@feathersjs/errors_** (^3.3.6),
📦 **_@feathersjs/express_** (^1.3.1),
📦 **_@feathersjs/feathers_** (^3.3.1),
📦 **_@feathersjs/socketio_** (^3.2.9),    
📦 **_colors_** (^1.3.3),    
📦 **_compression_** (^1.7.3), 
📦 **_cors_** (^2.8.5), 
📦 **_feathers-errors_** (^2.9.2),  
📦 **_feathers-hooks-common_** (^4.20.7), 
📦 **_feathers-hooks-validate-joi_** (^2.0.0), 
📦 **_feathers-mongoose_** (^7.3.1), 
📦 **_feathers-permissions_** (^0.2.1), 
📦 **_feathers-swagger_** (^0.7.2), 
📦 **_helmet_** (^3.15.1), 
📦 **_i18n_** (^0.8.3), 
📦 **_lodash_** (^4.17.11), 
📦 **_mongodb-core_** (^3.1.8)         
📦 **_mongoose_** (^5.4.14)
📦 **_mongoose-migrate_** (^0.2.4)
📦 **_morgan_** (^1.9.1)
📦 **_npm_** (^6.8.0)
📦 **_serve-favicon_** (^2.5.0)
📦 **_winston_** (^3.1.0)
</br>
- Dev dependencies:
📦 **_eslint_** (^5.11.1)
📦 **_mocha_** (^5.2.0)
📦 **_nodemon_** (^1.18.9)
📦 **_request_** (^2.88.0)
📦 **_request-promise_** (^4.2.2)

## Mise en place sur un serveur. 

Veuliez suivre les instructions pour la mise en place sur le serveur.

## URL. 
➡️ **Authentication.**
 - <span style="color:yellow">[POST]</span> http://localhost:3030/authencation/ : Obtenir un jeton.
    ```
    body : {
      strategy: 'local',
      email: 'secret1@gmail.com'
      password: 'secret'
    }
    ```
➡️ **Utilisateur.**
 - <span style="color:yellow">[POST]</span> http://localhost:3030/users/ : Inscrire un utilisateur.
    ```
    body : {
      username: 'secret',
      password: 'password',
      email: 'secret@gmail.com'
    }
    ```

  - <span style="color:green">[GET]</span> http://localhost:3030/users/ : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {
      email: '',
      role: '',
      email: '',
      createdAt: '',
      updateAt: ''
    }
    ```
 ➡️ **Stories.**
 - <span style="color:yellow">[GET]</span> http://localhost:3030/stories
    ```
    body : {
      username: 'secret',
      password: 'password',
      email: 'secret@gmail.com'
    }
    ```
 ️➡️ **Blocks.**
  - <span style="color:yellow">[GET]</span> http://localhost:3030/stories
    ```
    body : {
      username: 'secret',
      password: 'password',
      email: 'secret@gmail.com'
    }
    ```
 
## Auteurs
 👤 **Hugo Villevieille** - Developpeur informatique : hugo.villevieille@epitech.eu</br>
 👤 **Nicolas Fontanet** - Developpeur informatique : nicolas.fontanet@epitech.eu</br>

## License
 ©️ Factory Story - 28 juin 2018 </br>
 Licensed under the [MIT license](LICENSE).
>>>>>>> ccc4efa52f00cf1eda6a05bae6f70cac3a98bd4a
