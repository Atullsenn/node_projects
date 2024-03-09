const express = require('express');
const route = express.Router();
const {signupValidation} = require('../helpers/validation');
const {upload} = require('../middlewares/upload');


//import conroller

const userController = require('../controllers/User.controller');

route.post('/create-user', upload.single('image'), signupValidation, userController.createUser);
route.post('/get-user-by-id', userController.findUserbyId);
route.post('/update-user', upload.single('image'), userController.updateUser);
route.get('/get-all-user', userController.getAllUser);

module.exports = route;