const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path');
const dbConnect = require('./config/dbConnection');
dotenv.config()
const Port = process.env.PORT || 4000
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))


// Db Connection

dbConnect()


// user route

const userRoute = require('./routes/userRoute');

app.use('/api/user', userRoute);


app.listen(Port, ()=>{
    console.log(`Server Running On Port ${Port}`);
})



