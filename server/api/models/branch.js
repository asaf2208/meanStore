const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: {type:String,required:true},
    street: {type:String,required:true},
    city: {type:String,required:true}
});


module.exports = mongoose.model('Branch',branchSchema);