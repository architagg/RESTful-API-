const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    try{
        const token = req.headers.authourization.split(" ")[1];
        const decoded = jwt.verify(req.body.token,process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(201).json({
            message: "Authentication Failed !"
        })
    }
    
};