const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userRoute.post('/signup', (req, res) => {
    try {
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
    
        user.save().then(() => {
            res.status(201).json({message: 'User registered successfully'});
        }).catch(err => {
            res.status(400).send(err);
        });
    } catch (error) {
        console.error('Error occured while signup the user', error);
        res.status(500).send(error);
    }
});

module.exports = userRoute;