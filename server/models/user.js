const mongoose  = require('mongoose');

var userSchema = new mongoose.Schema({
    
    _id : {
        type: mongoose.Schema.Types.ObjectId
    },
    profileId: {
        type :  mongoose.Schema.Types.ObjectId,
        ref: 'UserDetail'
    },
    email : {
        type: String,
        unique : true,
        required: "Email cannot be empty"
    }, 
    password : {
        type: String,
        required: [true, "Password cannot be empty"]
    }, 
    createdAt: {
        type: Date,
        default : Date.now()
    }
    
});

module.exports = mongoose.model('User', userSchema);
