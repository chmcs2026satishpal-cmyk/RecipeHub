import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../lib/AxiosConfig";
import toast from "react-hot-toast";
import { ArrowLeft, PlusCircle } from "lucide-react";

const CreateRecipe = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const imagePreview = watch("image");

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                ingredients: data.ingredients.split(",").map((i) => i.trim()),
                steps: data.steps
                    ? data.steps.split(",").map((s) => s.trim())
                    : [],
                cookingTime: Number(data.cookingTime),
            };

            await axios.post("/recipes", payload);

            toast.success("Recipe created successfully!");
            navigate("/recipes");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to create recipe");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-8">

            {/* BACK BUTTON */}

            <button
                onClick={() => navigate("/recipes")}
                className="flex items-center gap-2 text-gray-500 mb-6"
            >
                <ArrowLeft size={16} />
                Back to Recipes
            </button>

            <h1 className="text-2xl font-bold mb-2">Create Recipe</h1>
            <p className="text-gray-500 mb-6">
                Share your delicious recipe with everyone
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white border rounded-xl p-6 space-y-6"
            >

                {/* TITLE */}

                <div>
                    <label className="font-medium">Recipe Title *</label>

                    <input
                        {...register("title", { required: "Title is required" })}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        placeholder="Spaghetti Carbonara"
                    />

                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>

                {/* DESCRIPTION */}

                <div>
                    <label className="font-medium">Description *</label>

                    <textarea
                        {...register("description", { required: "Description is required" })}
                        rows="3"
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        placeholder="Short description..."
                    />

                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* INGREDIENTS */}

                <div>
                    <label className="font-medium">Ingredients *</label>

                    <input
                        {...register("ingredients", { required: "Ingredients required" })}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        placeholder="Eggs, Pasta, Bacon"
                    />
                </div>

                {/* STEPS */}

                <div>
                    <label className="font-medium">Steps</label>

                    <textarea
                        {...register("steps")}
                        rows="3"
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        placeholder="Boil pasta, Fry bacon..."
                    />
                </div>

                {/* DIFFICULTY LEVEL */}

                <div>
                    <label className="font-medium">Difficulty Level *</label>

                    <select
                        {...register("difficulty", { required: "Difficulty level is required" })}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                    >
                        <option value="">Select difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    {errors.difficulty && (
                        <p className="text-red-500 text-sm">{errors.difficulty.message}</p>
                    )}
                </div>

                {/* MEAL */}

                <div>
                    <label className="font-medium">Meal *</label>

                    <select
                        {...register("meal", { required: true })}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                    >
                        <option value="">Select meal</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>

                    {errors.meal && (
                        <p className="text-red-500 text-sm">Meal is required</p>
                    )}
                </div>

                {/* COURSE */}

                <div>
                    <label className="font-medium">Course *</label>

                    <select
                        {...register("course", { required: true })}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                    >
                        <option value="">Select course</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Side">Side</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Soup">Soup</option>
                        <option value="Salad">Salad</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Snacks">Snacks</option>
                    </select>
                </div>

                {/* TYPE */}

                <div>
                    <label className="font-medium">Type *</label>

                    <select
                        {...register("type")}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                    >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                    </select>
                </div>

                {/* COOKING TIME */}

                <div>
                    <label className="font-medium">Cooking Time (mins) *</label>

                    <input
                        type="number"
                        {...register("cookingTime", { required: true })}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        placeholder="30"
                    />
                </div>

                {/* IMAGE */}

                <div>
                    <label className="font-medium">Image URL</label>

                    <input
                        {...register("image")}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                        placeholder="https://image-url"
                    />

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="mt-3 h-32 w-full object-cover rounded-lg"
                        />
                    )}
                </div>

                {/* SUBMIT */}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                >
                    <PlusCircle size={18} />
                    {isSubmitting ? "Creating..." : "Create Recipe"}
                </button>
            </form>
        </div>
    );
};

export default CreateRecipe;