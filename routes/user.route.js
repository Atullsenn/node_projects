const express = require('express');
const router = express.Router();
const {Createuser, createPost, getUserDataById, updateUser} = require('../controllers/user.controller');
const {createUserValidation, createPostValidation, updateUserValidation} = require('../helpers/validation');


router.post('/create_user',createUserValidation, Createuser)
router.post('/create_post', createPostValidation, createPost )
router.get('/get_user_by_id/:userId', getUserDataById);
router.post('/user_update', updateUserValidation, updateUser);

module.exports = router;