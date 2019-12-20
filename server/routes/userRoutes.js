const express = require('express');

var router = express.Router();

//import verifications (middleware)
const checkAuth = require('../middlewares/checkAuth');

//import controllers
const loginController = require('../controllers/user/loginController');
const signupController  = require('../controllers/user/signupController');
const imageController  = require('../controllers/user/imageController');

router.post('/login', loginController);

router.post('/signup', signupController);

router.post('/images', checkAuth, imageController);

module.exports = router;