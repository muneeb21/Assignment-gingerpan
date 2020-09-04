
const User=require('../models/user_collection');
const Order=require('../models/order_collection');


module.exports.enterUser=async function(req,res){
    try{
        const{userid,name}=req.body;
        const noOfOrders=0;
        let user=await User.findOne({userid:userid});
        if(user){
            return res.status(200).json({
				message:
                    "User already exists",
			});
        }
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

module.exports.enterOrder=async function(req,res){

    try{
        const{orderid,userid,subtotal,date}=req.body;

      
        let newOrder = await User.create({orderid,userid,subtotal, date});
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


module.exports.orderDetails=async function(req,res){

    try{
    const orders= await Order.find();
    const users=await User.find();
    const totalUsers=users.length;
    const data=[];
    for(var i=1;i<=users;i++){
        let count=0;
        let sum=0;
        for(var j=0;j<orders.length;j++){
            if(orders[j].userid===i){
                count++;
                sum+=orders[j].subtotal;
            }
        }
        sum=sum/count;
        data[i-1]={userid:i, name:users[i].name, noOfOrders:count, averageBillvalue:sum};
      
    }
    return res.status(200).json({
        message:
            "Here are the specified details",
            data: { orderDetails: data },
    });


}catch(err){
    console.log('********',err);
    return res.status(500).json({
        message: "Internal Server Error",
    });

}


} 


module.exports.update=async function(req,res){

    try{
    const orders= await Order.find();
    const users=await User.find();
    const totalUsers=users.length;
    // const data=[];
    for(var i=1;i<=users;i++){
        let count=0;
        // let sum=0;
        for(var j=0;j<orders.length;j++){
            if(orders[j].userid===i){
                count++;
                // sum+=orders[j].subtotal;
            }
        }
        // sum=sum/count;
        // data[i-1]={userid:i, name:users[i].name, noOfOrders:count, averageBillvalue:sum};
      User.findOneAndUpdate({userid:i},{noOfOrders:count},null,function(err,data){
          if(err){
              console.log(error);
          }
          else{
              console.log("data",data);
          }
      });
    }
    return res.status(200).json({
        message:
            "Successfully Updated",
    });


}catch(err){
    console.log('********',err);
    return res.status(500).json({
        message: "Internal Server Error",
    });

}


} 