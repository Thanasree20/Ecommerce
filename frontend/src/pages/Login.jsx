import { useState } from "react"

import axios from "axios"

import { Link } from "react-router-dom"

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await axios.post(
        "https://ecommerce-kcwm.onrender.com/api/auth/login",
        formData
      )

      if (res.data.token) {

        localStorage.setItem(
          "token",
          res.data.token
        )

        alert("Login Successful")

        window.location.replace("/")
      }
      else {

        alert(res.data.message)
      }

    } catch (error) {

      alert("Invalid Credentials")
    }
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">
       
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-96"
      >

        <div className="text-center mb-8">

  <h1 className="text-5xl font-bold mb-2 text-black">
    E-Commerce 
  </h1>

  <p className="text-gray-500 text-lg">
    Welcome Back
  </p>

</div>

<h2 className="text-3xl font-bold mb-8 text-center">
  Login
</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border w-full p-4 rounded-xl mb-5"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border w-full p-4 rounded-xl mb-5"
          onChange={handleChange}
        />

        <button className="bg-black text-white w-full py-4 rounded-xl">
          Login
        </button>

        <p className="text-center mt-5">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-500 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Login