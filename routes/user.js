const express = require('express');
const userRouter = express.Router();
const { register } = require('../controller/register');
const { login } = require('../controller/login');
const { logout } = require('../controller/logout.js');
const { auth } = require('../controller/auth');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', auth, logout);
userRouter.post('/auth', auth, (req, res) => {
    res.status(200).json({
        _id:req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email
    });
})

module.exports = userRouter;