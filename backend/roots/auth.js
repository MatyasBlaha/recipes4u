// auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async (req, res, next) => {
    console.log(req.headers.authorization);

    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization.split(" ")[1];


        // Verify the token
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Extract user details from the decoded token


        // Attach user details to the request object
        req.user =  await decodedToken;


        // Pass control to the next middleware or route handler
        next();
    } catch (err) {
        // If token verification fails, send a 401 Unauthorized response
        res.status(401).json({

            message: "Invalid token"
        });
    }
};


