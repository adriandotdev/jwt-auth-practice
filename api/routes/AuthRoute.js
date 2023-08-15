const express = require('express');
const router = express.Router();
const { LoginController, RegisterController } = require('../controllers/AuthControllers');

router.post('/api/auth/login', LoginController);

router.post('/api/auth/register', RegisterController);

module.exports = router;