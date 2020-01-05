'use strict';


// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');

// logging library
const morgan = require('morgan');

const app = express(); // invokes the express API.

app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// const api = require('./api/')(express);
const user = require('./api/user.handler')(express);
const todo = require('./api/todo.handler')(express);

// our api routes.
app.use('/api/v1/users', user);
app.use('/api/v1/todos', todo);


const PORT = '8000';
app.listen(PORT, (err) => {
	if (err) {
		throw err;
	}

	console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`);
});