import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../api/AxiosConfig";
import toast from "react-hot-toast";
import { ArrowLeft, Clock, Pencil, Trash2 } from "lucide-react";

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [formData, setFormData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`/recipes/${id}`);

                const data = res.data?.data || res.data;

                setRecipe(data);

                // convert arrays to string for editing
                setFormData({
                    ...data,
                    ingredients: data.ingredients?.join(", "),
                    steps: data.steps?.join(", ")
                });

            } catch (err) {
                console.error(err);
                toast.error("Recipe not found");
                navigate("/recipes");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        try {

            const payload = {
                ...formData,
                ingredients: formData.ingredients
                    .split(",")
                    .map(i => i.trim()),

                steps: formData.steps
                    .split(",")
                    .map(s => s.trim()),

                cookingTime: Number(formData.cookingTime)
            };

            const res = await axios.patch(`/recipes/${id}`, payload);

            const updated = res.data?.data || res.data;

            // update UI
            setRecipe(updated);

            // convert arrays again for edit textarea
            setFormData({
                ...updated,
                ingredients: updated.ingredients?.join(", "),
                steps: updated.steps?.join(", ")
            });

            setEditMode(false);

            toast.success("Recipe updated");

        } catch (err) {
            console.error(err);
            toast.error("Update failed");
        }
    };

    const deleteRecipe = async () => {
        try {
            await axios.delete(`/recipes/${id}`);
            toast.success("Recipe deleted");
            navigate("/recipes");
        } catch {
            toast.error("Failed to delete recipe");
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-500">
                Loading recipe...
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="text-center py-20 text-gray-500">
                Recipe not found
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* BACK */}

            <Link
                to="/recipes"
                className="flex items-center gap-2 text-gray-500 mb-6"
            >
                <ArrowLeft size={16} />
                Back to Recipes
            </Link>

            {/* IMAGE */}

            <div className="rounded-xl overflow-hidden border mb-6">
                <img
                    src={recipe?.image || "https://placehold.co/800x400"}
                    alt={recipe?.title}
                    className="w-full h-80 object-cover"
                />
            </div>

            {/* TITLE */}

            <div className="bg-white border rounded-xl p-6 mb-6">

                {editMode ? (

                    <>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="border p-2 w-full mb-3 rounded"
                        />

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                    </>

                ) : (

                    <>
                        <h1 className="text-2xl font-bold mb-2">
                            {recipe?.title}
                        </h1>

                        <p className="text-gray-500 mb-4">
                            {recipe?.description}
                        </p>
                    </>

                )}

                <div className="flex gap-4 text-sm text-gray-500 mt-4">

                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {recipe?.cookingTime} min
                    </div>

                    <div className="px-2 py-1 bg-green-100 text-green-600 rounded-full">
                        {recipe?.type}
                    </div>

                    <div className="px-2 py-1 bg-gray-100 rounded-full">
                        {recipe?.course}
                    </div>

                </div>

            </div>

            {/* INGREDIENTS + STEPS */}

            <div className="grid md:grid-cols-2 gap-6">

                {/* INGREDIENTS */}

                <div className="bg-white border rounded-xl p-6">
                    <h2 className="font-semibold mb-4">
                        Ingredients
                    </h2>

                    {editMode ? (

                        <textarea
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                            className="border w-full p-2 rounded"
                        />

                    ) : (

                        <ul className="space-y-2 text-gray-600">
                            {recipe?.ingredients?.map((ing, index) => (
                                <li key={index} className="flex gap-2">
                                    <span className="text-orange-500">•</span>
                                    {ing}
                                </li>
                            ))}
                        </ul>

                    )}
                </div>

                {/* STEPS */}

                <div className="bg-white border rounded-xl p-6">
                    <h2 className="font-semibold mb-4">
                        Steps
                    </h2>

                    {editMode ? (

                        <textarea
                            name="steps"
                            value={formData.steps}
                            onChange={handleChange}
                            className="border w-full p-2 rounded"
                        />

                    ) : recipe?.steps?.length > 0 ? (

                        <ol className="space-y-3 text-gray-600">
                            {recipe.steps.map((step, index) => (
                                <li key={index} className="flex gap-3">
                                    <span className="bg-orange-100 text-orange-600 w-6 h-6 flex items-center justify-center rounded-full text-sm">
                                        {index + 1}
                                    </span>
                                    {step}
                                </li>
                            ))}
                        </ol>

                    ) : (
                        <p className="text-gray-400">
                            No steps provided
                        </p>
                    )}
                </div>

            </div>

            {/* ACTION BUTTONS */}

            <div className="flex gap-4 mt-6">

                {editMode ? (

                    <>
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setEditMode(false)}
                            className="px-4 py-2 bg-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                    </>

                ) : (

                    <>
                        <button
                            onClick={() => setEditMode(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg"
                        >
                            <Pencil size={16} />
                            Edit
                        </button>

                        <button
                            onClick={deleteRecipe}
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>
                    </>

                )}

            </div>

        </div>
    );
};

export default RecipeDetails;