'use strict';


// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');

const app = express(); // invokes the express API.

// import our api file from api directory and pass the express instance.

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const api = require('./api/')(express);

// our api routes.
app.use('/api', api);


const PORT = '8000';

app.listen(PORT, (err) => {
	if (err) {
		throw err;
	}

	console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`);
});