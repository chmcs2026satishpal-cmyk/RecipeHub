import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import CreateRecipe from './pages/CreateRecipe'
import RecipeDetails from './pages/RecipeDetails'

const App = () => {
  return (
    <>
    <Nav />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/create-recipe" element={<CreateRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
    </Routes>
    </>
  )
}

export default App