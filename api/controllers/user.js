const mongoose   = require('mongoose');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');

const User       = require('../models/user')


exports.user_signup = function(req,res,next){
    const productid = req.params.productid;
    Product.remove({_id:productid})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
}



exports.user_login = function(req,res,next){
    User.findOne({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length<1){
            return res.status(401).json({
                message: "Authentication Failed!"
            });
        }
        bcrypt.compare(req.body.password,user.password,function(err,result){
            if(err){
                return res.status(401).json({
                    message: "Authentication Failed!"
                });
            }
            if(result){
               const token =  jwt.sign({
                    email: user.email,
                    userId: user.userId
                },process.env.JWT_KEY,
                {
                    expiresIn: "30 minutes"
                });

                return res.status(200).json({
                    message: 'Authentication Succesful!',
                    token: token
                });
            }
             res.status(401).json({
                message: "Authentication Failed!",
                
             });
        });

    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

}


exports.delete_user = function(req,res,next){
    User.remove({_id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:'User Deleted :('
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}