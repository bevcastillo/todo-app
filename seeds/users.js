
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
				{id: 1, full_name: 'Richard Burk', username: 'rbo13', password: 'password'},
				{id: 2, full_name: 'Beverly May Castillo', username: 'bcastillo', password: 'password'},
				{id: 3, full_name: 'Random User', username: 'random_user', password: 'password'},
      ]);
    });
};
