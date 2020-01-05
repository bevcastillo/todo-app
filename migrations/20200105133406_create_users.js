
exports.up = function(knex) {
 	return Promise.all([
		knex.schema.createTable('users', table => {
			table.increments('id').primary();
			table.string('full_name');
			table.string('username');
			table.string('password');
		})
	]); 
};

exports.down = function(knex) {
  return Promise.all([
		knex.schema.dropTable('users')
 ]);
};
