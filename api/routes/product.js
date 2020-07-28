const express    = require('express');
const router     = express.Router();
const checkAuth  = require('../middleware/check-auth');

const ProductController = require('../controllers/product');



//GET PRODUCTS
router.get('/',ProductController.products_get_all);


//POST PRODUCTS
router.post('/',checkAuth,ProductController.products_create_product);

//GET PRODUCT ID
router.get('/:productid',ProductController.products_get_product);


//PATCH PRODUCT IDS
router.patch('/:productid',checkAuth,ProductController.products_patch_product);


//DELETE PRODUCTS
router.delete('/:productid',checkAuth,ProductController.products_delete_product);



module.exports = router;
