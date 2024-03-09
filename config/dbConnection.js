const mongoose = require('mongoose');
require('dotenv').config()
const dbUrl = process.env.MONGO_URL
// console.log(dbUrl)

const dbConnect = async()=>{
    try{
        const conn = await mongoose.connect(dbUrl)

        console.log('Db Connected Successfully')
    }

    catch(err){
        console.log('Db Not Connected')
    }
   
}


module.exports = dbConnect;