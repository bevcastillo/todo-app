'use strict';

const { User, Todo } = require('../model/schema');

// export this file as importable to server.js
module.exports = (express) => {

	const api = express.Router();

	// establish the get request.
	api.get('/', (req, res) => {
		res.send("HELLO WORLD");
	});


	api.get('/users', async (req, res) => {
		const users = await User.query();
		const data = {
			success: true,
			data: users
		}
		return res.status(200).json(data);
	})

	return api;
};
