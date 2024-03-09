const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const db = require('./config/dbConnection');


// Load Config File
dotenv.config({ path: './config/config.env.js' })

// Connect to Database
db().then();

// Express App
const app = express();

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cors());


// Product Route
const product = require('./routes/productRoutes')
app.use('/api/products', product);


// Define Port
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})