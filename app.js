const express         = require('express');
const app             = express();
const morgan          = require('morgan');
const bodyParser      = require('body-parser')
const mongoose        = require('mongoose');

const ProductRoutes   = require('./api/routes/product');
const OrderRoutes     = require('./api/routes/order');
const UserRoutes      = require('./api/routes/user');


const { urlencoded } = require('body-parser');


mongoose.connect('mongodb+srv://adminarchit:'
+process.env.MONGO_ATLAS_PW+
'@node-rest-shop.xbpfz.mongodb.net/node-rest-shop?retryWrites=true&w=majority',{
    useMongoClient: true
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(morgan('dev'));

//CORS Error Handling 
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method s' , 'PUT,POST,GET,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/products',ProductRoutes);
app.use('/orders',OrderRoutes);
app.use('/user',UserRoutes);


app.use(function(req,res,next){
    const error = new Error ('Not Found');
    error.status(404);
    next (error);
});


app.use(function(error,req,res,next){
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    })
});

module.exports = app ;