import express from 'express';
import multer from 'multer';
import {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    deleteRecipe,
    updateRecipe
} from '../controllers/recipe.controller.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Get all recipes
router.get('/', getAllRecipes);

// Get all recipes (alias for /recipes endpoint)
router.get('/recipes', getAllRecipes);

// Get recipe by ID
router.get('/recipes/:id', getRecipeById);

// Create a new recipe
router.post('/recipes', upload.array('image', 'type', 'meal', 'course'), createRecipe);

// Delete a recipe
router.delete('/recipes/:id', deleteRecipe);

// Update a recipe
router.put('/recipes/:id', upload.array('image', 'type', 'meal', 'course'), updateRecipe);

export default router;