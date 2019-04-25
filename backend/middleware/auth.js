const jwt = require('jsonwebtoken');

const SECRET = "TIM3OFF@INC";

module.exports = function(req, res, next){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader) return res
        .status(401).json(
            {status: 'error', 
            message: "Please specify an authorization header"});

        const token = authHeader.split(" ")[1];

        const tokenData = jwt.verify(token, SECRET);

        req.user = tokenData.id;

        next();

    }catch(err){
        res
        .status(401).json(
            {status: 'error', 
            message: "You're not authorized"});
    }
}