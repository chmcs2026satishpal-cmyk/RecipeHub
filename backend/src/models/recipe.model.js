const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    ingredients: [
      {
        type: String,
        required: true,
      },
    ],

    steps: [
      {
        type: String,
        required: true,
      },
    ],

    type: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      required: true,
    },

    meal: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
      required: true,
    },

    course: {
      type: String,
      enum: [
        "Main Course",
        "Side",
        "Desserts",
        "Soup",
        "Salad",
        "Beverages",
        "Snacks",
      ],
      required: true,
    },

    cookingTime: {
      type: Number, // minutes
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;