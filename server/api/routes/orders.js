const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

var dateNow = new Date();
var dd = dateNow.getDate();
var monthSingleDigit = dateNow.getMonth() + 1,
    mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
var yy = dateNow.getFullYear().toString().substr(2);

var formattedDate = dd + '/' + mm + '/' + yy;

router.get('/',(req,res,next) => {
    Order.find().exec().then(docs=>{
        res.status(200).json({
            orders: docs
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.post('/',(req,res,next) => {
    Product.findById(req.body.productId).
    then(product=> {
        if(!product){
            return res.status(404).json({
                message:'Product not found'
            });
        }
        const order = new Order({
            _id : new mongoose.Types.ObjectId(),
            product : req.body.productId,
            date:formattedDate
        });
        return order.save()
    })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:'Order stored'
            });
        })
        .catch(err=> {
        res.status(500).json({message:'Order not found',error:err});
    });

});



router.get('/:orderId',(req,res,next) => {
    Order.findById(req.params.orderId).exec().then(order=>{
        if(order) {
            res.status(200).json({
                order: order
            });
        }else{
            res.status(404).json({message : 'No valid entry found for ID'});
        }
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.patch('/:orderId',(req,res,next) => {
    const id = req.params.orderId;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    Order.update({_id:id},{$set : updateOpt})
        .exec().then(result=>{
        res.status(200).json({
            message:'Order updated'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.delete('/:orderId',(req,res,next) => {
    Order.remove({_id:req.params.orderId})
        .exec().then(result=>{
        res.status(200).json({
            message:'Order deleted'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


module.exports = router;