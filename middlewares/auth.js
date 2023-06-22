const jwt = require("jsonwebtoken");
const jwtSecret = process.env.TOKEN_SECRET;

exports.authUpdate = (req, res, next) => {
    // const token = req.cookies.jwt;
    const token = req.body.token || req.query.token || req.headers['auth'];
    if(token) {
        jwt.verify( token, jwtSecret, (err, decodedToken) => {
            (err) ? res.status(401).json({ message : "User not Authenticated"}) : (decodedToken.role !== "admin" && decodedToken.role !== "mentor") ? res.status(401).json({ message : "User Not Authorized"}) : next(); 
        })
    }
    else {
        return res.status(401).json({ message : "Not Authorized, Token not Available." });
    }
}

exports.authUsers = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['auth'];
    if(token) {
        jwt.verify( token, jwtSecret, (err, decodedToken) => {
            (err) ? res.status(401).json({ message : "User not Authenticated"}) : (decodedToken.role !== "mentor" && decodedToken.role !== "teacher" && decodedToken.role !== "admin") ? res.status(401).json({ message : "User Not Authorized"}) : next(); 
        })
    }
    else {
        return res.status(401).json({ message : "Not Authorized, Token not Available." });
    }
}

exports.authDelete = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['auth'];
    if(token) {
        jwt.verify( token, jwtSecret, (err, decodedToken) => {
            (err) ? res.status(401).json({ message : "User not Authenticated"}) : (decodedToken.role !== "admin") ? res.status(401).json({ message : "User Not Authorized"}) : next(); 
        })
    }
    else {
        return res.status(401).json({ message : "Not Authorized, Token not Available." });
    }
}