import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  console.log(token);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5005/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrders(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div class="h-screen bg-gray-100 pt-20">
      <h1 class="mb-10 text-center text-2xl font-bold">My Orders: </h1>
      <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 w-full max-h-[600px] overflow-y-auto">
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <div class="mb-6 rounded-lg bg-white p-6 shadow-md flex-col justify-start">
                <div class="flex justify-start item-start space-y-2 flex-col">
                  <h1 class="text-gray-700 text-lg font-bold">
                    {" "}
                    Order ID: {order._id}
                  </h1>
                  <p class="text-gray-700">Status: {order.status}</p>
                  <p class="text-gray-700">Date: {order.date}</p>
                  <h1 class="text-gray-700 text-lg font-bold">
                    Order Total: ${order.orderTotal.toFixed(2)}
                  </h1>
                </div>
                <ul>
                  {order.products.map((product) => (
                    <li key={product._id}>
                      <div class="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                          <div class="pb-4 md:pb-8 w-full md:w-40">
                            <img
                              src={product.productId.image}
                              alt="food"
                              class="w-2/3 rounded-lg sm:w-40"
                            />
                          </div>
                          <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                            <div class="w-full flex flex-col justify-start items-start space-y-8">
                              <h2 class="text-lg font-bold text-gray-900">
                                {product.productId.name}
                              </h2>
                              <div class="flex justify-start items-start flex-col space-y-2"></div>
                            </div>
                            <div class="flex justify-between space-x-8 items-start w-full">
                              <p class="text-gray-700">
                                Price: ${product.productId.price.toFixed(2)}{" "}
                                <span class="text-red-300 line-through"></span>
                              </p>
                              <p class="text-gray-700">
                                Quantity: {product.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderPage;
