const express = require('express');
const router = express.Router();
const { LoginController, RegisterController, LogoutController, VerifyController } = require('../controllers/AuthControllers');
const { LoginMiddleware } = require('../middlewares/AuthMiddleware');

router.post('/api/auth/login', LoginController);

router.post('/api/auth/register', RegisterController);

router.post('/api/auth/logout', LogoutController);

router.post('/api/auth/verify', LoginMiddleware, VerifyController);

module.exports = router;