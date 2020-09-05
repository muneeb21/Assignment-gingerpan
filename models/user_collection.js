// Schema for user collection

const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    
    userid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    noOfOrders: {
        type: Number
    },
    
    
}, {
    timestamps: true
});






const User = mongoose.model('User', userSchema);

module.exports = User;