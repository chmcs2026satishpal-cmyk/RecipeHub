import recipeModel from '../models/recipe.model.js';

// Get all recipes
export const getAllRecipes = async (req, res) => {
    await recipeModel.find().then((recipes) => {
        res.json(recipes);
    }).catch((err) => {
        console.error('Error fetching recipes', err);
        res.status(500).json({ error: 'Internal server error' });
    });
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
    await recipeModel.findOne({ _id: req.params.id }).then((recipe) => {
        res.json(recipe);
    }).catch((err) => {
        console.error('Error fetching recipes', err);
        res.status(500).json({ error: 'Internal server error' });
    });
};

// Create a new recipe
export const createRecipe = async (req, res) => {
    const { title, description, ingredients, steps, type, meal, course, cookingTime, difficulty, image } = req.body;

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
        difficulty,
        image
    });

    recipe.save().then((savedRecipe) => {
        res.status(201).json(savedRecipe);
    }).catch((err) => {
        console.error('Error saving recipe', err);
        res.status(500).json({ error: 'Internal server error' });
    });
};

// Delete a recipe
export const deleteRecipe = async (req, res) => {
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
};

// Update a recipe
export const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedRecipe = await recipeModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(updatedRecipe);
    } catch (err) {
        console.error('Error updating recipe', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
