const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    firstName: {
        type: String,
        required:[true, 'first name is required']
    },

    lastName: {
        type: String,
        required: [true, 'last name is requried']
    },

    email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
        isEmail: true
    },

    image:{
        type: String,
        required: false,
        default:""
    },

    address:{
            state:{
                type:String,
                required: true
            },
            
            city:{
                type: String,
                required: true
            },

            country:{
                type: String,
                required: true
            }
    },

    hobbies: [{
        type: String
    }],

    password:{
        type: String,
        required:[true, 'password is required']
    },

    age:{
        type: Number,
        required: [true, "age is required"]
    },


    isAdmin:{
        type: Number,
        default: 0
    }



    
})


const userModel = model('user',userSchema)

module.exports = userModel;