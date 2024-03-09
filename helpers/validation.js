const {check} = require('express-validator');


exports.createUserValidation = [
    check('firstName', 'first name is required').not().isEmpty(),
    check('lastName', 'last name is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('email', 'please provide valid email').isEmail(),
    check('age', 'age is required').not().isEmpty(),
]



exports.createPostValidation = [
    check('userId', 'user id is required').not().isEmpty(),
    check('postName', 'postname is required').not().isEmpty(),
    check('postDescription', 'post description is required').not().isEmpty()
]



exports.updateUserValidation = [
    check('userId', 'please provide user id').not().isEmpty(),
    check('firstName', 'please provide first name').not().isEmpty(),
    check('lastName', 'please provide last name').not().isEmpty(),
    check('email', 'please provide email').not().isEmpty(),
    check('age', 'please provide age').not().isEmpty(),
    check('mobile', 'please provide mobile number').not().isEmpty()
]