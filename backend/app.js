const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./src/domains/user/route/authRoutes')
const generalRoutes = require('./src/endpoints/route/generalRoutes')
const recipeRoutes = require('./src/domains/recipe/route/recipeRoutes')

const dbConnect = require('./database/dbConnect');
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(cookieParser());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api', authRoutes)
app.use('/api', generalRoutes)
app.use('/api', recipeRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Hey! This is your server response!' });
});


module.exports = app;
