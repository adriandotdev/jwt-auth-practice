const express = require('express');
const router = express.Router();
const { LoginController, RegisterController, LogoutController } = require('../controllers/AuthControllers');

router.post('/api/auth/login', LoginController);

router.post('/api/auth/register', RegisterController);

router.post('/api/auth/logout', LogoutController);

module.exports = router;