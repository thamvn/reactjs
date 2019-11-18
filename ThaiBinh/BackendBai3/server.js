const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();

const products=require('./routes/api/products')
const carts=require('./routes/api/carts')
//Body Parser
app.use(bodyParser.json());

//Db config
const db=require('./config/key').mongoURI;

//Connect to mongo
mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true  })
  .then(()=>console.log('mongoDb connected'))
  .catch(err=>console.log(err))


//Use route
app.use('/api/products',products)
app.use('/api/cart',carts)
const port=process.env.PORT||5000;
app.listen(port,()=>console.log(`Server started on port ${port}`))