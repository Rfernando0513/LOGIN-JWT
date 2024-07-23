const express = require('express');
const router = express.Router();
const { login, loginPrivate } = require('../Controllers/loginController')
const checkToken = require('../Middleware/token')


router.post('/login', login);
router.get('/user/:id', checkToken, loginPrivate);


module.exports = router;