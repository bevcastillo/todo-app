'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const isAuthenticated = require('../middleware/auth');
const config = require('../config.json');

const SALT_ROUNDS = 12;

// export this file as importable to server.js
module.exports = (express) => {
	const api = express.Router();

	api.post('/login', async (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
	
		const user = await User.query().where('username', '=', username);
		const hashedPassword = user[0].password;

		const passwordCorrect = await comparePasswords(password, hashedPassword);
		
		if (!passwordCorrect) {
			return res.status(200).json({
				success: false,
				message: 'Username/Password is not correct',
			});
		}

		const payload = {
			id: user[0].id,
			username: user[0].username,
			isAuthenticated: true
		}
		const token = jwt.sign(payload, config.JWT_PASSPHRASE, { algorithm: 'HS256'});

		return res.status(200).json({
			success: true,
			message: "User succesfully logged in",
			token: token,
			data: user
		});
	});

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

	api.get('/', isAuthenticated, async (req, res) => {
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

async function comparePasswords(rawPassword, hashedPassword) {
	if (!rawPassword) {
		throw new Error('Password is required');
	}

	const hasSamePassword = await new Promise((resolve, reject) => {
		bcrypt.compare(rawPassword, hashedPassword, (err, isMatch) => {
			if (err) {
				return reject(err);
			}

			return resolve(isMatch);
		});
	});

	return hasSamePassword;
}
