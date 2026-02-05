const path = require('path');

// @desc    Renderizar página de login
// @route   GET /login
// @access  Public
const getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
};

// @desc    Renderizar página de registro
// @route   GET /register
// @access  Public
const getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
};

// @desc    Renderizar página principal (home)
// @route   GET /
// @access  Public
const getHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
};

module.exports = {
    getLoginPage,
    getRegisterPage,
    getHomePage
};
