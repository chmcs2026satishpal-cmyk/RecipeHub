# Recipe Hub

A full-stack recipe application built with React and Node.js, allowing users to browse, create, and view recipe details.

## Features

- 📱 **Browse Recipes** - View all available recipes
- ➕ **Create Recipes** - Add new recipes with details
- 🔍 **Recipe Details** - View detailed information about each recipe
- 🎨 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔒 **CORS Enabled** - Secure cross-origin requests
- 📤 **File Uploads** - Support for recipe images via Multer

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications

## Project Structure

```
TeraProjectBanGaya/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   └── recipe.controller.js
│   │   ├── models/
│   │   │   └── recipe.model.js
│   │   └── routes/
│   │       └── recipe.routes.js
│   ├── server.js                  # Entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx                # Main component
    │   ├── components/
    │   │   └── Nav.jsx            # Navigation component
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Recipes.jsx
    │   │   ├── CreateRecipe.jsx
    │   │   └── RecipeDetails.jsx
    │   ├── lib/
    │   │   └── AxiosConfig.jsx    # Axios configuration
    │   └── main.jsx               # React entry point
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

## Running the Project

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend application will start on `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Available Routes

### Frontend Pages
- `/` - Home page
- `/recipes` - Browse all recipes
- `/recipes/create-recipe` - Create a new recipe
- `/recipes/:id` - View recipe details

### Backend API Endpoints
Refer to [backend API documentation] or check `src/routes/recipe.routes.js` for available endpoints.

## Environment Variables

### Backend (.env)
```
MONGO_URI      - MongoDB connection string
PORT           - Server port 
FRONTEND_URL   - Frontend URL for CORS
```

### Frontend (.env)
```
VITE_API_URL   - Backend API base URL
```

## Scripts

### Backend
- `npm start` - Start server
- `npm run dev` - Start server in development mode

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment

The backend is configured to work with deployment platforms like Render.com (as indicated by CORS settings).

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC

---

