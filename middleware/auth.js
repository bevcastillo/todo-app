'use strict';

const config = require('../config.json');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 if (typeof req.headers.authorization !== "undefined") {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[1];
				let phrase = config.JWT_PASSPHRASE;

        jwt.verify(token, phrase, { algorithm: "HS256" }, (err, user) => {
            if (err) {  
                // shut them out!
                return res.status(403).json({ error: "Authentication is required" });
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        return res.status(403).json({ error: "Authentication is required" });
    }
};
