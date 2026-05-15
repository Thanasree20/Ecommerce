import { useEffect, useState } from "react"

const Cart = () => {

  const [cart, setCart] = useState([])

  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || []

    setCart(storedCart)

  }, [])

  const removeItem = (id) => {

    const updatedCart =
      cart.filter((item) => item.id !== id)

    setCart(updatedCart)

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    )
  }

  const total = cart.reduce(
    (acc, item) => acc + item.price,
    0
  )

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        My Cart
      </h1>

      {cart.length === 0 ? (

        <h2 className="text-2xl">
          Cart is Empty
        </h2>

      ) : (

        <>
          <div className="space-y-5">

            {cart.map((item) => (

              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
              >

                <div className="flex items-center gap-5">

                  <img
                    src={item.image}
                    alt=""
                    className="w-32 h-32 object-cover rounded-xl"
                  />

                  <div>

                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500">
                      {item.category}
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      ₹ {item.price}
                    </h3>

                  </div>

                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-5 py-3 rounded-xl"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          <div className="mt-10 bg-white p-8 rounded-2xl shadow">

            <h2 className="text-4xl font-bold mb-5">
              Total: ₹ {total}
            </h2>

            <button
              className="bg-black text-white px-8 py-4 rounded-xl"
              onClick={() => alert("Order Placed Successfully")}
            >
              Checkout
            </button>

          </div>
        </>
      )}

    </div>
  )
}

export default Cart