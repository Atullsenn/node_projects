require('dotenv').config();
const {DATABASE_HOST, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD} = process.env;
const Sequelize = require('sequelize');
const {user, userPosts, postImages} = require('../models/user.model')


const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD,{
    host: DATABASE_HOST,
    dialect:'mysql'
})




var db = {}

db.sequelize = sequelize;


// Models
db.users = user(sequelize);
db.userPosts = userPosts(sequelize);
db.postImages = postImages(sequelize);


module.exports = db;