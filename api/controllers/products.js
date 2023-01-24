const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.find()
    .select('name price productImage _id')
    .then(result => {
        const response = {
            count: result.length,
            products: result
        }
        res.status(200).json(response);
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })  
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save()
    .then(result => {
        res.status(201).json({
            
            createdProduct: result
        });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            const error = new Error('No valid entry for the provided ID');
            error.statusCode = 404;
            throw error;
        }  
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateProduct = (req, res, next) => {
    const id = req.params.productId;
    const newName = req.body.newName;
    const newPrice = req.body.newPrice;
    Product.updateOne({_id: id}, {name: newName, price: newPrice})
    .then( docs => {
        if(docs.modifiedCount == 0) {
            const error = new Error('No valid entry for the provided ID');
            error.statusCode = 404;
            throw error;
        }
        else {
            res.status(200).json(docs);
        }

    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .then( result => {
        if(result.deletedCount == 0) {
            const error = new Error('No valid entry for the provided ID');
            error.statusCode = 404;
            throw error;
        } 
        else {
            res.status(200).json(result);
        }
    })
    .catch( err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};