'use strict';

const Knex = require('knex');
const connection = require('../knexfile');
const { Model } = require('objection');

const Todo = require('./todo');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class User extends Model {
  static get tableName () {
    return 'users'
  }

  static get relationMappings () {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: 'users.id',
          to: 'todos.users_id'
        }
      }
    }
  }
}


module.exports = User;
