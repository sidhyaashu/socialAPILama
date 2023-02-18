const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

const userRoute = require('./routs/users');
const authRoute = require('./routs/auth');
const postRoute = require('./routs/posts');

dotenv.config();
mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to mongodb");
});

//middlewere
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);

// app.get('/',(req,res)=>{
//     res.status(200).send("Server is running on port whateever")
// })


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
});