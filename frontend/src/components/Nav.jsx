import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChefHat, PlusCircle } from "lucide-react";

const Nav = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-2 font-bold text-lg text-orange-500"
                    >
                        <ChefHat size={22} />
                        RecipeHub
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink
                            to="/"
                            className="text-sm font-medium text-gray-600 hover:text-orange-500"
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/recipes"
                            className="text-sm font-medium text-gray-600 hover:text-orange-500"
                        >
                            Recipes
                        </NavLink>

                        <NavLink
                            to="/recipes/create-recipe"
                            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                        >
                            <PlusCircle size={16} />
                            Create
                        </NavLink>
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-gray-700"
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="flex flex-col px-6 py-4 gap-4">

                        <NavLink
                            to="/"
                            onClick={() => setOpen(false)}
                            className="text-gray-700 font-medium"
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/recipes"
                            onClick={() => setOpen(false)}
                            className="text-gray-700 font-medium"
                        >
                            Recipes
                        </NavLink>

                        <NavLink
                            to="/recipes/create"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 text-orange-500 font-semibold"
                        >
                            <PlusCircle size={16} />
                            Create Recipe
                        </NavLink>

                    </div>
                </div>
            )}
        </nav>
    );
};

export default Nav;