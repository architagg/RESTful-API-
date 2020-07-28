const Product   = require('../models/product');
const mongoose  = require('mongoose');



exports.products_get_all = function(req,res,next){
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if(docs.length>=0){
           res.status(200).json(docs);
        }
        else{
            res.status(404).json({
                message: "No entries in DB"
            })
           }
       })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
   });
}



exports.products_create_product = function(req,res,next){
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result); 
        res.status(201).json({
            message : 'Handling POST for /products',
            createdProduct : result 
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}


exports.products_get_product = function(req,res,next){
    const productid = req.params.productid;
     Product.findById(productid).
    exec().
    then(doc =>{
        console.log("From database" , doc);
        if(doc){
            res.status(200).json(doc)
        } else {
            res.status(404).json({
                message: "Not Valid ID"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
}


exports.products_patch_product = function(req,res,next){
    const productid = req.params.productid;
    const updateOps = {}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: productid},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
}


exports.products_delete_product = function(req,res,next){
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