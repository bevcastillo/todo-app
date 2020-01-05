'use strict';

const bcrypt = require('bcryptjs');

const User = require('../model/user');

const SALT_ROUNDS = 12;

// export this file as importable to server.js
module.exports = (express) => {
	const api = express.Router();

	api.post('/register', async (req, res) => {
		const password = req.body.password;
		const confirmPassword = req.body.confirm_password;
		const username = req.body.username;

		if (!confirmPassword) {
			return res.status(200).json({
				success: false,
				message: "Confirm Password is required"
			});
		}

		if (password != confirmPassword) {
			return res.status(200).json({
				success: false,
				message: 'Passwords dont match'
			});
		}

		const hashedPassword = await hashPassword(password);
		const newUser = {
			full_name: req.body.full_name,
			username: username,
			password: hashedPassword
		}

		const checkUser = await User.query().where('username', '=', username);
		if (checkUser.length > 0) {
			return res.status(200).json({
				success: false,
				message: "User already exists",
			});
		}

		const savedUser = await User.query()
												.allowGraph('[full_name, username, password]')
												.insertGraph(newUser);

		res.status(200).json({
			success: true,
			message: 'User successfully created',
			data: savedUser
		});
	});

	api.get('/', async (req, res) => {
		const users = await User.query();
		const data = {
			success: true,
			data: users
		}
		return res.status(200).json(data);
	})

	return api;
};

// hashPassword returns a given raw password to a hashed password.
async function hashPassword(rawPassword) {
	if (!rawPassword) {
		throw new Error('Password is required');
	}

	const hashedPassword = await new Promise((resolve, reject) => {
		bcrypt.hash(rawPassword, SALT_ROUNDS, (err, hash) => {
      if (err) {
			return reject(err);
			}
      return resolve(hash);
    });
	});

	return hashedPassword;
}
