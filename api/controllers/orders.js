const Order = require('../models/order');

exports.getAllOrders = (req, res, next) => {
    Order.find()
    .then(result => {
        const count = result.length;
        res.status(200).json({count: count, Orders: result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })  
};

exports.createOrder = (req, res, next) => {
    const order = new Order({
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order.save()
    .then(doc => {
        console.log(doc);
        res.status(201).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};

exports.getOrder = (req, res, next) => {
    const id= req.params.orderId;
    Order.findById(id)
    .populate('product')
    .then(result => {
        console.log(result);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "NO valid entry for the provided ID"
            })
        }  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.deleteOrder = (req, res, next) => {
    const id= req.params.orderId;
    Order.remove({_id: id})
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};