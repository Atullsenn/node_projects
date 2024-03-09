const {check} = require('express-validator');

exports.signupValidation = [
    check('firstName', 'first name is required').not().isEmpty(),
    check('lastName', 'last name is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty().isEmail(),
    check('age', 'age is required').not().isEmpty().isNumeric(),
    check('city', "city is required").not().isEmpty(),
    check('state', 'state is required').not().isEmpty(),
    check('city', 'city is required').not().isEmpty(),
    check('image').custom((value, {req})=>{
        if(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
            return true;
        }

        else{
            return false;
        }
    }).withMessage('only jpeg and png images can upload')
]