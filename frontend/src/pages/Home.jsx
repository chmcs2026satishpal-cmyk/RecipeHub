import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/AxiosConfig";
import { Loader2, ArrowRight } from "lucide-react";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecipes = async () => {
        try {
            const res = await axios.get("/");
            setRecipes(res.data.data || res.data);
        } catch (error) {
            console.error("Error fetching recipes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const latestRecipes = recipes.slice(0, 3);

    return (
        <div>

            {/* HERO SECTION */}
            <section className="bg-[#e7ded2] py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                        Cook Something{" "}
                        <span className="text-orange-500">Delicious</span> Today
                    </h1>

                    <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
                        Your personal recipe collection — browse, create, and share
                        your favorite meals.
                    </p>
                </div>
            </section>

            {/* LATEST RECIPES */}
            <section className="max-w-6xl mx-auto px-6 py-12">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Latest Recipes
                    </h2>

                    <Link
                        to="/recipes"
                        className="flex items-center gap-1 text-orange-500 font-semibold text-sm"
                    >
                        View All
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="animate-spin text-orange-500" />
                    </div>
                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {latestRecipes.map((recipe) => (
                            <Link
                                key={recipe._id}
                                to={`/recipes/${recipe._id}`}
                                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
                            >
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="h-44 w-full object-cover"
                                />

                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900">
                                        {recipe.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                        {recipe.description}
                                    </p>

                                    <div className="mt-3 text-xs text-orange-500 font-semibold">
                                        {recipe.category}
                                    </div>
                                </div>

                            </Link>
                        ))}

                    </div>

                )}
            </section>

        </div>
    );
};

export default Home;