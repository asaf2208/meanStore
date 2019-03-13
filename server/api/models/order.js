const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    belongsTo: {type:mongoose.Schema.Types.ObjectId,ref: 'user',required: true},
    products:{type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
    date:{type: Date}
});


module.exports = mongoose.model('Order',orderSchema);