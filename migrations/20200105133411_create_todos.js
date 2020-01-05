
exports.up = function(knex) {
 	return Promise.all([
		knex.schema.createTable('todos', table => {
			table.increments('id').primary();
			table.string('title');
			table.integer('user_id').unsigned().notNullable().references('users.id');
			table.boolean('todo_done');
			table.string('todo_created_at');
			table.string('todo_updated_at');
			table.string('todo_deleted_at');
		})
	]); 
};

exports.down = function(knex) {
    return Promise.all([
    knex.schema.dropTable('todos')
  ])
};
