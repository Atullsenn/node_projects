const {DataTypes} = require('sequelize');
const { sequelize } = require('../config/db.connection');

exports.user = (sequelize)=>{

    const userSchema = sequelize.define('tbl_users',{
        userId:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
    
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
    
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    
        mobile: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    
return userSchema    

}



exports.userPosts = (sequelize)=>{
    const userPostSchema = sequelize.define('tbl_user_posts', {
        userId:{
            type: DataTypes.INTEGER
        },

        postName: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },

        postDescription:{
            type: DataTypes.STRING
        }
    })

    return userPostSchema;
}



exports.postImages = (sequelize)=>{
  
    const postImageSchema = sequelize.define('tbl_post_images',{
        userId:{
            type: DataTypes.INTEGER
        },

        image:{
            type: DataTypes.STRING
        }
    })


    return postImageSchema;

    
}



