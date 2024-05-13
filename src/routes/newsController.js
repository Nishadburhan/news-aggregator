const express = require("express");
const newsController = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/auth');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

newsController.get('/news', verifyToken, async (req, res) => {
    try {
        if(req.user) {
            const userPreferences = await User.findById(req.user.id);
            const articles = await newsapi.v2.topHeadlines({
                category:`${userPreferences.preferences.join(',')}`,
                language: 'en',
            });
            return res.status(200).send(articles);
        } else {
            return res.status(401).json({ message: req.message });
        }
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
});

module.exports = newsController;