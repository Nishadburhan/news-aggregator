require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const userController = require('./src/routes/userController');
const preferenceController = require('./src/routes/preferenceController');
const newsController = require('./src/routes/newsController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', userController);
app.use('/api', preferenceController);
app.use('/api', newsController);

app.get('/', (req, res) => {
    res.send("Welcome To news aggregator API")
});

try {
    mongoose.connect(process.env.DB_URL);
} catch (error) {
    console.error('Error occurred while trying to connect to database', error);
}
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;