const mongoose = require('mongoose');

const connectDatabase = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo Connected: ${conn.connection.host}`)
}


module.exports = connectDatabase;