const express = require('express');
const recipeModel = require('../models/recipe.model');
const multer = require('multer');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async (req, res) => {
    await recipeModel.find().then((recipes) => {
        res.json(recipes);
    }).catch((err) => {
        console.error('Error fetching recipes', err);
        res.status(500).json({ error: 'Internal server error' });
    });
});

router.get('/recipes/:id', async (req, res) => {
    await recipeModel.findOne({ _id: req.params.id }).then((recipe) => {
        res.json(recipe);
    }).catch((err) => {
        console.error('Error fetching recipes', err);
        res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/recipes', upload.array('image', 'type', 'meal', 'course'), async (req, res) => {
    const { title, description, ingredients, steps, type, meal, course, cookingTime, image } = req.body;

    const recipe = await recipeModel({
        title,
        description,
        ingredients: Array.isArray(ingredients)
            ? ingredients
            : ingredients.split(",").map((i) => i.trim()),

        steps: Array.isArray(steps)
            ? steps
            : steps.split(",").map((s) => s.trim()),
        type,
        meal,
        course,
        cookingTime,
        image
    });

    recipe.save().then((savedRecipe) => {
        res.status(201).json(savedRecipe);
    }).catch((err) => {
        console.error('Error saving recipe', err);
        res.status(500).json({ error: 'Internal server error' });
    });
});

router.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;

    await recipeModel.findOneAndDelete({ _id: id }).then((deletedRecipe) => {
        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted successfully' });
    }).catch((err) => {
        console.error('Error deleting recipe', err);
        res.status(500).json({ error: 'Internal server error' });
    });
});

router.patch('/recipes/:id', upload.array('image', 'type', 'meal', 'course'), async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    await recipeModel.findByIdAndUpdate({ _id: id }, updateData, { new: true }).then((updatedRecipe) => {
        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        message: 'Recipe updated successfully';
        res.json(updatedRecipe);
    }).catch((err) => {
        console.error('Error updating recipe', err);
        res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;