const db = require('../config/db.connection');
const {validationResult} = require('express-validator');



exports.Createuser = async(req, res, next)=>{
    try{

        const error = validationResult(req)
        if(!error.isEmpty()){
            res.status(400).send({
                success: false,
                errors: error.array()
            })
            return;
        }

        const {
            firstName,
            lastName,
            email,
            age,
            mobile
        } = req.body;


     await db.users.findAll({where:{email:email}}).then((userEmail)=>{
        if(userEmail.length > 0){
            res.status(400).send({
                success: false,
                message: 'Email Already Exists'
            })
            return;
        }

        else{


            const data = {
                firstName:firstName,
                lastName:lastName,
                email:email,
                age:age,
                mobile:mobile
            }
    
    
    
             const create = db.users.create(data).then((resData)=>{
                if(resData){
    
                    res.status(200).send({
                        success: true,
                        message: 'User Created Successfully'
                    })
                    return;
    
                }
    
               
            })

        }
     })

    }

    catch(err){
        res.status(500).send({
            success: false,
            message: 'Network Error:' + err
        })
        return;
    }
}



exports.createPost = (req, res, next)=>{
    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).send({
                success: false,
                errors: errors.array()
            })
            return;
        }

        const {userId, postName, postDescription} = req.body;

        const postData = {
            userId: userId,
            postName: postName,
            postDescription:postDescription
        }


        const createPost = db.userPosts.create(postData).then((resData)=>{
            if(resData){
                res.status(200).send({
                    success: true,
                    message: 'Post Created Successfully'
                })
                return;
            }
        })


    }

    catch(err){
        res.status(500).send({
            success: false,
            message: 'Network error'
        })
        return;
    }
}




exports.getUserDataById = (req, res, next)=>{
    try{

        const userId = req.params.userId;
       
        const getUserData = db.users.findByPk(userId).then((userData)=>{
            if(userData){
                res.status(200).send({
                    success: true,
                    message: 'Data Getting Successfully',
                    user:userData
                })
                return;
            }

            if(!userData){
                res.status(400).send({
                    success: false,
                    message: 'User Id Does Not Exist'
                })
                return;
            }

            else{
                res.status(400).send({
                    success: false,
                    message: 'Something Went Wrong'
                })
                return;
            }
        })

    }

    catch(err){
        res.status(500).send({
            success: false,
            message: 'Network Error'
        })
        return;
    }
}



exports.updateUser = (req, res, next)=>{
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).send({
                success: false,
                errors: errors.array()
            })
            return;
        }

        const userData = {
            userId:req.body.userId,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            age:req.body.age,
            mobile: req.body.mobile
        }


        const getuser = db.users.findAll({where:{userId:req.body.userId}}).then((data)=>{
            console.log(data, "Check Dataaaaa")
            if(!data.length){
                res.status(400).send({
                    success: false,
                    messsage: 'user id does not exist'
                })
                return;
            }

            else{

                const userUpdate = db.users.update(userData, {where:{userId:req.body.userId}}).then((updateData)=>{
                    if(updateData){
                        res.status(200).send({
                            success: true,
                            message:'Data Updated Successfully'
                        })
                        return;
                    }
        
                })

            }
        })    

    }

    catch(err){
        res.status(500).send({
            success: false,
            message: 'Network Error'
        })
        return;
    }
}