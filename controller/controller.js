// Requiring model schemas (user collection and order collection)
const User=require('../models/user_collection');
const Order=require('../models/order_collection');


// Controller to Enter user details
// You can enter as many users as you like with a unique userid
module.exports.enterUser=async function(req,res){
    try{
        const{userid,name}=req.body;
        // initially set the value of noOfOrders ans zero
        const noOfOrders=0;
        // check if user exists already
        let user=await User.findOne({userid:userid});
        if(user){
            return res.status(200).json({
				message:
                    "User already exists",
			});
        }
        // Create a new user
        let newUser = await User.create({userid, name,noOfOrders });
        return res.status(200).json({
            message:
                "User created successfully",
        });

    }catch(err){
        console.log('********',err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
    }
}

// Function to enter order details
// You can enter as many orders as you like
module.exports.enterOrder=async function(req,res){

    try{
        const{orderid,userid,subtotal,date}=req.body;

        // Create a new Order   
        let newOrder = await Order.create({orderid,userid,subtotal, date});
        return res.status(200).json({
            message:
                "Order created successfully",
        });

    }catch(err){
        console.log('********',err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
    }

}

// 

module.exports.orderDetails=async function(req,res){

    try{
        // store all the users and orders in a variable and calculate the details by traversing them
    const orders= await Order.find();
    const users=await User.find();
    console.log(orders);
    const totalUsers=users.length;
    const data=[];
    for(var i=1;i<=users.length;i++){
        let count=0;
        let sum=0;
        for(var j=0;j<orders.length;j++){
            if(orders[j].userid===i){
                count++;
                sum+=orders[j].subtotal;
            }
        }
        sum=sum/count;
        data[i-1]={userid:i, name:users[i-1].name, noOfOrders:count, averageBillvalue:sum};
      
    }
    // return data
    return res.status(200).json({
        message:
            "Here are the specified details",
            data: { orderDetails: data },
    });

// if any error 
}catch(err){
    console.log('********',err);
    return res.status(500).json({
        message: "Internal Server Error",
    });

}


} 


module.exports.update=async function(req,res){

    try{

    // store all the users and orders in a variable and calculate the details by traversing them
    const orders= await Order.find();
    const users=await User.find();
    const totalUsers=users.length;
    
    for(var i=1;i<=users.length;i++){
        let count=0;
        
        for(var j=0;j<orders.length;j++){
            if(orders[j].userid===i){
                count++;
                
            }
        }
    // After finding the user update the noOfOrders feild
      User.findOneAndUpdate({userid:i},{noOfOrders:count},null,function(err,data){
          if(err){
              console.log(error);
          }
          else{
              console.log("data",data);
          }
      });
    }
    // return the result
    return res.status(200).json({
        success:"true",
        message:
            "Successfully Updated",
    });

// return error if any
}catch(err){
    console.log('********',err);
    return res.status(500).json({
        message: "Internal Server Error",
    });

}


} 