const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    source_id: {type: String, require: true},
    text: {type: String, require: true},
    created_at: {type: String, require: true},
    created_by : {type: String, require: true}
});

module.exports = mongoose.model('tweet', tweetSchema);