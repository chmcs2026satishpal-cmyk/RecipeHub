import { useEffect, useState, useMemo } from "react";
import axios from "../api/AxiosConfig";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const filterBtn =
    "px-4 py-2 text-sm rounded-full border border-gray-200 hover:bg-orange-50 hover:border-orange-300";

const activeFilterBtn =
    "px-4 py-2 text-sm rounded-full border border-orange-500 bg-orange-100 text-orange-600";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [meal, setMeal] = useState("");
    const [course, setCourse] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get("/recipes");
                setRecipes(res.data.data || res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    /* FILTER LOGIC */

    const filteredRecipes = useMemo(() => {
        return recipes.filter((recipe) => {
            if (search && !recipe.title.toLowerCase().includes(search.toLowerCase()))
                return false;

            if (type && recipe.type !== type) return false;
            if (meal && recipe.meal !== meal) return false;
            if (course && recipe.course !== course) return false;

            if (time === "lt15" && recipe.cookingTime >= 15) return false;
            if (time === "15to45" && (recipe.cookingTime < 15 || recipe.cookingTime > 45))
                return false;
            if (time === "gt45" && recipe.cookingTime <= 45) return false;

            return true;
        });
    }, [recipes, search, type, meal, course, time]);

    const clearFilters = () => {
        setSearch("");
        setType("");
        setMeal("");
        setCourse("");
        setTime("");
    };

    const formatDateTime = (date) => {
        const d = new Date(date);

        const datePart = d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

        const timePart = d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

        return `${datePart} • ${timePart}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* TITLE */}

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Recipes
            </h1>

            <p className="text-gray-500 mb-8">
                Browse delicious recipes or create your own.
            </p>

            {/* SEARCH */}

            <div className="relative max-w-xl mb-10">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200"
                />
            </div>

            {/* FILTERS */}

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10 space-y-6">

                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-500">
                        Filters
                    </p>

                    <button
                        onClick={clearFilters}
                        className="text-sm text-orange-500 font-medium"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* TYPE */}

                <div>
                    <p className="text-xs font-semibold text-gray-500 mb-3">TYPE</p>

                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => setType("")}
                            className={type === "" ? activeFilterBtn : filterBtn}>All</button>

                        <button onClick={() => setType("Veg")}
                            className={type === "Veg" ? activeFilterBtn : filterBtn}>Veg</button>

                        <button onClick={() => setType("Non-Veg")}
                            className={type === "Non-Veg" ? activeFilterBtn : filterBtn}>Non-Veg</button>
                    </div>
                </div>

                {/* MEAL */}

                <div>
                    <p className="text-xs font-semibold text-gray-500 mb-3">MEAL</p>

                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => setMeal("")}
                            className={meal === "" ? activeFilterBtn : filterBtn}>All</button>

                        <button onClick={() => setMeal("Breakfast")}
                            className={meal === "Breakfast" ? activeFilterBtn : filterBtn}>Breakfast</button>

                        <button onClick={() => setMeal("Lunch")}
                            className={meal === "Lunch" ? activeFilterBtn : filterBtn}>Lunch</button>

                        <button onClick={() => setMeal("Dinner")}
                            className={meal === "Dinner" ? activeFilterBtn : filterBtn}>Dinner</button>
                    </div>
                </div>

                {/* COURSE */}

                <div>
                    <p className="text-xs font-semibold text-gray-500 mb-3">COURSE</p>

                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => setCourse("")}
                            className={course === "" ? activeFilterBtn : filterBtn}>All</button>

                        <button onClick={() => setCourse("Main Course")}
                            className={course === "Main Course" ? activeFilterBtn : filterBtn}>Main</button>

                        <button onClick={() => setCourse("Side")}
                            className={course === "Side" ? activeFilterBtn : filterBtn}>Side</button>

                        <button onClick={() => setCourse("Desserts")}
                            className={course === "Desserts" ? activeFilterBtn : filterBtn}>Dessert</button>

                        <button onClick={() => setCourse("Soup")}
                            className={course === "Soup" ? activeFilterBtn : filterBtn}>Soup</button>

                        <button onClick={() => setCourse("Salad")}
                            className={course === "Salad" ? activeFilterBtn : filterBtn}>Salad</button>

                        <button onClick={() => setCourse("Snacks")}
                            className={course === "Snacks" ? activeFilterBtn : filterBtn}>Snacks</button>
                    </div>
                </div>

                {/* TIME */}

                <div>
                    <p className="text-xs font-semibold text-gray-500 mb-3">
                        COOKING TIME
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => setTime("")}
                            className={time === "" ? activeFilterBtn : filterBtn}>All</button>

                        <button onClick={() => setTime("lt15")}
                            className={time === "lt15" ? activeFilterBtn : filterBtn}>&lt; 15m</button>

                        <button onClick={() => setTime("15to45")}
                            className={time === "15to45" ? activeFilterBtn : filterBtn}>15–45m</button>

                        <button onClick={() => setTime("gt45")}
                            className={time === "gt45" ? activeFilterBtn : filterBtn}>&gt; 45m</button>
                    </div>
                </div>

            </div>

            {/* RESULT COUNT */}

            <p className="text-sm text-gray-500 mb-6">
                {filteredRecipes.length} recipes found
            </p>

            {/* LOADING */}

            {loading ? (
                <p className="text-center py-20 text-gray-500">
                    Loading recipes...
                </p>
            ) : filteredRecipes.length === 0 ? (

                <div className="text-center py-20">

                    <div className="text-4xl mb-4">🍳</div>

                    <h2 className="text-xl font-semibold">
                        No recipes found
                    </h2>

                    <Link
                        to="/create"
                        className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600"
                    >
                        Create Recipe
                    </Link>

                </div>

            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredRecipes.map((recipe) => (
                        <Link
                            key={recipe._id}
                            to={`/recipes/${recipe._id}`}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition"
                        >

                            <img
                                src={recipe.image || "https://placehold.co/600x400"}
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

                                <div className="flex justify-between text-xs text-gray-400 mt-3">
                                    <span>{recipe.course}</span>
                                    <span>{recipe.cookingTime} min</span>
                                </div>

                                <div className="flex justify-between text-xs text-gray-400 mt-3">
                                    <span>C_AT : {formatDateTime(recipe.createdAt)}</span>
                                    <span>U_AT : {formatDateTime(recipe.updatedAt)}</span>
                                </div>

                            </div>

                        </Link>
                    ))}

                </div>

            )}

        </div>
    );
};

export default Recipes;