import 'dotenv/config.js';
import express from 'express';
import recipeRoutes from './routes/recipe.routes.js';
import connectDB from './config/db.js';
import cors from 'cors';

connectDB();
const app = express();
app.use(express.json());

app.use(cors());

app.use('/', recipeRoutes);

export default app;