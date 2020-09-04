const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    
    orderid: {
        type: Number,
        required: true
    },
    userid: {
        type: Number,
        required: true,
        
    },
    subtotal: {
        type: Number,
        required: true
    },
    date:{
        type:String,
        required:true,
    },
    
    
}, {
    timestamps: true
});






const Order = mongoose.model('Order', orderSchema);

module.exports = Order;