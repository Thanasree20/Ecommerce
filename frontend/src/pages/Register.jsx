import { useState } from "react"

import axios from "axios"

import { useNavigate, Link } from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
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

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      )

      alert("Registration Successful")

      navigate("/login")

    } catch (error) {

      alert("Registration Failed")
    }
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-96"
      >

        <h1 className="text-4xl font-bold mb-8 text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border w-full p-4 rounded-xl mb-5"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-4 rounded-xl mb-5"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-4 rounded-xl mb-5"
          onChange={handleChange}
        />

        <button className="bg-black text-white w-full py-4 rounded-xl">
          Register
        </button>

        <p className="text-center mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Register