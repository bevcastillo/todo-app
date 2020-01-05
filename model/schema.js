'use strict';

const Knex = require('knex');
const connection = require('../knexfile');
const { Model } = require('objection');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Todo extends Model {
  static get tableName () {
    return 'todos'
  }

  static get relationMappings () {
    return {
      idea: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'todos.users_id',
          to: 'users.id'
        }
      }
    }
  }
}

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

module.exports = { User, Todo }
