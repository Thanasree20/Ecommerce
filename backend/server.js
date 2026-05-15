const express = require("express")
const cors = require("cors")

const app = express()

// Middleware

app.use(cors())
app.use(express.json())

// Routes

app.use(
  "/api/auth",
  require("./routes/authRoutes")
)

app.use(
  "/api/products",
  require("./routes/productRoutes")
)

app.use(
  "/api/orders",
  require("./routes/orderRoutes")
)

// Port

const PORT = process.env.PORT || 5000

// Server

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`)
})