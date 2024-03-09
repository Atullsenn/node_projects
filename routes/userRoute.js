const express = require('express');
const router = express.Router();
const {signUpValidation, loginValidation} = require('../helpers/validation');
const uploadImage = require('../helpers/imageUpload');
const auth = require('../middlewares/auth');

const userController = require('../controllers/userController')

router.post('/register', uploadImage('image'), signUpValidation, userController.register);
router.post('/login',loginValidation, userController.login);
router.get('/get-user', auth.isAuthorize, userController.getUser);


module.exports = router;