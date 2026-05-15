const router = require("express").Router()

const fs = require("fs")

router.post("/", (req, res) => {

  const orders = JSON.parse(
    fs.readFileSync("./data/orders.json")
  )

  const newOrder = {
    id: Date.now(),
    ...req.body
  }

  orders.push(newOrder)

  fs.writeFileSync(
    "./data/orders.json",
    JSON.stringify(orders, null, 2)
  )

  res.json({
    message: "Order Placed"
  })
})

router.get("/", (req, res) => {

  const orders = JSON.parse(
    fs.readFileSync("./data/orders.json")
  )

  res.json(orders)
})

module.exports = router