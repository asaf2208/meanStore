const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Branch = require('../models/branch');


router.get('/:name',(req,res,next) => {
    Branch.find({
        name:req.params.name
    }).then(foundbranch=>{
        res.status(200).json({
            branchs:foundbranch
        });
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    });
});


router.get('/',(req,res,next) => {
    Branch.find()
        .select('name street city _id').exec().then(docs=>{
        const response = {
            count : docs.length,
            branches : docs.map(doc=>{
                return{
                    name: doc.name,
                    street : doc.street,
                    city : doc.city,
                    _id : doc.id,
                    url:{
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/branches/'+ doc._id
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


router.get('/search', async(req, res) => {
    const branchstreet = req.query.street;
    const branchcity = req.query.city;
    const branchname = req.query.name;

    let fetchedbranches;
    let query = {};

    if(branchname !=='')query["name"] = branchname;
    if(branchcity !=='')query["city"] = branchcity;
    if(branchstreet !=='')query["street"] = branchstreet;

    const branchQuery = Branch.find(query);

    branchQuery
    .then(branchResult=>{
        fetchedbranches = branchResult;
        return Branch.find(query).countDocuments();
    }).then(count =>{
        res.status(200).json({
            message:"Branches fetched successfuly",
            branches:fetchedbranches,
            totalbranches:count
        });
    }).catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    });
  });
  

router.post('/',(req,res,next) => {
    const branch = new Branch({
        _id : new mongoose.Types.ObjectId(),
        name:req.body.name,
        street: req.body.street,
        city: req.body.city,
    });
    branch.save().then(result =>{
        res.status(201).json({
            message:'Created branch successfully',
            createdBranch: {
                name: result.name,
                street : result.street,
                city : result.city,
                _id : result.id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/branches/' + result._id
                }
            }
    });
})
.catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    });
});
/*
router.get('/:branchID',(req,res,next) => {
    const id = req.params.branchID;
    Product.findById(id).select('name street city _id').exec().then(doc=>{
        console.log("From DB",doc);
        if(doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type:'GET',
                    url: 'http;//localhost:3000/branches'
                }
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
*/
router.patch('/:branchID',(req,res,next) => {
    const id = req.params.branchID;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    Branch.update({_id:id},{$set : updateOpt})
        .exec().then(result=>{
        res.status(200).json({
            message:'Branch updated',
            request: {
                type:'GET',
                url: 'http;//localhost:3000/branches' +id
            }
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.delete('/:branchID',(req,res,next) => {
    const id = req.params.branchID;
    Branch.remove({_id:id})
        .exec().then(result=>{
        res.status(200).json({
            message:'branch deleted',
            request: {
                type:'POST',
                url: 'http;//localhost:3000/branches',
                body:{name : 'String',street:'String', city: 'String'}
            }
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


module.exports = router;