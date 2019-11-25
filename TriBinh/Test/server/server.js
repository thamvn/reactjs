const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const products = require('./routers/api/products');
const carts = require('./routers/api/carts');
const users = require('./routers/api/users');
const account = require('./routers/api/signin');

const app = express();
app.use(cors())

//Bodyparser Middleware
app.use(bodyParser.json());
//DB config
const db = require('./config/key').mongoURI;

//Connect to Mongo
mongoose.connect(db)
        .then(()=>console.log('mongoDb connected....'))
        .catch(err => console.log(err));

//Use routes
app.use('/api/products',products)
app.use('/api/cart',carts)
app.use('/api/users',users)
app.use('/api/account',account)


const port = 5000;

app.listen(port,()=>console.log(`Server started on port ${port}`));

// app.get('/',(req,res)=>{
//     res.send("this is home page")
// });
// app.get('/api/products',(req,res)=>{
//     products=[];
//         const basePrice = 5;
//         for(var i=0;i<10;i++){
//             products.push({
//             id:i+1,
//             name:`product ${i+1}`,
//             isAdded: false,
//             price: basePrice*(i+1)
//             });
//         }
//     res.json(products);
// });

// app.get('/api/users',(req,res)=>{
//     users=[];
//         for(var i=0;i<10;i++){
//             users.push({
//             id:i+1,
//             username:`user${i+1}`,
//             password: 1,
//             status:true
//             });
//         }
//     res.json(users);
// });
