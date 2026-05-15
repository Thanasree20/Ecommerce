const router = require("express").Router()

const fs = require("fs")

router.get("/", (req, res) => {

  const products = JSON.parse(
    fs.readFileSync("./data/products.json")
  )

  res.json(products)
})

router.post("/", (req, res) => {

  const products = JSON.parse(
    fs.readFileSync("./data/products.json")
  )

  const newProduct = {
    id: Date.now(),
    ...req.body
  }

  products.push(newProduct)

  fs.writeFileSync(
    "./data/products.json",
    JSON.stringify(products, null, 2)
  )

  res.json({
    message: "Product Added"
  })
})

module.exports = router