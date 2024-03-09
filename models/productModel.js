const {Schema, model} = require('mongoose');

const productSchema = new Schema({

    title:{
        type: String,
        required: [true, 'please enter a title']
    },

   category:[
    {
        type: Schema.Types.ObjectId,
        ref: 'category'
    }
   ],

   price:{
    type: Number,
    required: [true, 'please enter a price']
   },

   onSale:{
    type: Boolean,
    default: false,
    required: false
   },

   sale_price:{
    type: Number,
    default:0.0,
    required: false
   },


   main_image:{
    type: String,
    required: false
   },

   images: [{
    fileName: {
        type: String,
        required: false,
    },

    fileType: {
        type: String,
        required: false
    }
   }],

   pro:{
    name:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    }
   },

   description:{
    type: String,
    required: [true, 'please enter a description']
   },

   short_description:{
    type: String,
    required: false
   },





})

const productModel = model('product', productSchema);

module.exports = productModel;