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


module.exports = Todo;
