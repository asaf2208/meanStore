const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
var AhoCorasick = require('ahocorasick');


router.get('/search', async(req, res) => {
    const productname = req.query.name;
    const productprice = req.query.price;
    const productcategory = req.query.category;


    let fetchedProducts;
    let query = {};

    if(productname !=='')query["name"] = productname;
    if(productprice !=='')query["price"] = productprice;
    if(productcategory !=='')query["category"] = productcategory;

    const productQuery = Product.find(query);

    console.log(query);

    productQuery
    .then(prodctResult=>{
        fetchedProducts = prodctResult;
        return Product.find(query).countDocuments();
    }).then(count =>{
        res.status(200).json({
            message:"products fetched successfuly",
            products:fetchedProducts,
            totalprducts:count
        });
    }).catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    });
  });

  router.get('/groupbycategory',(req,res,next) => {
    Product.aggregate([
      {"$group" : {_id:"$category", count:{$sum:1}}}
  ]).then(docs=> {
        return res.status(200).json({docs});
    }).catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    });
  });

router.get('/',(req,res,next) => { 
    Product.find()
        .select('name price category _id').exec().then(docs=>{
        const response = {
            count : docs.length,
            products : docs.map(doc=>{
                return{
                    name: doc.name,
                    price : doc.price,
                    category: doc.category,
                    _id : doc.id,
                    url:{
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/products/'+ doc._id
                        }
                    }
                }
            })
        };
        res.status(200).json(response);
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

  


router.post('/',(req,res,next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price,
        category:req.body.category
    });
    product.save().then(result =>{
        res.status(201).json({
            message:'Created product successfully',
            createdProduct: {
                name: result.name,
                price : result.price,
                category: result.category,
                _id : result.id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

//////////////////////AhoCorasick//////////////////////////////
router.get('/:id',(req,res,next) => {
    var ah = new AhoCorasick([req.params.id]);
    Product.find().select('name price ').exec().then(docs=>{
        var matches = [];
      docs.forEach(product => {
        var results = ac.search(product.name);
        if (results.length > 0) {
          matches.push({product: product, matches: results});
        }
      });
      return res.status(200).json({products: matches});
    });
});

router.patch('/:productID',(req,res,next) => {
    const id = req.params.productID;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    Product.update({_id:id},{$set : updateOpt})
        .select('name price category _id').exec().then(result=>{
        const newVal = {
            "name" : updateOpt.name,
            "price": updateOpt.price,
            "category": updateOpt.category,
            "id": id
        }
        console.log(newVal);
        const io = app.get('socketio');
        io.emit('editProduct',newVal);
        res.status(200).json({
            message:'Product updated',
            request: {
                type:'GET',
                url: 'http;//localhost:3000/products' +id
            }
        });
    }).catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.delete('/:productID',(req,res,next) => {
    const id = req.params.productID;
    Product.remove({_id:id})
        .exec().then(result=>{
        const io = app.get('socketio');
        io.emit('deleteProduct',id);    
        res.status(200).json({
            message:'Product deleted',
            request: {
                type:'POST',
                url: 'http;//localhost:3000/products',
                body:{name : 'String',price:'Number', category: 'String'}
            }
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});



module.exports = router;