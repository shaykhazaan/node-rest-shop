const express = require('express');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname );
    }
});

const productsController = require('../controllers/products');
const isAuth = require('../../middleware/check-auth');

const upload = multer({ storage: storage });


// incoming requests to /products
router.get('/', productsController.getProducts);

router.post('/', isAuth, upload.single('productImage') , productsController.postAddProduct);

router.get('/:productId', isAuth, productsController.getProduct);

router.patch('/:productId', isAuth, productsController.updateProduct);

router.delete('/:productId', isAuth, productsController.deleteProduct);

module.exports = router;