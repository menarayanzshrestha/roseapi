const mongoose  = require('mongoose');

var userDetailsSchema = new mongoose.Schema({
    
    _id : {
        type: mongoose.Schema.Types.ObjectId
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    fullName : {
        type: String
    }
      
});

module.exports = mongoose.model('UserDetail', userDetailsSchema);
