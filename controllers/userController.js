const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConnection');
const randomString = require('randomstring');
const sendMail = require('../helpers/sendMail');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const register = (req, res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    db.query(`SELECT * FROM tbl_user WHERE LOWER(email) = LOWER(${db.escape(req.body.email)})`,(err, result)=>{
        if(result && result.length){
            return res.status(409).send({
                success: false,
                message: "This user already exist!"
            })
        }

        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).send({
                        message: err
                    })
                }

                else{
                    db.query(`INSERT INTO tbl_user(name,email,password, image) VALUES ('${req.body.name}', ${db.escape(req.body.email)}, ${db.escape(hash)}, '${req.file.filename}')`,(err, result)=>{
                        if(err){
                            return res.status(500).send({
                                success: false,
                                message: err
                            })
                        }

                        else{

                            // let mailSubject = 'Mail Verification';
                            // const randomToken = randomString.generate();

                            // let content = '<p>Hii + '+req.body.name+', \ Please <a href="http://127.0.0.1:6000/mail-verification?token='+randomstring+'"/> Verify</p>';

                            // sendMail(req.body.email,mailSubject,content);

                            // db.query('UPDATE tbl_user SET token=? WHERE email=?', [randomToken, req.body.email], (err, result)=>{
                            //     if(err){
                            //         console.log(err)
                            //     }
                            // })
                            return res.status(201).send({
                                success: true,
                                message:"Users Created Successfully"
                            })
                        }
                    })
                }
            })
        }
    })
}


const verifyMail = (req, res)=>{
    var token = req.query.token;

    db.query('SELECT * FROM tbl_user WHERE token=? limit 1', token, function(error, result, fields){
        if(error){
            console.log(error.message)
        }

        if(result.length > 0){
            db.query(`UPDATE tbl_user SET token = null, is_verified = 1 WHERE id = '${result[0].id}`);
            return res.render('mail-verification', {message: 'Mail Verified Successfully'})

        }

        else{
            return res.render('404')
        }
    })
}


const login = (req, res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    db.query(`SELECT * FROM tbl_user WHERE email = ${db.escape(req.body.email)}`, (error, result) =>{
        if(error){
            return res.status(400).send({
                success: false,
                msg: error
            })
        }

        if(!result.length){
            return res.status(401).send({
                msg: 'Email or Password is incorrect'
            });
        }

        bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) =>{

            if(bErr){
                return res.status(400).send({
                    msg: bErr
                })
            }

            if(bResult){
                const token = jwt.sign({id:result[0]['id'], is_admin: result[0]['is_admin']}, JWT_SECRET, {expiresIn:'1h'});
 
                db.query(`UPDATE tbl_user SET last_login = now() WHERE id = ${result[0]['id']}`);

                return res.status(200).send({
                    success: true,
                    msg: 'Logged In',
                    token: token,
                    user: result[0]
                })
            }

            return res.status(401).send({
                msg: 'Email or Password is incorrect'
            })


        })
    })

}


const getUser = (req, res)=>{

    const authToken = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(authToken, JWT_SECRET);

    db.query('SELECT * FROM tbl_user WHERE id=?', decode.id, (error, result, fields)=>{
        if(error) throw error;
        return res.status(200).send({success: true, message:"Fetching Data Successfully", data: result[0]})
    })

}

module.exports = {register,verifyMail, login, getUser};