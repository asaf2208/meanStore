const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.Schema.Types
const UserModel = new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    address:{type:String},
    createddate:{type:Date},
    currentCart:{type:[mongoose.Schema.Types.ObjectId],ref:'Product'},
    historyoforder:{type:[mongoose.Schema.Types.ObjectId],ref:'Order'},
    isAdmin:{type: Boolean}
})

module.exports = mongoose.model('user', UserModel)
