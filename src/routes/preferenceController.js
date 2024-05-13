const express = require("express");
const preferenceController = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/auth');

preferenceController.get('/preferences', verifyToken, (req, res) => {
    try {
        if(req.user) {
            const id = req.user.id;
            User.findById(id).then((user) => {
                return res.status(200).send({preferences: user.preferences});
            }).catch((err) => {
                return res.status(400).send(err);
            });
        } else {
            return res.status(401).json({ message: req.message });
        }
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

preferenceController.put('/preferences', verifyToken, (req, res) => {
    try {
        if(req.user) {
            User.findByIdAndUpdate(req.user.id, {preferences: req.body.preferences}) .then((user) => {
                return res.status(201).send({message: 'User preferences updated successfully'});
            }).catch((err) => {
                return res.status(400).send(err);
            });
        } else {
            return res.status(401).json({ message: req.message });
        }
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

module.exports = preferenceController;