const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    //check if user(email) already exists
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            bcrypt
            .hash(req.body.password, 12)
            .then(hashedPw => {
                const user = new User({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hashedPw
                });
                return user.save();
            })
            .then(result => {
                
                res.status(201).json(result);
            })
        }
        else {
            res.status(409).json({
                message: 'User already exists'
            })
        }
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    })
};

exports.login = (req, res, next) => {
    let loadedUser;
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            const error = new Error('A user with this e-mail does not exist');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(isEqual => {
        if(!isEqual) {
            const error = new Error('wrong password');
            error.statusCode = 404;
            throw error; 
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            process.env.JWT_KEY,
            {expiresIn: '1h'} //expiry of the token is 1 hour
        );
        res.status(200).json({
            message: "Auth successful",
            accessToken: token
        });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
};