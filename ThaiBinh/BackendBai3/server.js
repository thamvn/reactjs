const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const config=require('config')
const app=express();

const products=require('./routes/api/products')
const carts=require('./routes/api/carts')
const users=require('./routes/api/users')
const auth=require('./routes/api/auth')
//Body Parser
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))
//Db config
const db=config.get('mongoURI')

//Connect to mongo
mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex:true })
  .then(()=>console.log('mongoDb connected'))
  .catch(err=>console.log(err))


//Use route
app.use('/api/products',products)
app.use('/api/cart',carts)
app.use('/api/users',users)
app.use('/api/auth',auth)
const port=process.env.PORT||5000;
app.listen(port,()=>console.log(`Server started on port ${port}`))