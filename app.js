const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const Port = process.env.Port;
const db = require('./config/db.connection');
const path = require('path');
const userRoutes = require('./routes/user.route');

// Database connect
const dbConnection = async() =>{
    try{
        await db.sequelize.sync({force:false});
        console.log('Connection has been established successfully.');
    }

    catch(err){
        console.error('Unable to connect to the database:', err);
    }

}

dbConnection()


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.dirname(__dirname + 'public')))


app.use('/api/user', userRoutes)

app.listen(Port, ()=>{
    console.log(`Server Running On Port ${Port}`)
})