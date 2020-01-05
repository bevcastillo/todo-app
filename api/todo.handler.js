'use strict';

const Todo = require('../model/todo');

// export this file as importable to server.js
module.exports = (express) => {
	const api = express.Router();

	api.get('/', async (req, res) => {
		return res.send("TODO HANDLER");
		// todos
		// const users = await User.query();
		// const data = {
		// 	success: true,
		// 	data: users
		// }
		// return res.status(200).json(data);
	})

	return api;
};
