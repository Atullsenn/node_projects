const userModel = require('../models/User.model');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


const createUser = async(req, res)=>{
    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){

            return res.status(400).json({
                success: false,
                errors: errors.array()
            })

        }

        const {
            firstName,
            lastName,
            email,
            city,
            state,
            country,
            age,
            isAdmin,
            hobbies,
            password
        } = req.body;

        const image = req.file.filename;

       
    

        const data = {
            firstName: firstName,
            lastName: lastName,
            password:hash,
            email: email,
            image:image,
            address:{
                city:city,
                state:state,
                country:country
            },
            age: age,
            hobbies:hobbies
        }
        
  

        userModel.find({email: email}, {email:1}).then((checkemail)=>{
            if(checkemail.length > 0){
                res.status(400).send({
                    success: false,
                    message: 'Email already exists'
                })
                return false;
            }

            
            userModel.create(data).then((userdata)=>{
                if(userdata){
                 res.status(200).json({
                     success: true,
                     message: "user created successfully"
                 })
                 return;
     
                }
                     
             }).catch((err)=>{
                 res.status(500).json({
                     success: false,
                     message:err.message
                 })
                 return;
             })
        })


    }
    catch(err){
    //    console.log(err)
       return err;

    }
}


const findUserbyId = (req, res)=>{
    
    try{
        if(!req.body.userId || req.body.userId == ""){
            res.status(400).json({
                success: false,
                message: 'please provide userId',
            })
            return;
        
        }
        userModel.find({_id:req.body.userId}).then((data)=>{
            res.status(200).json({
                success: true,
                message: 'Data getting successfully',
                user: data[0]
            })
            return;
        })
    }

    catch(err){
        res.status(500).json({
            success: false,
            message: 'Network error'
        })
    }
    
}


const updateUser = async(req, res)=>{
    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){

            return res.status(400).json({
                success: false,
                errors: errors.array()
            })

        }

        const {
            userId,
            firstName,
            lastName,
            email,
            city,
            state,
            country,
            age,
            isAdmin,
            hobbies
        } = req.body;

        const image = req.file.filename


        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            image:image,
            address:{
                city:city,
                state:state,
                country:country
            },
            age: age,
            hobbies:hobbies
        }


        await userModel.updateOne({_id: userId},{$set:data}).then((updateRes)=>{
            res.status(200).send({
                success: true,
                message: 'Data updated successfully'
            })
            return;
        })

    }

    catch(err){
        res.status(500).json({
            success: false,
            message: 'network error'
        })
        return;
    }
}



const getAllUser = async(req, res)=>{
    try{
        await userModel.find().then((userRes)=>{
            res.status(200).json({
                success: true,
                message: "getting data successfully",
                data: userRes
            })
        })
    }

    catch(err){
        res.status(500).json({
            success: false,
            message:"network err"
        })
    }
}



module.exports = {createUser, findUserbyId, updateUser, getAllUser}