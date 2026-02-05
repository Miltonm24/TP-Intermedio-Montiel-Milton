const express = require('express');
const router = express.Router();
const {
    getLoginPage,
    getRegisterPage,
    getHomePage
} = require('../controllers/viewController');

// Rutas de vistas
router.get('/', getHomePage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);

module.exports = router;
