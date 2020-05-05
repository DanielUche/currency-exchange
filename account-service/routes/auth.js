const express = require('express');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();
router.post('/facebook-strategy', AuthController.facebookStrategy);
router.post('/local-strategy-login', AuthController.localStrategySignin);
router.post('/local-strategy-register', AuthController.localStrategySignup);


module.exports = router;
