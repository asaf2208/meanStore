const express = require('express');
const router = express.Router();


const Branch = require('../models/branch');


router.get('/:name',(req,res,next) => {
    Branch.find({
        name:{req.params.name}
    }).then(foundbranch=>{
        res.status(200).json({
            Branch:foundbranch
        });
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    });
});


router.get('/',(req,res,next) => {
    Branch.find()
        .select('name address _id').exec().then(docs=>{
        const response = {
            count : docs.length,
            branches : docs.map(doc=>{
                return{
                    name: doc.name,
                    address : doc.address
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
    const branch = new Branch({
        name:req.body.name,
        address: req.body.address
    });
    branch.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message:'Created branch successfully',
            createdBranch: {
                name: result.name,
                address : result.address,
                _id : result.id,
            }
    });
})
.catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.get('/:branchID',(req,res,next) => {
    const id = req.params.branchID;
    Product.findById(id).select('name address _id').exec().then(doc=>{
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

router.patch('/:branchID',(req,res,next) => {
    const id = req.params.branchID;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    Branch.update({_id:id},{$set : updateOpt})
        .exec().then(result=>{
        res.status(200).json({
            message:'Branch updated'
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
            message:'branch deleted'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


module.exports = router;