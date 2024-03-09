const productModel = require('../models/productModel');
const customError = require('../utils/CustomError');


// Create New Product

exports.createProduct = async(req, res, next)=>{
    const {
        title,
        category,
        price,
        description
    } = req.body;

    var img = []
    
    const image = req.files;
    
    
    image.forEach((imgg)=>{
        let arr={}
       arr['fileName'] = imgg.filename,
       arr['fileType'] = imgg.mimetype
       img.push(arr)
    })
    
    
    try{
        var data;
       
        data = {
        title: title,
        category:category,
        price:price,
        description:description,
        pro:{
            name:req.body.name,
            email: req.body.email
        },
       
        images:img
        }
        
        
    
        const product = await productModel.create(data);
        return res.status(200).json({
            success: true,
            message: "Product Created Successfully",
            product: product,
           
        });
    
    
    
    }




    catch(err){
        const error = new customError('Something went wrong, try again later', 500);
        res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
        return;

    }

    

}


exports.updateProduct = async(req, res, next)=>{

    if(req.body._id == "" || !req.body._id){
        res.status(400).json({
            success: false,
            message: "Please Provide Product Id"
        })
        return;
    }
    try{
    const{
        title,
        price,
        description,
        category,
       
        
    } = req.body;

    const image = req.files;
    

    const data = {
        title:title,
        price:price,
        description:description,
        category:category,
        pro:{
            name:req.body.name,
            email: req.body.email
        },
    }

    const dataupdate = await productModel.updateOne({_id:req.body._id}, {$set:data})
    res.status(200).json({
        success: true,
        message: "Data Updated Successfully",
        updateData: dataupdate
    })
    return;

}

catch(err){
    res.status(500).json({
        success:false,
        message:"Something Went Wrong"
    })
    return;
}

}


