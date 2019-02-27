const bodyParser = require("body-parser");
var express = require('express');
const mongoose = require('mongoose');

var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());

const User = require('../models/user');
const Order = require('../models/order');

router.post('/adduser', jsonParser, (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.firstname,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email,
        currentcart: req.body.currentcart,
        historyoforder: req.body.historyoforder,
        isAdmin: req.body.isAdmin
    });
    user.save().then(result => {
        res.status(201).json({
            message: 'Created user successfully',
            createdUser: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    User.findOne({username, password}, (err, user) => {
        if (err) {
            console.error(err);
        } else if (user) {
            const { fullname, email, isAdmin} = user;
            console.log(isAdmin);
            console.log(user);
            res.json(({
                "fullname":fullname,
                "email":email,
                "username":username,
                "isAdmin": isAdmin
            }));
        } else {
            res.json(('wrong input'));
        }
    });
});


router.get('/:userid', (req, res, next) => {
    const id = req.params.userid;
    User.findById(id).select('fullname _id').exec().then(doc => {
            if (doc) {
                res.status(200).json({
                    user: doc
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/', (req, res, next) => {
    User.find().exec().then(doc => {
            if (doc) {
                res.status(200).json({
                    user: doc
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.patch('/edituser/:userid', (req, res, next) => {
    const id = req.params.userid;
    const updateOpt = {};
    for (const ops of req.body) {
        updateOpt[ops.propName] = ops.value;
    }
    User.update({
            _id: id
        }, {
            $set: updateOpt
        })
        .exec().then(result => {
            res.status(200).json({
                message: 'User updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userid', (req, res, next) => {
    const id = req.params.userid;
    User.deleteOne({
            _id: id
        })
        .exec().then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;