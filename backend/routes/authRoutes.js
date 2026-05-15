const router = require("express").Router()

const fs = require("fs")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {

  const { name, email, password } = req.body

  const users = JSON.parse(
    fs.readFileSync("./data/users.json")
  )

  const existingUser = users.find(
    (user) => user.email === email
  )

  if (existingUser) {

    return res.json({
      message: "User Already Exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    role: "user"
  }

  users.push(newUser)

  fs.writeFileSync(
    "./data/users.json",
    JSON.stringify(users, null, 2)
  )

  res.json({
    message: "User Registered"
  })
})

router.post("/login", async (req, res) => {

  const { email, password } = req.body

  const users = JSON.parse(
    fs.readFileSync("./data/users.json")
  )

  const user = users.find(
    (u) => u.email === email
  )

  if (!user) {

    return res.json({
      message: "User Not Found"
    })
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  )

  if (!isMatch) {

    return res.json({
      message: "Invalid Password"
    })
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    "secretkey"
  )

  res.json({
    token,
    user
  })
})

module.exports = router