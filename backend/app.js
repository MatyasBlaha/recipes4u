const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./src/domains/user/route/authRoutes')
const generalRoutes = require('./src/endpoints/route/generalRoutes')
const recipeRoutes = require('./src/domains/recipe/Routes/recipeRoutes')

const dbConnect = require('./database/dbConnect');
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '20mb' }));

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));




app.use('/api', authRoutes)
app.use('/api', generalRoutes)
app.use('/api', recipeRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Hey! This is your server response!' });
});


module.exports = app;
