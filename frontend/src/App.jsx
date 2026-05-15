import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"

function App() {

  const token = localStorage.getItem("token")

  const cart =
    JSON.parse(localStorage.getItem("cart")) || []

  return (

    <BrowserRouter>

      {/* Navbar ONLY after login */}

      {token && (

        <nav className="bg-black text-white p-5 flex justify-between items-center">

          <Link
            to="/"
            className="text-3xl font-bold"
          >
            ShopHub
          </Link>

          <div className="flex gap-6 text-lg">

            <Link to="/">
              Home
            </Link>

            <Link to="/cart">
              Cart ({cart.length})
            </Link>

          </div>

        </nav>
      )}

      <Routes>

        {/* Default Route */}

        <Route
          path="/"
          element={
            token
              ? <Home />
              : <Navigate to="/login" />
          }
        />

        {/* Login */}

        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/" />
              : <Login />
          }
        />

        {/* Register */}

        <Route
          path="/register"
          element={
            token
              ? <Navigate to="/" />
              : <Register />
          }
        />

        {/* Cart */}

        <Route
          path="/cart"
          element={
            token
              ? <Cart />
              : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App