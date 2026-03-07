require('dotenv').config();
const express = require('express');
const recipeRoutes = require('./routes/recipe.routes');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();
const app = express();
app.use(express.json());

app.use(cors());

app.use('/', recipeRoutes);
app.use('/recipes', recipeRoutes);
app.use('/recipes/:id', recipeRoutes);
app.use('/recipes/:id', recipeRoutes);


module.exports = app;