import { useEffect, useState } from "react"

import axios from "axios"

import { motion } from "framer-motion"

import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  useEffect(() => {

    axios
      .get("https://ecommerce-kcwm.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data)
      })

  }, [])

  const logout = () => {

  localStorage.removeItem("token")

  localStorage.removeItem("cart")

  window.location.replace("/login")
}

  const addToCart = (product) => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || []

    existingCart.push(product)

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    )

    alert("Added To Cart")

    window.location.reload()
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold">
          Premium Store
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {products.map((product) => (

          <motion.div
            whileHover={{ scale: 1.05 }}
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            <img
              src={product.image}
              alt=""
              className="h-64 w-full object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold mb-2">
                {product.name}
              </h2>

              <p className="text-gray-500 mb-3">
                {product.category}
              </p>

              <h3 className="text-3xl font-bold mb-4">
                ₹ {product.price}
              </h3>

              <button
                onClick={() => addToCart(product)}
                className="bg-black text-white px-5 py-3 rounded-xl w-full"
              >
                Add To Cart
              </button>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  )
}

export default Home