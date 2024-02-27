const { response } = require("express");
const User = require("./model/user");
const Items = require("./model/items")

var express = require("express");
var app = express();
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
const cors = require("cors");
app.use(
	cors({
		origin: "*",
	})
);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var db=require("./database")
db.connect()
const bcrypt = require("bcryptjs");
//order items 
app.post('/orderitems',async(req,res)=>{

    //check whether the user who is accesing the api is in our mutual DB for the access 
    let email = req.body.email 
    let itemName = req.body.itemName
    let itemCode = req.body.itemCode
    let quantity = req.body.quantity
    const orders = [];
    let checkUser = await User.findOne({"email":email})
    if(!checkUser)
    res.send(`${email} is not authorized`)
//return the json obj which contains all the items to display at UI level 
   else 
   {
    let displayItem = await Items.find({"itemName":itemName,"itemCode":itemCode})
    console.log("items",displayItem)
    // let itemprice=displayItem.price
    // console.log("item price",displayItem[].itemprice)
    displayItem.map(function (item) {
      console.log(item)
      console.log("pri", item.price)
       itemprice = item.price
    })
    
  const uniqueOrderId = generateOrderId();
  console.log(`Generated Order ID: ${uniqueOrderId}`)
    const order = {
        orderId:uniqueOrderId,
        itemName,
        itemCode,
        quantity,
        totalAmount: itemprice * quantity
    }
    checkUser.order = order
  //   await checkUser.save(function (err, result) {
	// 	if (err) {
			
	// 		console.log("couldnt save");
	// 	} else {
	// 		console.log("in save");
	// 		console.log(result);
		
	// 	}
	// });
  checkUser.save().then(()=>{
    res.render("secrets");
}).catch((err)=>{
    console.log(err);
})
  // let output;
  // (async () => {
  //    output = await User.save();
  // })
  // console.log(output);
    orders.push(order);
    res.json(`${uniqueOrderId} and order details are ${JSON.stringify(order)}`);
    
   }

})


function generateOrderId() {
    
    const timestamp = new Date().getTime();
  
    const random = Math.floor(Math.random() * 1000);
  
    // Combine timestamp and random number to create a unique order ID
    const orderId = `${timestamp}-${random}`;
  
    return orderId;
  }
  


app.post('/process-payment', (req, res) => {
    let   orderId = req.body.orderId
     let totalAmount = req.body.totalAmount
      let paymentMethod = req.body.paymentMethod

  
    if (!orderId || !totalAmount || !paymentMethod) {
      return res.status(400).json({ error: 'Order ID, total amount, and payment method are required.' });
    }
  
    // Simulate payment processing logic
    const paymentStatus = processPayment(totalAmount, paymentMethod);
  
    if (paymentStatus === 'success') {
      res.json({ status: 'Payment successful', orderId, totalAmount });
    } else {
      res.status(500).json({ error: 'Payment failed' });
    }
  });

  function processPayment(amount, method) {
 
    if (method === 'credit-card') {
      // Perform credit card processing logic
      return 'success';
    } else if (method === 'paypal') {
      // Perform PayPal processing logic
      return 'success';
    } else {
      return 'failure';
    }
  }


app.listen(3002, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3002);
})