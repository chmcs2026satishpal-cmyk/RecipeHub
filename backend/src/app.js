import 'dotenv/config.js';
import express from 'express';
import recipeRoutes from './routes/recipe.routes.js';
import connectDB from './config/db.js';
import cors from 'cors';

connectDB();
const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:5174',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:5174',
            'https://recipehubapi.onrender.com',
            process.env.FRONTEND_URL
        ];

        // Allow requests with no origin (like mobile apps, Postman, curl)
        if (!origin) return callback(null, true);
        
        // Allow if origin is in allowedOrigins or from render.com domain
        if (allowedOrigins.includes(origin) || origin.includes('onrender.com')) {
            callback(null, true);
        } else {
            callback(null, true); // Allow for development, restrict in production if needed
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/', recipeRoutes);

export default app;