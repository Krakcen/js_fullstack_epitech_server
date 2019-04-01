# API STORY FACTORY : 📚

> Projet for Courses JavaScript FullStack

## About

    Story Factory permet de créer une histoire en colaboration avec plus utilisateur. 
    Vous choisiez votre titre. Vous ajoutez votre synopsis. Vous choisiez le nombre de blocks que peut écrire un utilisateur. 

## Pour commencer

La mise en service est aussi simple que 1, 2, 3.

1. Assurez-vous d'avoir installer [NodeJS](https://nodejs.org/) et [npm](https://www.npmjs.com/).
2. Installez vos dépendances

    ```
    cd path/to/js-fullstack-epitech-server; npm install
    ```

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
****
 - <span style="color:yellow">[POST]</span> http://localhost:3030/authencation/ : Obtenir un jeton.
    ```
    body : {
      strategy: 'local',
      email: 'secret1@gmail.com'
      password: 'secret'
    },
    params: {
      nope
    },
    query: {
      nope
    }

    res: {
      "accessToken": ""
    }
    ```

➡️ **Utilisateur.**
****
  - <span style="color:green">[GET]</span> http://localhost:3030/users/:id : Information sur un utilisateur par rapport à l'id. 
    ```
    authorization: bearer Token
    query: {
      nope
    },
    params: {
      id: '5c8cf28425fd287e3448f5ee'
    }

    res: {
      "_id": "5c8cf28425fd287e3448f5ee",
      "role": "visiteur",
      "username": "secret1",
      "email": "secret1@gmail.com",
      "createdAt": "2019-03-16T12:56:36.619Z",
      "updatedAt": "2019-03-16T12:56:36.619Z",
      "__v": 0
    }
    ```

  - <span style="color:#ADFF2F">[FIND]</span> http://localhost:3030/users/ : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {
       _id = 5c9ca1dfa49dd230df81c2b9,
       role = visiteur,
       username = secret1,
       email = secreet1@gmail.com",
       createdAt = 2019-03-28T10:28:47.218Z,
       updatedAt = 2019-03-28T10:28:47.218Z
    },
    params: {
      nope
    }

    res: {
       "total": 1,
       "limit": 10,
       "skip": 0,
       "data": [
        {
            "_id": "5c9ca1dfa49dd230df81c2b9",
            "role": "visiteur",
            "username": "nicolas",
            "email": "nicolas@gmail.com",
            "createdAt": "2019-03-28T10:28:47.218Z",
            "updatedAt": "2019-03-28T10:28:47.218Z",
            "__v": 0
        }
      ]
    }
    ```

  - <span style="color:yellow">[POST]</span> http://localhost:3030/users/ : Crée un utilisateur.
    ```
    authorization: nope
    query: {
      nope
    },
    params: {
      
    },
    body: {
      username : voiture
      password : voiture
      email : voiture@gmail.com
    }

    res: {
      "role": "visiteur",
      "_id": "5c9cec67d2333f427e9314e0",
      "username": "voiture",
      "email": "voiture@gmail.com",
      "createdAt": "2019-03-28T15:46:47.967Z",
      "updatedAt": "2019-03-28T15:46:47.967Z",
      "__v": 0
    }
    ```


  - <span style="color:#6495ED">[PUT]</span> http://localhost:3030/users/ : Modifier tout un utilisateur
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```

  - <span style="color:gray">[PATCH]</span> http://localhost:3030/users/ : Modifier un params de l'utilisateur
    ```
    authorization: bearer Token
    query: {
      nope
    },
    params: {
      id: '5c8cf28425fd287e3448f5ee'
    },
    body: {
      "_id": "5c8cf28425fd287e3448f5ee",
      "role": "visiteur",
      "username": "secret1",
      "email": "email@gmail.com",
      "createdAt": "2019-03-16T12:56:36.619Z",
      "updatedAt": "2019-03-28T16:11:06.500Z",
    }

    res: {
       "_id": "5c8cf28425fd287e3448f5ee",
       "role": "visiteur",
       "username": "secret1",
       "email": "email@gmail.com",
       "createdAt": "2019-03-16T12:56:36.619Z",
       "updatedAt": "2019-03-28T16:11:06.500Z",
    }
    ```


- <span style="color:red">[DELETE]</span> http://localhost:3030/users/:id : Supprimer un utilisateur.
    ```
    authorization: bearer Token
    query: {
      nope
    },
    params: {
      id
    },
    body: {
      nope
    }

    res: {
      "_id": "5c9ca1dfa49dd230df81c2b9",
      "role": "visiteur",
      "username": "nicolas",
      "email": "nicolas@gmail.com",
      "createdAt": "2019-03-28T10:28:47.218Z",
      "updatedAt": "2019-03-28T10:28:47.218Z",
      "__v": 0
    }
    ```

 ️ **Story.**
 ****
  - <span style="color:green">[GET]</span> http://localhost:3030/story/:id : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {

    },
    params: {

    }

    res: {

    }
    ```

  - <span style="color:#ADFF2F">[FIND]</span> http://localhost:3030/story/ : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    }

    res: {

    }
    ```

  - <span style="color:yellow">[POST]</span> http://localhost:3030/story/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {

    }
    ```


  - <span style="color:#6495ED">[PUT]</span> http://localhost:3030/story/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```

  - <span style="color:gray">[PATCH]</span> http://localhost:3030/story/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```


- <span style="color:red">[DELETE]</span> http://localhost:3030/story/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```

**Stories.**
****
  - <span style="color:green">[GET]</span> http://localhost:3030/stories/:id : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {

    },
    params: {

    }

    res: {

    }
    ```

  - <span style="color:#ADFF2F">[FIND]</span> http://localhost:3030/stories/ : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    }

    res: {

    }
    ```

  - <span style="color:yellow">[POST]</span> http://localhost:3030/stories/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {

    }
    ```


  - <span style="color:#6495ED">[PUT]</span> http://localhost:3030/stories/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```

  - <span style="color:gray">[PATCH]</span> http://localhost:3030/stories/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```


- <span style="color:red">[DELETE]</span> http://localhost:3030/stories/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```

 ️➡️ **Block.**
 ****
  - <span style="color:green">[GET]</span> http://localhost:3030/block/:id : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {

    },
    params: {

    }

    res: {

    }
    ```

  - <span style="color:#ADFF2F">[FIND]</span> http://localhost:3030/block/ : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    }

    res: {

    }
    ```

  - <span style="color:yellow">[POST]</span> http://localhost:3030/block/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {

    }
    ```


  - <span style="color:#6495ED">[PUT]</span> http://localhost:3030/block/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```

  - <span style="color:gray">[PATCH]</span> http://localhost:3030/block/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```


- <span style="color:red">[DELETE]</span> http://localhost:3030/block/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```

 ️➡️ **Blocks.**
 ****
  - <span style="color:green">[GET]</span> http://localhost:3030/blocks/:id : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {

    },
    params: {

    }

    res: {

    }
    ```

  - <span style="color:#ADFF2F">[FIND]</span> http://localhost:3030/blocks/ : Information sur un utilisateur. 
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    }

    res: {

    }
    ```

  - <span style="color:yellow">[POST]</span> http://localhost:3030/blocks/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {

    }
    ```


  - <span style="color:#6495ED">[PUT]</span> http://localhost:3030/blocks/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```

  - <span style="color:gray">[PATCH]</span> http://localhost:3030/blocks/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```


- <span style="color:red">[DELETE]</span> http://localhost:3030/blocks/ : Inscrire un utilisateur.
    ```
    authorization: bearer Token
    query: {

    },
    params: {
      
    },
    body: {

    }

    res: {
      
    }
    ```

## CHANNEL. 

️➡️ **Visiteur.** /visiteur/ : No connecter.

️➡️ **Membres.** /membres/ : Connecter

️➡️ **Story.** /story/id

- 💬 focus
 ```
 {
   action : 'get'
   by: userId,
   result: [Object]
 }
 ```

- 💬 unfocus
 ```
 {
   action : 'unfocus'
   by: userId,
   result: [Object]
 }
 ```

- 💬 put
 ```
 {
   action : 'put'
   by: userId,
   result: [Object]
 }
 ```

- 💬 patch
 ```
 {
   action : 'patch'
   by: userId,
   result: [Object]
 }
 ```

 - 💬 delete
 ```
 {
   action : 'delete'
   by: userId,
   result: [Object]
 }
 ```

️➡️ **Block.**



## Auteurs
 👤 **Hugo Villevieille** - Developpeur informatique : hugo.villevieille@epitech.eu</br>
 👤 **Nicolas Fontanet** - Developpeur informatique : nicolas.fontanet@epitech.eu</br>

## License
 ©️ Factory Story - 28 juin 2018 </br>
 Licensed under the [MIT license](LICENSE).
